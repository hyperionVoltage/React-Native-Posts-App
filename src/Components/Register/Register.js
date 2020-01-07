import React, {useState, useEffect} from 'react';
import {
  Text,
  Container,
  Header,
  Title,
  Content,
  Button,
  Left,
  Right,
  Icon,
  Body,
  Form,
  Item,
  Input,
  Label,
  Toast,
} from 'native-base';
import {useStore} from 'react-redux';
import {RegisterLogo, RegisterSubmitButton} from './Register.style';
import {registerURL} from '../../Config/API';
import {login} from '../../Redux/Actions/LoggedUserActions';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const Register = () => {
  const store = useStore();

  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerResult, setRegisterResult] = useState();

  const validateFields = () => {
    if (
      email == '' ||
      email == undefined ||
      password == '' ||
      password == undefined
    ) {
      Toast.show({
        text: 'Please fill all the required fileds',
        buttonText: 'Okay',
        buttonTextStyle: {color: '#008000'},
        buttonStyle: {backgroundColor: '#5cb85c'},
      });
      return false;
    }

    return true;
  };

  const submitLogin = async () => {
    if (validateFields() === false) {
      return;
    }

    const requestBody = {email: email, password: password};

    const responseConfig = {
      validateStatus: status => {
        switch (status) {
          case 400:
            Toast.show({
              text: 'Error: User with email ' + email + ' already exists',
              buttonText: 'Okay',
              buttonTextStyle: {color: '#008000'},
              buttonStyle: {backgroundColor: '#5cb85c'},
            });
            break;

          case 404:
            Toast.show({
              text: 'Error: Network connection unavailable',
              buttonText: 'Okay',
              buttonTextStyle: {color: '#008000'},
              buttonStyle: {backgroundColor: '#5cb85c'},
            });
            break;

          case 200:
            Toast.show({
              text: 'Successful Register',
              buttonText: 'Okay',
              buttonTextStyle: {color: '#008000'},
              buttonStyle: {backgroundColor: '#5cb85c'},
            });
            break;

          default:
            break;
        }
      },
    };

    await axios
      .post(registerURL, requestBody, responseConfig)
      .then(res => {
        setRegisterResult(res.data);
      })
      .catch(error => {
        setRegisterResult(error.response.data);
      });
  };

  const storeLogin = async () => {
    try {
      await AsyncStorage.setItem('@LoggedUser:email', loginResult.data.email);
      await AsyncStorage.setItem('@LoggedUser:token', loginResult.data.token);
      await AsyncStorage.setItem(
        '@LoggedUser:user_id',
        loginResult.data.user_id.toString(),
      );
      console.log('Saved user to local');
    } catch (error) {
      console.log('Couldnet save to local, error: ', error);
    }
  };

  useEffect(() => {
    if (registerResult != undefined) {
      if (registerResult.res === true) {
        store.dispatch(login(registerResult.data));
        console.log('Logged in succesfully');
        axios.defaults.headers.common.Authorization = store.getState().loggedUserReducer.user.token;
        navigation.navigate('Dashboard');
        storeLogin();
      }
    }
  }, [registerResult]);

  return (
    <Container>
      <Header>
        <Left />
        <Body>
          <Title>Register</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <RegisterLogo>Register</RegisterLogo>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              defaultValue=""
              onChange={e => setEmail(e.nativeEvent.text)}
            />
          </Item>
          <Item floatingLabel last>
            <Label>Password</Label>
            <Input
              defaultValue=""
              onChange={e => setPassword(e.nativeEvent.text)}
            />
          </Item>
          <RegisterSubmitButton full onPress={e => submitLogin()}>
            <Text>Register</Text>
          </RegisterSubmitButton>
          <RegisterSubmitButton
            full
            onPress={e => navigation.navigate('Login')}>
            <Text>Go to login</Text>
          </RegisterSubmitButton>
        </Form>
      </Content>
    </Container>
  );
};

export default Register;
