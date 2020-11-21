import React, { Component } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import { Icon } from 'native-base';
import AppStyles from '../../AppStyles';

class ViewBill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SelectedServices:this.props.SelectedServices,
            TotalBill:""
        };
    }

    componentDidMount = () => {
        let TEMP = []
        let Total = 0
        let i
        for (i = 0; i < this.state.SelectedServices.length; i++) {
            TEMP.push(this.state.SelectedServices[i].Price)
        }
        //console.log(TEMP);

        for (i = 0; i < TEMP.length; i++) {
            Total = Total + parseInt(TEMP[i])
        }
        //console.log(Total);
        this.setState({TotalBill:Total})

    }
    render() {
        return (
            <Modal transparent visible animationType="slide" onRequestClose={()=>{this.props.onExit(false)}}>
                <View style={{ flex: 1, backgroundColor: "rgba(1,1,1,0.1)", alignItems: 'center', justifyContent: 'flex-end', }}>
                    <View style={{ width: responsiveWidth(100), height: responsiveHeight(60), backgroundColor: "#fff", }}>
                        <View style={{ flexDirection: "row", alignItems: 'center',backgroundColor:"#154ef9",padding:responsiveWidth(2) }}>
                            <View style={{ flex: 0.8 }}>
                                <Text style={[AppStyles.WhiteBoldText, { fontSize: responsiveFontSize(2) }]}>Requested Services</Text>
                            </View>
                            <View style={{ flex: 0.2, alignItems: "flex-end" }}>
                                <TouchableOpacity style={{ padding: responsiveWidth(0.5) }} onPress={()=>{this.props.onExit(false)}}>
                                    <Icon name="md-close" type="Ionicons" style={{color:"#fff"}}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flex: 1, padding: responsiveWidth(2) }}>
                            <ScrollView>
                                {this.state.SelectedServices.map((t, key) => {
                                    return (
                                        <View style={{ flexDirection: "row" }} key={key}>
                                            <View style={{ flex: 0.8 }}>
                                                <Text style={{ fontWeight: "bold", marginVertical: responsiveWidth(2) }}>{t.ServiceName}</Text>
                                            </View>
                                            <View style={{ flex: 0.2, alignItems: 'center', }}>
                                                <Text>₹ {t.Price}</Text>
                                            </View>
                                        </View>
                                    )
                                })}
                                <View style={{ flexDirection: "row", borderTopWidth: 1 }}>
                                    <View style={{ flex: 0.8 }}>
                                        <Text style={{ color: "#11f", fontWeight: "bold", marginVertical: responsiveWidth(2) }}>Total</Text>
                                    </View>
                                    <View style={{ flex: 0.2, alignItems: 'center', }}>
                                        <Text style={{ color: "#11f" }}>₹ {this.state.TotalBill}</Text>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

export default ViewBill;
