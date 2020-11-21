import React, { Component } from 'react';
import { Button, Icon, Text, Radio, Picker, } from 'native-base';
import { View, TouchableOpacity, Modal } from 'react-native';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import FloatingLabelInput from 'react-native-floating-label-input';
import AppStyles from '../../../Components/AppStyles';
import firestore from '@react-native-firebase/firestore'
import {
    BIKE_MAKES, BAJAJ_BIKE_MODELS, HONDA_BIKE_MODELS,
    TVS_BIKE_MODELS, CAR_MAKES, FORD_CAR_MODELS,
    SUZUKI_CAR_MODELS, TOYOTA_CAR_MODELS, TESLA_CAR_MODELS
} from '../../../Firebase_Config/Temp_Data/Vehicles_Info'
class AddVehicle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            UserId: this.props.UserId,
            makeClicked: false,
            TwoWheelerRadio: true,
            FourWheelerRadio: false,
            Email: "",
            RegNum: "",
            Checked: false,
            VehicleMake: BIKE_MAKES,
            MakeValue: "Key0",
            MakePosition: 0,
            VehicleModel: [],
            ModelValue: "Key0",
            ModelPosition: 0,
            ErrorMessage: ""
        };
    }

    onValueChange = async (value = string, Pos) => {
        await this.setState({ MakeValue: value, MakePosition: Pos, makeClicked: true })

        if (this.state.VehicleMake[this.state.MakePosition].label == "Bajaj") { this.setState({ VehicleModel: BAJAJ_BIKE_MODELS }) }
        else if (this.state.VehicleMake[this.state.MakePosition].label == "Honda") { this.setState({ VehicleModel: HONDA_BIKE_MODELS }) }
        else if (this.state.VehicleMake[this.state.MakePosition].label == "TVS") { this.setState({ VehicleModel: TVS_BIKE_MODELS }) }
        else if (this.state.VehicleMake[this.state.MakePosition].label == "Ford") { this.setState({ VehicleModel: FORD_CAR_MODELS }) }
        else if (this.state.VehicleMake[this.state.MakePosition].label == "Suzuki") { this.setState({ VehicleModel: SUZUKI_CAR_MODELS }) }
        else if (this.state.VehicleMake[this.state.MakePosition].label == "Toyota") { this.setState({ VehicleModel: TOYOTA_CAR_MODELS }) }
        else if (this.state.VehicleMake[this.state.MakePosition].label == "Tesla") { this.setState({ VehicleModel: TESLA_CAR_MODELS }) }
    }
    onValueChange1 = (value = string, Pos) => {
        this.setState({ ModelValue: value, ModelPosition: Pos })
    }
    renderVehicleMakes = () => {
        return this.state.VehicleMake.map((t) => {
            return (
                <Picker.Item label={t.label} value={t.Value} key={t.Value} />
            )
        })
    }
    renderVehicleModels = () => {
        return this.state.VehicleModel.map((t) => {
            return (
                <Picker.Item label={t.label} value={t.Value} key={t.Value} />
            )
        })
    }

    async _handleSubmit() {

        let VehicleMake = this.state.VehicleMake[this.state.MakePosition].label
        let VehicleModel = this.state.VehicleModel[this.state.ModelPosition].label
        let VehicleType

        if (this.state.TwoWheelerRadio == true) { VehicleType = "Two" }
        else if (this.state.FourWheelerRadio == true) { VehicleType = "Four" }
        else { this.setState({ ErrorMessage: "There's been an error Plese Restart the Application." }) }
        let VehicleDetails
        await firestore()
            .collection('FissoUser')
            .doc(this.state.UserId)
            .get().then((data) => {
                VehicleDetails = data._data.UserVehicles
                VehicleDetails.push(
                    {
                        VehicleType: VehicleType,
                        Vehicle: VehicleMake + " " + VehicleModel,
                        Email: this.state.Email,
                        RegNum: this.state.RegNum
                    }
                )
                console.log(VehicleDetails)
            })

        await firestore().collection('FissoUser').doc(this.state.UserId).update({
            UserVehicles: VehicleDetails
        })
        this.props.onExit(false)

    }
    _handleSubmit2() {
        // let VehicleType
        // let UserEmail = this.state.Email
        // let RegNum = this.state.RegNum
        // var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        // if (this.state.TwoWheelerRadio == true) { VehicleType = "Two" }
        // else if (this.state.FourWheelerRadio == true) { VehicleType = "Four" }
        // else { this.setState({ ErrorMessage: "There's been an error Plese Restart the Application." }) }

        // if (this.state.makeClicked == false) {
        //     this.setState({ ErrorMessage: "Select Vehicle Make" })
        // }
        // else {
        //     //console.log(this.state.makeClicked);
        //     let VehicleMake = this.state.VehicleMake[this.state.MakePosition].label
        //     let VehicleModel = this.state.VehicleModel[this.state.ModelPosition].label
        //     if (UserEmail.match(mailformat)) {
        //         if (RegNum != "") {



        //         }
        //         else {
        //             this.setState({ ErrorMessage: "Invalid Vehicle Registration Number" })
        //         }
        //     }
        //     else {
        //         this.setState({ ErrorMessage: "Please check your mail." })
        //     }

        // }

        // setTimeout(() => {
        //     this.setState({ ErrorMessage: "" })
        // }, 3000);
    }
    render() {
        return (
            <Modal transparent visible animationType="slide" onRequestClose={() => { this.props.onExit(false) }} >
                <View style={{ flex: 1, backgroundColor: "rgba(1,1,1,0.6)", alignItems: 'center', justifyContent: "flex-end" }}>
                    <View style={{ width: responsiveWidth(100), backgroundColor: "#fff", paddingBottom: responsiveWidth(2) }}>
                        <View style={{ flexDirection: 'row', backgroundColor: "#154ef9", padding: responsiveWidth(3) }}>
                            <View style={{ flex: 0.9 }}>
                                <Text style={[AppStyles.WhiteBoldText, { fontSize: responsiveFontSize(2) }]}>Add New Vehicle</Text>
                            </View>
                            <View style={{ flex: 0.1, alignItems: 'flex-end', }}>
                                <TouchableOpacity onPress={() => { this.props.onExit(false) }} >
                                    <Icon name="close" type="Ionicons" style={{ color: "#fff" }} />
                                </TouchableOpacity>
                            </View>


                        </View>
                        <View style={{ width: '100%', padding: responsiveWidth(2) }}>
                            <Text style={[AppStyles.BlackText, { fontWeight: "bold" }]}>Vehicle Type </Text>
                            <View style={{ marginLeft: responsiveWidth(2), flexDirection: "row", marginTop: responsiveWidth(2) }} >
                                <TouchableOpacity style={{ flex: 0.5, flexDirection: "row" }} onPress={() => { this.setState({ TwoWheelerRadio: true, FourWheelerRadio: false, VehicleMake: BIKE_MAKES }) }}>
                                    <Radio selected={this.state.TwoWheelerRadio} onPress={() => { this.setState({ TwoWheelerRadio: true, FourWheelerRadio: false, VehicleMake: BIKE_MAKES }) }}
                                        color="#154ef9"
                                        selectedColor="#154ef9"
                                    />
                                    <Text>2 Wheeler</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flex: 0.5, flexDirection: "row", }} onPress={() => { this.setState({ FourWheelerRadio: true, TwoWheelerRadio: false, VehicleMake: CAR_MAKES }) }}>
                                    <Radio selected={this.state.FourWheelerRadio} onPress={() => { this.setState({ FourWheelerRadio: true, TwoWheelerRadio: false, VehicleMake: CAR_MAKES }) }}
                                        color="#154ef9"
                                        selectedColor="#154ef9"
                                    />
                                    <Text>4 Wheeler</Text>
                                </TouchableOpacity>
                            </View>

                            <Text style={[AppStyles.BlackText, { fontWeight: "bold", marginTop: responsiveWidth(3) }]}>Select Vehicle Make </Text>
                            <View style={{ width: "100%", borderWidth: 1, borderRadius: 10, alignSelf: "center", justifyContent: 'center', }}>
                                <Picker
                                    note
                                    mode="dropdown"
                                    style={{ width: "100%", color: "#111" }}
                                    selectedValue={this.state.MakeValue}
                                    onValueChange={this.onValueChange.bind(this)}
                                >
                                    {this.renderVehicleMakes()}
                                </Picker>
                            </View>

                            <Text style={[AppStyles.BlackText, { fontWeight: "bold", marginTop: responsiveWidth(3) }]}>Select Vehicle Model </Text>
                            <View style={{ width: "100%", borderWidth: 1, borderRadius: 10, alignSelf: "center" }}>
                                <Picker
                                    note
                                    mode="dropdown"
                                    style={{ width: "100%", color: "#111" }}
                                    selectedValue={this.state.ModelValue}
                                    onValueChange={this.onValueChange1.bind(this)}
                                >
                                    {this.renderVehicleModels()}
                                </Picker>
                            </View>
                            <Text style={[AppStyles.BlackText, { fontWeight: "bold", marginTop: responsiveWidth(3) }]}>Enter Email (For Garage Notifications) </Text>
                            <FloatingLabelInput
                                label="Email"
                                value={this.state.Email}
                                keyboardType="email-address"
                                inputStyles={{ color: "#111" }}
                                containerStyles={{ width: "100%", borderRadius: 10, borderWidth: 1, borderColor: "#111", alignSelf: "center" }}
                                labelStyles={{ color: "#111" }}
                                onChangeText={(Email) => { this.setState({ Email: Email }) }}
                            />
                            <Text style={[AppStyles.BlackText, { fontWeight: "bold", marginTop: responsiveWidth(3) }]}>Enter Vehicle Registration Number</Text>
                            <FloatingLabelInput
                                label="Registration Number"
                                value={this.state.RegNum}
                                onChangeText={(RegNum) => { this.setState({ RegNum: RegNum }) }}
                                inputStyles={{ color: "#111" }}
                                containerStyles={{ width: "100%", borderRadius: 10, borderWidth: 1, borderColor: "#111", alignSelf: "center" }}
                                labelStyles={{ color: "#111" }}
                            />
                            <Text>{this.state.ErrorMessage}</Text>
                            <Button full style={{ marginTop: responsiveWidth(6), backgroundColor: "#154ef9", }} rounded onPress={() => { this._handleSubmit() }}>
                                <Text>Add To List</Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal >
        );
    }
}

export default AddVehicle;
