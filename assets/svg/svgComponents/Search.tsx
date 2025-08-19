import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const Search = ({ width = 30, height = 30, color = 'black', ...props }) => (
  <Svg width={width} height={height} viewBox="0 0 20 20" fill="none" {...props}>
    <Path
      d="M9.33333 14.6667C12.2788 14.6667 14.6667 12.2788 14.6667 9.33333C14.6667 6.38781 12.2788 4 9.33333 4C6.38781 4 4 6.38781 4 9.33333C4 12.2788 6.38781 14.6667 9.33333 14.6667Z"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16.0001 16.0001L13.1001 13.1001"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default Search;
