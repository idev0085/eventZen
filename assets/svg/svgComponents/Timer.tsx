import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  xmlns?: string;
  color?: string;
}

const Timer = ({
  width = 20,
  height = 20,
  color = '#4E4E4E',
  ...props
}: CustomSvgProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10 5.19995V9.99995L13.2 11.6"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default Timer;
