import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

/**
 * Interface for the PDFIcon component props.
 * Extends SvgProps to allow passing standard SVG properties.
 * @property {string} [color] - The color for the icon's stroke. Defaults to '#004FB8'.
 */
interface PDFIconProps extends SvgProps {
  color?: string;
}

const PDFIcon: React.FC<PDFIconProps> = ({
  color = '#004FB8', // Default color
  width = 18,
  height = 18,
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      {...props}
    >
      <Path
        d="M5.25 13.5V11.625M5.25 11.625V10.5C5.25 10.1464 5.25 9.96967 5.36533 9.85983C5.48065 9.75 5.66627 9.75 6.0375 9.75H6.5625C7.10616 9.75 7.54688 10.1697 7.54688 10.6875C7.54688 11.2053 7.10616 11.625 6.5625 11.625H5.25ZM15.75 9.75H14.7656C14.1469 9.75 13.8375 9.75 13.6453 9.93306C13.4531 10.1161 13.4531 10.4107 13.4531 11V11.625M13.4531 13.5V11.625M13.4531 11.625H15.0938M11.8125 11.625C11.8125 12.6605 10.9311 13.5 9.84375 13.5C9.59841 13.5 9.47575 13.5 9.38438 13.4498C9.16561 13.3295 9.1875 13.086 9.1875 12.875V10.375C9.1875 10.164 9.16561 9.92053 9.38438 9.80024C9.47575 9.75 9.59841 9.75 9.84375 9.75C10.9311 9.75 11.8125 10.5895 11.8125 11.625Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.25 16.5H8.04546C5.59955 16.5 4.3766 16.5 3.5273 15.9016C3.28397 15.7302 3.06794 15.5269 2.88578 15.2978C2.25 14.4985 2.25 13.3475 2.25 11.0455V9.13636C2.25 6.91398 2.25 5.8028 2.6017 4.91531C3.16711 3.48857 4.36285 2.36316 5.87877 1.83101C6.82172 1.5 8.00236 1.5 10.3636 1.5C11.7129 1.5 12.3876 1.5 12.9264 1.68915C13.7927 1.99324 14.4759 2.63632 14.799 3.45161C15 3.95874 15 4.59371 15 5.86364V7.5"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.25 9C2.25 7.61929 3.36929 6.5 4.75 6.5C5.24934 6.5 5.83803 6.58749 6.32352 6.45741C6.75489 6.34182 7.09182 6.00489 7.20741 5.57352C7.3375 5.08803 7.25 4.49934 7.25 4C7.25 2.61929 8.36929 1.5 9.75 1.5"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default PDFIcon;
