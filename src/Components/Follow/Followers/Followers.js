import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';
import {View} from 'native-base';
import axios from 'axios';
import {getMyFollowers} from '../../../Config/API';
import {FollowItemContainer, FollowItemText} from '../Follow.style';

const Followers = () => {
  const [followers, setFollowers] = useState();

  useEffect(() => {
    const getFollowers = async () => {
      await axios.get(getMyFollowers).then(res => {
        setFollowers(res.data.data);
      });
    };
    getFollowers();
  }, []);

  return (
    <View>
      <FlatList
        data={followers}
        renderItem={({item, index}) => (
          <FollowItemContainer>
            <FollowItemText>{item.email}</FollowItemText>
          </FollowItemContainer>
        )}
      />
    </View>
  );
};

export default Followers;
