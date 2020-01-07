import styled from 'styled-components';
import {Image, Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const DashboardPostImage = styled(Image)`
  width: ${width};
  height: ${height / 2};
`;
