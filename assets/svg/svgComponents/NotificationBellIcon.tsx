import React from 'react';
import Svg, { Path, Circle, SvgProps } from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  xmlns?: string;
  hasNewNotification?: boolean;
}

const NotificationBellIcon = ({
  height = 36,
  width = 36,
  hasNewNotification = false,
}: CustomSvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 26 36" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13 24.335C19.1091 24.335 21.9353 23.5513 22.2083 20.4056C22.2083 17.2621 20.2379 17.4643 20.2379 13.6073C20.2379 10.5946 17.3823 7.16675 13 7.16675C8.61763 7.16675 5.76204 10.5946 5.76204 13.6073C5.76204 17.4643 3.79163 17.2621 3.79163 20.4056C4.06566 23.5632 6.89188 24.335 13 24.335Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15.5879 27.5952C14.11 29.2362 11.8047 29.2556 10.3127 27.5952"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {hasNewNotification && <Circle cx="19" cy="10" r="4" fill="#FE7101" />}
  </Svg>
);

export default NotificationBellIcon;
