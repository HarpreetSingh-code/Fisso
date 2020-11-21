import React from 'react'
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import GarageDetails1 from '../../Screens/Garage/NewGarage/RegisterGarage'
import GarageDetails2 from '../../Screens/Garage/NewGarage/GarageDetails'
import RegisterServices from "../../Screens/Garage/NewGarage/RegisterServices";
import RegisterVehicles from "../../Screens/Garage/NewGarage/RegisterVehicles";

const RegisterStack = createStackNavigator({
    Page1: GarageDetails1,
    Page2: GarageDetails2,
    Page3: RegisterVehicles,
    Page4: RegisterServices
}, {
    initialRouteName: "Page1",
    headerMode: "none"
})

 export default createAppContainer(RegisterStack)