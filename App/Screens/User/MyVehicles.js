import React, { Component } from 'react';
import { Container, Header, Title, Button, Left, Right, Body, Icon, Fab } from 'native-base';
import { View, TouchableOpacity, ScrollView, Text, ActivityIndicator, Image } from 'react-native';
import { responsiveWidth, responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import AppStyles from '../../Components/AppStyles';
import AddVehicle from '../../Components/CustomModals/User/AddVehicle';
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-community/async-storage';

export default class MyVehicles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      VisibleModal: false,
      UserId: "0tAhhQJcBxtCOn8E5C9B",
      UserMobile: "_____REGISTERED MOBILE NMBER__________",
      SavedVehicles: [],
      isLoading: true
    };
  }
  async componentDidMount() {
    setTimeout(async () => {
      let value = await AsyncStorage.getItem('@FissoUserId')
      this.setState({ UserId: value })
      await firestore()
        .collection('FissoUser')
        .doc(this.state.UserId)
        .get().then((data) => {
          // console.log(data._data.UserVehicles);
          this.setState({ SavedVehicles: data._data.UserVehicles, isLoading: false });
        })
    }, 1500);

  }

  _handleSubmit = async (t) => {
    let UserName = ""
    await firestore()
      .collection('FissoUser')
      .doc(this.state.UserId)
      .get().then((data) => {
        UserName = data._data.UserName
        //console.log(UserName);
      })
    let User_Details = [
      {
        UserId: this.state.UserId,
        UserName: UserName,
        VehicleType: t.VehicleType,
        VehicleName: t.Vehicle,
        UserEmail: t.Email,
        UserMobile: this.state.UserMobile,
        RegNum: t.RegNum
      }
    ]
    //console.log(User_Details);
    this.props.navigation.navigate("AllGarages", { User_Details })
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
            <Title>Vehicles</Title>
          </Body>
          <Right >
            <Button transparent onPress={() => { this.setState({ VisibleModal: true }) }}>
              <Icon name="add-to-list" type="Entypo" />
            </Button>
          </Right>
        </Header>
        <View style={{ flex: 1 }}>

          {this.state.SavedVehicles.length == 0
            ? (<View></View>)
            : (<View style={{ flexDirection: "row", backgroundColor: "#555", paddingVertical: responsiveWidth(1) }}>
              <Text style={{ color: "#fff" }}>Click on Vehicle to Request Services for it.</Text>
            </View>)
          }

          <ScrollView>
            {this.state.VisibleModal && <AddVehicle UserId={this.state.UserId} onExit={(val) => {
              this.setState({ VisibleModal: val })
              this.componentDidMount()
            }
            } />}

            {this.state.isLoading
              ? (<Image
                source={{ uri: "https://i.pinimg.com/originals/1c/13/f3/1c13f3fe7a6bba370007aea254e195e3.gif" }}
                style={{ alignSelf: "center", marginTop: responsiveHeight(30), width: responsiveWidth(50), height: responsiveWidth(50) }}
              />)
              : (<View style={{ width: "100%" }}>
                {this.state.SavedVehicles.length == 0
                  ? (<Text style={{ textAlign: "center", marginTop: responsiveHeight(50), fontSize: responsiveFontSize(1.8), }}>Add vehicles by clicking ( <Icon name="add-to-list" type="Entypo" style={{ fontSize: responsiveFontSize(1.8) }} /> )</Text>)
                  : (
                    this.state.SavedVehicles.map((t, key) => {
                      return (
                        <TouchableOpacity key={key} style={{ padding: responsiveWidth(3), margianVertical: responsiveWidth(2) }} onPress={() => { this._handleSubmit(t) }}>
                          <View style={{ flexDirection: "row", backgroundColor: "rgba(1,1,1,0.05)", padding: responsiveWidth(1), paddingVertical: responsiveWidth(2), borderRadius: 20 }}>
                            {t.VehicleType == "Two"
                              ? (<Icon name="motorbike" type="MaterialCommunityIcons" style={{ fontSize: responsiveFontSize(10), color: "#154ef9", backgroundColor: "rgba(1,1,1,0.11)", borderRadius: 20 }} />)
                              : (<Icon name="car-alt" type="FontAwesome5" style={{ color: "#154ef9", fontSize: responsiveFontSize(8.5), backgroundColor: "rgba(1,1,1,0.11)", borderRadius: 20, paddingHorizontal: responsiveWidth(2) }} />)}
                            <View style={{ width: "80%", paddingLeft: responsiveWidth(3) }}>
                              <Text style={{ fontSize: responsiveFontSize(2), color: "#555", fontWeight: "bold" }}>{t.Vehicle}</Text>
                              <Text>Plate : {t.RegNum}</Text>
                              <Text>Email : {t.Email}</Text>
                            </View>

                          </View>
                        </TouchableOpacity>
                      )
                    })
                  )}
              </View>)}

          </ScrollView>
        </View>
      </Container >
    );
  }
}