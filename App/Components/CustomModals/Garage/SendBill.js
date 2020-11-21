import React, { Component } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, TextInput, ActivityIndicator } from 'react-native';

import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import AppStyles from '../../AppStyles';
import { Icon } from 'native-base';
import firestore from '@react-native-firebase/firestore'
class SendBill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            UserID: this.props.UserID,
            GarageID: this.props.GarageID,
            RequestID: this.props.RequestID,
            RequestedServices: [],
            TotalBill: 0,
            isLoading: true
        };
    }

    async componentDidMount() {
        let AllRequests = []
        await firestore()
            .collection('FissoGarage')
            .doc(this.state.GarageID)
            .get().then((data) => {
                AllRequests = data._data.Requests
                // console.log(AllRequests);
            })

        AllRequests.map(async (t) => {
            // console.log(t.RequestId);
            if (t.RequestId == this.state.RequestID) {
                let TEMPARR = t.ServicesDetails
                //console.log(TEMPARR);
                this.setState({ RequestedServices: TEMPARR, isLoading: false })
            }
        })


        this.totalBill()
    }

    setPrice = (v, i) => {
        let Temp = this.state.RequestedServices
        // console.log(i)
        if (i < Temp.length - 1) {
            this.refs[i + 1].focus();
            let servName = Temp[i].ServiceName;
            //console.log(i);
            //console.log(servName)
            Temp.splice(i, 1, { ServiceName: servName, Price: v.nativeEvent.text })
            this.setState({ RequestedServices: Temp })
            this.totalBill();
            //console.log(this.state.TempArray)

        }
        else {
            let servName = Temp[i].ServiceName;
            // console.log(i);
            // console.log(servName)
            Temp.splice(i, 1, { ServiceName: servName, Price: v.nativeEvent.text })
            this.setState({ RequestedServices: Temp })
            this.totalBill();
            alert("Done")
        }
    }

    totalBill = () => {
        let TempArr = this.state.RequestedServices;
        this.setState({ TotalBill: tprice })
        var tprice = 0;
        for (let i = 0; i < TempArr.length; i++) {
            tprice = parseInt(tprice) + parseInt(TempArr[i].Price);
        }
        //console.log(tprice);

        this.setState({ TotalBill: tprice })

    }
    async _handleSubmmit() {
        let UserRequests = []
        let GarageRequests = []
        let Selected
        await firestore()
            .collection('FissoUser')
            .doc(this.state.UserID)
            .get().then((data) => {
                UserRequests = data._data.UserRequests
                UserRequests.map((t) => {
                    if (t.RequestId == this.state.RequestID) {
                        Selected = UserRequests[UserRequests.indexOf(t)]
                        delete Selected.ServicesDetails
                        Selected.GarageID = this.state.GarageID
                        Selected.ServicesDetails = this.state.RequestedServices
                        UserRequests.splice(UserRequests.indexOf(t), 1, Selected)
                        firestore().collection('FissoUser').doc(this.state.UserID).update({
                            UserRequests: UserRequests
                        })
                    }
                })
            })
        await firestore()
            .collection('FissoGarage')
            .doc(this.state.GarageID)
            .get().then((data) => {
                GarageRequests = data._data.Requests
                GarageRequests.map(t => {
                    if (t.RequestId == this.state.RequestID) {
                        let pos = GarageRequests.indexOf(t)
                        GarageRequests.splice(pos, 1)
                    }
                    firestore().collection('FissoGarage').doc(this.state.GarageID).update({
                        Requests: GarageRequests
                    })
                })
            })

        this.props.onExit(false,GarageRequests)

    }
    render() {
        return (
            <Modal visible transparent onRequestClose={() => { this.props.onExit(false) }}>
                <View style={{ flex: 1, backgroundColor: "rgba(1,1,1,0.4)", alignItems: 'center', justifyContent: "flex-end" }}>
                    <View style={{ height: responsiveHeight(70), width: responsiveWidth(100), backgroundColor: "#fff" }}>
                        <View style={{ flex: 0.1 }}>
                            <View style={{ flexDirection: "row", marginHorizontal: responsiveWidth(1.5), marginTop: responsiveWidth(1) }}>
                                <View style={{ flex: 0.9 }}>
                                    <Text style={[AppStyles.BlueBoldText, { fontSize: responsiveFontSize(3) }]}>Send Bill</Text>
                                </View>
                                <View style={{ flex: 0.1, alignItems: 'flex-end', }}>
                                    <TouchableOpacity onPress={() => { this.props.onExit(false) }}>
                                        <Icon name="close" type="AntDesign" style={{ fontWeight: "bold" }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Text style={{ marginHorizontal: responsiveWidth(2), fontSize: responsiveFontSize(1.2), fontWeight: 'bold', color: "#888" }}>Type the Price of the Servcie & press "Enter" to enter price of next Service.</Text>
                        </View>
                        <View style={{ flex: 0.8 }}>
                            <ScrollView>
                                {this.state.isLoading
                                    ? (<ActivityIndicator color="#154ef9" size="large" style={{ marginVertical: responsiveHeight(10) }} />)
                                    : (
                                        <View>
                                            {this.state.RequestedServices.map((t, key) => {
                                                return (
                                                    <View style={{ flexDirection: "row", alignItems: 'center', paddingHorizontal: responsiveWidth(2), backgroundColor: "#f3f3f3", marginBottom: responsiveWidth(2) }} key={key}>
                                                        <View style={{ flex: 0.7 }}>
                                                            <Text>{t.ServiceName}</Text>
                                                        </View>
                                                        <View style={{ flex: 0.3, alignItems: 'flex-end', }}>
                                                            <TextInput style={{ width: responsiveWidth(20), borderBottomWidth: 1 }}
                                                                placeholder="Enter Price"
                                                                // value={t.Price}
                                                                ref={key}
                                                                keyboardType='numeric'
                                                                keyboardType='numeric'
                                                                returnKeyType="next"
                                                                blurOnSubmit={false}
                                                                autoCorrect={false}
                                                                onSubmitEditing={(val) => { this.setPrice(val, key) }}
                                                            />
                                                        </View>
                                                    </View>
                                                )
                                            })}
                                        </View>
                                    )}
                                <View style={{ flexDirection: "row", paddingTop: responsiveWidth(2), marginHorizontal: responsiveWidth(2), borderTopWidth: 1, marginTop: responsiveWidth(2) }}>
                                    <View style={{ flex: 0.7 }}>
                                        <Text style={{ fontWeight: "bold" }}>Total</Text>
                                    </View>
                                    <View style={{ flex: 0.3, alignItems: 'center' }}>
                                        <Text style={{ fontWeight: "bold" }}>₹ {this.state.TotalBill}</Text>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                        <View style={{ flex: 0.1, alignItems: 'center', justifyContent: "flex-end" }}>


                            <TouchableOpacity
                                style={{
                                    width:"100%",
                                    paddingVertical: responsiveWidth(4),
                                    marginLeft: responsiveWidth(0.3),
                                    backgroundColor: "#154ef9",
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: responsiveWidth(2)
                                }}
                                onPress={() => { this._handleSubmmit() }}>
                                <Text style={AppStyles.WhiteBoldText}>Send Estimate Bill</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

export default SendBill;
