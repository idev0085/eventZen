import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  xmlns?: string;
  color?: string;
}

const DownloadIcon = ({
  height = 16,
  width = 16,
  color = '#004FB8',
  ...props
}: CustomSvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 16 16" fill="none" {...props}>
    <Path
      d="M8.00016 9.66667L8.00016 3M8.00016 9.66667C7.53334 9.66667 6.66118 8.33713 6.3335 8M8.00016 9.66667C8.46698 9.66667 9.33914 8.33713 9.66683 8"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.3334 11C13.3334 12.6547 12.9881 13 11.3334 13H4.66675C3.01208 13 2.66675 12.6547 2.66675 11"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default DownloadIcon;
