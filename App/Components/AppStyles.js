import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveWidth,responsiveHeight } from "react-native-responsive-dimensions";

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#fff"
    },
    Input:{
        paddingHorizontal:responsiveWidth(2),
        borderBottomWidth:1,
        borderBottomColor:"#fff",
        color:"#fff"
    },
    OtpBox: {
        borderWidth: 1,
        height: responsiveHeight(5),
        width: responsiveWidth(10),
        marginHorizontal: responsiveWidth(2.5),
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    OtpInput: {
        width: responsiveWidth(4),
        fontSize: responsiveFontSize(2)
    },
    WhiteButton:{
        backgroundColor:"#fff",
        paddingHorizontal:responsiveWidth(8),
        paddingVertical:responsiveWidth(2),
        borderRadius:20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    BlueButton:{
        backgroundColor:"#154ef9",
        paddingHorizontal:responsiveWidth(8),
        paddingVertical:responsiveWidth(2),
        borderRadius:20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    WhiteHeaderText:{
        color:"#fff",
        fontSize:responsiveFontSize(6)
    },
    BlueHeaderText:{
        color:"#154ef9",
        fontSize:responsiveFontSize(6)
    },
    WhiteNormalText:{
        color:"#fff",
        fontSize:responsiveFontSize(1.6)
    },
    BlueNormalText:{
        color:"#154ef9",
        fontSize:responsiveFontSize(1.6)
    },
    WhiteBoldText:{
        color:"#fff",
        fontSize:responsiveFontSize(1.6),
        fontWeight:"bold"
    },
    BlueBoldText:{
        color:"#154ef9",
        fontSize:responsiveFontSize(1.6),
        fontWeight:"bold"
    },
    BlackText:{
        color:"#111",
        fontSize:responsiveFontSize(2)
    }


})