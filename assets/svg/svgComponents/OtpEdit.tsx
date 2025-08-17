import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  xmlns?: string;
}

const OtpEdit = ({ height = 13, width = 13, ...props }: CustomSvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={13}
    fill="none"
    {...props}
  >
    <G stroke="#004FB8" strokeLinejoin="round" clipPath="url(#a)">
      <Path d="M7.537 2.035c.372-.403.559-.605.757-.723a1.553 1.553 0 0 1 1.551-.023c.201.112.393.308.777.7.385.392.577.589.686.794a1.647 1.647 0 0 1-.023 1.585c-.115.202-.313.393-.708.773L5.875 9.67c-.749.721-1.123 1.082-1.591 1.265-.468.182-.982.169-2.011.142l-.14-.004c-.314-.008-.47-.012-.561-.115-.091-.104-.079-.263-.054-.582l.014-.173c.07-.898.104-1.347.28-1.751.175-.404.478-.731 1.083-1.387l4.642-5.03ZM7 2.093l3.5 3.5" />
      <Path strokeLinecap="round" d="M7.5 11.093h4" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.5.093h12v12H.5z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default OtpEdit;
