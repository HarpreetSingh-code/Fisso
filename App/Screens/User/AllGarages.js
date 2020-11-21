import React, { Component } from 'react';
import { TouchableOpacity, View, Image, ActivityIndicator } from "react-native";
import { Container, Header, Title, Content, Fab, Item, Input, Button, Left, Right, Body, Icon, Text, Card } from 'native-base';
import { responsiveWidth, responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import firestore from '@react-native-firebase/firestore'
let _AllGarages = []
export default class AllGarages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      User_Details: this.props.navigation.state.params.User_Details,
      Selected: "",
      HeaderMode: "Title",
      Garages_Info: [],
      SearchBarText: "",
      isLoading: true
    };
  }

  componentDidMount = async () => {
    let Garages = []
    await firestore().collection('FissoGarage').get().then((data) => {
      for (let i = 0; i < data._docs.length; i++) {
        //console.log(data._docs[i]._data)
        Garages.push(data._docs[i]._data)
      }
    })
    //console.log(Garages);

    let User_Details = this.state.User_Details
    await this.setState({ Selected: User_Details[0].VehicleType })

    //console.log(this.state.Selected);
    let TEMPARR1 = []
    let TEMPARR2 = []

    for (let i = 0; i < Garages.length; i++) {
      if (Garages[i].VehicleType == "Two") {
        TEMPARR1.push(Garages[i])
      }
      else if (Garages[i].VehicleType == "Four") {
        TEMPARR2.push(Garages[i])
      }
    }

    this.state.Selected == "Two"
      ? _AllGarages = TEMPARR1
      : _AllGarages = TEMPARR2

    await this.setState({ Garages_Info: _AllGarages, isLoading: false })

  }
  filterGarages = (text) => {
    this.setState({
      SearchBarText: text,
      Garages_Info: _AllGarages.filter(i =>
        i.GarageName.includes(text))
    })
  }
  _handleSubmit(t) {
    let GarageDetails = [t]
    this.props.navigation.navigate("GarageServices", { UserDetails: this.state.User_Details, GarageDetails: GarageDetails })
  }

  render() {
    return (
      <Container>
        {this.state.HeaderMode == "Title"
          ? (<Header style={{ backgroundColor: "#154ef9" }} androidStatusBarColor="#154ef9">
            <Left>
              <Button transparent>
                <Icon name='md-chevron-back' type="Ionicons" onPress={() => { this.props.navigation.goBack() }} />
              </Button>
            </Left>
            <Body>
              <Title>Select Garage</Title>
            </Body>
            <Right >
              <Button transparent onPress={() => { this.setState({ HeaderMode: "SearchBar" }) }}>
                <Icon name="search" />
              </Button>
            </Right>
          </Header>)

          : (<Header searchBar rounded={true} style={{ backgroundColor: "#154ef9" }} androidStatusBarColor="#154ef9">
            <Item>
              <Icon name="ios-search" />
              <Input
                placeholder="Search Garages"
                value={this.state.SearchBarText}
                onChangeText={(text) => { this.filterGarages(text) }} />
              <TouchableOpacity onPress={() => { this.setState({ HeaderMode: "Title" }) }}>
                <Icon name="circle-with-cross" type="Entypo" style={{ color: "#154ef9" }} />
              </TouchableOpacity>
            </Item>
          </Header>)
        }
        {this.state.HeaderMode == "Title"
          ? (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
              <Text>Insert MapView Here.</Text>

              <Fab
                direction="up"
                containerStyle={{}}
                style={{ backgroundColor: '#154ef9' }}
                position="bottomRight"
                onPress={() => alert("getUserLocation()")}>
                <Icon name="locate-sharp" type="Ionicons" />
              </Fab>
            </View>
          )
          : (
            <Content padder contentContainerStyle={{ alignItems: 'center', }}>
              {this.state.isLoading
                ? (<ActivityIndicator style={{ marginTop: responsiveHeight(50) }}size="large" color="#f11" />)
                : (
                  <View style={{width:"100%"}}>
                    {this.state.Garages_Info.length == 0
                      ? (<Text>No Nearby Garages</Text>)
                      : (this.state.Garages_Info.map((t, key) => {
                        return (
                          <TouchableOpacity key={key} onPress={() => { this._handleSubmit(t) }}>
                            <Card style={{ width: "100%", flexDirection: "row", borderRadius: 10, marginVertical: responsiveWidth(1.5), padding: responsiveWidth(1.5) }}>
                              <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center', }}>
                                <Image source={{ uri: "https://www.seekpng.com/png/full/901-9010044_easy-maintenance-search-circle-icon.png" }} style={{ height: responsiveWidth(22), width: "100%", borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} resizeMode="contain" />
                              </View>
                              <View style={{ flex: 0.7, paddingLeft: responsiveWidth(2) }}>
                                <Text style={{ color: "#666", fontWeight: "bold", fontSize: responsiveFontSize(2) }}>{t.GarageName}</Text>
                                <Text style={{ fontSize: responsiveFontSize(1.4) }}>{t.GarageAddress}</Text>
                                <Text style={{ fontSize: responsiveFontSize(1.4) }}>Open : {t.GarageOpen} - {t.GarageClose}</Text>
                                <View style={{ flex: 0.8, flexDirection: "row" }}>
                                  {t.OpenDays.map((t, key) => {
                                    return (
                                      <View key={key} style={{ flexDirection: "row" }}>
                                        <Text style={{ marginRight: responsiveWidth(1), fontSize: responsiveFontSize(1.4), textAlign: "center" }}>{t.substring(0, 3)}</Text>
                                      </View>
                                    )
                                  })}
                                </View>
                              </View>
                            </Card>
                          </TouchableOpacity>
                        )
                      }))
                    }
                  </View>
                )}
            </Content>
          )
        }
      </Container >
    );
  }
}