import React, { Component } from 'react';
import { LogBox } from 'react-native';

import Login from './App/Screens/Auth/Login';
import LoginType from './App/Screens/Auth/LoginType';

import RegisterUser from './App/Screens/User/NewUser/RegisterUser';
import RegisterGarage from "./App/Routes/Garage/RegisterGarage";

import GarageNav from './App/Routes/Garage/GarageNav'
import UserNav from './App/Routes/User/DrawerNav'


import Splash from './App/Splash/Splash';

export default class App extends Component {
  render() {

    // LogBox.ignoreAllLogs(true)
    return (
      <Splash/>
    );
  }
}

