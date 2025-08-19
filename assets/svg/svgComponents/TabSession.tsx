import * as React from 'react';
import Svg, { SvgProps, Path, Circle } from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  xmlns?: string;
}
const TabSession = ({ height = 28, width = 29, ...props }: CustomSvgProps) => (
  <Svg
    width={29}
    height={28}
    viewBox="0 0 29 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M6.25053 14.0766C6.25053 13.1357 6.25053 10.5055 6.25053 8.38735C6.25053 6.26919 7.94273 5.69588 8.89824 5.674H21.4147C22.4577 5.64482 24.5 6.14665 24.5 8.38735C24.5 10.6281 24.5 16.6733 24.5 19.4158C24.5 20.6193 24.058 22.6324 21.4147 22.6324C18.7713 22.6324 15.8056 22.6324 14.7626 22.6324"
      stroke="#4E4E4E"
      strokeLinecap="round"
    />
    <Path d="M24.5 9.56892H6.27242" stroke="#4E4E4E" strokeLinecap="round" />
    <Circle
      cx={5.95186}
      cy={5.95186}
      r={5.95186}
      transform="matrix(-1 0 0 1 16.4037 12.4136)"
      stroke="#4E4E4E"
    />
    <Path
      d="M10.4518 14.8862V18.2779L8.50436 20.2692"
      stroke="#4E4E4E"
      strokeLinecap="round"
    />
    <Path d="M20.5175 3.68271V7.62144" stroke="#4E4E4E" strokeLinecap="round" />
    <Path d="M10.1017 3.68271V7.62144" stroke="#4E4E4E" strokeLinecap="round" />
  </Svg>
);

export default TabSession;
