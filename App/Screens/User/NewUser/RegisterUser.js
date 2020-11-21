import React, { Component } from 'react';
import { View, Text, StatusBar, Modal, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AppStyles from '../../../Components/AppStyles';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import { Avatar } from 'react-native-elements'
import { Button } from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import FloatingLabelInput from 'react-native-floating-label-input';
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-community/async-storage';

export default class RegisterUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      VisibleModal: false,
      UserName: "",
      AvatarSource: "https://cdn2.iconfinder.com/data/icons/audio-16/96/user_avatar_profile_login_button_account_member-512.png"
    };
  }

  _SelectImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image)
      this.setState({ AvatarSource: image.path, VisibleModal: false })
    });
  }
  _openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image)
      this.setState({ AvatarSource: image.path, VisibleModal: false })
    });
  }
  async _handleSubmit() {
    if (this.state.UserName.length > 0) {
      const doc = await firestore().collection("FissoUser").doc()
      let DocID = doc.id
      doc.set(
        {
          UserId: DocID,
          UserName: this.state.UserName,
          UserAvatar: "None",
          UserMobile: "Registered MOBILE Number",
          UserVehicles: [],
          UserRequests: [],
          UserAppointments: []
        }
      ).then(async (t) => {
        console.log("User Added")
        await AsyncStorage.setItem('@FissoUserId', DocID)
        alert("Welcome " +this.state.UserName)
      })
    }
    else{
      alert("Please enter your full Name")
    }

  }

  render() {
    return (
      <View style={[AppStyles.container, { backgroundColor: "#154ef9" }]}>
        <StatusBar backgroundColor="#154ef9" />
        <View style={{ width: responsiveWidth(100), height: responsiveHeight(60), alignItems: 'center' }}>
          <View style={{ width: responsiveWidth(100) }}>
            <Text style={[AppStyles.WhiteHeaderText, { fontSize: responsiveFontSize(5), fontWeight: "bold", textAlign: "left", marginBottom: responsiveWidth(15) }]}> Personal Details</Text>
          </View>
          <TouchableOpacity
            //disabled
            onPress={() => this.setState({ VisibleModal: true })}
          >
            <Image
              source={{ uri: this.state.AvatarSource }}
              style={{ height: responsiveHeight(20), width: responsiveWidth(40) }}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <FloatingLabelInput
            label="Full Name"
            value={this.state.UserName}
            onChangeText={(UserName) => { this.setState({ UserName: UserName }) }}
            labelStyles={{ color: "#fff" }}
            inputStyles={{ color: "#fff" }}
            containerStyles={{ width: responsiveWidth(80), marginTop: responsiveWidth(5), borderColor: "#fff" }}
          />

          <TouchableOpacity
            style={[AppStyles.WhiteButton, { marginTop: responsiveWidth(10), alignSelf: 'flex-end', marginRight: 20 }]}
            onPress={() => this._handleSubmit()}>
            <Text style={AppStyles.BlueBoldText}>Finish</Text>
          </TouchableOpacity>
        </View>

        {/* ////////////////////////////////////////   IMAGEPICKER MODAL     ///////////////////////////////////////////////////////////// */}

        <Modal transparent visible={this.state.VisibleModal} animationType="slide" onRequestClose={() => { this.setState({ VisibleModal: false }) }}>
          <View style={{ flex: 1, backgroundColor: "rgba(1,1,1,0.6)", alignItems: 'center', justifyContent: "flex-end" }}>
            <View style={{ height: responsiveHeight(30), width: responsiveWidth(100), backgroundColor: "#fff", borderTopLeftRadius: 20, borderTopRightRadius: 20, marginTop: responsiveWidth(2.5) }}>
              <View style={{ width: responsiveWidth(100), alignItems: 'center', }}>
                <Text style={[AppStyles.BlueBoldText, { fontSize: responsiveFontSize(3) }]}>Upload Photo</Text>
                <Text style={[AppStyles.WhiteBoldText, { color: "#888" }]}>Choose your profile Picture</Text>
              </View>
              <Button full style={Styles.CustomButton} onPress={() => { this._openCamera() }}>
                <Text style={AppStyles.WhiteBoldText}>Take Photo</Text>
              </Button>
              <Button full style={Styles.CustomButton} onPress={() => { this._SelectImage() }}>
                <Text style={AppStyles.WhiteBoldText}>Choose from Gallery</Text>
              </Button>
              <Button full style={Styles.CustomButton} onPress={() => { this.setState({ VisibleModal: false }) }}>
                <Text style={AppStyles.WhiteBoldText}>Cancel</Text>
              </Button>
            </View>
          </View>
        </Modal>

      </View>
    );
  }
}
const Styles = StyleSheet.create({
  CustomButton: {
    marginTop: responsiveWidth(2.5),
    marginHorizontal: responsiveWidth(2),
    borderRadius: 20,
    backgroundColor: "#154ef9"
  }
})

