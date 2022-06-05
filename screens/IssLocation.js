import React, {Component} from "react";
import {Text, View} from "react-native";

export default class IssLocationScreen extends Component{
    render(){
        return(
          <View style = {{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
          }}>
              <Text>Tela de Localização da EEI</Text>
          </View>  
        )
    }
}


