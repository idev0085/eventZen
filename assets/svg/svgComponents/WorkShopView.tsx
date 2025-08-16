import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  xmlns?: string;
}

const WorkShopView = ({
  height = 20,
  width = 20,
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
      stroke="#4E4E4E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      d="M10.833 18.333H4.167c-1.667 0-2.5-.833-2.5-2.5V9.167c0-1.667.833-2.5 2.5-2.5h4.166v9.166c0 1.667.834 2.5 2.5 2.5ZM8.425 3.333c-.067.25-.092.525-.092.834v2.5H4.167V5c0-.917.75-1.667 1.666-1.667h2.592ZM11.667 6.667v4.166M15 6.667v4.166M14.167 14.167H12.5a.836.836 0 0 0-.833.833v3.333H15V15a.836.836 0 0 0-.833-.833ZM5 10.833v3.334"
    />
    <Path
      stroke="#4E4E4E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      d="M8.333 15.833V4.167c0-1.667.834-2.5 2.5-2.5h5c1.667 0 2.5.833 2.5 2.5v11.666c0 1.667-.833 2.5-2.5 2.5h-5c-1.666 0-2.5-.833-2.5-2.5Z"
    />
  </Svg>
);
export default WorkShopView;
