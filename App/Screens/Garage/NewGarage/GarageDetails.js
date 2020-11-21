import React, { Component } from 'react';
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, CheckBox } from 'native-base';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import { Avatar } from 'react-native-elements';
import AppStyles from '../../../Components/AppStyles';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
export default class GarageDetails2 extends Component {
    constructor(props) {
        super(props);
        this.state = {

            VisibleTimePicker1: false,
            VisibleTimePicker2: false,
            AvatarSource: this.props.navigation.state.params.AvatarSource,
            GarageName: this.props.navigation.state.params.GarageName,
            GarageEmail: this.props.navigation.state.params.GarageEmail,
            GarageOpen: "",
            GarageClose: "",
            OpenDays: "",
            data: [
                { id: 0, key: "Sunday", checked: false },
                { id: 1, key: "Monday", checked: false },
                { id: 2, key: "Tuesday", checked: false },
                { id: 3, key: "Wednesday", checked: false },
                { id: 4, key: "Thursday", checked: false },
                { id: 5, key: "Friday", checked: false },
                { id: 6, key: "Saturday", checked: false },
            ],
            Types: [
                { key: 1, Time: "Two Wheeler", Value: "Two" },
                { key: 2, Time: "Four Wheeler", Value: "Four" }
            ],
            checked: 0,
            ErrorMessage: ""

        };
    }
    onCheckChanged(id) {
        const data = this.state.data;
        const index = data.findIndex(x => x.id === id);
        data[index].checked = !data[index].checked;
        this.setState(data);
    }
    _handleSubmit() {
        let OwnerName = this.props.navigation.state.params.OwnerName
        let OwnerMobile = this.props.navigation.state.params.OwnerMobile
        let GarageAddress = this.props.navigation.state.params.GarageAddress


        if (this.state.GarageOpen != "" && this.state.GarageClose != "") {
            let TEMP = this.state.Types
            let VType = TEMP[this.state.checked].Value
            //Selected Open Days for garage
            var res1 = this.state.data.map((t) => t.key)
            var res2 = this.state.data.map((t) => t.checked)
            var resultArray = []
            for (let i = 0; i < res2.length; i++) {
                if (res2[i] == true) {
                    resultArray.push(res1[i])
                }
            }
            if (resultArray.length < 4) {
                this.setState({ ErrorMessage: "Your garage should be open for atleast 4 days" })
            }
            else {
                let GarageDetails = {
                    OwnerName: OwnerName,
                    OwnerMobile: OwnerMobile,
                    GarageName: this.state.GarageName,
                    GarageAvatar:this.state.AvatarSource,
                    GarageEmail: this.state.GarageEmail,
                    GarageAddress: GarageAddress,
                    GarageOpen: this.state.GarageOpen,
                    GarageClose: this.state.GarageClose,
                    OpenDays: resultArray,
                }
                //console.log(GarageDetails);
                this.props.navigation.navigate("Page3", { GarageDetails: GarageDetails, VehicleType: VType })
            }
        }
        else {
            this.setState({ ErrorMessage: "Please Select Garage Timings." })
        }
        setTimeout(() => { this.setState({ ErrorMessage: "" }) }, 4000)
    }
    render() {
        return (
            <Container>
                <Header androidStatusBarColor="#154ef9" style={{ backgroundColor: "#154ef9" }}>
                    <Left>
                        <Button transparent onPress={() => {
                           // this.props.navigation.goBack()
                        }}>
                            <Icon name='chevron-back' type="Ionicons" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Registration</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder contentContainerStyle={{ backgroundColor: "#154ef9", width: responsiveWidth(100), height: responsiveHeight(100) }}>
                    <View style={{ flexDirection: "row", paddingHorizontal: responsiveWidth(2), marginTop: responsiveWidth(5), alignItems: 'center', }}>
                        <Avatar source={{ uri: this.state.AvatarSource }} size="xlarge"  />
                        <View style={{ marginLeft: responsiveWidth(3) }}>
                            <Text style={[AppStyles.WhiteHeaderText, { fontSize: responsiveFontSize(2.5), fontWeight: "bold", textAlign: "left", }]}>{this.state.GarageName}</Text>
                            <Text style={[AppStyles.WhiteHeaderText, { fontSize: responsiveFontSize(1.6), textAlign: "left", }]}>{this.state.GarageEmail}</Text>
                        </View>
                    </View>
                    {/*/////////////////////////////////////////////////////// First datetime modal here///////////////////////////////////////////////////////// */}
                    <DateTimePicker
                        isVisible={this.state.VisibleTimePicker1}
                        onConfirm={(time) => {
                            this.setState({
                                VisibleTimePicker1: false,
                                GarageOpen: moment(time).format("hh:mm A")
                            })
                        }}
                        onCancel={() => { this.setState({ VisibleTimePicker1: false }) }}
                        mode={'time'}
                        is24Hour={false} />
                    {/*/////////////////////////////////////////////////////// Second datetime modal here///////////////////////////////////////////////////////// */}
                    <DateTimePicker
                        isVisible={this.state.VisibleTimePicker2}
                        onConfirm={(time) => {
                            this.setState({
                                VisibleTimePicker2: false,
                                GarageClose: moment(time).format("hh:mm A")
                            })
                        }}
                        onCancel={() => { this.setState({ VisibleTimePicker2: false }) }}
                        mode={'time'}
                        is24Hour={false} />
                    <View style={{ width: "100%", marginTop: responsiveWidth(7) }}>
                        <Text style={AppStyles.WhiteBoldText}>Garage Timings</Text>
                        <View style={{ flexDirection: "row", alignItems: 'center', }}>
                            <TouchableOpacity style={{ flex: 0.4, alignItems: 'center', justifyContent: 'center', }} onPress={() => { this.setState({ VisibleTimePicker1: true }) }}>
                                <TextInput style={{ width: "80%", borderBottomWidth: 1, borderColor: "#fff", color: "#fff" }}
                                    editable={false}
                                    placeholder="Open Time"
                                    placeholderTextColor="rgba(255,255,255,0.8)"
                                    value={this.state.GarageOpen} />
                            </TouchableOpacity>
                            <View style={{ flex: 0.2 }}>
                                <Text style={[AppStyles.WhiteNormalText, { textAlign: "center" }]}>to</Text>
                            </View>
                            <TouchableOpacity style={{ flex: 0.4, alignItems: 'center', justifyContent: 'center', }} onPress={() => { this.setState({ VisibleTimePicker2: true }) }}>
                                <TextInput style={{ width: "80%", borderBottomWidth: 1, borderColor: "#fff", color: "#fff" }}
                                    editable={false}
                                    placeholder="Close Time"
                                    placeholderTextColor="rgba(255,255,255,0.8)"
                                    value={this.state.GarageClose} />
                            </TouchableOpacity>
                        </View>
                        <Text style={[AppStyles.WhiteBoldText, { marginTop: responsiveWidth(5) }]}>Open Days</Text>
                        <View style={{ flexDirection: "row", flexWrap: "wrap", alignItems: 'center', }}>
                            {this.state.data.map((t, key) => {
                                return (
                                    <TouchableOpacity key={key} style={{ width: responsiveWidth(30), flexDirection: 'row', marginTop: responsiveWidth(4) }} onPress={() => this.onCheckChanged(t.id)}>
                                        <View style={{ flex: 0.3 }}><CheckBox color="#fff" style={{ borderRadius: 5 }} checked={t.checked} onPress={() => this.onCheckChanged(t.id)} /></View>
                                        <View style={{ flex: 0.7 }}><Text style={AppStyles.WhiteBoldText} allowFontScaling={false}>{t.key}</Text></View>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                        <Text style={[AppStyles.WhiteBoldText, { marginTop: responsiveWidth(5) }]}>Services avaliable for:</Text>
                        <View style={{ flexDirection: "row" }}>
                            {this.state.Types.map((t, key) => {
                                return (
                                    <View key={t.key} style={{ marginRight: responsiveWidth(6), marginVertical: responsiveWidth(5) }}>
                                        {this.state.checked == key
                                            ?
                                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', }}>
                                                <Icon name="radio-button-checked" type="MaterialIcons" style={{ color: "#fff", fontSize: responsiveFontSize(2.5) }} />
                                                <Text style={[AppStyles.WhiteBoldText, { marginLeft: responsiveWidth(1) }]}>{t.Time}</Text>
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', }} onPress={() => { this.setState({ checked: key, AppointmentTime: t.Time }) }}>
                                                <Icon name="radio-button-unchecked" type="MaterialIcons" style={{ color: "#fff", fontSize: responsiveFontSize(2.5) }} />
                                                <Text style={[AppStyles.WhiteBoldText, { marginLeft: responsiveWidth(1) }]}>{t.Time}</Text>
                                            </TouchableOpacity>}
                                    </View>
                                )
                            })}
                        </View>

                        <Text style={{ textAlign: "center", color: "#f11", fontWeight: "bold", marginTop: responsiveWidth(2) }}>{this.state.ErrorMessage}</Text>

                        <TouchableOpacity style={[AppStyles.WhiteButton, { marginTop: responsiveWidth(10), alignSelf: 'flex-end', marginRight: 20 }]} onPress={() => { this._handleSubmit() }}>
                            <Text style={AppStyles.BlueBoldText}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </Content>
            </Container>
        );
    }
}