import React, {useState, useEffect} from 'react';
import {
  Text,
  Container,
  Header,
  Title,
  Content,
  Left,
  Right,
  Body,
  Form,
  Item,
  Input,
  Label,
  Toast,
} from 'native-base';
import {AsyncStorage} from 'react-native';
import {LoginLogo, LoginSubmitButton} from './Login.style';
import axios from 'axios';
import {loginURL} from '../../Config/API';
import {useStore} from 'react-redux';
import {login} from '../../Redux/Actions/LoggedUserActions';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const store = useStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginResult, setLoginResult] = useState();

  const navigation = useNavigation();

  useEffect(() => {
    if (store.getState().loggedUserReducer.loggedIn === true) {
      console.log('Im here');
      axios.defaults.headers.common.Authorization = store.getState().loggedUserReducer.user.token;
      navigation.navigate('Dashboard');
    }
  });

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
              text: 'Error: Password does not match',
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
              text: 'Successful login',
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
      .post(loginURL, requestBody, responseConfig)
      .then(res => {
        setLoginResult(res.data);
      })
      .catch(err => {
        setLoginResult(err.response.data);
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
    if (loginResult != undefined) {
      if (loginResult.res === true) {
        store.dispatch(login(loginResult.data));
        console.log('Logged in succesfully');
        axios.defaults.headers.common.Authorization = store.getState().loggedUserReducer.user.token;
        navigation.navigate('Dashboard');
        storeLogin();
      }
    }
  }, [loginResult]);

  return (
    <Container>
      <Header>
        <Left />
        <Body>
          <Title>Login</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <LoginLogo>Login</LoginLogo>
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
          <LoginSubmitButton full onPress={e => submitLogin()}>
            <Text>Login</Text>
          </LoginSubmitButton>
          <LoginSubmitButton
            full
            onPress={e => navigation.navigate('Register')}>
            <Text>Go to register</Text>
          </LoginSubmitButton>
        </Form>
      </Content>
    </Container>
  );
};

export default Login;
