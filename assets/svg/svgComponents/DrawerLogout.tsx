import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  xmlns?: string;
}

const DrawerLogout = ({
  height = 20,
  width = 20,
  ...props
}: CustomSvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 16 18" fill="none" {...props}>
    <Path
      d="M12.9506 4.83008C13.9293 5.80914 14.5958 7.05642 14.8657 8.41422C15.1356 9.77203 14.9968 11.1794 14.4669 12.4583C13.9371 13.7373 13.0398 14.8304 11.8888 15.5995C10.7377 16.3685 9.38437 16.779 8 16.779C6.61563 16.779 5.26234 16.3685 4.11125 15.5995C2.96015 14.8304 2.06295 13.7373 1.53306 12.4583C1.00318 11.1794 0.864428 9.77203 1.13434 8.41422C1.40425 7.05642 2.07071 5.80914 3.04945 4.83008"
      stroke="#FF0000"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8.00391 1.22119V8.99897"
      stroke="#FF0000"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default DrawerLogout;
