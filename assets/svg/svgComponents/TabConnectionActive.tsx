import * as React from 'react';
import Svg, { SvgProps, Circle, Path } from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  xmlns?: string;
}

const TabConnectionActive = ({
  height = 28,
  width = 28,
  ...props
}: CustomSvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    {...props}
  >
    <Circle cx={14} cy={6.889} r={2.727} fill="#004FB8" stroke="#004FB8" />
    <Circle cx={21.273} cy={19.616} r={2.727} fill="#004FB8" stroke="#004FB8" />
    <Circle cx={6.727} cy={19.616} r={2.727} fill="#004FB8" stroke="#004FB8" />
    <Path
      stroke="#004FB8"
      strokeLinecap="round"
      d="M5.477 14.957c.038-1.44.887-4.773 3.978-6.591M22.41 14.957c-.039-1.44-.887-4.773-3.978-6.591M9.91 22.684c1.4.871 4.976 2.091 8.067 0"
    />
  </Svg>
);
export default TabConnectionActive;
