// @ts-nocheck
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { ACTION_TYPE } from './constants';

const API = 'https://85c378649507.ngrok.io';

export const login = (data, api) => {
  return async (dispatch) => {
    try {
      const body = {
        method: 'POST',
        url: api + '/auth/user/signin',
        data,
      };

      const response = await axios(body);

      await AsyncStorage.setItem('loginDetails', JSON.stringify(response));

      dispatch({
        type: ACTION_TYPE.LOGIN,
        payload: { response, error: false },
      });
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.LOGIN,
        payload: { response: error, error: true },
      });
    }
  };
};

export const clearLoginProps = () => {
  return (dispatch) => {
    dispatch({
      type: ACTION_TYPE.LOGIN,
      payload: undefined,
    });
  };
};

export const signup = (data, api) => {
  return async (dispatch) => {
    try {
      const body = {
        method: 'POST',
        url: api + '/auth/user/signup',
        data,
      };

      const response = await axios(body);

      dispatch({
        type: ACTION_TYPE.SIGNUP,
        payload: { response, error: false },
      });
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.SIGNUP,
        payload: { response: error, error: true },
      });
    }
  };
};

export const clearSignupProps = () => {
  return (dispatch) => {
    dispatch({
      type: ACTION_TYPE.SIGNUP,
      payload: undefined,
    });
  };
};

export const isLoggedIn = () => {
  return async (dispatch) => {
    try {
      const response = await AsyncStorage.getItem('loginDetails');

      dispatch({
        type: ACTION_TYPE.IS_LOGIN,
        payload: response
          ? { response: 'Logged in', error: false }
          : { response: 'Logged Out', error: true },
      });
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.IS_LOGIN,
        payload: { response: 'Logged Out', error: true },
      });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      await AsyncStorage.removeItem('loginDetails');

      dispatch({
        type: ACTION_TYPE.LOGOUT,
        payload: { response: 'Error White logging out', error: true },
      });
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.LOGOUT,
        payload: { response: 'Error White logging out', error: true },
      });
    }
  };
};
