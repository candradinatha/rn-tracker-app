import React, { useContext} from 'react';
import { View, StyleSheet} from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SigninScreen = () => {
    const { state, signin } = useContext(AuthContext);


    return (
        <View style={styles.container}>
            <AuthForm
                headerText="Sign In for Tracker"
                errorMessage={state.errorMessage}
                submitButtonText="Sign In"
                onSubmit={({ email, password }) => signin( {email, password} )}
            />

            <NavLink
                text="Don't have Account? Sign up Instead"
                routeName="Signup"/>
        </View>
        
    );
}

SigninScreen.navigationOptions = () => {
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

export default SigninScreen;