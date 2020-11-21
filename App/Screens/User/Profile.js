import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { View, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import AppStyles from '../../Components/AppStyles';
import ImagePicker from 'react-native-image-crop-picker';
import { responsiveFontSize, responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import ViewBill from '../../Components/CustomModals/User/ViewBill';

let ServicesHistory = require('../../Firebase_Config/Temp_Data/ServiceHistory.json')

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            VisibleModal: false,
            VisibleServicesModal: false,
            UserName: "Harpreet Singh",
            AvatarSource: "https://lh3.googleusercontent.com/CtepWbVHMq-TXWLcoeT48cXD-p4vCZi6RjhIklkz4czrtZUlqT5mxB2CGei69x_i1sPBLxmiXpnW4ex6cN_SYhDa1gKVwjASJcql5Lu4xDyVAmOdu0XVAvRBEkxwSrLJCzcXafrvPW4MkxuM6LDr5P8rQeFxp2dcEN3G06sNp8Ox84sXPNWQazgoPRKvGcw7EjqJOi8g2Pj7WsVduShL-hoRIlXVkgQph1WjtYUbfbPQh5QYSQqnpliOIhcxEVgAh8hLGVea7cUIKamz3AOYBaE_n93OH_lG3IeN6qu05PYqPA6WhR6Nb6k7E4TFAqNCK3ZlHF_bTTk90T35XuJRQmutaDVV36BabBz3R4TT6R3mwyRtrBx6xii7O0ju2LUXKch7wBT9oF-NWjZQJiRUjXEfdst6KwIztw34EGpIa7VBNQLb80EhdNWeso3zc13WdhrAfApeUftp7CG7cjsX6c-j9vi6u8ODW4Ahb7gyTPgryro95ZXRGNG759pF6NAPCVDd6mgkfXGyHpOetM3kq-dkjjiIg1UTG3o3ikQWh0e9qaH0E9h_-HKXZPsm34tTBDTzG5XcLHUBLbxykYS-HIXhU-NXSXPPr74Y6gOnssY8gaO7AVnGkxB7ofsGnonB705FbWYs6O6JG4S2r53-pOCEPx1IM4dxYpcfQN5MP_sZl4AW00_ash5b8F6D=w717-h955-no?authuser=0",
            UserMobile: "9501205790",
            SelectedServices:[],
            ServicesHistory: ServicesHistory
        }
    }
    _SelectImage = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            this.setState({ AvatarSource: image.path, VisibleModal: false })
        });
    }
    _openCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            this.setState({ AvatarSource: image.path, VisibleModal: false })
        });
    }

    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: "#154ef9" }} androidStatusBarColor="#154ef9">
                    <Left>
                        <Button transparent onPress={()=>{this.props.navigation.openDrawer()}}>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Profile</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder>

                    {/*               MODAL : IMAGEPICKER             */}

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

                    {/*              MODAL : VIEWBILL                 */}
                    
                    {this.state.VisibleServicesModal && <ViewBill SelectedServices={this.state.SelectedServices} onExit={(val)=>{this.setState({VisibleServicesModal:val})}}/>}


                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flex: 0.4, alignItems: 'center', justifyContent: 'center' }}>
                            <Avatar source={{ uri: this.state.AvatarSource }} size="xlarge" rounded onPress={() => { this.setState({ VisibleModal: true }) }} />
                        </View>
                        <View style={{ flex: 0.6, justifyContent: 'center', }}>
                            <Text style={[AppStyles.BlueBoldText, { fontSize: responsiveFontSize(2.5) }]}>{this.state.UserName}</Text>
                            <Text style={{ color: "#555", fontWeight: "bold" }}>+91 {this.state.UserMobile}</Text>
                        </View>
                    </View>
                    <Text style={[AppStyles.BlueBoldText, { fontSize: responsiveFontSize(3), marginTop: 20 }]}>
                        History
                    </Text>
                    {this.state.ServicesHistory.map((t, key) => {
                        return (
                            <View key={key} style={{ backgroundColor: "#f3f3f3", marginVertical: responsiveWidth(2), padding: responsiveWidth(2), borderRadius: 20, flexDirection: 'row' }}>
                                <View style={{ flex: 0.7 }}>
                                    <Text style={{ fontSize: responsiveFontSize(1.6), fontWeight: "bold" }}>User: {t.UserDetails[0].UserName}</Text>
                                    <Text style={{ fontSize: responsiveFontSize(1.6) }}>{t.UserDetails[0].Email}</Text>
                                    <Text style={{ fontSize: responsiveFontSize(1.6) }}>{t.UserDetails[0].Vehicle}, {t.UserDetails[0].RegNum}</Text>
                                    <Text style={{ fontSize: responsiveFontSize(1.6), fontWeight: "bold", marginTop: responsiveWidth(2) }}>Garage : {t.GarageDetails[0].GarageName}</Text>
                                    <Text style={{ fontSize: responsiveFontSize(1.6) }}>{t.GarageDetails[0].GarageAddress}</Text>
                                </View>
                                <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center', }}>
                                    <TouchableOpacity onPress={()=>{this.setState({SelectedServices:t.SelectedServices,VisibleServicesModal:true})}}>
                                        <Text style={AppStyles.BlueBoldText}>View Bill</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })}
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