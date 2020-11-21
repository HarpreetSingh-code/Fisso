import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import * as Progress from 'react-native-progress';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            indeterminate: false,
        };
    }
    componentDidMount() {
        let progress = 0.1;
        this.setState({ progress });
        setTimeout(() => {
            this.setState({ indeterminate: false });
            setInterval(() => {
                progress += Math.random() / 5;
                if (progress > 1) {
                    progress = 1;
                }
                this.setState({ progress });
            }, 300);
        }, 1500);

    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center',paddingTop:responsiveHeight(50), justifyContent: 'center',backgroundColor:"#154ef9" }}>
                <Image 
                source={require('../Components/Images/Logo/LogoFull.png')} 
                style={{height:responsiveHeight(10),width:responsiveWidth(50),marginBottom:responsiveHeight(2)}}
                resizeMode="contain"/>
                <Progress.Bar
                    width={350}
                    height={15}
                    borderWidth={0}
                    borderRadius={20}
                    color="#fff"
                    progress={this.state.progress}
                    indeterminate={this.state.indeterminate}
                />
            </View>
        );
    }
}

export default Splash;
