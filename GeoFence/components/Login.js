import React, { Component } from 'react'
import {
    StyleSheet, Text, View, Image,
    TouchableWithoutFeedback, StatusBar,
    TextInput, SafeAreaView, Keyboard, TouchableOpacity,
    PermissionsAndroid,Platform,
    KeyboardAvoidingView
} from 'react-native'
import mobiledet from './mobiledet'
import Geolocation from '@react-native-community/geolocation'
import DeviceInfo from 'react-native-device-info'; 
export default class Login extends Component {

    constructor()
    {
        super();
        this.state={
            email:'',
            password:''
        }
    }
    updateValue(text,field)
    {
        // console.warn(text);
        if(field=='email')
        {
            this.setState({
                email:text,
            })
        }
        else if(field=='password')
        {
            this.setState({
                password:text,
            })
        }
    }

    
    submit()
    {   
        let collection={}

        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          };
          
          function success(pos) {
            var crd;
            crd= pos.coords;
            // // window.lat1=crd.latitude;
            // window.long1=crd.longitude;
            // console.warn('Your current position is:');
            // console.warn(`Latitude : ${crd.latitude}`);
            // console.warn(`Longitude: ${crd.longitude}`);
            // alert(`More or less ${crd.accuracy} meters.`);
            window.lat1=crd.latitude;
            window.long1=crd.longitude;
          }
          
          function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
          }
          
          Geolocation.getCurrentPosition(success, error, options);
            collection.mac = DeviceInfo.getMacAddress().then(),
            collection.usn=this.state.email,
            collection.password=this.state.password,
            collection.long=window.lat1,
            collection.lat=window.long1,
            // alert(collection);
            
            // console.warn(collection);
            fetch(`http://192.168.29.96:8080/writedata`, {
              method: 'POST', // or 'PUT'
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(collection),
            })
            // console.warn("1")
            .then((response) => response.json())
            .then((data) => {
              alert(data['message']);
              alert(data['code']);
            })
            // console.warn("3")
            .catch((error) => {
                alert(error);
              console.error('Error:', error);
            });
           

    }
    render() {
        return (
            // <Image source={require('../images/logo')} style={styles.backgroundImage} />
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" />
                <KeyboardAvoidingView keyboardVerticalOffset={-100} style = { styles.container }>
                {/* <KeyboardAvoidingView behavior='padding' style={styles.container}> */}
                    <TouchableWithoutFeedback style={styles.container} 
                            onPress={Keyboard.dismiss}>
                        <View style={styles.logoContainer}>
                            <View style={styles.logoContainer}>
                                <Image style={styles.logo}
                                    source={require('../images/aaa.jpg')}>
                                </Image>
                                {/* <Text style={styles.title}>Account Information</Text> */}
                            </View>
                            <View style={styles.infoContainer}>
                                {/* <form noValidate onSubmit={this.onSubmit()}> */}
                                <TextInput style={styles.input}
                                    placeholder="USN"
                                    // value = {this.state.email}
                                    placeholderTextColor='rgba(255,255,255,0.8)'
                                    keyboardType='email-address'
                                    returnKeyType='next'
                                    onChangeText={(text)=>this.updateValue(text,'email')}
                                    autoCorrect={false}
                                    // onSubmitEditing={()=> this.refs.txtPassword.focus()}
                                />
                                <TextInput style={styles.input} 
                                    placeholder="Password"
                                    placeholderTextColor='rgba(255,255,255,0.8)'
                                    // returnKeyType='go'
                                    secureTextEntry
                                    autoCorrect={false}
                                    onChangeText={(text)=>this.updateValue(text,'password')}
                                    // ref={"txtPassword"}
                                />
                                <TouchableOpacity onPress ={() => this.submit()}
                                    style={styles.buttonContainer}>
                                    <Text style={styles.buttonText}>MARK YOUR ATTENDANCE</Text>
                                </TouchableOpacity>
                                {/* </form> */}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(32, 53, 70)',
        flexDirection: 'column',
    },
    logoContainer: {
        bottom:30,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    logo: {
        marginBottom:100,
        width: 400,
        height: 140,
    },
    title: {
        color: '#f7c744',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 5,
        opacity: 0.9,
        marginBottom:200,
    },
    infoContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 10,
        height: 200,
        padding: 20,
        // backgroundColor: 'red'
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        color: '#FFF',
        marginBottom: 20,
        paddingHorizontal: 10
    },
    buttonContainer: {
        // backgroundColor: '#f7c744',
        // backgroundColor:'gr',
        paddingVertical: 15,
        marginBottom:20
    },
    buttonText: {
        textAlign: 'center',
        // color :'rgb(32, 53, 70)',
        color:'red',
        fontWeight: 'bold',
        fontSize: 18
    }
})