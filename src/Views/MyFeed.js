/* eslint-disable react-hooks/exhaustive-deps */
// In App.js in a new project

import { View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Alert, BackHandler, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { logout } from './../Redux/actions/auth';
import Header from './components/Header';

const MyFeed = (props) => {
  const { navigation, getVideos, videos } = props;
  const [videoList, setVideoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [avatar, setAvatar] = useState(
    'https://randomuser.me/api/portraits/lego/5.jpg',
  );

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {}, []);

  const backAction = () => {
    Alert.alert('Hold on!', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'YES',
        onPress: () => logMeOut(),
        style: 'destructive',
      },
    ]);
    return true;
  };

  const logMeOut = () => {
    props.logout();
    BackHandler.exitApp();
  };

  return (
    <>
      <Header avatar={avatar} />
      <View style={styles.container}></View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: '#eee',
    flex: 1,
    paddingHorizontal: 20,
  },
});

const mapStateToProps = ({}) => {
  return {};
};
const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyFeed);
