import * as React from 'react';
import Svg, { SvgProps, Rect, Path } from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  xmlns?: string;
}
const RightArrowLoginButton = ({
  height = 69,
  width = 68,
  ...props
}: CustomSvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    {...props}
  >
    <Rect width={58} height={58} x={5.5} y={5} fill="#004FB8" rx={29} />
    <Rect
      width={58}
      height={58}
      x={5.5}
      y={5}
      stroke="#F3F3F3"
      strokeWidth={10}
      rx={29}
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M26.5 34h16M34.5 26l8 8-8 8"
    />
  </Svg>
);
export default RightArrowLoginButton;
