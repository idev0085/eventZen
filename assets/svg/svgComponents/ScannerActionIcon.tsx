import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  xmlns?: string;
}

const ScannerActionIcon = ({
  height = 34,
  width = 34,
  ...props
}: CustomSvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 34 34" fill="none" {...props}>
    <Path
      d="M28.7 11.8V9.2C28.7 8.16566 28.2891 7.17368 27.5577 6.44229C26.8263 5.71089 25.8343 5.3 24.8 5.3H20.9M20.9 28.7H24.8C25.8343 28.7 26.8263 28.2891 27.5577 27.5577C28.2891 26.8263 28.7 25.8343 28.7 24.8V22.2M5.3 22.2V24.8C5.3 25.8343 5.71089 26.8263 6.44228 27.5577C7.17368 28.2891 8.16566 28.7 9.2 28.7H13.1M13.1 5.3H9.2C8.16566 5.3 7.17368 5.71089 6.44228 6.44229C5.71089 7.17368 5.3 8.16566 5.3 9.2V11.8M4 17H30"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ScannerActionIcon;
