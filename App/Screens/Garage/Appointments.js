import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import TodayAppointments from './TodayAppointments';
import TommorowAppointments from './TommorowAppointments';
import { View } from 'react-native';


const Appointment=createMaterialTopTabNavigator({
    Today:TodayAppointments,
    Tommorow:TommorowAppointments
},{
    initialRouteName:"Today",
    defaultNavigationOptions:{
        tabBarVisible:false
    }
})
const Nav =createAppContainer(Appointment)

export default class Appointments extends Component {
  render() {
    return (
      <Container>
        <Header  androidStatusBarColor="#154ef9" style={{ backgroundColor: "#154ef9" }}>
          <Left>
            <Button transparent  onPress={() => {
              this.props.navigation.openDrawer() 
            }}>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Appointments</Title>
          </Body>
          <Right />
        </Header>
        <View style={{flex:1}}>
          <Nav/>
        </View>
      </Container>
    );
  }
}