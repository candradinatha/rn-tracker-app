import React, { useCallback, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import Map from '../components/Map';
import { SafeAreaView, withNavigationFocus } from 'react-navigation';
import '../_mockLocation';
import { Context as LocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation';
import TrackForm from '../components/TrackForm';
import { FontAwesome } from '@expo/vector-icons';

const TrackCreateScreen = ({ isFocused }) => {
    const { state, addLocation } = useContext(LocationContext);
    const callback = useCallback( location => {
        addLocation(location, state.recording )
    }, [state.recording]);
    const [err] = useLocation( isFocused || state.recording, callback);


    return (
        <SafeAreaView>
            <Text h4>Create a Track</Text>
            <Map/>
            { err ? <Text>Please Allow Location Permission</Text> : null}
            <TrackForm/>
        </SafeAreaView>
    )
}

TrackCreateScreen.navigationOptions = {
    title: 'Add Track',
    tabBarIcon: <FontAwesome name="plus" size={16}/>
}

const styles = StyleSheet.create({

});

export default withNavigationFocus(TrackCreateScreen);