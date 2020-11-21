/////////////////////////////////////////////////////////////       User REQUESTS

import React, { Component } from 'react';
import { Container, Header, Title, Button, Left, Right, Body, Icon } from 'native-base';
import { View, ScrollView, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import AppStyles from '../../Components/AppStyles'
import ViewBill from '../../Components/CustomModals/User/ViewBill';
import firestore from '@react-native-firebase/firestore'
import BookAppointment from '../../Components/CustomModals/User/BookAppointment';
import AsyncStorage from '@react-native-community/async-storage';

let Request_Details = []

export default class RequestedServices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Request_Details: [],
      RequestedServices: [],
      VisibleModal: false,
      VisibleBookAppointmentModal: false,
      TotalBill: 0,
      SendData: [],
      UserId: "",
      RequestID: "",
      GarageID: "",
      UserName: "",
      isLoading: true
    };
  }
  getTotalBill = () => {
    let Temp = this.state.RequestedServices.map(t => t.Price)
    let total = 0
    for (let i = 0; i < Temp.length; i++) {
      total = total + Temp[i]
    }
    this.setState({ TotalBill: total })
  }
  async componentDidMount() {
    setTimeout(async () => {
      let value = await AsyncStorage.getItem('@FissoUserId')
      this.setState({ UserId: value })
      //console.log(this.state.UserId);
      await firestore()
        .collection('FissoUser')
        .doc(this.state.UserId)
        .get().then((data) => {
          let UserName = data._data.UserName
          Request_Details = data._data.UserRequests
          this.setState({ UserName: UserName, Request_Details: Request_Details, isLoading: false })
          // console.log(Request_Details)
        })
    }, 1500);
  }
  cancelRequest(t) {
    Alert.alert(
      "Cancel Request?",
      "Are you sure you want to cancel this Request?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK", onPress: async () => {
            let Requests = Request_Details
            let Pos = Requests.indexOf(t)
            Requests.splice(Pos, 1)
            await firestore().collection('FissoUser').doc(this.state.UserId).update({
              UserRequests: Requests
            })
            this.componentDidMount()
          }
        }
      ],
      { cancelable: false }
    );
  }
  _handleSubmmit = async (t) => {

    await this.setState({ GarageID: t.GarageId, RequestID: t.RequestId, RequestedServices: t.ServicesDetails, SendData: t })
    this.getTotalBill()
    //console.log(this.state.GarageID);

    this.state.TotalBill == 0
      ? alert("Garage will send you an Estimated Bill For Your Requested Services, only then you can book an Appointment.")
      : this.setState({ VisibleBookAppointmentModal: true })

  }


  render() {
    //console.log(this.state.Request_Details);
    return (
      <Container>
        <Header style={{ backgroundColor: "#154ef9" }} androidStatusBarColor="#154ef9">
          <Left>
            <Button transparent onPress={() => { this.props.navigation.openDrawer() }}>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Requests</Title>
          </Body>
          <Right >
            <Button transparent onPress={() => { this.componentDidMount() }}>
              <Icon name='reload-outline' type="Ionicons" />
            </Button>
          </Right>
        </Header>
        <View style={{ flex: 1, alignItems: 'center',backgroundColor:"rgba(1,1,1,0.02)" }}>
          {this.state.isLoading
            ? (<Image
              source={{ uri: "https://i.pinimg.com/originals/1c/13/f3/1c13f3fe7a6bba370007aea254e195e3.gif" }}
              style={{ alignSelf: "center", marginTop: responsiveHeight(30), width: responsiveWidth(50), height: responsiveWidth(50) }}
            />)
            : (<View>
              {Request_Details.length == 0
                ? (
                  <Text style={{ color: "#444", marginTop: responsiveHeight(50), fontWeight: "bold" }}>No requests till now.</Text>
                )
                : (
                  <ScrollView onScroll={() => { this.componentDidMount() }}>
                    {Request_Details.map((t, key) => {
                      return (
                        <View key={key} style={{ backgroundColor: "rgba(1,1,1,0.11)", padding: responsiveWidth(2), width: responsiveWidth(95), borderRadius: 20, marginVertical: responsiveWidth(2) }}>
                          <View style={{ flexDirection: "row" }}>
                            <View style={{ flex: 0.22 }}>
                              {t.VehicleType == "Two"
                                ? (<Icon name="motorbike" type="MaterialCommunityIcons" style={{ fontSize: responsiveFontSize(10), color: "#154ef9", backgroundColor: "rgba(1,1,1,0.11)", borderRadius: 20 }} />)
                                : (<Icon name="car-alt" type="FontAwesome5" style={{ color: "#154ef9", fontSize: responsiveFontSize(8.5), backgroundColor: "rgba(1,1,1,0.11)", borderRadius: 20, paddingHorizontal: responsiveWidth(2) }} />)
                              }
                            </View>
                            <View style={{ flex: 0.78, paddingLeft: responsiveWidth(2) }}>
                              <Text style={{ fontSize: responsiveFontSize(2), color: "#555", fontWeight: "bold" }}>{t.VehicleName} ({t.RegNum})</Text>
                              <Text style={{ fontSize: responsiveFontSize(1.4), fontWeight: "bold" }}>Garage : {t.GarageName}</Text>
                              <Text style={{ fontSize: responsiveFontSize(1.4) }}>Address : {t.GarageAddress}</Text>


                              {this.state.VisibleModal && <ViewBill
                                onExit={(val) => { this.setState({ VisibleModal: val }) }}
                                SelectedServices={this.state.RequestedServices}
                              />}
                              {this.state.VisibleBookAppointmentModal && <BookAppointment
                                SentData={this.state.SendData}
                                onExit={(val) => { this.setState({ VisibleBookAppointmentModal: val }) }}
                                UserName={this.state.UserName}
                                RequestID={this.state.RequestID}
                                GarageID={this.state.GarageID}
                                BookAppointment={async (GarageID, RequestID, UserName, Vehicle, Garage, Services, SelectedDate, SelectedTime, GarageAddress, RegNum, VehicleType,obj) => {
                                  let Appointments = [], GarageAppointments = []
                                  const AppID = await firestore().collection("FissoGarage").doc()
                                  let AppointmentID = AppID.id

                                  await firestore()
                                    .collection('FissoUser')
                                    .doc(this.state.UserId)
                                    .get().then((data) => {
                                      Appointments = data._data.UserAppointments
                                      // console.log(Appointments)
                                      Appointments.push(
                                        {
                                          RequestStatus: "",
                                          Status: "Pending",
                                          VehicleType: VehicleType,
                                          RegNum: RegNum,
                                          GarageAddress: GarageAddress,
                                          AppointmentID: AppointmentID,
                                          GarageID: GarageID,
                                          RequestID: RequestID,
                                          UserID: this.state.UserId,
                                          UserName: UserName,
                                          GarageName: Garage,
                                          VehicleName: Vehicle,
                                          ServicesDetails: Services,
                                          AppointmentDate: SelectedDate,
                                          AppointmentTime: SelectedTime
                                        }
                                      )
                                    })
                                  //console.log(GarageID);
                                  await firestore()
                                    .collection('FissoGarage')
                                    .doc(GarageID)
                                    .get().then((data) => {
                                      GarageAppointments = data._data.Appointments
                                      console.log(GarageAppointments)
                                      GarageAppointments.push(
                                        {
                                          RequestStatus: "",
                                          Status: "Pending",
                                          VehicleType: VehicleType,
                                          RegNum: RegNum,
                                          GarageAddress: GarageAddress,
                                          AppointmentID: AppointmentID,
                                          GarageID: GarageID,
                                          RequestID: RequestID,
                                          UserID: this.state.UserId,
                                          UserName: UserName,
                                          GarageName: Garage,
                                          VehicleName: Vehicle,
                                          ServicesDetails: Services,
                                          AppointmentDate: SelectedDate,
                                          AppointmentTime: SelectedTime
                                        }
                                      )
                                    })
                                  //console.log(Appointments);

                                  await firestore().collection('FissoUser').doc(this.state.UserId).update({
                                    UserAppointments: Appointments
                                  })
                                  let Requests = Request_Details
                                  let pos=Requests.indexOf(obj)
                                  Requests.splice(pos, 1)

                                  await firestore().collection('FissoUser').doc(this.state.UserId).update({
                                    UserRequests: Requests
                                  })
                                  await firestore().collection('FissoGarage').doc(GarageID).update({
                                    Appointments: GarageAppointments
                                  })
                                  this.componentDidMount()

                                }} />}


                              <TouchableOpacity onPress={() => { this.setState({ RequestedServices: t.ServicesDetails, VisibleModal: true }) }}>
                                <Text style={{ color: "#11f", fontWeight: "bold" }}>View Requested Services</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                          <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity
                              style={{ flex: 0.5, paddingVertical: responsiveWidth(2), marginHorizontal: responsiveWidth(1.5), backgroundColor: "#154ef9", borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginTop: responsiveWidth(2) }}
                              onPress={() => { this.cancelRequest(t) }}>
                              <Text style={AppStyles.WhiteBoldText}>Cancel Request</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{ flex: 0.5, paddingVertical: responsiveWidth(2), marginHorizontal: responsiveWidth(1.5), backgroundColor: "#154ef9", borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginTop: responsiveWidth(2) }}
                              onPress={() => { this._handleSubmmit(t) }}>
                              <Text style={AppStyles.WhiteBoldText}>Book Appointment</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      )
                    })}
                  </ScrollView>
                )
              }
            </View>)}
        </View>
      </Container >
    );
  }
}