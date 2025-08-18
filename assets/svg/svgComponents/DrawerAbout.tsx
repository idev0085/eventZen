import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const DrawerAbout = ({ width = 22, height = 22, ...props }) => (
  <Svg width={width} height={height} viewBox="0 0 22 22" fill="none" {...props}>
    <Path
      d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
      stroke="#7C7C7C"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M11 14.2V11"
      stroke="#7C7C7C"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M11 7.80005H11.008"
      stroke="#7C7C7C"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default DrawerAbout;
