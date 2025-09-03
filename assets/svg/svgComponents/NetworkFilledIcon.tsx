import React from 'react';
import Svg, { Rect, Ellipse, Path, SvgProps } from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  xmlns?: string;
}

const NetworkFilledIcon = ({
  height = 44,
  width = 44,
  ...props
}: CustomSvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 44 44" fill="none" {...props}>
    <Rect width="44" height="44" rx="22" fill="#E3EDFF" />
    <Ellipse
      cx="21.9999"
      cy="16.311"
      rx="2.18182"
      ry="2.18181"
      stroke="#004FB8"
    />
    <Ellipse
      cx="27.8182"
      cy="26.4928"
      rx="2.18182"
      ry="2.18181"
      stroke="#004FB8"
    />
    <Ellipse
      cx="16.1818"
      cy="26.4928"
      rx="2.18182"
      ry="2.18181"
      stroke="#004FB8"
    />
    <Path
      d="M15.1819 22.7656C15.2122 21.6141 15.891 18.9475 18.3637 17.4929"
      stroke="#004FB8"
      strokeLinecap="round"
    />
    <Path
      d="M28.7273 22.7656C28.697 21.6141 28.0182 18.9475 25.5455 17.4929"
      stroke="#004FB8"
      strokeLinecap="round"
    />
    <Path
      d="M18.7273 28.9473C19.8485 29.6442 22.7091 30.62 25.1818 28.9473"
      stroke="#004FB8"
      strokeLinecap="round"
    />
  </Svg>
);

export default NetworkFilledIcon;
