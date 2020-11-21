import React from 'react'
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import Dashboard from "../../Screens/Garage/Dashboard";
import Appointments from "../../Screens/Garage/Appointments";
import Profile from "../../Screens/Garage/Profile";
import Requests from "../../Screens/Garage/Requests";
import Custom_SideNav from "./Custom_SideNav";


const GarageStack=createStackNavigator({
    Home:Dashboard,
    Profile:Profile
},{
    initialRouteName:"Home",
    headerMode:"none"
})

const GarageDrawer= createDrawerNavigator({
    Home:GarageStack,
    Appointments:Appointments,
    Requests:Requests,
    
    
},{
    initialRouteName:"Home",
    drawerType:"slide",
    contentComponent: props => <Custom_SideNav {...props} />
    
})
 export default createAppContainer(GarageDrawer)