import React, { Component } from 'react';
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, CheckBox } from 'native-base';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Image, View, TouchableOpacity } from 'react-native';
import AppStyles from '../../Components/AppStyles';
export default class GarageServices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            UserDetails: this.props.navigation.state.params.UserDetails,
            GarageDetails: this.props.navigation.state.params.GarageDetails,
            GarageName: "",
            GarageEmail: "",
            GarageImage: "https://www.seekpng.com/png/full/901-9010044_easy-maintenance-search-circle-icon.png",
            GarageAddress: "",
            GarageOpen: "",
            GarageClose: "",
            OpenDays: [],
            Latitude: 0,
            Longitude: 0,
            Services: [],
            data: [],
            SelectedServices: []
        };
    }

    componentDidMount = async () => {
        let GarageDetails = this.state.GarageDetails
        await this.setState({
            GarageName: GarageDetails[0].GarageName,
            GarageEmail: GarageDetails[0].GarageEmail,
            GarageAddress: GarageDetails[0].GarageAddress,
            GarageOpen: GarageDetails[0].GarageOpen,
            GarageClose: GarageDetails[0].GarageClose,
            OpenDays: GarageDetails[0].OpenDays,
            Latitude: GarageDetails[0].Latitude,
            Longitude: GarageDetails[0].Longitude,
            Services: GarageDetails[0].Services
        })
        let temp = this.state.Services
        let temp1 = []
        for (let i = 0; i < temp.length; i++) {
            var obj = {}
            obj = { "id": i, "key": temp[i], "checked": false }
            temp1.push(obj)
        }
        await this.setState({ data: temp1 })
    }

    onCheckChanged(id) {
        const data = this.state.data;
        const index = data.findIndex(x => x.id === id);
        data[index].checked = !data[index].checked;
        this.setState(data);
    }

    renderServices = () => {
        return this.state.data.map((item, key) => {
            return (
                <TouchableOpacity key={key}
                    style={{ flexDirection: 'row', marginVertical: responsiveWidth(1), alignItems: 'center', backgroundColor: "#f0f0f0", borderRadius: 10, paddingHorizontal: responsiveWidth(2), paddingVertical: responsiveWidth(4) }}
                    onPress={() => this.onCheckChanged(item.id)}>
                    <View style={{ flex: 0.9 }}>
                        <Text style={{ color: "#555", fontSize: responsiveFontSize(1.7) }} allowFontScaling={false}>{item.key}</Text>
                    </View>
                    <View style={{ flex: 0.1, alignItems: "center" }}>
                        <CheckBox checked={item.checked} onPress={() => this.onCheckChanged(item.id)} style={{ borderRadius: 10 }} color="#1F6BFA" />
                    </View>
                </TouchableOpacity>
            )
        })
    }

    _handleSubmit = async () => {
        var res1 = this.state.data.map((t) => t.key)
        var res2 = this.state.data.map((t) => t.checked)
        var resultArray = []
        for (let i = 0; i < res2.length; i++) {
            if (res2[i] == true) {
                resultArray.push(res1[i])
            }
        }

        if (resultArray != "") {
            await this.setState({ SelectedServices: resultArray, })
           // console.log(this.state.SelectedServices);

            //add code here..
            this.props.navigation.navigate("ConfirmDetails", { UserDetails: this.state.UserDetails, GarageDetails: this.state.GarageDetails, SelectedServices: this.state.SelectedServices })
        }
        else {
            alert("Please select atleast One Service.")
        }
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
                        <Title>Select Services</Title>
                    </Body>
                    <Right >
                        <Button transparent onPress={() => { this._handleSubmit() }}>
                            <Text>Next</Text>
                            <Icon name='chevron-forward-outline' type="Ionicons" />
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <Image source={{ uri: this.state.GarageImage }} style={{ width: "100%", height: responsiveHeight(50) }} resizeMode="contain" />
                    <View style={{ width: responsiveWidth(100), paddingHorizontal: responsiveWidth(2) }}>
                        <Text style={[AppStyles.BlueBoldText, { fontSize: responsiveFontSize(2.5), marginTop: responsiveWidth(3) }]}>{this.state.GarageName}</Text>
                        <Text style={{ color: "#555", fontSize: responsiveFontSize(1.6), fontWeight: "bold" }}>{this.state.GarageEmail}</Text>
                        <View style={{ flexDirection: "row" }}>
                            {this.state.OpenDays.map((t, key) => {
                                return (
                                    <Text key={key} style={{ color: "#555", fontSize: responsiveFontSize(1.6) }}>{t.substring(0,3)} </Text>
                                )
                            })}
                        </View>
                        <Text style={{ color: "#555", fontSize: responsiveFontSize(1.6) }}>Open : {this.state.GarageOpen} - {this.state.GarageClose}</Text>
                        <Text style={{ color: "#555", fontSize: responsiveFontSize(1.6) }}>Address : {this.state.GarageAddress}</Text>
                        <TouchableOpacity onPress={() => { alert("Insert MapView here.") }}>
                            <Image
                                source={{ uri: "https://miro.medium.com/max/3188/1*FbzQStUzSsLChBJE9108hg.png" }}
                                style={{ width: "100%", height: responsiveHeight(10) }}
                                resizeMode="cover"
                            />
                        </TouchableOpacity>
                        {this.renderServices()}
                    </View>
                </Content>
            </Container>
        );
    }
}