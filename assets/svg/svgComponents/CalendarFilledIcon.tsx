import React from 'react';
import Svg, { Rect, Path, Ellipse, SvgProps } from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  xmlns?: string;
}

const CalendarFilledIcon = ({
  height = 44,
  width = 44,
  ...props
}: CustomSvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 44 44" fill="none" {...props}>
    <Rect width="44" height="44" rx="22" fill="#E3EDFF" />
    <Path
      d="M14.5755 22.069C14.5755 21.2222 14.5755 18.855 14.5755 16.9487C14.5755 15.0423 16.0985 14.5264 16.9584 14.5067H28.2232C29.1619 14.4804 31 14.9321 31 16.9487C31 18.9653 31 24.406 31 26.8743C31 27.9575 30.6022 29.7693 28.2232 29.7693C25.8442 29.7693 23.1751 29.7693 22.2363 29.7693"
      stroke="#004FB8"
      strokeLinecap="round"
    />
    <Path d="M31 18.012H14.5952" stroke="#004FB8" strokeLinecap="round" />
    <Ellipse
      cx="5.35668"
      cy="5.35668"
      rx="5.35668"
      ry="5.35668"
      transform="matrix(-1 0 0 1 23.7133 20.5723)"
      stroke="#004FB8"
    />
    <Path
      d="M18.3567 22.7976V25.8501L16.604 27.6422"
      stroke="#004FB8"
      strokeLinecap="round"
    />
    <Path d="M27.4158 12.7144V16.2592" stroke="#004FB8" strokeLinecap="round" />
    <Path d="M18.0416 12.7144V16.2592" stroke="#004FB8" strokeLinecap="round" />
  </Svg>
);

export default CalendarFilledIcon;
