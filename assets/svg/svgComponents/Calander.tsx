import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  xmlns?: string;
  strokeColor?: string;
}

const Calander = ({
  height = 20,
  width = 20,
  strokeColor = '#4E4E4E',
  ...props
}: CustomSvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 20 20" fill="none" {...props}>
    <Path
      d="M16.2222 2.88892H3.77778C2.79594 2.88892 2 3.68485 2 4.66669V17.1111C2 18.093 2.79594 18.8889 3.77778 18.8889H16.2222C17.2041 18.8889 18 18.093 18 17.1111V4.66669C18 3.68485 17.2041 2.88892 16.2222 2.88892Z"
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.5554 1.11108V4.66664"
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6.44458 1.11108V4.66664"
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2 8.22217H18"
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default Calander;
