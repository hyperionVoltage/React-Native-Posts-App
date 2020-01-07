import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';
import {View} from 'native-base';
import axios from 'axios';
import {getFollowersByUserId} from '../../../Config/API';
import {FollowItemContainer, FollowItemText} from '../Follow.style';

const Following = () => {
  const [following, setFollowing] = useState();

  useEffect(() => {
    const getFollowers = async () => {
      await axios.get(getFollowersByUserId).then(res => {
        setFollowing(res.data.data);
      });
    };
    getFollowers();
  }, []);

  return (
    <View>
      <FlatList
        data={following}
        renderItem={({item, index}) => (
          <FollowItemContainer>
            <FollowItemText>{item.email}</FollowItemText>
          </FollowItemContainer>
        )}
      />
    </View>
  );
};

export default Following;
