import React from 'react';
import {Text, View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import * as Permissions from 'expo-permissions';


export default class Gps extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            lon: 0,
            lat: 0
        }
        this.updateLocation = this.updateLocation.bind(this)
    }
    componentDidMount() {
        setInterval(() => {this.updateLocation()}, 2000);

    }

    updateLocation() {
        // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
        // this.state.bind(this);
        // Permissions.askAsync(Permissions.LOCATION)
        //     .then((status, permissions) => {
        let status = 'granted';
        if (status === 'granted') {
            Geolocation.getCurrentPosition(
                (position) => {
                    this.setState({
                        lon: position.coords.longitude,
                        lat: position.coords.latitude
                    });
                    console.log(position);
                },
                (error) => {
                    // See error code charts below.
                    console.log(error.code, error.message);
                },
                {enableHighAccuracy: true, timeout: 5000, maximumAge: 10000},
            );
        } else {
            console.log("Rip")
        }
            // })
            // .catch((err) => {
            //     console.log("ask permission error " + err)
            // });
    }


    render() {
        // Instead of navigator.geolocation, just use Geolocation.

        // Geolocation.getCurrentPosition(
        //     (position) => {
        //         console.log(position);
        //     },
        //     (error) => {
        //         // See error code charts below.
        //         console.log(error.code, error.message);
        //     },
        //     {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        // );
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Lon: {this.state.lon}</Text>
                <Text>Lat: {this.state.lat}</Text>
            </View>
        );
    }
}
