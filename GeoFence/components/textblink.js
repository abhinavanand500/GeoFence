import React, {Component} from 'react';
import {
    Text,
    View
} from 'react-native';
class Blink extends Component{
    constructor(props){
        super(props);
        this.state={
            showText:false
        };
        var taskToDo = () => {
            this.setState(previousState =>{
                return {
                    showText: !previousState.showText
                };
            });
        };
        const timeToBlink=10000;
        setInterval(taskToDo,timeToBlink);
    }
    render(){
        // 
        let textToDisplay = this.state.showText?this.props.inputtext:'NOT PRESENT ';
        return (
            <Text>{textToDisplay}</Text>
        );
    }
}
export default class textblink extends Component{
        render(){
            return (
                <View style={{alignItems:"center",flex:1,justifyContent:"center"}}>
                    <Text style={{fontSize:50, color:"red", backgroundColor:"yellow"}}>
                        <Blink inputtext='Hi Abhinav Anand'></Blink>
                    </Text>
                </View>
            );
        }
    }

