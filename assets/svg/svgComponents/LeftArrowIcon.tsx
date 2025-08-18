import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  xmlns?: string;
}

const LeftArrowIcon = ({
  height = 25,
  width = 25,
  ...props
}: CustomSvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.5 12h16M12.5 4l8 8-8 8"
    />
  </Svg>
);
export default LeftArrowIcon;
