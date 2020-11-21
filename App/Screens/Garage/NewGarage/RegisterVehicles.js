import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Header, Left, Icon, Right, Button, Body, Title, Content, CheckBox } from 'native-base';
import AppStyles from '../../../Components/AppStyles';
import { responsiveWidth } from 'react-native-responsive-dimensions';

const Vehicles = require('./Vehicles.json')
export default class RegisterVehicles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            VehicleType: this.props.navigation.state.params.VehicleType,
            Screen: "Two",
            TwoData: [],
            FourData: []
        };
    }

    async componentDidMount() {
        await this.setState({ TwoData: Vehicles.twoWheeler, FourData: Vehicles.fourWheeler })
    }
    _handleSubmit() {
        let GarageDetails = this.props.navigation.state.params.GarageDetails
        var SelectedTwo = []
        var SelectedFour = []
        var res1 = this.state.TwoData.map((t) => t.key)
        var res2 = this.state.TwoData.map((t) => t.checked)
        for (let i = 0; i < res2.length; i++) {
            if (res2[i] == true) {
                SelectedTwo.push(res1[i])
            }
        }
        var res3 = this.state.FourData.map((t) => t.key)
        var res4 = this.state.FourData.map((t) => t.checked)
        for (let i = 0; i < res4.length; i++) {
            if (res4[i] == true) {
                SelectedFour.push(res3[i])
            }
        }

        if (this.state.VehicleType == "Two") {
            SelectedTwo.length > 0
                ? this.props.navigation.navigate("Page4", {
                    VehicleType: this.state.VehicleType,
                    GarageDetails: GarageDetails,
                    SelectedTwo: SelectedTwo,
                    SelectedFour: []
                })
                : alert("Please select atleast one Vehicle")
        }
        else if (this.state.VehicleType == "Four") {
            SelectedFour.length>0
            ? this.props.navigation.navigate("Page4", {
                VehicleType: this.state.VehicleType,
                GarageDetails: GarageDetails,
                SelectedTwo: [],
                SelectedFour: SelectedFour
            })
            :alert("Please select atleast one Vehicle")
        }
        else {
            SelectedTwo.length>0 && SelectedFour.length>0
            ? this.props.navigation.navigate("Page4", {
                VehicleType: this.state.VehicleType,
                GarageDetails: GarageDetails,
                SelectedTwo: SelectedTwo,
                SelectedFour: SelectedFour
            })
            :alert("Select atleast one Vehicle from both to continue")
        }
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
    handleCheck1(id) {
        const data = this.state.TwoData;
        const index = data.findIndex(x => x.id === id);
        data[index].checked = !data[index].checked;
        this.setState(data);
    }
    handleCheck2(id) {
        const data = this.state.FourData;
        const index = data.findIndex(x => x.id === id);
        data[index].checked = !data[index].checked;
        this.setState(data);
    }
    RenderBody = () => {
        if (this.state.VehicleType == "Two") {
            return this.state.TwoData.map((t, key) => {
                return (
                    <TouchableOpacity key={key} style={{ flexDirection: 'row', marginTop: responsiveWidth(4) }} onPress={() => this.handleCheck1(t.id)}>
                        <View style={{ flex: 0.1 }}><CheckBox style={{ borderRadius: 5 }} color="#154ef9" checked={t.checked} onPress={() => this.handleCheck1(t.id)} /></View>
                        <View style={{ flex: 0.7 }}><Text style={{ fontWeight: "bold" }}>{t.key}</Text></View>
                    </TouchableOpacity>
                )
            })
        }
        else if (this.state.VehicleType == "Four") {
            return this.state.FourData.map((t, key) => {
                return (
                    <TouchableOpacity key={key} style={{ flexDirection: 'row', marginTop: responsiveWidth(4) }} onPress={() => this.handleCheck2(t.id)}>
                        <View style={{ flex: 0.1 }}><CheckBox style={{ borderRadius: 5 }} color="#154ef9" checked={t.checked} onPress={() => this.handleCheck2(t.id)} /></View>
                        <View style={{ flex: 0.7 }}><Text style={{ fontWeight: "bold" }}>{t.key}</Text></View>
                    </TouchableOpacity>
                )
            })
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
                        <Title>Vehicles</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => { this._handleSubmit() }}>
                            <Text style={AppStyles.WhiteBoldText}>Next</Text>
                        </Button>
                    </Right>
                </Header>
                <View style={{ flex: 1 }}>
                    {this.RenderHead()}
                    <ScrollView>
                        {this.state.VehicleType == "Both"
                            ? this.state.Screen == "Two"
                                ? (
                                    this.state.TwoData.map((t, key) => {
                                        return (
                                            <TouchableOpacity key={key} style={{ flexDirection: 'row', marginTop: responsiveWidth(4) }} onPress={() => this.handleCheck1(t.id)}>
                                                <View style={{ flex: 0.1 }}><CheckBox style={{ borderRadius: 5 }} color="#154ef9" checked={t.checked} onPress={() => this.handleCheck1(t.id)} /></View>
                                                <View style={{ flex: 0.7 }}><Text style={{ fontWeight: "bold" }}>{t.key}</Text></View>
                                            </TouchableOpacity>
                                        )
                                    })
                                )
                                : (
                                    this.state.FourData.map((t, key) => {
                                        return (
                                            <TouchableOpacity key={key} style={{ flexDirection: 'row', marginTop: responsiveWidth(4) }} onPress={() => this.handleCheck2(t.id)}>
                                                <View style={{ flex: 0.1 }}><CheckBox style={{ borderRadius: 5 }} color="#154ef9" checked={t.checked} onPress={() => this.handleCheck2(t.id)} /></View>
                                                <View style={{ flex: 0.7 }}><Text style={{ fontWeight: "bold" }}>{t.key}</Text></View>
                                            </TouchableOpacity>
                                        )
                                    })
                                )

                            : this.RenderBody()
                        }
                    </ScrollView>
                </View>
            </Container>
        );
    }
}


