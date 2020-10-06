import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'signin':
            return { errorMessage: '', token: action.payload };
        case 'clear_error':
            return { ...state, errorMessage: ''};
        case 'signout':
            return { token: null, errorMessage: '' }
        default:
            return state;
    };
};

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        dispatch({ type: 'signin', payload: token})
        navigate('TrackList');
    } else {
        navigate('loginFlow');
    }
};

const clearErrorMessage = dispatch => {
    return() => {
        dispatch({ type: "clear_error"})
    }
}

const signup = (dispatch) => {
    return async ({ email, password }) => {
        // make a request to sign up
        try {
            const response = await trackerApi.post('/signup', { email, password });
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({
                type: 'signin', payload: response.data.token
            })
            // navigate to main flow
            navigate('TrackList');
        } catch (error) {
            dispatch({ type: "add_error", payload: 'Something went wrong with sign up'});
        }

        // if we sign up modify state say that we're authenticaded

        // signup failed
    };
};

const signin = dispatch => {
    return async ( {email, password }) => {
        // make a req to sign in
        try {
            const response = await trackerApi.post('/signin', {email, password});
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({
                type: "signin", payload: response.data.token
            })
            navigate('TrackList');
        } catch (error) {
            dispatch({ type: "add_error", payload: 'Something went wrong with sign in'});
        }
    }
}

const signout = dispatch => {
    return async () => {
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'signout' });
        navigate('loginFlow');
    }
}

export const { Provider, Context} = createDataContext(
    authReducer,
    { signin, signup, signout, tryLocalSignin},
    { token: null, errorMessage:'' }
)