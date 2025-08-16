import * as React from 'react';
import Svg, { SvgProps, Path, Circle } from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  xmlns?: string;
}

const AlertWithCircle = ({
  height = 36,
  width = 26,
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
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 24.335c6.11 0 8.935-.784 9.208-3.93 0-3.143-1.97-2.94-1.97-6.798 0-3.013-2.856-6.44-7.238-6.44-4.382 0-7.238 3.427-7.238 6.44 0 3.857-1.97 3.655-1.97 6.799.274 3.157 3.1 3.929 9.208 3.929Z"
      clipRule="evenodd"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15.588 27.595c-1.478 1.641-3.783 1.66-5.275 0"
    />
    <Circle cx={19} cy={10} r={4} fill="#FE7101" />
  </Svg>
);
export default AlertWithCircle;
