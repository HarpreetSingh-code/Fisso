import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { Avatar } from 'react-native-elements';
import AppStyles from '../../Components/AppStyles';
import firestore from '@react-native-firebase/firestore';
import { Icon } from 'native-base';

import AsyncStorage from '@react-native-community/async-storage';
class Custom_SideNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            GarageID: "",
            garageName: "",
            garageAvatar: "https://www.seekpng.com/png/full/901-9010044_easy-maintenance-search-circle-icon.png",
        };
    }
    async componentDidMount() {
        let value = await AsyncStorage.getItem('@FissoGarageId')
        this.setState({ GarageID: value })
        await firestore()
            .collection('FissoGarage')
            .doc(this.state.GarageID)
            .get().then((data) => {
                this.setState({ garageName: data._data.GarageName })
                //console.log(AllRequests)
            })
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#3366ff" }}>
                <View style={{ width: "100%", alignItems: 'center', marginVertical: responsiveWidth(3), borderBottomWidth: 1, borderColor: "#fff", paddingBottom: responsiveWidth(2) }}>
                    <Avatar source={{ uri: this.state.garageAvatar }} size="xlarge" />
                    <Text style={[AppStyles.WhiteBoldText, { fontSize: responsiveFontSize(2.4),textAlign:"center", marginTop: responsiveWidth(3) }]}>{this.state.garageName.toUpperCase()}</Text>
                </View>

                <TouchableOpacity style={{ flexDirection: "row", marginVertical: responsiveWidth(3) }} onPress={() => { this.props.navigation.navigate("Home") }}>
                    <View style={{ flex: 0.3, alignItems: 'center', }}>
                        <Icon name="home" type="Feather" style={{ color: "#fff" }} />
                    </View>
                    <View style={{ flex: 0.7 }}>
                        <Text style={[AppStyles.WhiteBoldText, { fontSize: responsiveFontSize(2) }]}>Home</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{ flexDirection: "row", marginVertical: responsiveWidth(3) }} onPress={() => { this.props.navigation.navigate("Appointments") }}>
                    <View style={{ flex: 0.3, alignItems: 'center', }}>
                        <Icon name="calendar" type="MaterialCommunityIcons" style={{ color: "#fff" }} />
                    </View>
                    <View style={{ flex: 0.7 }}>
                        <Text style={[AppStyles.WhiteBoldText, { fontSize: responsiveFontSize(2) }]}>Appointments</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{ flexDirection: "row", marginVertical: responsiveWidth(3) }} onPress={() => { this.props.navigation.navigate("Requests") }}>
                    <View style={{ flex: 0.3, alignItems: 'center', }}>
                        <Icon name="message-cog" type="MaterialCommunityIcons" style={{ color: "#fff" }} />
                    </View>
                    <View style={{ flex: 0.7 }}>
                        <Text style={[AppStyles.WhiteBoldText, { fontSize: responsiveFontSize(2) }]}>Requests</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{ flexDirection: "row", marginVertical: responsiveWidth(3) }} onPress={() => { alert("Logout !") }}>
                    <View style={{ flex: 0.3, alignItems: 'center', }}>
                        <Icon name="log-out" type="Entypo" style={{ color: "#fff" }} />
                    </View>
                    <View style={{ flex: 0.7 }}>
                        <Text style={[AppStyles.WhiteBoldText, { fontSize: responsiveFontSize(2) }]}>Log Out</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Custom_SideNav;
