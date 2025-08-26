import React from 'react';
import Svg, { Rect, Path, SvgProps } from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  xmlns?: string;
}

const ExhibitorsIcon = ({
  height = 54,
  width = 55,
  ...props
}: CustomSvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 55 54" fill="none" {...props}>
    <Rect x="0.375" width="54" height="54" rx="10" fill="#E3EDFF" />
    <Path
      d="M17.7 25.775V31.9875C17.7 34.2625 17.7 34.2625 19.85 35.7125L25.7625 39.125C26.65 39.6375 28.1 39.6375 28.9875 39.125L34.9 35.7125C37.05 34.2625 37.05 34.2625 37.05 31.9875V25.775C37.05 23.5 37.05 23.5 34.9 22.05L28.9875 18.6375C28.1 18.125 26.65 18.125 25.7625 18.6375L19.85 22.05C17.7 23.5 17.7 23.5 17.7 25.775Z"
      stroke="#004FB8"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M34.25 21.5375V18.25C34.25 15.75 33 14.5 30.5 14.5H24.25C21.75 14.5 20.5 15.75 20.5 18.25V21.45"
      stroke="#004FB8"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M28.1625 25.7375L28.875 26.85C28.9875 27.025 29.2375 27.2 29.425 27.25L30.7 27.575C31.4875 27.775 31.7 28.45 31.1875 29.075L30.35 30.0875C30.225 30.25 30.125 30.5375 30.1375 30.7375L30.2125 32.05C30.2625 32.8625 29.6875 33.275 28.9375 32.975L27.7125 32.4875C27.525 32.4125 27.2125 32.4125 27.025 32.4875L25.8 32.975C25.05 33.275 24.475 32.85 24.525 32.05L24.6 30.7375C24.6125 30.5375 24.5125 30.2375 24.3875 30.0875L23.55 29.075C23.0375 28.45 23.25 27.775 24.0375 27.575L25.3125 27.25C25.5125 27.2 25.7625 27.0125 25.8625 26.85L26.575 25.7375C27.025 25.0625 27.725 25.0625 28.1625 25.7375Z"
      stroke="#004FB8"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ExhibitorsIcon;
