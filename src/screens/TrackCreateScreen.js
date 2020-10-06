import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import Map from '../components/Map';
import { SafeAreaView } from 'react-navigation';

const TrackCreateScreen = () => {
    return (
        <SafeAreaView>
            <Text h4>Create a Track</Text>
            <Map/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

});

export default TrackCreateScreen;