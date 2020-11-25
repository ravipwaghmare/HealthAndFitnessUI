/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
// In App.js in a new project

import { Container } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import * as helper from '../Helpers';

const ColorScreen = (props) => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: helper.isSmallDevice(20, 0),
    backgroundColor: '#fff',
  },
});

const mapStateToProps = ({ colors }) => {
  return {
    colors,
  };
};
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ColorScreen);
