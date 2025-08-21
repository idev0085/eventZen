import * as React from 'react';
import Svg, { SvgProps, Path, G, Defs, ClipPath, Rect } from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  xmlns?: string;
}

const Location = ({ height = 20, width = 20, ...props }: CustomSvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 20 20" fill="none" {...props}>
    <G clipPath="url(#clip0_120_5275)">
      <Path
        d="M18 8.22217C18 14.4444 10 19.7777 10 19.7777C10 19.7777 2 14.4444 2 8.22217C2 6.10044 2.84285 4.0656 4.34315 2.56531C5.84344 1.06502 7.87827 0.222168 10 0.222168C12.1217 0.222168 14.1566 1.06502 15.6569 2.56531C17.1571 4.0656 18 6.10044 18 8.22217Z"
        stroke="#4E4E4E"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.99992 10.8888C11.4727 10.8888 12.6666 9.69485 12.6666 8.22209C12.6666 6.74933 11.4727 5.55542 9.99992 5.55542C8.52716 5.55542 7.33325 6.74933 7.33325 8.22209C7.33325 9.69485 8.52716 10.8888 9.99992 10.8888Z"
        stroke="#4E4E4E"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_120_5275">
        <Rect width="20" height="20" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default Location;
