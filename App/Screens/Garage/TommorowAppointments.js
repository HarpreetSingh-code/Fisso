import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Icon, Card } from 'native-base';
import AppStyles from '../../Components/AppStyles';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import ViewBill from '../../Components/CustomModals/User/ViewBill';
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-community/async-storage';
let Appointments = []
export default class TommorowAppointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Appointments: [],
      GarageId: "",
      Date: "",
      ViewBill: [],
      VisibleViewBill: false
    };
  }
  componentDidMount = async () => {
    let value = await AsyncStorage.getItem('@FissoGarageId')
    this.setState({ GarageId: value })
    var date = new Date().getDate() + 1;
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var Today = date + "/" + month + "/" + year
    this.setState({ Date: Today })
    await firestore()
      .collection('FissoGarage')
      .doc(this.state.GarageId)
      .get().then((data) => {
        Appointments = data._data.Appointments
        //console.log(Appointments)
      })
    let TEMP = []
    Appointments.map((t, key) => {
      t.AppointmentDate == Today
        ? TEMP.push(t)
        : (false)
    })

    await this.setState({ Appointments: TEMP })

    // console.log(this.state.Appointments);
  }

  async CancelAppointment(t, key) {

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

            await firestore()
              .collection('FissoGarage')
              .doc(this.state.GarageId)
              .get().then((data) => {
                let AllAppointments = []
                AllAppointments = data._data.Appointments
                // console.log(t.AppointmentID);


                for (let i = 0; i < AllAppointments.length; i++) {
                  if (AllAppointments[i].AppointmentID == t.AppointmentID) {
                    //Delete item from Allappointments
                    AllAppointments.splice(i, 1)
                    firestore().collection('FissoGarage').doc(this.state.GarageId).update({
                      Appointments: AllAppointments
                    })
                    this.setState({ Appointments: AllAppointments })
                  }
                  else {

                  }
                }

              })

            let UserAppointments = []
            let Selected

            await firestore()
              .collection('FissoUser')
              .doc(t.UserID)
              .get().then((data) => {
                //console.log(data._data.UserAppointments);
                UserAppointments = data._data.UserAppointments
                UserAppointments.map((p) => {
                  if (p.RequestID == t.RequestID) {
                    // console.log(UserAppointments)

                    Selected = UserAppointments[UserAppointments.indexOf(p)]
                    delete Selected.RequestStatus
                    Selected.RequestStatus = "Cancelled"


                    UserAppointments.splice(UserAppointments.indexOf(p), 1, Selected)
                    //console.log(UserAppointments)

                    firestore().collection('FissoUser').doc(t.UserID).update({
                      UserAppointments: UserAppointments
                    })
                  }
                })
              })
            this.componentDidMount()
          }
        }
      ],
      { cancelable: false }
    );
  }
  render() {
    return (
      <View style={{ flex: 1, }}>
        <Text style={{ textAlign: "left", fontWeight: "bold", fontSize: responsiveFontSize(2.2), margin: responsiveWidth(2) }}>Tommorow ( {this.state.Date} )</Text>
        {this.state.Appointments.length == 0
          ? (
            <Text style={{ textAlign: "center", marginTop: responsiveHeight(50), color: "#555", fontWeight: "bold", fontSize: responsiveFontSize(2) }}>No Appointments</Text>
          )
          : (
            <ScrollView>
              {this.state.Appointments.map((t, key) => {
                return (
                  <Card style={{ flexDirection: "row", alignSelf: "center", backgroundColor: "#f3f3f3", marginVertical: responsiveWidth(1), paddingVertical: responsiveWidth(1), paddingHorizontal: responsiveWidth(1), borderRadius: 20 }} key={key}>
                    <View style={{ flex: 0.22, alignItems: 'center', justifyContent: 'center', }}>
                      {
                        t.VehicleType == "Two"
                          ? (<Icon name="motorbike" type="MaterialCommunityIcons" style={{ fontSize: responsiveFontSize(10), color: "#154ef9", backgroundColor: "rgba(1,1,1,0.11)", borderRadius: 20 }} />)
                          : (<Icon name="car-alt" type="FontAwesome5" style={{ color: "#154ef9", fontSize: responsiveFontSize(8.5), backgroundColor: "rgba(1,1,1,0.11)", borderRadius: 20, paddingHorizontal: responsiveWidth(2) }} />)
                      }
                    </View>
                    <View style={{ flex: 0.78, paddingLeft: responsiveWidth(2) }}>
                      <Text style={[AppStyles.BlueBoldText, { fontWeight: "bold", fontSize: responsiveFontSize(2) }]}>{t.CustomerName}</Text>
                      <Text style={{ fontWeight: "bold", fontSize: responsiveFontSize(1.6) }}>{t.VehicleName}</Text>
                      <Text style={{ fontWeight: "bold", fontSize: responsiveFontSize(1.6) }}>{t.RegNum}</Text>
                      <Text style={{ fontSize: responsiveFontSize(1.6) }}>Appointment Time : {t.AppointmentTime}</Text>

                      {this.state.VisibleViewBill && <ViewBill SelectedServices={this.state.ViewBill} onExit={(val) => { this.setState({ VisibleViewBill: val }) }} />}

                      <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity style={[Styles.CustomButtons, { borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }]} onPress={() => { this.setState({ ViewBill: t.ServicesDetails, VisibleViewBill: true }) }}>
                          <Icon name="list" type="Feather" style={{ fontSize: responsiveFontSize(1.4) }} />
                          <Text style={{ marginLeft: responsiveWidth(1), fontWeight: "bold" }}>View Bill</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[Styles.CustomButtons, { borderBottomRightRadius: 20, borderTopRightRadius: 20 }]} onPress={() => { this.CancelAppointment(t, key) }}>
                          <Icon name="close" type="AntDesign" style={{ fontSize: responsiveFontSize(1.4) }} />
                          <Text style={{ marginLeft: responsiveWidth(1), fontWeight: "bold" }}>Cancel</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Card>
                )
              })}
            </ScrollView>
          )}
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  JobStatusText: {
    backgroundColor: "#f11",
    paddingHorizontal: responsiveWidth(1),
    marginVertical: responsiveWidth(1),
    borderRadius: 10,
    fontSize: responsiveFontSize(1.4),
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
    paddingVertical: responsiveWidth(0.5),
    color: "#fff"
  },
  CustomButtons: {
    flex: 0.5,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(1,1,1,0.2)',
    marginHorizontal: responsiveWidth(0.5),
    paddingVertical: responsiveWidth(1),
    marginTop: responsiveWidth(1)
  }
})