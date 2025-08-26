import React from 'react';
import Svg, { Rect, Path, SvgProps } from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  xmlns?: string;
}

const AttendeeIcon = ({
  height = 54,
  width = 55,
  ...props
}: CustomSvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 55 54" fill="none" {...props}>
    <Rect x="0.875" width="54" height="54" rx="10" fill="#E3EDFF" />
    <Path
      d="M30.375 23.25H35.375"
      stroke="#004FB8"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <Path
      d="M30.375 27.625H34.125"
      stroke="#004FB8"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <Rect
      x="15.375"
      y="15.75"
      width="25"
      height="22.5"
      rx="5"
      stroke="#004FB8"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
    <Path
      d="M19.125 32C20.6354 28.7737 26.2652 28.5614 27.875 32"
      stroke="#004FB8"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M26 23.25C26 24.6307 24.8807 25.75 23.5 25.75C22.1193 25.75 21 24.6307 21 23.25C21 21.8693 22.1193 20.75 23.5 20.75C24.8807 20.75 26 21.8693 26 23.25Z"
      stroke="#004FB8"
      strokeWidth="1.2"
    />
  </Svg>
);

export default AttendeeIcon;
