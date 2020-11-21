import React, { Component } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { Icon, Button, Radio } from 'native-base';
import firestore from '@react-native-firebase/firestore'
let Today = "", Tommorow = ""
class BookAppointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            GarageID:this.props.GarageID,
            RequestID:this.props.RequestID,
            Recieved: this.props.SentData,
            UserName: this.props.UserName,
            Vehicle: "",
            RegNum: "",
            GarageName: "",
            TotalBill: 0,
            RequestedServices: [],
            Radio1: true,
            Radio2: false,
            Timings: [
                { key: 1, Time: "09:00 AM", },
                { key: 2, Time: "09:30 AM", },
                { key: 3, Time: "10:00 AM", },
                { key: 4, Time: "10:30 AM", },
                { key: 5, Time: "11:00 AM", },
                { key: 6, Time: "12:00 PM", },
                { key: 7, Time: "12:30 PM", },
                { key: 8, Time: "01:00 PM", },
                { key: 9, Time: "01:30 PM", },
            ],
            checked: 0,
        };
    }
    componentDidMount = async () => {
       // console.log(this.state.RequestID);
        let TEMP = this.state.Recieved
        await this.setState({ Vehicle: TEMP.VehicleName, RegNum: TEMP.RegNum, GarageName: TEMP.GarageName, RequestedServices: TEMP.ServicesDetails })

        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        Today = date + "/" + month + "/" + year
        Tommorow = date + 1 + "/" + month + "/" + year

        let Temp = this.state.RequestedServices.map(t => t.Price)
        let total = 0
        for (let i = 0; i < Temp.length; i++) {
            total = total + parseInt(Temp[i])
        }
        this.setState({ TotalBill: total })
    }
    _handleSubmit() {
        // AppointmentID, GarageID, UserID, Vehicle,RegNum, GarageName, AppointmentTime, AppointmentDate, Status
        let SelectedDate = ""
        if (this.state.Radio1 == true && this.state.Radio2 == false) {
            SelectedDate = Today
        }
        else if (this.state.Radio1 == false && this.state.Radio2 == true) {
            SelectedDate = Tommorow
        }
        let TEMP = this.state.Timings
        let SelectedTime = TEMP[this.state.checked].Time
        this.props.BookAppointment(this.state.GarageID,this.state.RequestID,this.state.UserName, this.state.Vehicle, this.state.GarageName, this.state.RequestedServices, SelectedDate, SelectedTime,this.state.Recieved.GarageAddress,this.state.Recieved.RegNum,this.state.Recieved.VehicleType,this.state.Recieved)
        this.props.onExit(false)
    }
    render() {
        return (
            <Modal visible transparent animationType="slide" onRequestClose={() => { this.props.onExit(false) }}>
                <View style={{ flex: 1, backgroundColor: "rgba(1,1,1,0.3)", alignItems: 'center', justifyContent: "flex-end" }}>
                    <View style={{ paddingBottom: responsiveWidth(3), width: responsiveWidth(100), backgroundColor: "#fff", borderTopRightRadius: 20, borderTopLeftRadius: 20, marginTop: responsiveWidth(25) }}>
                        <TouchableOpacity style={{ width: "100%", paddingVertical: responsiveWidth(1), alignItems: 'center' }} onPress={() => { this.props.onExit(false) }}>
                            <Icon name="angle-double-down" type="FontAwesome" style={{ color: "#154ef9" }} />
                        </TouchableOpacity>
                        <ScrollView>
                            <Text style={{ textAlign: "center" }}>Hello,
                                    <Text style={{ color: "#154ef9", fontWeight: "bold", fontSize: responsiveFontSize(2.3) }}> {this.state.UserName} </Text>
                                      you are about to book given services for your
                                    <Text style={{ color: "#154ef9", fontWeight: "bold", fontSize: responsiveFontSize(2.3) }}> {this.state.Vehicle} </Text>
                                     at
                                    <Text style={{ color: "#154ef9", fontWeight: "bold", fontSize: responsiveFontSize(2.3) }}> {this.state.GarageName}</Text>.
                            </Text>
                            <View style={{ backgroundColor: "rgba(1,1,1,0.11)", marginTop: responsiveWidth(5), borderRadius: 10, marginHorizontal: responsiveWidth(2) }}>
                                {
                                    this.state.RequestedServices.map((t, key) => {
                                        return (
                                            <View style={{ flexDirection: "row", marginHorizontal: responsiveWidth(2), }} key={key}>
                                                <View style={{ flex: 0.7, padding: responsiveWidth(3) }}><Text style={{}}>{t.ServiceName}</Text></View>
                                                <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center', }}><Text>₹ {t.Price}</Text></View>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                            <View style={{ backgroundColor: "rgba(1,1,1,0.11)", marginVertical: responsiveWidth(2), borderRadius: 10, marginHorizontal: responsiveWidth(2) }}>
                                <View style={{ flexDirection: "row", marginHorizontal: responsiveWidth(2), }}>
                                    <View style={{ flex: 0.7, padding: responsiveWidth(3) }}><Text style={{ fontWeight: "bold" }}>Total</Text></View>
                                    <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center', }}><Text style={{ fontWeight: "bold" }}>₹ {this.state.TotalBill}</Text></View>
                                </View>
                            </View>
                            <View style={{ width: "100%", padding: responsiveWidth(2) }}>
                                <Text style={{ fontWeight: "bold", fontSize: responsiveFontSize(2.2) }}>Select Date</Text>
                                <View style={{ flexDirection: "row", marginTop: responsiveWidth(2) }}>
                                    <TouchableOpacity style={{ flex: 0.5, flexDirection: "row", alignItems: 'center', justifyContent: 'center', }} onPress={()=>{this.setState({Radio1:true,Radio2:false})}}>
                                        <Radio selectedColor="#154ef9" color="#154ef9" selected={this.state.Radio1} onPress={()=>{this.setState({Radio1:true,Radio2:false})}}/>
                                        <Text>Today <Text style={{ fontWeight: "bold" }}>({Today})</Text></Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ flex: 0.5, flexDirection: "row", alignItems: 'center', justifyContent: 'center', }} onPress={()=>{this.setState({Radio1:false,Radio2:true})}}>
                                        <Radio selectedColor="#154ef9" color="#154ef9" selected={this.state.Radio2} onPress={()=>{this.setState({Radio1:false,Radio2:true})}}/>
                                        <Text>Tommorow <Text style={{ fontWeight: "bold" }}>({Tommorow})</Text></Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ width: "100%", padding: responsiveWidth(2) }}>
                                <Text style={{ fontWeight: "bold", fontSize: responsiveFontSize(2.2) }}>Select Time</Text>
                                <View style={{ flexDirection: "row", flexWrap: "wrap", width: "100%", alignItems: 'center', justifyContent: 'center', }}>
                                    {this.state.Timings.map((t, key) => {
                                        return (
                                            <View key={t.key} style={{ marginRight: responsiveWidth(6), marginVertical: responsiveWidth(5) }}>
                                                {this.state.checked == key ?
                                                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', }}>
                                                        <Icon name="radio-button-checked" type="MaterialIcons" style={{ color: "#154ef9", fontSize: responsiveFontSize(2.5) }} />
                                                        <Text style={{ marginLeft: responsiveWidth(1) }}>{t.Time}</Text>
                                                    </TouchableOpacity>
                                                    :
                                                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', }} onPress={() => { this.setState({ checked: key, AppointmentTime: t.Time }) }}>
                                                        <Icon name="radio-button-unchecked" type="MaterialIcons" style={{ fontSize: responsiveFontSize(2.5) }} />
                                                        <Text style={{ marginLeft: responsiveWidth(1) }}>{t.Time}</Text>
                                                    </TouchableOpacity>}
                                            </View>
                                        )
                                    })}
                                </View>
                            </View>
                            <Button
                                style={{ backgroundColor: "#154ef9", marginHorizontal: responsiveWidth(4), borderRadius: 20, marginBottom: responsiveWidth(1) }}
                                full
                                onPress={() => { this._handleSubmit() }}>
                                <Text style={{ color: "#fff" }}>Book Appointment</Text>
                            </Button>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        );
    }
}

export default BookAppointment;
