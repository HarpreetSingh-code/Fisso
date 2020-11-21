import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Container, Header, Left, Icon, Right, Button, Body, Title, Content } from 'native-base';
import AppStyles from '../../../Components/AppStyles';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';

export default class RegisterServices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            VehicleType: this.props.navigation.state.params.VehicleType,
            Screen: "Two",
            TwoText: "",
            FourText: "",
            TwoServices: [],
            FourServices: [

            ]
        };
    }
    RenderHead = () => {
        if (this.state.VehicleType == "Two") {
            return (
                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity style={{ padding: responsiveWidth(3), borderBottomWidth: 2, borderColor: "#154ef9" }} >
                        <Text style={{ fontWeight: "bold" }}>Two Wheelers</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        else if (this.state.VehicleType == "Four") {
            return (
                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity style={{ padding: responsiveWidth(3), borderBottomWidth: 2, borderColor: "#154ef9" }} onPress={() => { this.setState({ Screen: "Four" }) }}>
                        <Text style={{ fontWeight: "bold" }}>Four Wheelers</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        else {
            return (
                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity style={{ padding: responsiveWidth(3), borderBottomWidth: this.state.Screen == "Two" ? 2 : 0, borderColor: "#154ef9" }} onPress={() => { this.setState({ Screen: "Two" }) }}>
                        <Text style={{ fontWeight: "bold" }}>Two Wheelers</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ padding: responsiveWidth(3), borderBottomWidth: this.state.Screen == "Four" ? 2 : 0, borderColor: "#154ef9" }} onPress={() => { this.setState({ Screen: "Four" }) }}>
                        <Text style={{ fontWeight: "bold" }}>Four Wheelers</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }
    addToTwo() {
        let TextToEnter = this.state.TwoText
        let TwoServices = this.state.TwoServices

        if (TextToEnter != "") {
            TwoServices.push(TextToEnter)
            this.setState({ TwoServices: TwoServices, TwoText: "" })
        }
        else {
            alert("Type Service Name and Press ENTER")
        }
    }
    addToFour() {
        let TextToEnter = this.state.FourText
        let FourServices = this.state.FourServices
        if (TextToEnter != "") {
            FourServices.push(TextToEnter)
            this.setState({ FourServices: FourServices, FourText: "" })
        }
        else {
            alert("Type Service Name and Press ENTER")
        }
    }
    deleteFromTwo(item) {
        let TwoServices = this.state.TwoServices
        let Pos = TwoServices.indexOf(item)
        TwoServices.splice(Pos, 1)
        this.setState({ TwoServices: TwoServices })
    }
    deleteFromFour(item) {
        let FourServices = this.state.FourServices
        let Pos = FourServices.indexOf(item)
        FourServices.splice(Pos, 1)
        this.setState({ FourServices: FourServices })
    }
    RenderBody = () => {
        if (this.state.VehicleType == "Two") {
            return (
                <View>
                    {this.state.TwoServices.map((t, key) => {
                        return (
                            <View style={{ flexDirection: "row", padding: responsiveWidth(2), backgroundColor: "#f2f2f2", marginTop: responsiveWidth(1) }} key={key}>
                                <View style={{ flex: 0.9, justifyContent: 'center', }}>
                                    <Text>{t}</Text>
                                </View>
                                <View style={{ flex: 0.1, alignItems: 'flex-end', }}>
                                    <TouchableOpacity onPress={() => { this.deleteFromTwo(t) }}>
                                        <Icon name="ios-close-circle" type="Ionicons" style={{ color: "#f11" }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })}
                    <View style={{ flexDirection: "row", paddingHorizontal: responsiveWidth(2), marginVertical: responsiveWidth(2), marginBottom: responsiveWidth(3) }}>
                        <View style={{ flex: 0.75 }}>
                            <TextInput
                                placeholder="Enter Service Name"
                                value={this.state.TwoText}
                                blurOnSubmit={false}
                                style={{ borderBottomWidth: 1, height: responsiveHeight(4.5), fontSize: responsiveFontSize(1.2) }}
                                onChangeText={(TwoText) => { this.setState({ TwoText: TwoText }) }}
                                onSubmitEditing={() => { this.addToTwo() }} />
                        </View>
                        <View style={{ flex: 0.25 }}>
                            <TouchableOpacity
                                onPress={() => { this.addToTwo() }}
                                style={{ backgroundColor: "#154ef9", alignItems: 'center', justifyContent: 'center', borderRadius: 20, padding: responsiveWidth(2) }}>
                                <Text style={{ color: "#fff", fontWeight: "bold" }}>+ Add</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        }
        else if (this.state.VehicleType == "Four") {
            return (
                <View>
                    {this.state.FourServices.map((t, key) => {
                        return (
                            <View style={{ flexDirection: "row", padding: responsiveWidth(2), backgroundColor: "#f2f2f2", marginTop: responsiveWidth(1) }} key={key}>
                                <View style={{ flex: 0.9, justifyContent: 'center', }}>
                                    <Text>{t}</Text>
                                </View>
                                <View style={{ flex: 0.1, alignItems: 'flex-end', }}>
                                    <TouchableOpacity onPress={() => { this.deleteFromFour(t) }}>
                                        <Icon name="ios-close-circle" type="Ionicons" style={{ color: "#f11" }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })}
                    <View style={{ flexDirection: "row", paddingHorizontal: responsiveWidth(2), marginVertical: responsiveWidth(2), marginBottom: responsiveWidth(3) }}>
                        <View style={{ flex: 0.75 }}>
                            <TextInput
                                placeholder="Enter Service Name"
                                value={this.state.FourText}
                                blurOnSubmit={false}
                                style={{ borderBottomWidth: 1, height: responsiveHeight(4.5), fontSize: responsiveFontSize(1.2) }}
                                onSubmitEditing={() => { this.addToFour() }}
                                onChangeText={(FourText) => { this.setState({ FourText: FourText }) }} />
                        </View>
                        <View style={{ flex: 0.25 }}>
                            <TouchableOpacity
                                onPress={() => { this.addToFour() }}
                                style={{ backgroundColor: "#154ef9", alignItems: 'center', justifyContent: 'center', borderRadius: 20, padding: responsiveWidth(2) }}>
                                <Text style={{ color: "#fff", fontWeight: "bold" }}>+ Add</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        }
    }
    _handleSubmit() {
        var GarageDetails = this.props.navigation.state.params.GarageDetails
        var SelectedTwo = this.props.navigation.state.params.SelectedTwo
        var SelectedFour = this.props.navigation.state.params.SelectedFour
        var TwoServices = this.state.TwoServices
        var FourServices = this.state.FourServices


        if (this.state.VehicleType == "Two" && this.state.TwoServices.length > 0) {
            // Push to Two_WheelerGarages
            const doc = firestore().collection("FissoGarage").doc()
            let GarageID = doc.id
            AsyncStorage.setItem('@FissoGarageId', GarageID)
            alert(GarageID)
            doc.set(
                {
                    GarageId: GarageID,
                    VehicleType: "Two",
                    OwnerName: GarageDetails.OwnerName,
                    OwnerMobile: GarageDetails.OwnerMobile,
                    GarageName: GarageDetails.GarageName,
                    GarageEmail: GarageDetails.GarageEmail,
                    GarageAddress: GarageDetails.GarageAddress,
                    GarageOpen: GarageDetails.GarageOpen,
                    GarageClose: GarageDetails.GarageClose,
                    OpenDays: GarageDetails.OpenDays,
                    Vehicles: SelectedTwo,
                    Services: TwoServices,
                    Jobs: [],
                    Requests: [],
                    Appointments: []
                }
            )

        }
        else if (this.state.VehicleType == "Four" && this.state.FourServices.length > 0) {
            // Push to Four_WheelerGarages
            const doc = firestore().collection("FissoGarage").doc()
            let GarageID = doc.id
            AsyncStorage.setItem('@FissoGarageId', GarageID)
            alert(GarageID)
            doc.set(
                {
                    GarageId: GarageID,
                    VehicleType: "Four",
                    OwnerName: GarageDetails.OwnerName,
                    OwnerMobile: GarageDetails.OwnerMobile,
                    GarageName: GarageDetails.GarageName,
                    GarageEmail: GarageDetails.GarageEmail,
                    GarageAddress: GarageDetails.GarageAddress,
                    GarageOpen: GarageDetails.GarageOpen,
                    GarageClose: GarageDetails.GarageClose,
                    OpenDays: GarageDetails.OpenDays,
                    Vehicles: SelectedFour,
                    Services: FourServices,
                    Jobs: [],
                    Requests: [],
                    Appointments: []
                }
            )
        }
        else {
            alert("Please Add Atleast one Service to Continue.")
        }
       

    }
    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: "#154ef9" }} androidStatusBarColor="#154ef9">
                    <Left>
                        <Button transparent onPress={() => { this.props.navigation.goBack() }}>
                            <Icon name="arrow-back" type="Ionicons" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Vehicles Services</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => { this._handleSubmit() }}>
                            <Text style={AppStyles.WhiteBoldText}>Finish</Text>
                        </Button>
                    </Right>
                </Header>
                <View style={{ flex: 1 }}>
                    {this.RenderHead()}
                    <ScrollView>
                        {this.state.VehicleType == "Both"
                            ?
                            this.state.Screen == "Two"
                                ?
                                (
                                    <View>
                                        {this.state.TwoServices.map((t, key) => {
                                            return (
                                                <View style={{ flexDirection: "row", padding: responsiveWidth(2), backgroundColor: "#f2f2f2", marginTop: responsiveWidth(1) }} key={key}>
                                                    <View style={{ flex: 0.9, justifyContent: 'center', }}>
                                                        <Text>{t}</Text>
                                                    </View>
                                                    <View style={{ flex: 0.1, alignItems: 'flex-end', }}>
                                                        <TouchableOpacity onPress={() => { this.deleteFromTwo(t) }}>
                                                            <Icon name="ios-close-circle" type="Ionicons" style={{ color: "#f11" }} />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            )
                                        })}
                                        <View style={{ flexDirection: "row", paddingHorizontal: responsiveWidth(2), marginVertical: responsiveWidth(2), marginBottom: responsiveWidth(3) }}>
                                            <View style={{ flex: 0.75 }}>
                                                <TextInput
                                                    placeholder="Enter Service Name"
                                                    value={this.state.TwoText}
                                                    blurOnSubmit={false}
                                                    style={{ borderBottomWidth: 1, height: responsiveHeight(4.5), fontSize: responsiveFontSize(1.2) }}
                                                    onChangeText={(TwoText) => { this.setState({ TwoText: TwoText }) }}
                                                    onSubmitEditing={() => { this.addToTwo() }} />
                                            </View>
                                            <View style={{ flex: 0.25 }}>
                                                <TouchableOpacity
                                                    onPress={() => { this.addToTwo() }}
                                                    style={{ backgroundColor: "#154ef9", alignItems: 'center', justifyContent: 'center', borderRadius: 20, padding: responsiveWidth(2) }}>
                                                    <Text style={{ color: "#fff", fontWeight: "bold" }}>+ Add</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                )
                                :
                                (
                                    <View>
                                        {this.state.FourServices.map((t, key) => {
                                            return (
                                                <View style={{ flexDirection: "row", padding: responsiveWidth(2), backgroundColor: "#f2f2f2", marginTop: responsiveWidth(1) }} key={key}>
                                                    <View style={{ flex: 0.9, justifyContent: 'center', }}>
                                                        <Text>{t}</Text>
                                                    </View>
                                                    <View style={{ flex: 0.1, alignItems: 'flex-end', }}>
                                                        <TouchableOpacity onPress={() => { this.deleteFromFour(t) }}>
                                                            <Icon name="ios-close-circle" type="Ionicons" style={{ color: "#f11" }} />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            )
                                        })}
                                        <View style={{ flexDirection: "row", paddingHorizontal: responsiveWidth(2), marginVertical: responsiveWidth(2), marginBottom: responsiveWidth(3) }}>
                                            <View style={{ flex: 0.75 }}>
                                                <TextInput
                                                    placeholder="Enter Service Name"
                                                    value={this.state.FourText}
                                                    blurOnSubmit={false}
                                                    style={{ borderBottomWidth: 1, height: responsiveHeight(4.5), fontSize: responsiveFontSize(1.2) }}
                                                    onSubmitEditing={() => { this.addToFour() }}
                                                    onChangeText={(FourText) => { this.setState({ FourText: FourText }) }} />
                                            </View>
                                            <View style={{ flex: 0.25 }}>
                                                <TouchableOpacity
                                                    onPress={() => { this.addToFour() }}
                                                    style={{ backgroundColor: "#154ef9", alignItems: 'center', justifyContent: 'center', borderRadius: 20, padding: responsiveWidth(2) }}>
                                                    <Text style={{ color: "#fff", fontWeight: "bold" }}>+ Add</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                )
                            :
                            this.RenderBody()}
                    </ScrollView>
                </View>
            </Container>
        );
    }
}


