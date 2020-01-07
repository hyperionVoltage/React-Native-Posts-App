import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';
import {
  Text,
  Container,
  Header,
  Title,
  Button,
  Left,
  Right,
  Icon,
  Body,
  Toast,
  View,
  Card,
  CardItem,
  Fab,
} from 'native-base';
import axios from 'axios';
import {getAllPosts, deletePost, addFollower} from '../../Config/API';
import {DashboardPostImage} from './Dashboard.style';
import {useNavigation} from '@react-navigation/native';
import {logout} from '../../Redux/Actions/LoggedUserActions';
import {useStore} from 'react-redux';

const Dashboard = () => {
  const store = useStore();
  const [posts, setPosts] = useState();

  const navigation = useNavigation();

  const followUser = async userId => {
    const requestBody = {
      f_user_id: userId,
    };

    await axios
      .post(addFollower, requestBody)
      .then(res => {
        Toast.show({
          text: 'User added to follow list',
          buttonText: 'Okay',
          buttonTextStyle: {color: '#008000'},
          buttonStyle: {backgroundColor: '#5cb85c'},
        });
      })
      .catch(err => {
        Toast.show({
          text: 'Already following the user',
          buttonText: 'Okay',
          buttonTextStyle: {color: '#008000'},
          buttonStyle: {backgroundColor: '#5cb85c'},
        });
      });
  };

  const removeOwnPost = async postId => {
    if (postId != undefined) {
      await axios
        .delete(deletePost + postId)
        .then(res => {
          Toast.show({
            text: 'Post has been deleted',
            buttonText: 'Okay',
            buttonTextStyle: {color: '#008000'},
            buttonStyle: {backgroundColor: '#5cb85c'},
          });
        })
        .catch(err => {
          Toast.show({
            text: 'Error removing post',
            buttonText: 'Okay',
            buttonTextStyle: {color: '#008000'},
            buttonStyle: {backgroundColor: '#5cb85c'},
          });
        });
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.setItem('@LoggedUser:email', undefined);
      await AsyncStorage.setItem('@LoggedUser:token', undefined);
      await AsyncStorage.setItem('@LoggedUser:user_id', undefined);
      store.dispatch(logout());
      navigation.navigate('Login');
    } catch (error) {}
  };

  useEffect(() => {
    if (store.getState().loggedUserReducer.loggedIn) {
      const getPosts = async () => {
        await axios
          .get(getAllPosts)
          .then(res => {
            setPosts(res.data.data);
          })
          .catch(err => {
            console.log('err: ', err.request);
            if (err.request.status === 401) {
              Toast.show({
                text: 'UnAutherized, Please sign in again',
                buttonText: 'Okay',
                buttonTextStyle: {color: '#008000'},
                buttonStyle: {backgroundColor: '#5cb85c'},
              });
              logout();
            }
          });
      };
      getPosts();
    }
  }, [removeOwnPost()]);

  return (
    <Container>
      <Header>
        <Left>
          <Button>
            <Icon
              name="ios-close"
              style={{fontSize: 40}}
              onPress={e => logout()}
            />
          </Button>
        </Left>
        <Body>
          <Title>Dashboard</Title>
        </Body>
        <Right>
          <Button>
            <Icon
              name="ios-people"
              style={{fontSize: 50}}
              onPress={e => navigation.navigate('Follow')}
            />
          </Button>
        </Right>
      </Header>

      <View>
        <FlatList
          data={posts}
          contentContainerStyle={{paddingBottom: 100}}
          renderItem={({item, index}) => (
            <Card>
              <CardItem>
                <Left>
                  <Body>
                    <Text style={{textAlign: 'center'}}>{item.title}</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <DashboardPostImage source={{uri: item.image_url}} />
              </CardItem>
              <CardItem>
                <Left>
                  <Body>
                    {item.is_my_post ? (
                      <Button
                        full
                        danger
                        onPress={e => removeOwnPost(item.post_id)}>
                        <Text>Remove post</Text>
                      </Button>
                    ) : (
                      <Button full onPress={e => followUser(item.user_id)}>
                        <Text>Follow user</Text>
                      </Button>
                    )}
                  </Body>
                </Left>
              </CardItem>
            </Card>
          )}
        />
        <Fab
          onPress={e => navigation.navigate('AddPost')}
          position="bottomRight"
          style={{backgroundColor: '#5067FF'}}
          containerStyle={{marginBottom: 50}}>
          <Icon name="add" />
        </Fab>
      </View>
    </Container>
  );
};

export default Dashboard;
