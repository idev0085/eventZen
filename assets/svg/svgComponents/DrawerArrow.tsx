import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  xmlns?: string;
}

const DrawerArrow = ({ height = 32, width = 32, ...props }: CustomSvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 20 20" fill="none" {...props}>
    <Path
      d="M7 16L13 10L7 4"
      stroke="#7C7C7C"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default DrawerArrow;
