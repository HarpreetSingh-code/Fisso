import React, { Component } from 'react';
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text } from 'native-base';
import AppStyles from '../../Components/AppStyles';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import { View, TouchableOpacity, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore'
let RequestID = ""
let TEMPARR = []
export default class ConfirmDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            UserDetails: this.props.navigation.state.params.UserDetails,
            GarageDetails: this.props.navigation.state.params.GarageDetails,
            SelectedServices: this.props.navigation.state.params.SelectedServices,
            GarageId: "",
            UserId: ""
        };
    }
    async componentDidMount() {
        await this.setState({ UserId: this.state.UserDetails[0].UserId })
        //console.log("useid  : "+this.state.UserId);
        let SelectedServices = this.props.navigation.state.params.SelectedServices
        TEMPARR = []
        for (let i = 0; i < SelectedServices.length; i++) {
            let obj = {}
            obj = { ServiceName: SelectedServices[i], Price: 0 }
            TEMPARR.push(obj)
        }
        //console.log(TEMPARR);
        this.setState({ GarageId: this.state.GarageDetails[0].GarageId })
    }
    _removeService = (m) => {
        let TEMP = this.state.SelectedServices
        let pos = TEMP.indexOf(m)
        TEMP.splice(pos, 1)
        this.setState({ SelectedServices: TEMP })

    }
    _handleSubmit = async () => {
        let GarageRequests = []
        let UserRequest = []

        // Get Details from garage
        const ReqID = await firestore().collection("FissoGarage").doc()
        RequestID = ReqID.id
        await firestore()
            .collection('FissoGarage')
            .doc(this.state.GarageId)
            .get().then((data) => {
                GarageRequests = data._data.Requests
                GarageRequests.push(
                    {
                        RequestId: RequestID,
                        GarageId:this.state.GarageId,
                        UserId: this.state.UserId,
                        VehicleName: this.state.UserDetails[0].VehicleName,
                        VehicleType: this.state.UserDetails[0].VehicleType,
                        RegNum: this.state.UserDetails[0].RegNum,
                        UserName: this.state.UserDetails[0].UserName,
                        UserMobile: this.state.UserDetails[0].UserMobile,
                        ServicesDetails: TEMPARR
                    }
                )
                //console.log(GarageRequests)
            })

        await firestore().collection('FissoGarage').doc(this.state.GarageId).update({
            Requests: GarageRequests
        })



        await firestore()
            .collection('FissoUser')
            .doc(this.state.UserId)
            .get().then((data) => {
                UserRequest = data._data.UserRequests
                UserRequest.push(
                    {
                        RequestId: RequestID,
                        GarageId:this.state.GarageId,
                        UserId: this.state.UserId,
                        VehicleName: this.state.UserDetails[0].VehicleName,
                        VehicleType: this.state.UserDetails[0].VehicleType,
                        RegNum: this.state.UserDetails[0].RegNum,
                        UserMobile:"___________USER REGISTERED MOBILE NUMBER__________",
                        GarageName: this.state.GarageDetails[0].GarageName,
                        GarageAddress: this.state.GarageDetails[0].GarageAddress,
                        ServicesDetails: TEMPARR
                    }
                )
                // console.log(UserRequest)
            })
        await firestore().collection('FissoUser').doc(this.state.UserId).update({
            UserRequests: UserRequest
        })

        this.props.navigation.navigate("Dashboard")
        alert("Thank you for using Fisso Services Check your Request in 'Request tab' in the Drawer.")
    }

    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: "#154ef9" }} androidStatusBarColor="#154ef9">
                    <Left>
                        <Button transparent onPress={() => { this.props.navigation.goBack() }}>
                            <Icon name='md-chevron-back' type="Ionicons" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Confirm Details</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder>
                    <Text style={[AppStyles.BlueBoldText, { fontSize: responsiveFontSize(3) }]}>
                        User Details
                    </Text>
                    {this.state.UserDetails.map((t, key) => {
                        return (
                            <View key={key}>
                                <View style={{ flexDirection: "row", marginBottom: 10 }}>
                                    <Text>Name :    </Text>
                                    <Text style={{ backgroundColor: '#f3f3f3', borderBottomWidth: 1 }}> {t.UserName} </Text>
                                </View>

                                <View style={{ flexDirection: "row", marginBottom: 10 }}>
                                    <Text>Email :     </Text>
                                    <Text style={{ backgroundColor: '#f3f3f3', borderBottomWidth: 1 }}> {t.UserEmail} </Text>
                                </View>

                                <View style={{ flexDirection: "row", marginBottom: 10 }}>
                                    <Text>Vehicle :  </Text>
                                    <Text style={{ backgroundColor: '#f3f3f3', borderBottomWidth: 1 }}> {t.VehicleName} </Text>
                                </View>

                                <View style={{ flexDirection: "row", marginBottom: 10 }}>
                                    <Text>Reg No. : </Text>
                                    <Text style={{ backgroundColor: '#f3f3f3', borderBottomWidth: 1 }}> {t.RegNum} </Text>
                                </View>
                            </View>
                        )
                    })}

                    <Text style={[AppStyles.BlueBoldText, { fontSize: responsiveFontSize(3), marginTop: 20 }]}>
                        Garage Details
                    </Text>
                    {this.state.GarageDetails.map((p, key) => {
                        return (
                            <View key={key}>
                                <View style={{ flexDirection: "row", marginBottom: 10 }}>
                                    <Text>Name :      </Text>
                                    <Text style={{ backgroundColor: '#f3f3f3', borderBottomWidth: 1 }}> {p.GarageName} </Text>
                                </View>

                                <View style={{ flexDirection: "row", marginBottom: 10 }}>
                                    <Text>Email :       </Text>
                                    <Text style={{ backgroundColor: '#f3f3f3', borderBottomWidth: 1 }}> {p.GarageEmail} </Text>
                                </View>

                                <View style={{ flexDirection: "row", marginBottom: 10 }}>
                                    <Text>Address :  </Text>
                                    <Text style={{ backgroundColor: '#f3f3f3', borderBottomWidth: 1 }}> {p.GarageAddress} </Text>
                                </View>
                            </View>
                        )
                    })}

                    <Text style={[AppStyles.BlueBoldText, { fontSize: responsiveFontSize(3), marginTop: 20 }]}>
                        Selected Services
                    </Text>
                    {this.state.SelectedServices.map((m, key) => {
                        return (
                            <View key={key} style={{ flexDirection: "row", backgroundColor: "#f3f3f3", paddingVertical: 10 }}>
                                <View style={{ flex: 0.9 }}>
                                    <Text>{m}</Text>
                                </View>
                                <View style={{ flex: 0.1 }}>
                                    <TouchableOpacity onPress={() => { this._removeService(m) }}>
                                        <Icon name="close-circle" type="Ionicons" style={{ color: "#f11" }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })}
                    {this.state.SelectedServices.length == 0
                        ? (
                            <TouchableOpacity style={[AppStyles.BlueButton, { paddingVertical: responsiveWidth(3), marginTop: responsiveWidth(4) }]} onPress={() => { this.props.navigation.goBack() }}>
                                <Text style={AppStyles.WhiteBoldText}>Add Services</Text>
                            </TouchableOpacity>
                        )
                        : (
                            <TouchableOpacity style={[AppStyles.BlueButton, { paddingVertical: responsiveWidth(3), marginTop: responsiveWidth(4) }]} onPress={() => { this._handleSubmit() }}>
                                <Text style={AppStyles.WhiteBoldText}>Request Garage</Text>
                            </TouchableOpacity>
                        )}
                </Content>
            </Container>
        );
    }
}