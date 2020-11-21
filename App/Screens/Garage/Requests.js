//////////////////////////////////////////////////           GARAGE REQUESTS 

import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { Container, Header, Content, Icon, Left, Right, Title, Button, Body } from 'native-base';
import { responsiveWidth, responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import AppStyles from '../../Components/AppStyles';
import SendBill from '../../Components/CustomModals/Garage/SendBill';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
let AllRequests = []
class Requests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            VisibleSendBillModal: false,
            RequestedServices: [],
            GarageID: "uoTzjznie5lqjFYbOrsO",
            RequestID: "",
            UserID: "",
            isLoading: true
        };
    }

    async componentDidMount() {
        let value = await AsyncStorage.getItem('@FissoGarageId')
        this.setState({ GarageID: value })
        await firestore()
            .collection('FissoGarage')
            .doc(this.state.GarageID)
            .get().then((data) => {
                AllRequests = data._data.Requests
                this.setState({ isLoading: false })
                //console.log(AllRequests[1].RequestId)
            })
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
                        let Requests = AllRequests
                        let Pos = Requests.indexOf(t)
                        Requests.splice(Pos, 1)
                        await firestore().collection('FissoGarage').doc(this.state.GarageID).update({
                            Requests: Requests
                        })
                        this.componentDidMount()
                    }
                }
            ],
            { cancelable: false }
        );
    }
    async _handleSubmmit(t) {
        await this.setState({ UserID: t.UserId, RequestID: t.RequestId, RequestedServices: t.ServicesDetails, VisibleSendBillModal: true })
        //console.log(" ID : " + this.state.UserID);
    }
    render() {
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
                        <Title>Requests</Title>
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
                        : (<View>
                            {AllRequests.length == 0
                                ? (
                                    <Text style={{ color: "#444", marginTop: responsiveHeight(50), fontWeight: "bold" }}>No Requests.</Text>
                                )
                                : (
                                    <ScrollView>
                                        {AllRequests.map((t, key) => {
                                            return (
                                                <View key={key}
                                                    style={{
                                                        backgroundColor: "rgba(1,1,1,0.11)",
                                                        padding: responsiveWidth(2),
                                                        width: responsiveWidth(100),
                                                        borderRadius: 20,
                                                        marginVertical: responsiveWidth(2)
                                                    }}>
                                                    <View style={{ flexDirection: "row" }}>
                                                        <View style={{ flex: 0.22 }}>
                                                            {t.VehicleType == "Two"
                                                                ? (<Icon
                                                                    name="motorbike"
                                                                    type="MaterialCommunityIcons"
                                                                    style={{
                                                                        fontSize: responsiveFontSize(10),
                                                                        color: "#154ef9",
                                                                        backgroundColor: "rgba(1,1,1,0.11)",
                                                                        borderRadius: 20
                                                                    }} />)
                                                                : (<Icon
                                                                    name="car-alt"
                                                                    type="FontAwesome5"
                                                                    style={{
                                                                        color: "#154ef9",
                                                                        fontSize: responsiveFontSize(8.5),
                                                                        backgroundColor: "rgba(1,1,1,0.11)",
                                                                        borderRadius: 20,
                                                                        paddingHorizontal: responsiveWidth(2)
                                                                    }} />)
                                                            }
                                                        </View>
                                                        <View style={{ flex: 0.78, paddingLeft: responsiveWidth(2) }}>
                                                            <Text style={{ fontSize: responsiveFontSize(2), color: "#555", fontWeight: "bold" }}>{t.VehicleName} ({t.RegNum})</Text>
                                                            <Text style={{ fontSize: responsiveFontSize(1.4), fontWeight: "bold" }}>User Name : {t.UserName}</Text>
                                                            <Text style={{ fontSize: responsiveFontSize(1.4), fontWeight: "bold" }}>Contact : +91 {t.UserMobile}</Text>
                                                        </View>
                                                    </View>

                                                    {this.state.VisibleSendBillModal && <SendBill
                                                        UserID={this.state.UserID}
                                                        GarageID={this.state.GarageID}
                                                        RequestID={this.state.RequestID}
                                                        CancelRequest={() => { this.cancelRequest() }}
                                                        RequestedServices={this.state.RequestedServices}
                                                        onExit={(val, data) => {
                                                            AllRequests = data
                                                            this.setState({ VisibleSendBillModal: val })
                                                            this.componentDidMount()
                                                        }
                                                        }
                                                    />}


                                                    <View style={{ flexDirection: "row" }}>
                                                        <TouchableOpacity style={{
                                                            flex: 0.5,
                                                            paddingVertical: responsiveWidth(2),
                                                            marginHorizontal: responsiveWidth(0.5),
                                                            backgroundColor: "#154ef9",
                                                            borderTopLeftRadius: 20,
                                                            borderBottomLeftRadius: 20,
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            marginTop: responsiveWidth(2)
                                                        }} onPress={() => { this.cancelRequest(t) }}>
                                                            <Text style={AppStyles.WhiteBoldText}>Cancel Request</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            style={{
                                                                flex: 0.5,
                                                                paddingVertical: responsiveWidth(2),
                                                                marginHorizontal: responsiveWidth(0.5),
                                                                backgroundColor: "#154ef9",
                                                                borderTopRightRadius: 20,
                                                                borderBottomRightRadius: 20,
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                marginTop: responsiveWidth(2)
                                                            }}
                                                            onPress={() => { this._handleSubmmit(t) }}>
                                                            <Text style={AppStyles.WhiteBoldText}>Send Estimate Bill</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            )
                                        })}
                                    </ScrollView>
                                )
                            }
                        </View>)
                    }
                </View>
            </Container>
        );
    }
}

export default Requests;
