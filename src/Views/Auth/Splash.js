/* eslint-disable react-hooks/exhaustive-deps */
// In App.js in a new project

import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  ImageBackground,
} from 'react-native';

import { isLoggedIn } from '../../Redux/actions/auth';
import { connect } from 'react-redux';
import cardio from '../../assets/cardio.jpg';

const Splash = (props) => {
  useEffect(() => {
    setTimeout(() => {
      props.isLoggedIn();
    }, 2000);
  }, []);

  useEffect(() => {
    if (props.navigation.isFocused()) {
      if (props.auth.hasOwnProperty('isLogin')) {
        if (
          props.auth.isLogin?.error &&
          props.auth.isLogin?.response === 'Logged Out'
        ) {
          props.navigation.navigate('Login');
        } else {
          props.navigation.replace('TabNav');
        }
      }
    }
  }, [props]);

  return (
    <ImageBackground
      style={styles.container}
      source={cardio}
      resizeMethod={'resize'}
      resizeMode={'cover'}>
      <ActivityIndicator size="large" color="#000" animating />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = ({ auth }) => {
  return { auth };
};
const mapDispatchToProps = {
  isLoggedIn,
};
export default connect(mapStateToProps, mapDispatchToProps)(Splash);
