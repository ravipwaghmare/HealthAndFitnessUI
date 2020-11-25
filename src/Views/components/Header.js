// In App.js in a new project

import { Col, Row, Text } from 'native-base';
import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Header = ({ avatar }) => {
  return (
    <Row style={styles.header}>
      <Col>
        <Text uppercase style={styles.today}>
          Today
        </Text>
        <Text style={styles.myFeed}>My Feed</Text>
      </Col>
      <Image style={styles.avatar} source={{ uri: avatar }} />
    </Row>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    borderBottomColor: '#ddd',
    backgroundColor: '#eee',
    height: 120,
    paddingBottom: 10,
    borderBottomWidth: 2,
  },
  today: {
    fontSize: 15,
    color: '#aaa',
    marginLeft: 20,
    fontWeight: 'bold',
  },
  myFeed: {
    marginLeft: 20,
    fontSize: 30,
    color: '#000',
    fontWeight: 'bold',
    letterSpacing: -0.5,
  },
  avatarWrapper: {
    height: 50,
    width: 50,
    backgroundColor: '#aaa',
    marginRight: 20,
    borderRadius: 25,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
});

export default Header;
