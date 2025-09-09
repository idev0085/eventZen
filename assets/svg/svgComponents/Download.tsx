import * as React from 'react';
import Svg, { SvgProps, Path, Rect } from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  xmlns?: string;
}

const Download = ({ height = 40, width = 41, ...props }: CustomSvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 41 40" fill="none" {...props}>
    <Rect x="1" y="0.5" width="39" height="39" rx="9.5" fill="#F5F5F5" />
    <Rect x="1" y="0.5" width="39" height="39" rx="9.5" stroke="#CACACA" />
    <Path
      d="M28.5 22.6666V26.2222C28.5 26.6937 28.3127 27.1459 27.9793 27.4793C27.6459 27.8127 27.1937 28 26.7222 28H14.2778C13.8063 28 13.3541 27.8127 13.0207 27.4793C12.6873 27.1459 12.5 26.6937 12.5 26.2222V22.6666"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16.0555 18.2223L20.5 22.6667L24.9444 18.2223"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M20.5 22.6667V12"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default Download;
