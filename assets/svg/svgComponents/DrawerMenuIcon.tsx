import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  xmlns?: string;
}

const DrawerMenuIcon = ({
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
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeWidth={2}
      d="M4 11.843h19.902M4 18.901h19.902M12.431 26.157H24"
    />
  </Svg>
);
export default DrawerMenuIcon;
