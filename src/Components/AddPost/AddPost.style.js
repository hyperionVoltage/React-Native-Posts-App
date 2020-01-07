import styled from 'styled-components';
import {Text, Button, View, Thumbnail} from 'native-base';

export const AddPostButton = styled(Button)`
  margin: 20px;
  color: white;
`;

export const AddPostImage = styled(Thumbnail)`
  flex: 1;
  width: 100%;
`;

export const AddPostFooterText = styled(Text)`
  color: white;
  font-size: 15px;
`;
