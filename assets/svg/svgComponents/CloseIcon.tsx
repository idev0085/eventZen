import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

/**
 * Interface for the CloseIcon component props.
 * Extends SvgProps to allow passing standard SVG properties.
 * @property {string} [color] - The color for the icon's stroke. Defaults to '#4E4E4E'.
 */
interface CloseIconProps extends SvgProps {
  color?: string;
}

const CloseIcon: React.FC<CloseIconProps> = ({
  color = '#4E4E4E',
  width = 12,
  height = 12,
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 12 12"
      fill="none"
      {...props}
    >
      <Path
        d="M9.5 2.5L2.5 9.5M2.5 2.5L9.5 9.5"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default CloseIcon;
