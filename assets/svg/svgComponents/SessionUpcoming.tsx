import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  xmlns?: string;
}

const SessionUpcoming = ({
  width = 28,
  height = 28,
  ...props
}: CustomSvgProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M7.00006 12.8333C3.7784 12.8333 1.16675 10.2217 1.16675 6.99999C1.16675 3.77833 3.77842 1.16666 7.00008 1.16666C9.61204 1.16666 11.7984 2.88334 12.5417 5.24999H11.0834"
      stroke="#F99F1B"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7 4.66666V6.99999L8.16667 8.16666"
      stroke="#F99F1B"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12.8071 7.58333C12.8245 7.39134 12.8333 7.19675 12.8333 7M8.75 12.8333C8.94926 12.7677 9.14392 12.6913 9.33333 12.6045M12.1279 9.91667C12.2403 9.69991 12.3407 9.47523 12.4279 9.24363M10.6123 11.8004C10.8132 11.6341 11.0035 11.4542 11.1818 11.2621"
      stroke="#F99F1B"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default SessionUpcoming;
