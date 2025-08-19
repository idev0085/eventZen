import * as React from 'react';
import Svg, { SvgProps, Path, Circle } from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  xmlns?: string;
}

const TabSessionActive = ({
  height = 28,
  width = 29,
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
      fill="#004FB8"
      d="M8.898 5.674h12.517c1.043-.03 3.085.473 3.085 2.713v11.029c0 1.203-.442 3.216-3.085 3.216h-6.652L16 20c2-5.5-4-8-6.5-7.5-1.243.248-3.25 1.577-3.25 1.577v-5.69c0-2.118 1.693-2.691 2.648-2.713Z"
    />
    <Path stroke="#fff" strokeLinecap="round" d="M24.5 9.569H6.272" />
    <Circle
      cx={5.952}
      cy={5.952}
      r={5.952}
      fill="#004FB8"
      stroke="#fff"
      transform="matrix(-1 0 0 1 16.404 12.414)"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      d="M10.452 14.886v3.392l-1.948 1.991M20.517 3.683V7.62M10.102 3.683V7.62"
    />
  </Svg>
);
export default TabSessionActive;
