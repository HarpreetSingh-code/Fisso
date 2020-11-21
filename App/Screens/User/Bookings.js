import React, { Component } from 'react';
import { Container, Header, Title, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { View, TouchableOpacity, ActivityIndicator, ScrollView, Image } from 'react-native';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import ViewBill from '../../Components/CustomModals/User/ViewBill'
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-community/async-storage';
let BookingsData = []
export default class AnatomyExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserId: "",
      BookingsData: [],
      RequestedServices: [],
      VisibleModal: false,
      isLoading: true
    };
  }
  async componentDidMount() {
    setTimeout(async() => {
      let value = await AsyncStorage.getItem('@FissoUserId')
      this.setState({ UserId: value })
      await firestore()
        .collection('FissoUser')
        .doc(this.state.UserId)
        .get().then((data) => {
          this.setState({ BookingsData: data._data.UserAppointments, isLoading: false })
          //BookingsData = data._data.UserAppointments
          //console.log(this.state.BookingsData)
        })
    }, 1500);
  }
  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: "#154ef9" }} androidStatusBarColor="#154ef9">
          <Left>
            <Button transparent onPress={() => { this.props.navigation.openDrawer() }}>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Bookings</Title>
          </Body>
          <Right >
            <Button transparent onPress={() => { this.componentDidMount() }}>
              <Icon name='reload-outline' type="Ionicons" />
            </Button>
          </Right>
        </Header>
        <View style={{ flex: 1, alignItems: 'center', }}>
          {this.state.isLoading
            ? (<Image
              source={{ uri: "https://i.pinimg.com/originals/1c/13/f3/1c13f3fe7a6bba370007aea254e195e3.gif" }}
              style={{ alignSelf: "center", marginTop: responsiveHeight(30), width: responsiveWidth(50), height: responsiveWidth(50) }}
            />)
            : (
              <ScrollView style={{ width: "100%" }}>
                {this.state.BookingsData.length == 0
                  ? (<Text style={{ color: "#444", marginTop: responsiveHeight(50), fontWeight: "bold", alignSelf: "center" }}>No Bookings</Text>)
                  : (
                    this.state.BookingsData.map((t, key) => {
                      return (
                        <View style={{ width: "100%", backgroundColor: "#f3f3f3", borderRadius: 20, padding: responsiveWidth(2), marginBottom: responsiveWidth(2) }} key={key}>
                          <View style={{ flexDirection: "row" }}>
                            <View style={{ flex: 0.22 }}>
                              {t.VehicleType == "Two"
                                ? (<Icon name="motorbike" type="MaterialCommunityIcons" style={{ fontSize: responsiveFontSize(10), color: "#154ef9", backgroundColor: "rgba(1,1,1,0.11)", borderRadius: 20 }} />)
                                : (<Icon name="car-alt" type="FontAwesome5" style={{ color: "#154ef9", fontSize: responsiveFontSize(8.5), backgroundColor: "rgba(1,1,1,0.11)", borderRadius: 20, paddingHorizontal: responsiveWidth(2) }} />)
                              }
                              {t.Status == "Pending"
                                ? (<Text style={{ alignSelf: "center", padding: responsiveWidth(1), backgroundColor: "#ff6333", marginTop: responsiveWidth(1), fontSize: responsiveFontSize(1.4), borderRadius: 10, fontWeight: "bold" }}>Pending</Text>)
                                : (<Text style={{ alignSelf: "center", padding: responsiveWidth(1), backgroundColor: "#00f514", marginTop: responsiveWidth(1), fontSize: responsiveFontSize(1.4), borderRadius: 10, fontWeight: "bold" }}>Completed</Text>)}
                            </View>
                            {
                              t.RequestStatus == ""
                                ? (
                                  <View style={{ flex: 0.78, paddingLeft: responsiveWidth(2) }}>
                                    <Text style={{ fontSize: responsiveFontSize(2), color: "#555", fontWeight: "bold" }}>{t.VehicleName} ({t.RegNum})</Text>
                                    <Text style={{ fontSize: responsiveFontSize(1.4), fontWeight: "bold" }}>Garage : {t.GarageName}</Text>
                                    <Text style={{ fontSize: responsiveFontSize(1.4) }}>Address : {t.GarageAddress}</Text>
                                    <Text style={{ fontSize: responsiveFontSize(1.4) }}>Appointment : {t.AppointmentDate} at {t.AppointmentTime}</Text>


                                    {this.state.VisibleModal && <ViewBill onExit={(val) => { this.setState({ VisibleModal: val }) }} SelectedServices={this.state.RequestedServices} />}


                                    <TouchableOpacity onPress={() => { this.setState({ RequestedServices: t.ServicesDetails, VisibleModal: true }) }}>
                                      <Text style={{ color: "#11f", fontWeight: "bold" }}>View Requested Services</Text>
                                    </TouchableOpacity>
                                  </View>
                                )
                                : (
                                  <View style={{ flex: 0.78, paddingLeft: responsiveWidth(2) }}>
                                    <Text style={{ fontSize: responsiveFontSize(2), color: "#555", fontWeight: "bold" }}>{t.VehicleName} ({t.RegNum})</Text>
                                    <Text style={{ fontSize: responsiveFontSize(1.4) }}>Appointment : {t.AppointmentDate} at {t.AppointmentTime}</Text>
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                                      <Text style={{ color: "#f11", fontSize: responsiveFontSize(1.6), fontWeight: "bold" }}>Appointment Cancelled by {t.GarageName}</Text>
                                    </View>
                                  </View>
                                )
                            }
                          </View>
                        </View>
                      )
                    })
                  )}
              </ScrollView>
            )}
        </View>
      </Container >
    );
  }
}