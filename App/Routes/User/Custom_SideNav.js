import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal, Image } from 'react-native';
import { responsiveWidth, responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { Avatar } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore'
import AppStyles from '../../Components/AppStyles';
import { Icon } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

class Custom_SideNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            UserID: "",
            UserName: "",
            UserAvatar: "https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png",
        };
    }
    async componentDidMount() {
        setTimeout(async () => {
            let value = await AsyncStorage.getItem('@FissoUserId')
            this.setState({ UserID: value })
            await firestore()
                .collection('FissoUser')
                .doc(this.state.UserID)
                .get().then((data) => {
                    this.setState({ UserName: data._data.UserName });
                })
        }, 10);

    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#3366ff" }}>
                <View style={{ width: "100%", alignItems: 'center', marginVertical: responsiveWidth(3) }}>
                    <Image source={{ uri: this.state.UserAvatar }} style={{ width: responsiveWidth(40), height: responsiveHeight(20) }} resizeMode="contain" />
                    <Text style={[AppStyles.WhiteBoldText, { fontSize: responsiveFontSize(2.2), marginTop: responsiveWidth(3) }]}>{this.state.UserName}</Text>
                </View>

                <TouchableOpacity style={{ flexDirection: "row", marginVertical: responsiveWidth(3) }} onPress={() => { this.props.navigation.navigate("Home") }}>
                    <View style={{ flex: 0.3, alignItems: 'center', }}>
                        <Icon name="home" type="Feather" style={{ color: "#fff" }} />
                    </View>
                    <View style={{ flex: 0.7 }}>
                        <Text style={[AppStyles.WhiteBoldText, { fontSize: responsiveFontSize(2) }]}>Home</Text>
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

                <TouchableOpacity style={{ flexDirection: "row", marginVertical: responsiveWidth(3) }} onPress={() => { this.props.navigation.navigate("Vehicles") }}>
                    <View style={{ flex: 0.3, alignItems: 'center', }}>
                        <Icon name="car-sport-sharp" type="Ionicons" style={{ color: "#fff" }} />
                    </View>
                    <View style={{ flex: 0.7 }}>
                        <Text style={[AppStyles.WhiteBoldText, { fontSize: responsiveFontSize(2) }]}>My Vehicles</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{ flexDirection: "row", marginVertical: responsiveWidth(3) }} onPress={() => { this.props.navigation.navigate("Bookings") }}>
                    <View style={{ flex: 0.3, alignItems: 'center', }}>
                        <Icon name="calendar" type="MaterialCommunityIcons" style={{ color: "#fff" }} />
                    </View>
                    <View style={{ flex: 0.7 }}>
                        <Text style={[AppStyles.WhiteBoldText, { fontSize: responsiveFontSize(2) }]}>Bookings</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{ flexDirection: "row", marginVertical: responsiveWidth(3) }} onPress={() => { this.props.navigation.navigate("About") }}>
                    <View style={{ flex: 0.3, alignItems: 'center', }}>
                        <Icon name="question-circle" type="FontAwesome" style={{ color: "#fff" }} />
                    </View>
                    <View style={{ flex: 0.7 }}>
                        <Text style={[AppStyles.WhiteBoldText, { fontSize: responsiveFontSize(2) }]}>About Us</Text>
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
