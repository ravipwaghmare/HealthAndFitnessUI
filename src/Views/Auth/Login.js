// @ts-nocheck
/* eslint-disable react-native/no-inline-styles */
import { Button, Input, InputGroup, Text, View } from 'native-base';
import React, { Component } from 'react';
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import fitness from '../../assets/fitness.jpg';
import {
  clearLoginProps,
  clearSignupProps,
  login,
  signup,
} from '../../Redux/actions/auth';
const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: __DEV__ ? 'ravi.waghmare@calsoft.com' : '',
      password: __DEV__ ? '12345678' : '',
      hidePassword: true,
      showLoader: false,
      isAuthenticated: false,
      isMale: true,
      isSignup: true,
      username: __DEV__ ? 'raviw' : '',
      name: __DEV__ ? 'raviw' : '',
      dob: __DEV__ ? '11/11/1990' : '',
      weight: __DEV__ ? 90 : '',
      height: __DEV__ ? 170 : '',
      api: '',
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    var stateObj = prevState;
    if (nextProps.auth?.login?.response && !nextProps.auth?.login?.error) {
      stateObj.showLoader = false;
      Alert.alert('Unauthorized user', 'Logon failed', [{ text: 'OK' }], {
        cancelable: false,
      });
      nextProps.clearLoginProps();
    } else if (
      nextProps.auth?.login?.response &&
      nextProps.auth?.login?.error
    ) {
      nextProps.clearLoginProps();
      nextProps.navigation.navigate('TabNav');
    }

    if (nextProps.auth?.signup?.response && nextProps.auth?.signup?.error) {
      stateObj.showLoader = false;
      Alert.alert(
        'Unauthorized user',
        nextProps.auth?.signup?.response?.data?.error?.message || ' error',
        [{ text: 'OK' }],
        {
          cancelable: false,
        },
      );
      nextProps.clearSignupProps();
    } else if (
      nextProps.auth?.signup?.response &&
      !nextProps.auth?.signup?.error
    ) {
      nextProps.clearSignupProps();
      stateObj.showLoader = false;
      if (nextProps.auth?.signup?.response?.data?.hasOwnProperty('error')) {
        Alert.alert(
          '',
          nextProps.auth?.signup?.response?.data?.error?.message,
          [{ text: 'OK' }],
          {
            cancelable: false,
          },
        );
      } else {
        Alert.alert('', 'User Added Successfully', [{ text: 'OK' }], {
          cancelable: false,
        });
        stateObj.isSignup = false;
      }
    }

    return stateObj === prevState ? null : stateObj;
  }

  handleLogin = async () => {
    const {
      email,
      password,
      isSignup,
      isMale,
      username,
      name,
      dob,
      weight,
      height,
    } = this.state;
    if (
      !email ||
      !password ||
      !weight ||
      !height ||
      !dob ||
      !name ||
      !username
    ) {
      Alert.alert(
        `Error`,
        `Please fill all the required fields`,
        [{ text: 'OK' }],
        {
          cancelable: false,
        },
      );
    } else {
      if (!emailReg.test(email.trim())) {
        Alert.alert(
          'Unauthorized user',
          'Please enter valid Email Id',
          [{ text: 'OK' }],
          {
            cancelable: false,
          },
        );
      } else {
        this.setState({
          showLoader: true,
        });
        if (isSignup) {
          const data = {
            username,
            name,
            email,
            password,
            dob,
            weight: +weight,
            height: +height,
            gender: isMale ? 'Male' : 'Female',
          };
          this.props.signup(data, api);
        } else {
          const data = {
            email,
            password,
          };
          this.props.login(data, api);
        }
      }
    }
  };

  render() {
    const { showLoader, hidePassword, isSignup, isMale } = this.state;
    return (
      <>
        <ImageBackground
          style={styles.container}
          source={fitness}
          resizeMethod={'resize'}
          resizeMode={'cover'}>
          <>
            {isSignup ? (
              <>
                <View style={styles.inputWrapper}>
                  <InputGroup style={styles.inputGroup}>
                    <Input
                      placeholder="User Name"
                      onChangeText={(username) => this.setState({ username })}
                      value={this.state.username}
                      keyboardType="default"
                      returnKeyType="done"
                      placeholderTextColor="#ffff"
                      style={styles.inputText}
                    />
                  </InputGroup>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{ ...styles.inputWrapper, width: 100 }}>
                    <InputGroup style={styles.inputGroup}>
                      <Input
                        maxLength={3}
                        placeholder="Weight"
                        onChangeText={(weight) => this.setState({ weight })}
                        value={this.state.weight}
                        keyboardType="default"
                        returnKeyType="done"
                        placeholderTextColor="#ffff"
                        style={styles.inputText}
                      />
                    </InputGroup>
                  </View>
                  <View style={{ ...styles.inputWrapper, width: 100 }}>
                    <InputGroup style={styles.inputGroup}>
                      <Input
                        maxLength={3}
                        placeholder="Height"
                        onChangeText={(height) => this.setState({ height })}
                        value={this.state.height}
                        keyboardType="default"
                        returnKeyType="done"
                        placeholderTextColor="#ffff"
                        style={styles.inputText}
                      />
                    </InputGroup>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{ ...styles.inputWrapper, width: 100 }}>
                    <TouchableOpacity
                      style={styles.inputGroup}
                      onPress={() => this.setState({ isMale: true })}>
                      <Text
                        style={{
                          ...styles.gender,
                        }}>
                        Male
                      </Text>
                      <MaterialIcons
                        name={
                          isMale
                            ? 'radio-button-checked'
                            : 'radio-button-unchecked'
                        }
                        size={30}
                        color={isMale ? 'red' : '#fff'}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{ ...styles.inputWrapper, width: 100 }}>
                    <TouchableOpacity
                      style={styles.inputGroup}
                      onPress={() => this.setState({ isMale: false })}>
                      <Text
                        style={{
                          ...styles.gender,
                        }}>
                        Female
                      </Text>
                      <MaterialIcons
                        name={
                          !isMale
                            ? 'radio-button-checked'
                            : 'radio-button-unchecked'
                        }
                        size={30}
                        color={!isMale ? 'red' : '#fff'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.inputWrapper}>
                  <InputGroup style={styles.inputGroup}>
                    <Input
                      placeholder="Date of Birth(DD/MM/YY)"
                      onChangeText={(dob) => this.setState({ dob })}
                      value={this.state.dob}
                      keyboardType="numbers-and-punctuation"
                      returnKeyType="done"
                      placeholderTextColor="#ffff"
                      style={styles.inputText}
                    />
                  </InputGroup>
                </View>
                <View style={styles.inputWrapper}>
                  <InputGroup style={styles.inputGroup}>
                    <Input
                      placeholder="Name"
                      onChangeText={(name) => this.setState({ name })}
                      value={this.state.name}
                      keyboardType="default"
                      returnKeyType="done"
                      placeholderTextColor="#ffff"
                      style={styles.inputText}
                    />
                  </InputGroup>
                </View>
              </>
            ) : null}
            <View style={styles.inputWrapper}>
              <InputGroup style={styles.inputGroup}>
                <Input
                  placeholder="Email ID"
                  onChangeText={(email) => this.setState({ email })}
                  value={this.state.email}
                  keyboardType="email-address"
                  returnKeyType="done"
                  placeholderTextColor="#ffff"
                  style={styles.inputText}
                />
              </InputGroup>
            </View>
            <View style={styles.inputWrapper}>
              <InputGroup style={styles.inputGroup}>
                <Input
                  placeholder="Password"
                  onChangeText={(password) => this.setState({ password })}
                  value={this.state.password}
                  keyboardType="default"
                  returnKeyType="go"
                  onSubmitEditing={() => this.handleLogin()}
                  secureTextEntry={hidePassword}
                  placeholderTextColor="#ffff"
                  style={styles.inputText}
                />
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      hidePassword: !this.state.hidePassword,
                    })
                  }>
                  <Text uppercase style={{ marginRight: 10, color: '#ffff' }}>
                    {hidePassword ? 'Show' : 'Hide'}
                  </Text>
                </TouchableOpacity>
              </InputGroup>
            </View>

            <View style={styles.inputWrapper}>
              <InputGroup style={styles.inputGroup}>
                <Input
                  placeholder="API End"
                  onChangeText={(api) => this.setState({ api })}
                  value={this.state.api}
                  keyboardType="default"
                  returnKeyType="done"
                  placeholderTextColor="#ffff"
                  style={styles.inputText}
                />
              </InputGroup>
            </View>

            <Button
              rounded
              style={styles.button}
              onPress={() => this.handleLogin()}>
              {showLoader ? (
                <ActivityIndicator size="large" color="#FFFFFF" animating />
              ) : (
                <Text>{isSignup ? 'Signup' : 'Login'}</Text>
              )}
            </Button>
            <TouchableOpacity
              onPress={() => this.setState({ isSignup: !this.state.isSignup })}>
              <Text style={styles.loginOrSignUp}>
                {isSignup ? 'Login' : 'New user? Create an account'}
              </Text>
            </TouchableOpacity>
          </>
        </ImageBackground>
      </>
    );
  }
}
const mapStateToProps = ({ auth }) => {
  return { auth };
};
const mapDispatchToProps = {
  login,
  clearLoginProps,
  signup,
  clearSignupProps,
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  tabWrapper: {
    backgroundColor: '#0000',
    padding: 20,
    borderRadius: 20,
  },
  inputGroup: {
    borderRadius: 10,
  },
  gender: {
    color: '#fff',
    fontSize: 15,
  },
  inputWrapper: {
    marginVertical: 5,
  },
  inputText: {
    color: '#ffff',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#5499C7',
    marginTop: 30,
    alignContent: 'center',
    justifyContent: 'center',
  },
  loginOrSignUp: {
    color: '#fff',
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'red',
  },
});
