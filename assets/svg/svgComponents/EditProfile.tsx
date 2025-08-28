import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  xmlns?: string;
}

const EditProfileIcon = ({
  height = 20,
  width = 21,
  ...props
}: CustomSvgProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M13.5779 4.50136C13.7368 4.34241 13.9255 4.21632 14.1332 4.1303C14.3409 4.04428 14.5635 4 14.7883 4C15.013 4 15.2356 4.04428 15.4433 4.1303C15.651 4.21632 15.8397 4.34241 15.9986 4.50136C16.1576 4.66031 16.2837 4.84901 16.3697 5.05669C16.4557 5.26436 16.5 5.48695 16.5 5.71174C16.5 5.93653 16.4557 6.15912 16.3697 6.3668C16.2837 6.57447 16.1576 6.76317 15.9986 6.92212L7.82855 15.0922L4.5 16L5.40779 12.6714L13.5779 4.50136Z"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default EditProfileIcon;
