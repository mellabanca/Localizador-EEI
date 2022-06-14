import React, {Component} from "react";
import {Alert, Text, View, SafeAreaView, FlatList, Image,
        ImageBackground, Dimensions, StyleSheet, StatusBar} from "react-native";
import axios from "axios";

export default class MeteorScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            meteors: {},
        };
    }

    componentDidMount(){
        this.getMeteors();
    }

    getMeteors = () => {
        axios
        .get("https://api.nasa.gov/neo/rest/v1/feed?api_key=jIqifVdO4kBhof7NfDR4cyqkGN1rRuQpSX7ueT4w")
        .then(response => {
            this.setState({meteors: response.data.near_earth_objects})
        })
        .catch(error => {
            Alert.alert(error.message)
        })
    }

    renderItem = ({item}) => {
        let meteor = item;
        let bg_img, speed, size;
        if(meteor.threat_score <= 30){
            bg_img = require("../assets/meteor_bg1.png");
            speed = require("../assets/meteor_speed1.gif");
            size = 100;
        } else if(meteor.threat_score <= 75){
            bg_img = require("../assets/meteor_bg2.png");
            speed = require("../assets/meteor_speed2.gif");
            size = 150;
        } else {
            bg_img = require("../assets/meteor_bg3.png");
            speed = require("../assets/meteor_speed3.gif");
            size = 200;
        }

        return(
            <View>
                <ImageBackground source={bg_img} style = {styles.backgroundImage}>
                    <View style = {styles.gifContainer}>
                        <Image source={speed} style = {{width: size, height: size, alignSelf: "center"}}></Image>
                    </View>
                    <View>
                        <Text style = {styles.cardTitle}>{item.name}</Text>
                        <Text style = {[styles.cardText,{marginTop: 20}]}>Mais Próximo da Terra - {item.close_approach_data[0].close_approach_date_full}</Text>
                        <Text style = {[styles.cardText,{marginTop: 5}]}>Diâmetro Mínimo (km) - {item.estimated_diameter.kilometers.estimated_diameter_min}</Text>
                        <Text style = {[styles.cardText,{marginTop: 5}]}>Diâmetro Máximo (km) - {item.estimated_diameter.kilometers.estimated_diameter_max}</Text>
                        <Text style = {[styles.cardText,{marginTop: 5}]}>Velocidade (km/h) - {item.close_approach_data[0].relative_velocity.kilometers_per_hour}</Text>
                        <Text style = {[styles.cardText,{marginTop: 5}]}>Distância da Terra (km) - {item.close_approach_data[0].miss_distance.kilometers}</Text>
                    </View>
                </ImageBackground>
            </View>
        )
    }

    keyExtractor = (item, index) => index.toString();
    
    render(){
        if(Object.keys(this.state.meteors).length === 0){
            return(
                <View style = {{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                    }}>
                    <Text>Carregando</Text>
                </View>
            )
        } else {
            let meteor_arr = Object.keys(this.state.meteors).map(meteor_date => {
                return this.state.meteors[meteor_date]
            })
            let meteors = [].concat.apply([],meteor_arr);

            meteors.forEach(function(element){
                let diameter =
                (element.estimated_diameter.kilometers.estimated_diameter_min + 
                 element.estimated_diameter.kilometers.estimated_diameter_max) / 2;
                let threatScore =
                (diameter / element.close_approach_data[0].miss_distance.kilometers)
                 * 1000000000;
                element.threat_score = threatScore;
            })

            meteors.sort(function(a,b){
                return b.threat_score - a.threat_score
            });
            meteors = meteors.slice(0,5);

        return(
          <View style = {styles.container}>
              <SafeAreaView style = {styles.droidSafeArea}/>
              <FlatList
                keyExtractor={this.keyExtractor}
                data={meteors}
                renderItem={this.renderItem}
                horizontal={true}
              />
          </View>  
        )
    }
}
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    titleBar: {
        flex: 0.15,
        justifyContent: "center",
        alignItems: "center"
    },
    titleText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white"
    },
    meteorContainer: {
        flex: 0.85
    },
    listContainer: {
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        justifyContent: "center",
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        borderRadius: 10,
        padding: 10
    },
    cardTitle: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: "bold",
        color: "white",
        marginLeft: 15
    },
    cardText: {
        color: "white",
        marginLeft: 15,
        marginBottom: 10,
    },
    threatDetector: {
        height: 10,
        marginBottom: 10
    },
    gifContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    meteorDataContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
})


