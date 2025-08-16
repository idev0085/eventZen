import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export const AddToCalendar = props => (
  <Svg
    width={props.height}
    height={props.width}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M22 6V8M10 6V8"
      stroke="#004FB8"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15.05 26C11.0195 26 9.00424 26 7.75212 24.6464C6.5 23.2927 6.5 21.1141 6.5 16.7568V16.2432C6.5 11.8859 6.5 9.70728 7.75212 8.35364C9.00424 7 11.0195 7 15.05 7H16.95C20.9805 7 22.9958 7 24.2479 8.35364C25.4765 9.68186 25.4996 11.8044 25.5 16"
      stroke="#004FB8"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7 12H25"
      stroke="#004FB8"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M17 22H25M21 18L21 26"
      stroke="#004FB8"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
