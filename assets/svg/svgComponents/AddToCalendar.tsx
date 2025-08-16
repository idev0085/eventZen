import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  xmlns?: string;
}

const AddToCalendar = ({
  height = 32,
  width = 32,
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
      stroke="#004FB8"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M22 6v2M10 6v2M15.05 26c-4.03 0-6.046 0-7.298-1.354C6.5 23.293 6.5 21.114 6.5 16.756v-.513c0-4.357 0-6.536 1.252-7.89C9.004 7 11.02 7 15.05 7h1.9c4.03 0 6.046 0 7.298 1.354C25.477 9.682 25.5 11.804 25.5 16M7 12h18M17 22h8m-4-4v8"
    />
  </Svg>
);
export default AddToCalendar;
