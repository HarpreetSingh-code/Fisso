import React, { Component } from 'react';
import { View, Text, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import AppStyles from '../../Components/AppStyles';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import { CheckBox } from 'native-base';

class LoginType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserSelected: false,
      GarageSelected: false
    };
  }

  render() {
    return (
      <View style={[AppStyles.container, { backgroundColor: "#154ef9" }]}>
        <StatusBar backgroundColor="#154ef9" barStyle="light-content" />
        <View style={{ width: responsiveWidth(100), height: responsiveHeight(50), padding: responsiveWidth(1) }}>
          <Text style={[AppStyles.WhiteHeaderText, { fontSize: responsiveFontSize(5), fontWeight: "bold" }]}> Account Type?</Text>
          <TouchableOpacity style={{ flexDirection: 'row', marginTop: responsiveWidth(3) }} onPress={() => { this.setState({ UserSelected: !this.state.UserSelected, GarageSelected: false }) }}>
            <View style={{ flex: 0.1, alignItems: "center", justifyContent: 'center', }}>
              <CheckBox color="#fff" style={{ borderRadius: 20 }} checked={this.state.UserSelected} onPress={() => { this.setState({ UserSelected: !this.state.UserSelected, GarageSelected: false }) }} />
            </View>
            <View style={{ flex: 0.8, paddingLeft: responsiveWidth(2) }}>
              <Text style={[AppStyles.WhiteBoldText, { fontSize: responsiveFontSize(3) }]}>User</Text>
              <Text style={AppStyles.WhiteNormalText}>I'm a normal user.</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: 'row', marginTop: responsiveWidth(3) }} onPress={() => { this.setState({ GarageSelected: !this.state.GarageSelected, UserSelected: false }) }}>
            <View style={{ flex: 0.1, alignItems: "center", justifyContent: 'center', }}>
              <CheckBox color="#fff" style={{ borderRadius: 20 }} checked={this.state.GarageSelected} onPress={() => { this.setState({ GarageSelected: !this.state.GarageSelected, UserSelected: false }) }} />
            </View>
            <View style={{ flex: 0.8, paddingLeft: responsiveWidth(2) }}>
              <Text style={[AppStyles.WhiteBoldText, { fontSize: responsiveFontSize(3) }]}>Garage</Text>
              <Text style={AppStyles.WhiteNormalText}>I'm a Garage owner.</Text>
            </View>
          </TouchableOpacity>

          <View style={{ flexDirection: "row", justifyContent: 'flex-end', paddingHorizontal: responsiveWidth(6), marginTop: responsiveWidth(6) }}>
            <TouchableOpacity style={AppStyles.WhiteButton}>
              <Text style={AppStyles.BlueBoldText}>Go</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    );
  }
}

export default LoginType;
