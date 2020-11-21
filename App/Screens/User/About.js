import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon } from 'native-base';
import { View, Text, ScrollView, StyleSheet,TouchableOpacity } from 'react-native';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
export default class About extends Component {
  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: "#154ef9" }} androidStatusBarColor="#154ef9">
          <Left>
            <Button transparent onPress={() => { this.props.navigation.openDrawer() }}>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>About Us</Title>
          </Body>
          <Right />
        </Header>
        <View style={{ flex: 1, paddingHorizontal: responsiveWidth(2) }}>
          <ScrollView>
            <Text style={Styles.TextAlignment}
              allowFontScaling={false}>1.  Fisso app is a totally unique Smartphone App that brings your business closer to your customers by linking directly to them via their mobile phone. Fisso is an Italian word which means fixed.</Text>
            <Text style={Styles.TextAlignment}
              allowFontScaling={false}>2.  FISSO gives real value to your customers by offering a genuinely useful smartphone app. The app has many features as well as huge amount of useful information about their vehicle. </Text>
            <Text style={Styles.TextAlignment}
              allowFontScaling={false}>3.  As a business offering the fisso app, you will have a direct link to your customers and can gain real-time access to invaluable marketing data via a fully customized administration portal. </Text>
            <Text style={Styles.TextAlignment}
              allowFontScaling={false}>4.  Fisso helps you to book their appointments online at this app. It provides basic and essentials garage services to the users. You can view and avail the services of any garage that are linked to this app. As we know that in today’s world, everything goes online which saves time and money, so with this app, we can provide garage services to the users and user can avail any services according to their needs. User can book online appointment that can save their time because they have given time slot for their services and within that time slot they can go to garage and avail the repairs and services under their time slot.</Text>
            <Text style={Styles.TextAlignment}
              allowFontScaling={false}>5.  You can avail multiple services and view their orders in order screen. You can view spare parts according to their convenience. you can view all garages that linked with this app and can use any garage services according to their needs. This system of offering services online can save time and money so that user need not to wait for their turn in queue instead they have given particular time slot for servicing.</Text>

            <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center',marginTop:responsiveWidth(6) }}>
              <TouchableOpacity style={{ marginHorizontal: responsiveWidth(6) }} onPress={()=>{alert("Open Facebook !")}}>
                <Icon name="social-facebook" type="SimpleLineIcons" style={{ fontSize: responsiveFontSize(6) }} />
              </TouchableOpacity>

              <TouchableOpacity style={{ marginHorizontal: responsiveWidth(6) }} onPress={()=>{alert("Open Instagram !")}}>
                <Icon name="instagram" type="AntDesign" style={{ fontSize: responsiveFontSize(6) }} />
              </TouchableOpacity>

              <TouchableOpacity style={{ marginHorizontal: responsiveWidth(6) }} onPress={()=>{alert("Open Twitter !")}}>
                <Icon name="twitter" type="Feather" style={{ fontSize: responsiveFontSize(6) }} />
              </TouchableOpacity>

            </View>
          </ScrollView>
        </View>
      </Container>
    );
  }
}
const Styles = StyleSheet.create({
  TextAlignment: {
    fontSize: responsiveFontSize(1.8),
    marginVertical: responsiveWidth(2),
    fontWeight: "bold"
  }
})