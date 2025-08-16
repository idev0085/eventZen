import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  xmlns?: string;
}

const TimerIcon = ({ height = 12, width = 12, ...props }: CustomSvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    {...props}
  >
    <Path
      stroke="#004FB8"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11 6c0 2.76-2.24 5-5 5S1 8.76 1 6s2.24-5 5-5 5 2.24 5 5Z"
    />
    <Path
      stroke="#004FB8"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m7.855 7.59-1.55-.925c-.27-.16-.49-.545-.49-.86v-2.05"
    />
  </Svg>
);
export default TimerIcon;
