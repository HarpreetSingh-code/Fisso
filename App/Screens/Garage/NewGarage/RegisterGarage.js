import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon } from 'native-base';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import { Avatar } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import FloatingLabelInput from 'react-native-floating-label-input';
import { View, Text, StatusBar, Modal, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import AppStyles from '../../../Components/AppStyles'
export default class GarageDetails1 extends Component {
    state = {
        VisibleModal: false,
        AvatarSource: "https://www.seekpng.com/png/full/901-9010044_easy-maintenance-search-circle-icon.png",
        OwnerName: "",
        OwnerMobile: "__________ GARAGE OWNER MOBILE NUMBER ________________",
        GarageName: "",
        GarageEmail: "",
        GarageAddress: "",
        ErrorMessage: ""
    }

    _SelectImage = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            // console.log(image)
            this.setState({ AvatarSource: image.path, VisibleModal: false })
        });
    }
    _openCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            // console.log(image)
            this.setState({ AvatarSource: image.path, VisibleModal: false })
        });
    }
    _handleSubmit = () => {
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        //alert(this.state.UserName + "   " + this.state.AvatarSource)
        if (this.state.AvatarSource == "https://cdn2.iconfinder.com/data/icons/leto-most-searched-mix-5/64/__image_plus_add-512.png") {
            this.setState({ ErrorMessage: "Please Select an Image of your Garage" })
        }
        else {
            if (this.state.OwnerName != "" && this.state.OwnerMobile != "" && this.state.GarageName != "" && this.state.GarageEmail != "" && this.state.GarageAddress != "") {
                if (this.state.GarageEmail.match(mailformat)) {
                    this.props.navigation.navigate("Page2",{
                        AvatarSource:this.state.AvatarSource,
                        OwnerName:this.state.OwnerName,
                        OwnerMobile:this.state.OwnerMobile,
                        GarageName:this.state.GarageName,
                        GarageEmail:this.state.GarageEmail,
                        GarageAddress:this.state.GarageAddress
                    })
                   //alert("Sucess")
                }
                else {
                    this.setState({ ErrorMessage: "Wrong Email" })
                }
            }
            else {
                this.setState({ ErrorMessage: "Please fill all the Fields" })
            }
        }
        setTimeout(()=>{this.setState({ErrorMessage:""})},4000)
    }

    render() {
        return (
            <Container>
                <Header androidStatusBarColor="#154ef9" style={{ backgroundColor: "#154ef9" }}>
                    <Left>
                        <Button transparent>
                            <Icon name='chevron-back' type="Ionicons" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Registration</Title>
                    </Body>
                    <Right />
                </Header>
                <Content contentContainerStyle={{ backgroundColor: "#154ef9", width: responsiveWidth(100), height: responsiveHeight(100) }}>
                    <View style={{ width: responsiveWidth(100), height: responsiveHeight(60), alignItems: 'center' }}>
                        <View style={{ width: responsiveWidth(100) }}>
                            <Text style={[AppStyles.WhiteHeaderText, { fontSize: responsiveFontSize(5), fontWeight: "bold", textAlign: "left", marginBottom: responsiveWidth(5) }]}> Garage Details</Text>
                        </View>

                        <TouchableOpacity 
                        disabled
                        //onPress={() => this.setState({ VisibleModal: true })} 
                        >
                            <Image source={{ uri: this.state.AvatarSource }} style={{ width: responsiveWidth(40), height: responsiveHeight(20), }} />
                        </TouchableOpacity>

                        <FloatingLabelInput
                            label="Owner Name"
                            value={this.state.OwnerName}
                            onChangeText={(OwnerName) => { this.setState({ OwnerName: OwnerName }) }}
                            labelStyles={{ color: "#fff" }}
                            inputStyles={{ color: "#fff" }}
                            containerStyles={{ width: responsiveWidth(80), marginTop: responsiveWidth(5), borderColor: "#fff" }}
                        />
                        <FloatingLabelInput
                            label="Garage Name"
                            value={this.state.GarageName}
                            onChangeText={(GarageName) => { this.setState({ GarageName: GarageName }) }}
                            labelStyles={{ color: "#fff" }}
                            inputStyles={{ color: "#fff" }}
                            containerStyles={{ width: responsiveWidth(80), marginTop: responsiveWidth(5), borderColor: "#fff" }}
                        />
                        <FloatingLabelInput
                            label="Garage Email"
                            value={this.state.GarageEmail}
                            keyboardType="email-address"
                            onChangeText={(GarageEmail) => { this.setState({ GarageEmail: GarageEmail }) }}
                            labelStyles={{ color: "#fff" }}
                            inputStyles={{ color: "#fff" }}
                            containerStyles={{ width: responsiveWidth(80), marginTop: responsiveWidth(5), borderColor: "#fff" }}
                        />
                        <FloatingLabelInput
                            label="Garage Address"
                            value={this.state.GarageAddress}
                            keyboardType="default"
                            onChangeText={(GarageAddress) => { this.setState({ GarageAddress: GarageAddress }) }}
                            labelStyles={{ color: "#fff" }}
                            inputStyles={{ color: "#fff" }}
                            containerStyles={{ width: responsiveWidth(80), marginTop: responsiveWidth(5), borderColor: "#fff" }}
                        />
                        <Text style={{textAlign:"center",color:"#f11",fontWeight:"bold",marginTop:responsiveWidth(2)}}>{this.state.ErrorMessage}</Text>
                        <TouchableOpacity style={[AppStyles.WhiteButton, { marginTop: responsiveWidth(5), alignSelf: 'flex-end', marginRight: 20 }]} onPress={() => { this._handleSubmit() }}>
                            <Text style={AppStyles.BlueBoldText}>Next</Text>
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
                </Content>
            </Container>
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