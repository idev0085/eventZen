import * as React from 'react';
import Svg, { SvgProps, Path, Rect } from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  xmlns?: string;
}

const EmailPadding = ({
  height = 32,
  width = 32,
  ...props
}: CustomSvgProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 32 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Rect y="0.5" width={width} height={height} rx="16" fill="#E3EDFF" />
    <Path
      d="M11.2 11.7H20.8C21.46 11.7 22 12.24 22 12.9V20.1C22 20.76 21.46 21.3 20.8 21.3H11.2C10.54 21.3 10 20.76 10 20.1V12.9C10 12.24 10.54 11.7 11.2 11.7Z"
      stroke="#004FB8"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M22 12.8999L16 17.0999L10 12.8999"
      stroke="#004FB8"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);
export default EmailPadding;
