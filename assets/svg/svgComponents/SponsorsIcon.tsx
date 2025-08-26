import React from 'react';
import Svg, { Rect, Path, SvgProps } from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  xmlns?: string;
}

const SponsorsIcon = ({
  height = 54,
  width = 55,
  ...props
}: CustomSvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 55 54" fill="none" {...props}>
    <Rect x="0.125" width="54" height="54" rx="10" fill="#E3EDFF" />
    <Path
      d="M33 35.7249H21.25C20.725 35.7249 20.1375 35.3125 19.9625 34.8125L14.7875 20.3375C14.05 18.2625 14.9125 17.625 16.6875 18.9L21.5625 22.3875C22.375 22.95 23.3 22.6625 23.65 21.75L25.85 15.8875C26.55 14.0125 27.7125 14.0125 28.4125 15.8875L30.6125 21.75C30.9625 22.6625 31.8875 22.95 32.6875 22.3875L37.2625 19.125C39.2125 17.725 40.15 18.4375 39.35 20.7L34.3 34.8375C34.1125 35.3125 33.525 35.7249 33 35.7249Z"
      stroke="#004FB8"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M20.25 39.5H34"
      stroke="#004FB8"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M24 29.5H30.25"
      stroke="#004FB8"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default SponsorsIcon;
