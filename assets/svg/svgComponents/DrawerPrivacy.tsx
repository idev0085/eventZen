import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const DrawerPrivacyPolicy = ({ width = 22, height = 23, ...props }) => (
  <Svg width={width} height={height} viewBox="0 0 22 23" fill="none" {...props}>
    <Path
      d="M3.01389 10.2848V6.6021C3.01389 5.93921 3.60313 5.20266 4.41332 5.20266C7.65411 5.20266 10.0356 3.48406 11.1159 2.62476C13.8411 4.68708 16.7136 5.05535 17.7448 5.20266C18.5697 5.32051 18.9969 5.7919 18.9969 6.6021C18.9724 6.72485 18.938 7.63326 18.9969 10.2848C19.0706 13.5993 17.8184 15.4406 16.4927 16.9137C15.432 18.0922 12.368 19.7126 10.9686 20.3755C10.1338 20.0809 7.88982 18.976 5.5918 16.9137C3.29378 14.8514 2.91568 11.6352 3.01389 10.2848Z"
      stroke="#7C7C7C"
    />
    <Path
      d="M8.1698 10.58L10.5267 12.937L14.4304 8.88599"
      stroke="#7C7C7C"
      strokeLinecap="round"
    />
  </Svg>
);

export default DrawerPrivacyPolicy;
