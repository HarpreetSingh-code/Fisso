import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, ActivityIndicator, Alert, RefreshControl, ScrollView } from 'react-native';
import { Container, Header, Left, Icon, Right, Button, Body, Title, Content, Card } from 'native-base';
import AppStyles from '../../Components/AppStyles';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import ViewBill from '../../Components/CustomModals/User/ViewBill';
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-community/async-storage';

let Today = ""
let JobsDetails = []

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      garageAvatar: "https://www.seekpng.com/png/full/901-9010044_easy-maintenance-search-circle-icon.png",
      GarageId: "",
      TodayDate: "",
      JobsDetails: JobsDetails,
      ViewBill: [],
      ViewBillModal: false,
      isLoading: true
    };
  }

  async componentDidMount() {
    let value = await AsyncStorage.getItem('@FissoGarageId')
    this.setState({ GarageId: value })
    await firestore()
      .collection('FissoGarage')
      .doc(this.state.GarageId)
      .get().then(async (data) => {
        JobsDetails = await data._data.Jobs
        await this.setState({ JobsDetails: JobsDetails, isLoading: false })
      })
    this.setState({ JobsDetails: JobsDetails, isLoading: false })
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    Today = date + "/" + month + "/" + year
    this.setState({ TodayDate: Today })
    //console.log(this.state.JobsDetails);
  }

  makeCall(t) {
    Alert.alert(
      "Cancel Request?",
      "Make call to " + t.UserName + " ?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK", onPress: async () => {
            alert("Making call  ")
          }
        }
      ],
      { cancelable: true }
    );
  }

  async ChangeStatus(t, key) {
    for (let i = 0; i < JobsDetails.length; i++) {
      if (JobsDetails[i].AppointmentID == t.AppointmentID) {

        delete JobsDetails[i].Status
        //console.log(JobsDetails[i]);
        JobsDetails[i].Status = "Completed"
        // console.log(JobsDetails[i]);
      }
    }

    this.setState({ JobsDetails: JobsDetails })
    await firestore().collection('FissoGarage').doc(this.state.GarageId).update({
      Jobs: this.state.JobsDetails
    })
    let ALLAPPOINTMENTS
    await firestore()
      .collection('FissoUser')
      .doc(t.UserID)
      .get().then((data) => {
        ALLAPPOINTMENTS = data._data.UserAppointments
        console.log(ALLAPPOINTMENTS);
        for (let i = 0; i < ALLAPPOINTMENTS.length; i++) {
          if (ALLAPPOINTMENTS[i].AppointmentID == t.AppointmentID) {

            delete ALLAPPOINTMENTS[i].Status
            ALLAPPOINTMENTS[i].Status = "Completed"
          }
        }
        console.log(ALLAPPOINTMENTS);
        //console.log(AllRequests[1].RequestId)
      })

    await firestore().collection('FissoUser').doc(t.UserID).update({
      UserAppointments: ALLAPPOINTMENTS
    })

    this.componentDidMount()
  }
  render() {

    //console.log(JobsDetails);
    return (
      <Container>
        <Header androidStatusBarColor="#154ef9" style={{ backgroundColor: "#154ef9" }}>
          <Left>
            <Button transparent onPress={() => {
              this.props.navigation.openDrawer()
            }}>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Image source={require('../../Components/Images/Logo/GarageLogo.png')} style={{ width: responsiveWidth(30), height: responsiveHeight(5) }} resizeMode="contain" />
          </Body>
          <Right >
            <TouchableOpacity onPress={() => { this.props.navigation.navigate("Profile") }}>
              <Image
                source={{ uri: this.state.garageAvatar }}
                style={{ width: responsiveWidth(8), height: responsiveWidth(8), borderRadius: 20, borderWidth: 3, borderColor: "#fff" }} />
            </TouchableOpacity>
          </Right>
        </Header>
        <Content padder contentContainerStyle={{ backgroundColor: "#fff", alignItems: 'center', }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 0.5 }}>
              <Text style={[AppStyles.BlueBoldText, { fontSize: responsiveFontSize(3) }]}>Job Status </Text>
            </View>
            <View style={{ flex: 0.5, alignItems: "flex-end", justifyContent: "center" }}>
              <Text style={[AppStyles.BlackText, { fontWeight: "bold" }]}>{this.state.TodayDate}</Text>
            </View>
          </View>
          {this.state.isLoading
            ? (<Image
              source={{ uri: "https://i.pinimg.com/originals/1c/13/f3/1c13f3fe7a6bba370007aea254e195e3.gif" }}
              style={{ marginTop: responsiveHeight(30), width: responsiveWidth(50), height: responsiveWidth(50) }}
            />)
            : (<ScrollView style={{ width: "100%" }}>
              {
                this.state.JobsDetails.length == 0
                  ? (
                    <View style={{marginTop:responsiveHeight(50),alignItems:"center",justifyContent: 'center',}}>
                      <Image source={{uri:"https://i.pinimg.com/originals/5d/35/e3/5d35e39988e3a183bdc3a9d2570d20a9.gif"}} style={{width:responsiveWidth(40),height:responsiveHeight(20)}}/>
                      <Text>No Jobs Started</Text>
                    </View>
                  )
                  : (<View style={{ width: "100%" }}>
                    {this.state.JobsDetails.map((t, key) => {
                      return (
                        <Card style={{ flexDirection: "row", backgroundColor: "#f3f3f3", marginVertical: responsiveWidth(1), paddingVertical: responsiveWidth(1), paddingHorizontal: responsiveWidth(1), borderRadius: 20 }} key={key}>
                          <View style={{ flex: 0.22, alignItems: 'center', justifyContent: 'center', }}>
                            {
                              t.VehicleType == "Two"
                                ? (<Icon name="motorbike" type="MaterialCommunityIcons" style={{ fontSize: responsiveFontSize(10), color: "#154ef9", backgroundColor: "rgba(1,1,1,0.11)", borderRadius: 20 }} />)
                                : (<Icon name="car-alt" type="FontAwesome5" style={{ color: "#154ef9", fontSize: responsiveFontSize(8.5), backgroundColor: "rgba(1,1,1,0.11)", borderRadius: 20, paddingHorizontal: responsiveWidth(2) }} />)
                            }
                            {
                              t.Status == "Pending"
                                ? (
                                  <TouchableOpacity style={Styles.JobStatusText} onPress={() => { this.ChangeStatus(t, key) }}>
                                    <Text style={{ backgroundColor: "#f50000", color: "#fff", textAlign: "center", fontWeight: "bold" }}>
                                      Active
                              </Text>
                                  </TouchableOpacity>
                                )
                                : (<Text style={[Styles.JobStatusText, { backgroundColor: "#00ad23" }]}>Completed</Text>)
                            }
                          </View>
                          <View style={{ flex: 0.78, paddingLeft: responsiveWidth(2) }}>
                            <Text style={[AppStyles.BlueBoldText, { fontWeight: "bold", fontSize: responsiveFontSize(2) }]}>{t.UserName}</Text>
                            <Text style={{ fontWeight: "bold", fontSize: responsiveFontSize(1.6) }}>{t.VehicleName}</Text>
                            <Text style={{ fontWeight: "bold", fontSize: responsiveFontSize(1.6) }}>{t.RegNum}</Text>
                            <Text style={{ fontSize: responsiveFontSize(1.6) }}>Started at : {t.StartedAt}</Text>

                            {this.state.ViewBillModal && <ViewBill SelectedServices={this.state.ViewBill} onExit={(val) => { this.setState({ ViewBillModal: val }) }} />}


                            <View style={{ flexDirection: "row" }}>
                              <TouchableOpacity style={[Styles.CustomButtons, { borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }]} onPress={() => { this.setState({ ViewBill: t.ServicesDetails, ViewBillModal: true }) }}>
                                <Icon name="list" type="Feather" style={{ fontSize: responsiveFontSize(1.4) }} />
                                <Text style={{ marginLeft: responsiveWidth(1), fontWeight: "bold" }}>View Bill</Text>
                              </TouchableOpacity>
                              <TouchableOpacity style={[Styles.CustomButtons, { borderBottomRightRadius: 20, borderTopRightRadius: 20 }]} onPress={() => { this.makeCall(t) }}>
                                <Icon name="phone" type="Entypo" style={{ fontSize: responsiveFontSize(1.4) }} />
                                <Text style={{ marginLeft: responsiveWidth(1), fontWeight: "bold" }}>Contact</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </Card>
                      )
                    })}
                  </View>)
              }
            </ScrollView>)}
        </Content>
      </Container >
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

