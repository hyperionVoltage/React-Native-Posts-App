import React, {useState, useEffect} from 'react';
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
  Form,
  Item,
  Input,
  Label,
  Toast,
  View,
  Footer,
  FooterTab,
} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import {AddPostButton, AddPostImage, AddPostFooterText} from './AddPost.style';
import {addPost} from '../../Config/API';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [postReady, setPostReady] = useState(false);
  const [imageData, setImageData] = useState('');

  const navigation = useNavigation();

  const addImage = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      maxWidth: 400,
      maxHeight: 400,
    };

    ImagePicker.showImagePicker(options, res => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else {
        console.log('Image size: ', res.width + '*' + res.height);
        setImageData('data:image/jpeg;base64,' + res.data);
      }
    });
  };

  useEffect(() => {
    if (title.length != 0 && imageData != '') {
      setPostReady(true);
    } else {
      setPostReady(false);
    }
  }, [title, imageData]);

  const uploadPost = async () => {
    const requestBody = {
      title,
      image_url: imageData,
    };

    await axios
      .post(addPost, requestBody)
      .then(res => {
        Toast.show({
          text: 'Posted Successfully',
          buttonText: 'Okay',
          buttonTextStyle: {color: '#008000'},
          buttonStyle: {backgroundColor: '#5cb85c'},
        });
      })
      .catch(err => {
        switch (err.request.status) {
          case 401:
            Toast.show({
              text: 'User isnt authnticated, Please login',
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

          default:
            break;
        }
      });
  };

  return (
    <Container>
      <Header>
        <Left>
          <Button>
            <Icon
              name="ios-arrow-back"
              onPress={e => navigation.navigate('Dashboard')}
            />
          </Button>
        </Left>
        <Body>
          <Title>Add Post</Title>
        </Body>
        <Right />
      </Header>
      <View style={{flex: 1}}>
        <Form>
          <Item floatingLabel last>
            <Label>Post's title</Label>
            <Input onChange={e => setTitle(e.nativeEvent.text)} />
          </Item>
        </Form>
        {imageData === '' ? (
          <AddPostImage
            square
            source={require('../../Assets/AddPost/UploadIcon.png')}
          />
        ) : (
          <AddPostImage square source={{uri: imageData}} />
        )}
        <AddPostButton full onPress={e => addImage()}>
          <Text>Add image</Text>
        </AddPostButton>
      </View>
      <Footer>
        <FooterTab>
          <Button full disabled={!postReady} onPress={e => uploadPost()}>
            <AddPostFooterText>POST</AddPostFooterText>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

export default AddPost;
