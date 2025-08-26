import React from 'react';
import Svg, { Rect, Path, SvgProps } from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  xmlns?: string;
}

const SpeakersIcon = ({
  height = 54,
  width = 55,
  ...props
}: CustomSvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 55 54" fill="none" {...props}>
    <Rect x="0.625" width="54" height="54" rx="10" fill="#E3EDFF" />
    <Path
      d="M35.125 35.575H34.175C33.175 35.575 32.225 35.9625 31.525 36.6625L29.3875 38.775C28.4125 39.7375 26.825 39.7375 25.85 38.775L23.7125 36.6625C23.0125 35.9625 22.05 35.575 21.0625 35.575H20.125C18.05 35.575 16.375 33.9125 16.375 31.8625V18.2125C16.375 16.1625 18.05 14.5 20.125 14.5H35.125C37.2 14.5 38.875 16.1625 38.875 18.2125V31.85C38.875 33.9 37.2 35.575 35.125 35.575Z"
      stroke="#004FB8"
      strokeWidth="1.2"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M27.7125 23.1875C27.6625 23.1875 27.5874 23.1875 27.5249 23.1875C26.2124 23.1375 25.1749 22.075 25.1749 20.75C25.1749 19.4 26.2624 18.3125 27.6124 18.3125C28.9624 18.3125 30.05 19.4125 30.05 20.75C30.0625 22.075 29.025 23.15 27.7125 23.1875Z"
      stroke="#004FB8"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M24.1875 26.95C22.525 28.0625 22.525 29.875 24.1875 30.9875C26.075 32.2499 29.175 32.2499 31.0625 30.9875C32.725 29.875 32.725 28.0625 31.0625 26.95C29.175 25.7 26.0875 25.7 24.1875 26.95Z"
      stroke="#004FB8"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default SpeakersIcon;
