import React from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Left,
  Right,
  Icon,
  Body,
  Tabs,
  Tab,
} from 'native-base';
import Followers from './Followers';
import Following from './Following';
import {useNavigation} from '@react-navigation/native';

const Follow = () => {
  const navigation = useNavigation();
  return (
    <Container>
      <Header hasTabs>
        <Left>
          <Button>
            <Icon
              name="ios-arrow-back"
              onPress={e => navigation.navigate('Dashboard')}
            />
          </Button>
        </Left>
        <Body>
          <Title>Follows</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <Tabs>
          <Tab heading="Following">
            <Following />
          </Tab>
          <Tab heading="Followers">
            <Followers />
          </Tab>
        </Tabs>
      </Content>
    </Container>
  );
};

export default Follow;
