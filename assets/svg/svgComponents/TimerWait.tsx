import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  xmlns?: string;
}

const TimerWait = ({ height = 20, width = 20, ...props }: CustomSvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 14 14" fill="none" {...props}>
    <Path
      d="M11.0834 1.1665V2.9165C11.0834 5.17167 9.25524 6.99984 7.00008 6.99984M2.91675 1.1665V2.9165C2.91675 5.17167 4.74492 6.99984 7.00008 6.99984M7.00008 6.99984C9.25524 6.99984 11.0834 8.82801 11.0834 11.0832V12.8332M7.00008 6.99984C4.74492 6.99984 2.91675 8.82801 2.91675 11.0832V12.8332"
      stroke="white"
    />
    <Path
      d="M2.33325 1.1665H11.6666M11.6666 12.8332H2.33325"
      stroke="white"
      strokeLinecap="round"
    />
  </Svg>
);
export default TimerWait;
