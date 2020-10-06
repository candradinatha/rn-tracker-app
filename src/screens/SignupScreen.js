import React, { useContext, useEffect} from 'react';
import { View, StyleSheet} from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SignupScreen = ({ navigation }) => {
    const { state, signup, tryLocalSignin } = useContext(AuthContext);

    useEffect(() => {
        tryLocalSignin();
    }, [])

    return (
        <View style={styles.container}>
            <AuthForm
                headerText="Sign Up for Tracker"
                errorMessage={state.errorMessage}
                submitButtonText="Sign Up"
                onSubmit={({ email, password }) => signup( {email, password} )}
            />

            <NavLink
                text="Already have Account? Sign in Instead"
                routeName="Signin"/>
        </View>
        
    );
};

SignupScreen.navigationOptions = () => {
    return {
        header: () => false,
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 200
    },
    error: {
        color: 'red',
        margin:15,
    },
    link: {
        color: 'blue',
        textAlign: 'center'
    }
});

export default SignupScreen;