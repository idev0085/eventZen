import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  xmlns?: string;
}

const ArrowLeftIcon = ({
  height = 20,
  width = 20,
  ...props
}: CustomSvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 20 20" fill="none" {...props}>
    <Path
      d="M16 10H4"
      stroke="#4E4E4E"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10 16L4 10L10 4"
      stroke="#4E4E4E"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ArrowLeftIcon;
