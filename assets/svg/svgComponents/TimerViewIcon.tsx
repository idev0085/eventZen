import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  xmlns?: string;
}

const TimerViewIcon = ({
  height = 20,
  width = 20,
  ...props
}: CustomSvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    {...props}
  >
    <Path
      stroke="#4E4E4E"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"
    />
    <Path
      stroke="#4E4E4E"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 5.2V10l3.2 1.6"
    />
  </Svg>
);
export default TimerViewIcon;
