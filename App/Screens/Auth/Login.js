import React, { Component } from 'react';
import { View, Text, Image, StatusBar, TextInput, TouchableOpacity, Modal, AppState } from 'react-native';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import AppStyles from '../../Components/AppStyles';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleModal: false,
            UserMobile: "",
            ErrorMessage: "",
            Generated_OTP: "",
            one: "",
            two: "",
            three: "",
            four: ""
            //NewUser:True                //To Send value to next page weather user is new or old
        };
    }


    _handleSubmit = () => {
        let Mobile_RegEx = /^[0]?[6789]\d{9}$/;
        if (this.state.UserMobile.match(Mobile_RegEx)) {
            var OTP = Math.floor(1000 + Math.random() * 9000)
            console.log(OTP)
            this.setState({ visibleModal: true, Generated_OTP: OTP })
        }
        else {
            this.setState({ ErrorMessage: "Invalid Mobile" })
        }

        setTimeout(() => { this.setState({ ErrorMessage: '' }) }, 4000)
    }

    _handleLogin = () => {
        let Entered_OTP = this.state.one + this.state.two + this.state.three + this.state.four
        let Generated_OTP = this.state.Generated_OTP
        if (Entered_OTP == Generated_OTP) {
            alert("Sucess")
            // if (this.state.NewUser==true){
            //     this.props.navigation.navigate("LoginType")
            // }
            // else{
            //     this.props.navigation.navigate("User/Garage Navigator")
            // }
        }
        else {
            this.setState({ ErrorMessage: "Invalid OTP" })
        }

        setTimeout(() => { this.setState({ ErrorMessage: '' }) }, 4000)
    }

    render() {
        return (
            <View style={[AppStyles.container, { backgroundColor: "#154ef9" }]}>
                <StatusBar barStyle="light-content" backgroundColor="#154ef9" />
                <View style={{ padding: responsiveWidth(2), width: responsiveWidth(100) }}>
                    <Image source={require("../../Components/Images/Logo/logoimg.png")} style={{ width: responsiveWidth(25), height: responsiveHeight(15) }} resizeMode="contain" />
                    <Text style={AppStyles.WhiteHeaderText}>Welcome</Text>
                    <Text style={AppStyles.WhiteBoldText}>SignIn to continue with your mobile number</Text>
                    <TextInput style={AppStyles.Input}
                        placeholder="Enter Mobile Number"
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        keyboardType="number-pad"
                        maxLength={10}
                        onChangeText={(UserMobile) => { this.setState({ UserMobile: UserMobile }) }} />
                    <Text style={[AppStyles.WhiteNormalText, { marginTop: responsiveWidth(3) }]}>A 4 digit OTP will be sent via SMS to verify your Mobile Number</Text>
                </View>
                <Text style={{ color: "#f11", fontSize: responsiveFontSize(1.6) }}>{this.state.ErrorMessage}</Text>
                <TouchableOpacity style={[AppStyles.WhiteButton, { marginTop: responsiveWidth(6) }]} onPress={() => { this._handleSubmit() }}>
                    <Text style={AppStyles.BlueBoldText}>Submit</Text>
                </TouchableOpacity>

                {/* /////////////////////////////////               MODAL HERE          ////////////////////////////////////////////////////////////// */}

                <Modal visible={this.state.visibleModal} transparent animationType="fade" onRequestClose={() => { this.setState({ visibleModal: false }) }}>
                    <View style={{ flex: 1, backgroundColor: "rgba(1,1,1,0.7)", alignItems: "center", justifyContent: 'center', }}>
                        <View style={{ backgroundColor: "#fff", width: responsiveWidth(80), height: responsiveHeight(30), borderRadius: 20, padding: responsiveWidth(4) }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                                <View style={{ flex: 0.8 }}>
                                    <Text style={[AppStyles.BlueBoldText, { fontSize: responsiveFontSize(3) }]}>Enter OTP</Text>
                                </View>
                                <View style={{ flex: 0.2, alignItems: 'flex-end' }}>
                                    <TouchableOpacity onPress={() => { }}>

                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Text>Type the OTP sent to <Text style={AppStyles.BlueNormalText}>+91 {this.state.UserMobile}</Text></Text>
                            <View style={{ marginVertical: responsiveWidth(7), flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={AppStyles.OtpBox}>
                                    <TextInput style={AppStyles.OtpInput}
                                        keyboardType="number-pad"
                                        maxLength={1}
                                        onChangeText={(one) => { this.setState({ one: one }), this.refs.two.focus() }} />
                                </View>

                                <View style={AppStyles.OtpBox}>
                                    <TextInput style={AppStyles.OtpInput}
                                        keyboardType="number-pad"
                                        maxLength={1}
                                        onChangeText={(two) => { this.setState({ two: two }), this.refs.three.focus() }}
                                        ref={'two'} />
                                </View>

                                <View style={AppStyles.OtpBox}>
                                    <TextInput style={AppStyles.OtpInput}
                                        keyboardType="number-pad"
                                        maxLength={1}
                                        onChangeText={(three) => { this.setState({ three: three }), this.refs.four.focus() }}
                                        ref={'three'} />
                                </View>

                                <View style={AppStyles.OtpBox}>
                                    <TextInput style={AppStyles.OtpInput}
                                        keyboardType="number-pad"
                                        maxLength={1}
                                        onChangeText={(four) => { this.setState({ four: four }) }}
                                        ref={'four'} />
                                </View>
                            </View>

                            <TouchableOpacity style={AppStyles.BlueButton} onPress={() => { this._handleLogin() }}>
                                <Text style={AppStyles.WhiteBoldText}>Login</Text>
                            </TouchableOpacity>
                            <Text style={{ color: "#f11", fontSize: responsiveFontSize(1.6), textAlign: "center" }}>{this.state.ErrorMessage}</Text>
                        </View>
                    </View>
                </Modal>

            </View>
        );
    }
}

export default Login;
