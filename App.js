import React, {useEffect} from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from './src/Redux';

import {Root} from 'native-base';

import {NavigationNativeContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './src/Components/Login';
import Register from './src/Components/Register';
import AddPost from './src/Components/AddPost';
import Follow from './src/Components/Follow';
import Dashboard from './src/Components/Dashboard';

import Auth from './src/Components/Auth';

const store = createStore(reducers);

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <Root>
        <Auth>
          <NavigationNativeContainer>
            <Stack.Navigator headerMode="none">
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="AddPost" component={AddPost} />
              <Stack.Screen name="Follow" component={Follow} />
              <Stack.Screen name="Dashboard" component={Dashboard} />
            </Stack.Navigator>
          </NavigationNativeContainer>
        </Auth>
      </Root>
    </Provider>
  );
};

export default App;
