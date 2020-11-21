import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { Image, View, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-community/async-storage';
import AppStyles from '../../Components/AppStyles';
export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            GarageID: "",
            garageType: "",
            garageAvatar: "https://www.seekpng.com/png/full/901-9010044_easy-maintenance-search-circle-icon.png",
            garageName: "",
            garageEmail: "",
            garageAddress: "",
            garageOpen: "",
            garageClose: "",
            openDays: [],
            VisibleModal: false
        };
    }
    async componentDidMount() {
        let value = await AsyncStorage.getItem('@FissoGarageId')
    this.setState({ GarageID: value })
        const user = await firestore()
            .collection('FissoGarage')
            .doc(this.state.GarageID)
            .get()
            .then((data) => {
                //console.log(data._data.GarageAddress)
                this.setState({
                    garageName: data._data.GarageName,
                    garageEmail: data._data.GarageEmail,
                    garageAddress: data._data.GarageAddress,
                    garageOpen: data._data.GarageOpen,
                    garageClose: data._data.GarageClose,
                    openDays: data._data.OpenDays,
                    garageType: data._data.VehicleType
                })
            })

    }
    _SelectImage = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image)
            this.setState({ garageAvatar: image.path, VisibleModal: false })
        });
    }
    _openCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            //  console.log(image)
            this.setState({ garageAvatar: image.path, VisibleModal: false })
        });
    }
    DeleteGarage = async () => {

        Alert.alert(
            "Delete Garage?",
            "Are you sure you want to delete your Garage?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK", onPress: async () => {
                        await firestore()
                            .collection('FissoGarage')
                            .doc(this.state.GarageID)
                            .delete()
                            .then(() => {
                                console.log('User Deleted!');
                            });
                    }
                }
            ],
            { cancelable: false }
        );


    }
    render() {
        return (
            <Container>
                <Header androidStatusBarColor="#154ef9" style={{ backgroundColor: "#154ef9" }}>
                    <Left>
                        <Button transparent onPress={() => { this.props.navigation.goBack() }}>
                            <Icon name='chevron-back' type="Ionicons" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Profile</Title>
                    </Body>
                    <Right />
                    {/* <Button transparent onPress={()=>{this.setState({VisibleModal:true})}}>
                            <Icon name="image-edit-outline" type="MaterialCommunityIcons" />
                        </Button>
                    </Right> */}
                </Header>
                <Content>

                    {/* ////////////////////////////////////////   IMAGEPICKER MODAL     ///////////////////////////////////////////////////////////// */}

                    <Modal transparent visible={this.state.VisibleModal} animationType="slide" onRequestClose={() => { this.setState({ VisibleModal: false }) }}>
                        <View style={{ flex: 1, backgroundColor: "rgba(1,1,1,0.6)", alignItems: 'center', justifyContent: "flex-end" }}>
                            <View style={{ height: responsiveHeight(30), width: responsiveWidth(100), backgroundColor: "#fff", borderTopLeftRadius: 20, borderTopRightRadius: 20, marginTop: responsiveWidth(2.5) }}>
                                <View style={{ width: responsiveWidth(100), alignItems: 'center', }}>
                                    <Text style={[AppStyles.BlueBoldText, { fontSize: responsiveFontSize(3) }]}>Change Photo</Text>
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


                    <Image source={{ uri: this.state.garageAvatar }} style={{ width: responsiveWidth(100), height: responsiveHeight(60) }} resizeMode="contain" />
                    <Text style={[AppStyles.BlackText, { margin: responsiveWidth(1), fontSize: responsiveFontSize(3.5), fontWeight:"bold"}]}>{this.state.garageName}</Text>
                    <View style={{ alignSelf: "center", width: responsiveWidth(95), backgroundColor: "rgba(1,1,1,0.15)", paddingVertical: responsiveWidth(1), marginTop: responsiveWidth(3), borderRadius: 20 }}>
                        <View style={{ flexDirection: "row", alignItems: 'center', marginVertical: responsiveWidth(2) }}>
                            <View style={{ flex: 0.2, alignItems: 'center', }}>
                                <Icon name="mail" type="Entypo" />
                            </View>
                            <View style={{ flex: 0.8 }}>
                                <Text>{this.state.garageEmail}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", marginVertical: responsiveWidth(2), alignItems: 'center', }}>
                            <View style={{ flex: 0.2, alignItems: 'center', }}>
                                <Icon name="location-pin" type="Entypo" />
                            </View>
                            <View style={{ flex: 0.8 }}>
                                <Text>{this.state.garageAddress}</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: "row", marginVertical: responsiveWidth(2), alignItems: 'center', }}>
                            <View style={{ flex: 0.2, alignItems: 'center', }}>
                                <Icon name="calendar" type="Entypo" />
                            </View>
                            <View style={{ flex: 0.8, flexDirection: "row" }}>
                                {this.state.openDays.map((t, key) => {
                                    return (
                                        <View key={key} style={{ flexDirection: "row" }}>
                                            <Text style={{backgroundColor:"#111",marginLeft:responsiveWidth(1),color:"#fff",width:responsiveWidth(10),textAlign:"center",borderRadius:10}}>{t.substring(0, 3)}</Text>
                                        </View>
                                    )
                                })}
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", marginVertical: responsiveWidth(2), alignItems: 'center', }}>
                            <View style={{ flex: 0.2, alignItems: 'center', }}>
                                <Icon name="back-in-time" type="Entypo" />
                            </View>
                            <View style={{ flex: 0.8 }}>
                                <Text>{this.state.garageOpen} - {this.state.garageClose}</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={{ alignSelf: "center", marginTop: responsiveWidth(3) }}>
                        <Text style={{ color: "#11f", fontWeight: "bold" }}>History</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignSelf: "center", marginVertical: responsiveWidth(3) }} onPress={() => { this.DeleteGarage() }}>
                        <Text style={{ color: "#f11", fontWeight: "bold" }}>Delete  Account ?</Text>
                    </TouchableOpacity>
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