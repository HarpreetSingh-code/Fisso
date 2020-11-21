import React from "react";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import About from "../../Screens/User/About";
import Profile from "../../Screens/User/Profile";
import MyVehicles from "../../Screens/User/MyVehicles";
import Custom_SideNav from "./Custom_SideNav";
import RequestedServices from "../../Screens/User/RequestedServices";
import Bookings from "../../Screens/User/Bookings";

import { createStackNavigator } from "react-navigation-stack";
import Dashboard from "../../Screens/User/Dashboard";
import AllGarages from "../../Screens/User/AllGarages";
import GarageServices from "../../Screens/User/GarageServices";
import ConfirmDetails from "../../Screens/User/ConfirmDetails";

const AddRequest = createAppContainer(createStackNavigator({
    Dashboard: Dashboard,
    AllGarages: AllGarages,
    GarageServices: GarageServices,
    ConfirmDetails: ConfirmDetails,
    MyVehicles: MyVehicles
}, {
    initialRouteName: "Dashboard",
    headerMode: "none"
}))


const UserDrawer = createDrawerNavigator({
    Home: AddRequest,
    Requests: RequestedServices,
    Bookings: Bookings,
    Vehicles: MyVehicles,
    Profile: Profile,
    About: About

}, {
    initialRouteName: "Home",
    drawerLockMode: "unlocked",
    drawerPosition: "left",
    drawerType: "slide",
    contentComponent: props => <Custom_SideNav {...props} />
})
export default createAppContainer(UserDrawer)