import React, { Component } from 'react';
import { Container, Header, Content, Button, Left, Right, Body, Icon, Text, Radio, Picker, CheckBox, Toast } from 'native-base';
import { Image, View, TouchableOpacity, Slider } from 'react-native';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import FloatingLabelInput from 'react-native-floating-label-input';
import AppStyles from '../../Components/AppStyles';
import AsyncStorage from '@react-native-community/async-storage';
import {
  BIKE_MAKES, BAJAJ_BIKE_MODELS, HONDA_BIKE_MODELS,
  TVS_BIKE_MODELS, CAR_MAKES, FORD_CAR_MODELS,
  SUZUKI_CAR_MODELS, TOYOTA_CAR_MODELS, TESLA_CAR_MODELS
} from '../../Firebase_Config/Temp_Data/Vehicles_Info'
import firestore from '@react-native-firebase/firestore'
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserId: "",
      makeClicked: false,
      UserName: "",
      UserMobile: "________REGISTERED MOBILE NUMBER________",
      UserAvatar: "https://lh3.googleusercontent.com/CtepWbVHMq-TXWLcoeT48cXD-p4vCZi6RjhIklkz4czrtZUlqT5mxB2CGei69x_i1sPBLxmiXpnW4ex6cN_SYhDa1gKVwjASJcql5Lu4xDyVAmOdu0XVAvRBEkxwSrLJCzcXafrvPW4MkxuM6LDr5P8rQeFxp2dcEN3G06sNp8Ox84sXPNWQazgoPRKvGcw7EjqJOi8g2Pj7WsVduShL-hoRIlXVkgQph1WjtYUbfbPQh5QYSQqnpliOIhcxEVgAh8hLGVea7cUIKamz3AOYBaE_n93OH_lG3IeN6qu05PYqPA6WhR6Nb6k7E4TFAqNCK3ZlHF_bTTk90T35XuJRQmutaDVV36BabBz3R4TT6R3mwyRtrBx6xii7O0ju2LUXKch7wBT9oF-NWjZQJiRUjXEfdst6KwIztw34EGpIa7VBNQLb80EhdNWeso3zc13WdhrAfApeUftp7CG7cjsX6c-j9vi6u8ODW4Ahb7gyTPgryro95ZXRGNG759pF6NAPCVDd6mgkfXGyHpOetM3kq-dkjjiIg1UTG3o3ikQWh0e9qaH0E9h_-HKXZPsm34tTBDTzG5XcLHUBLbxykYS-HIXhU-NXSXPPr74Y6gOnssY8gaO7AVnGkxB7ofsGnonB705FbWYs6O6JG4S2r53-pOCEPx1IM4dxYpcfQN5MP_sZl4AW00_ash5b8F6D=w717-h955-no?authuser=0",
      TwoWheelerRadio: true,
      FourWheelerRadio: false,
      Email: "",
      RegNum: "",
      Checked: false,
      VehicleMake: BIKE_MAKES,
      MakeValue: "key0",
      MakePosition: 0,
      VehicleModel: [],
      ModelValue: "Key0",
      ModelPosition: 0,
      ErrorMessage: ""
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
          // console.log(data._data.UserVehicles);
          this.setState({ UserName: data._data.UserName });
        })
    }, 10);

    //alert("Welcome "+this.state.UserName)
  }
  _handleSubmit() {
    let VehicleType
    let UserEmail = this.state.Email
    let RegNum = this.state.RegNum
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if (this.state.TwoWheelerRadio == true) { VehicleType = "Two" }
    else if (this.state.FourWheelerRadio == true) { VehicleType = "Four" }
    else { this.setState({ ErrorMessage: "There's been an error Plese Restart the Application." }) }


    if (this.state.makeClicked == false) {
      this.setState({ ErrorMessage: "Select Vehicle Make" })
      // alert("Please Select Make")
    }
    else {
      let VehicleMake = this.state.VehicleMake[this.state.MakePosition].label
      let VehicleModel = this.state.VehicleModel[this.state.ModelPosition].label
      if (UserEmail.match(mailformat)) {
        if (RegNum != "") {
          let User_Details = [
            {
              UserId: this.state.UserId,
              UserName: this.state.UserName,
              VehicleType: VehicleType,
              VehicleName: VehicleMake + " " + VehicleModel,
              UserEmail: UserEmail,
              RegNum: RegNum,
              UserMobile: this.state.UserMobile
            }
          ]
          //console.log(User_Details);
          this.props.navigation.navigate("AllGarages", { User_Details })
        }
        else {
          this.setState({ ErrorMessage: "Invalid Vehicle Registration Number" })
        }
      }
      else {
        this.setState({ ErrorMessage: "Please check your mail." })
      }

    }

    setTimeout(() => {
      this.setState({ ErrorMessage: "" })
    }, 3000);


  }

  onValueChange = async (value = string, Pos) => {
    await this.setState({ MakeValue: value, MakePosition: Pos, makeClicked: true })

    if (this.state.VehicleMake[this.state.MakePosition].label == "Bajaj") { this.setState({ VehicleModel: BAJAJ_BIKE_MODELS }) }
    else if (this.state.VehicleMake[this.state.MakePosition].label == "Honda") { this.setState({ VehicleModel: HONDA_BIKE_MODELS }) }
    else if (this.state.VehicleMake[this.state.MakePosition].label == "TVS") { this.setState({ VehicleModel: TVS_BIKE_MODELS }) }
    else if (this.state.VehicleMake[this.state.MakePosition].label == "Ford") { this.setState({ VehicleModel: FORD_CAR_MODELS }) }
    else if (this.state.VehicleMake[this.state.MakePosition].label == "Suzuki") { this.setState({ VehicleModel: SUZUKI_CAR_MODELS }) }
    else if (this.state.VehicleMake[this.state.MakePosition].label == "Toyota") { this.setState({ VehicleModel: TOYOTA_CAR_MODELS }) }
    else if (this.state.VehicleMake[this.state.MakePosition].label == "Tesla") { this.setState({ VehicleModel: TESLA_CAR_MODELS }) }
  }

  onValueChange1 = (value = string, Pos) => {
    this.setState({ ModelValue: value, ModelPosition: Pos })
  }

  render() {
    return (
      <Container>
        <Header androidStatusBarColor="#154ef9" style={{ backgroundColor: "#154ef9" }}>
          <Left>
            <Button transparent onPress={() => { this.props.navigation.openDrawer() }}>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Image source={require('../../Components/Images/Logo/LogoText.png')} style={{ width: responsiveWidth(30), height: responsiveHeight(4) }} resizeMode="contain" />
          </Body>
          <Right >
            <TouchableOpacity>
              <Image
                source={{ uri: this.state.UserAvatar }}
                style={{ width: responsiveWidth(8), height: responsiveWidth(8), borderRadius: 20, borderWidth: 3, borderColor: "#fff" }} />
            </TouchableOpacity>
          </Right>
        </Header>
        <Content padder>
          <Text style={{ fontSize: responsiveFontSize(2.5) }}>Welcome, <Text style={[AppStyles.BlueBoldText, { fontSize: responsiveFontSize(3) }]}>{this.state.UserName}</Text></Text>
          <Text>Please provide us your Information to get services for your Vehicle.</Text>
          <View style={{ marginTop: responsiveWidth(10) }}>
            <Text style={[AppStyles.BlackText, { fontWeight: "bold" }]}>Vehicle Type </Text>
            <View style={{ marginLeft: responsiveWidth(2), flexDirection: "row", marginTop: responsiveWidth(2) }} >
              <TouchableOpacity style={{ flex: 0.5, flexDirection: "row" }} onPress={() => { this.setState({ TwoWheelerRadio: true, FourWheelerRadio: false, VehicleMake: BIKE_MAKES }) }}>
                <Radio selected={this.state.TwoWheelerRadio} onPress={() => { this.setState({ TwoWheelerRadio: true, FourWheelerRadio: false, VehicleMake: BIKE_MAKES }) }}
                  color="#154ef9"
                  selectedColor="#154ef9"
                />
                <Text>2 Wheeler</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flex: 0.5, flexDirection: "row" }} onPress={() => { this.setState({ FourWheelerRadio: true, TwoWheelerRadio: false, VehicleMake: CAR_MAKES }) }}>
                <Radio selected={this.state.FourWheelerRadio} onPress={() => { this.setState({ FourWheelerRadio: true, TwoWheelerRadio: false, VehicleMake: CAR_MAKES }) }}
                  color="#154ef9"
                  selectedColor="#154ef9"
                />
                <Text>4 Wheeler</Text>
              </TouchableOpacity>
            </View>

            <Text style={[AppStyles.BlackText, { fontWeight: "bold", marginTop: responsiveWidth(3) }]}>Select Vehicle Make </Text>
            <View style={{ width: responsiveWidth(80), borderWidth: 1, borderRadius: 20 }}>
              <Picker
                note
                mode="dropdown"
                style={{ width: responsiveWidth(80), color: "#111" }}
                selectedValue={this.state.MakeValue}
                onValueChange={this.onValueChange.bind(this)}
              >
                {this.state.VehicleMake.map((t) => {
                  return (
                    <Picker.Item label={t.label} value={t.Value} key={t.Value} />
                  )
                })}
              </Picker>
            </View>

            <Text style={[AppStyles.BlackText, { fontWeight: "bold", marginTop: responsiveWidth(3) }]}>Select Vehicle Model </Text>
            <View style={{ width: responsiveWidth(80), borderWidth: 1, borderRadius: 20 }}>
              <Picker
                note
                mode="dropdown"
                style={{ width: responsiveWidth(80), color: "#111" }}
                selectedValue={this.state.ModelValue}
                onValueChange={this.onValueChange1.bind(this)}
              >
                {this.state.VehicleModel.map((t) => {
                  return (
                    <Picker.Item label={t.label} value={t.Value} key={t.Value} />
                  )
                })}
              </Picker>
            </View>
            <Text style={[AppStyles.BlackText, { fontWeight: "bold", marginTop: responsiveWidth(3) }]}>Enter Email (For Garage Notifications) </Text>
            <FloatingLabelInput
              label="Email"
              value={this.state.Email}
              keyboardType="email-address"
              inputStyles={{ color: "#111" }}
              containerStyles={{ width: responsiveWidth(80), borderRadius: 20, borderWidth: 1, borderColor: "#111" }}
              labelStyles={{ color: "#111" }}
              onChangeText={(Email) => { this.setState({ Email: Email }) }}
            />
            <Text style={[AppStyles.BlackText, { fontWeight: "bold", marginTop: responsiveWidth(3) }]}>Enter Vehicle Registration Number</Text>
            <FloatingLabelInput
              label="Registration Number"
              value={this.state.RegNum}
              onChangeText={(RegNum) => { this.setState({ RegNum: RegNum }) }}
              inputStyles={{ color: "#111" }}
              containerStyles={{ width: responsiveWidth(80), borderRadius: 20, borderWidth: 1, borderColor: "#111" }}
              labelStyles={{ color: "#111" }}
            />
          </View>
          <TouchableOpacity style={{ flexDirection: "row", marginTop: responsiveWidth(6), alignItems: 'center', }} onPress={() => { this.setState({ Checked: !this.state.Checked }) }}>
            <CheckBox style={{ marginRight: responsiveWidth(4) }} color="#154ef9" checked={this.state.Checked} onPress={() => { this.setState({ Checked: !this.state.Checked }) }} />
            <Text style={{ width: responsiveWidth(85) }}>The information I am submitting is complete and accurate. I am aware that providing false information could lead to rejection or termination of my Requested Services.</Text>
          </TouchableOpacity>

          {this.state.Checked
            ? (
              <Button style={[AppStyles.BlueButton, { marginTop: responsiveWidth(8), alignSelf: "center" }]}
                onPress={() => { this._handleSubmit() }}>
                <Text>Let's Go</Text>
              </Button>
            )
            : (
              <Button style={{
                backgroundColor: "grey",
                paddingHorizontal: responsiveWidth(8),
                paddingVertical: responsiveWidth(2),
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: responsiveWidth(8),
                alignSelf: "center"
              }}
                disabled>
                <Text>Let's Go</Text>
              </Button>
            )}

          <Text style={{ fontWeight: "bold", textAlign: "center", color: "#f11", marginTop: responsiveWidth(4) }}>{this.state.ErrorMessage}</Text>
        </Content>
      </Container>
    );
  }
}