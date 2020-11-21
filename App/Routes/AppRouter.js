import { createAppContainer,createSwitchNavigator } from "react-navigation";
import RegisterUser from "../Screens/User/NewUser/RegisterUser";
import DrawerNav from "./User/DrawerNav";

const UserNavigator=createSwitchNavigator({
    RegUser:RegisterUser,
    UserNav:DrawerNav
},{
    initialRouteName:"RegUser"
})

export default createAppContainer(UserNavigator)

