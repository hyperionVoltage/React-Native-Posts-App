import React, {useEffect, useState} from 'react';
import {AsyncStorage} from 'react-native';

import {useStore} from 'react-redux';

import {login} from '../Redux/Actions/LoggedUserActions';
import axios from 'axios';

const Auth = props => {
  const store = useStore();

  useEffect(() => {
    const fetchLocalUser = async () => {
      try {
        const userEmail = await AsyncStorage.getItem('@LoggedUser:email');
        const userToken = await AsyncStorage.getItem('@LoggedUser:token');
        const userUserID = await AsyncStorage.getItem('@LoggedUser:user_id');
        console.log('userEmail: ', userEmail);
        console.log('userToken: ', userToken);
        console.log('userUserID: ', userUserID);
        const user = {
          token: userToken,
          userId: parseFloat(userUserID),
          email: userEmail,
        };
        if (userEmail && userToken && userUserID) {
          axios.defaults.headers.common.Authorization = userToken;
          store.dispatch(login(user));
        }
      } catch (error) {
        console.log('Couldnet fetch from local, error: ', error);
      }
    };

    fetchLocalUser();
  }, []);

  return <>{props.children}</>;
};

export default Auth;
