import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  xmlns?: string;
}

const TabHomeActive = ({
  height = 26,
  width = 26,
  ...props
}: CustomSvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    {...props}
  >
    <Path
      fill="#004FB8"
      d="M4 12.724c0-1.746 0-2.62.352-3.387.354-.768 1.016-1.335 2.342-2.471l1.285-1.102C10.377 3.711 11.573 2.682 13 2.682s2.624 1.027 5.02 3.08l1.286 1.103c1.325 1.136 1.988 1.703 2.34 2.47.354.768.354 1.641.354 3.387v5.453c0 2.425 0 3.636-.753 4.39-.754.753-1.965.753-4.39.753H9.143c-2.425 0-3.636 0-4.39-.754C4 21.811 4 20.6 4 18.175v-5.451Z"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.214 23.318v-6.429a1.286 1.286 0 0 0-1.285-1.285h-3.857a1.286 1.286 0 0 0-1.286 1.285v6.429"
    />
  </Svg>
);
export default TabHomeActive;
