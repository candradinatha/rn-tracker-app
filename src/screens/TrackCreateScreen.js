import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import Map from '../components/Map';
import { SafeAreaView } from 'react-navigation';
import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location';
import '../_mockLocation';
import { Context as LocationContext } from '../context/LocationContext';

const TrackCreateScreen = () => {
    const { addLocation } = useContext(LocationContext);
    const [err, setErr] = useState(null);

    const startWatching = async () => {
        try {
            const { granted } = await requestPermissionsAsync();
            if(!granted) {
                throw new Error("Location permission not granted");
            }
            await watchPositionAsync({
                accuracy: Accuracy.BestForNavigation,
                timeInterval: 1000,
                distanceInterval: 10
            }, (location) => {
                addLocation(location)
            });
        } catch (e) {
            setErr(e);
        }
    }

    useEffect(() => {
        startWatching();
    }, []);

    return (
        <SafeAreaView>
            <Text h4>Create a Track</Text>
            <Map/>
            { err ? <Text>Please Allow Location Permission</Text> : null}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

});

export default TrackCreateScreen;