import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  xmlns?: string;
}

const DrawerHeaderQr = ({
  height = 50,
  width = 50,
  ...props
}: CustomSvgProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 40 41"
    fill="none"
    {...props}
    style={[{ borderRadius: 12, overflow: 'hidden' }, props.style]}
  >
    <Path
      d="M0 0.5h40v40a10 10 0 0 1-10 10H10A10 10 0 0 1 0 40.5V0.5Z"
      fill="#4D8BFF"
    />
    <Path
      d="M26.2963 9.73145H30C30.5523 9.73145 31 10.1792 31 10.7314V14.1738"
      stroke="white"
      strokeLinecap="round"
    />
    <Path
      d="M26.2468 31.2686H29.9504C30.5027 31.2686 30.9504 30.8208 30.9504 30.2686V26.8262"
      stroke="white"
      strokeLinecap="round"
    />
    <Path
      d="M13.7559 9.73145H10.0522C9.49996 9.73145 9.05225 10.1792 9.05225 10.7314V14.1738"
      stroke="white"
      strokeLinecap="round"
    />
    <Path
      d="M13.7037 31.2686H10C9.44772 31.2686 9 30.8208 9 30.2686V26.8262"
      stroke="white"
      strokeLinecap="round"
    />
    <Path
      d="M22.9873 13.1836H26.3442C26.8965 13.1836 27.3442 13.6313 27.3442 14.1836V17.6712C27.3442 18.2235 26.8965 18.6712 26.3442 18.6712H22.9873C22.435 18.6712 21.9873 18.2235 21.9873 17.6712V14.1836C21.9873 13.6313 22.435 13.1836 22.9873 13.1836Z"
      stroke="white"
      strokeLinecap="round"
    />
    <Path d="M23.9472 15.2739h1.3066v1.3066h-1.3066z" fill="white" />
    <Path
      d="M13.8412 13.1836H17.1981C17.7504 13.1836 18.1981 13.6313 18.1981 14.1836V17.6712C18.1981 18.2235 17.7504 18.6712 17.1981 18.6712H13.8411C13.2889 18.6712 12.8411 18.2235 12.8411 17.6712V14.1836C12.8411 13.6313 13.2889 13.1836 13.8412 13.1836Z"
      stroke="white"
      strokeLinecap="round"
    />
    <Path d="M14.8011 15.2739h1.3066v1.3066h-1.3066z" fill="white" />
    <Path
      d="M22.9873 22.3291H26.3442C26.8965 22.3291 27.3442 22.7768 27.3442 23.3291V26.8167C27.3442 27.369 26.8965 27.8167 26.3442 27.8167H22.9873C22.435 27.8167 21.9873 27.369 21.9873 26.8167V23.3291C21.9873 22.7768 22.435 22.3291 22.9873 22.3291Z"
      stroke="white"
      strokeLinecap="round"
    />
    <Path d="M23.9472 24.4199h1.3066v1.3066h-1.3066z" fill="white" />
    <Path
      d="M19.5046 23.3743V21.0225H16.1075V23.3743"
      stroke="white"
      strokeLinecap="round"
    />
    <Path
      d="M17.1529 23.7998V25.9876H19.2434"
      stroke="white"
      strokeLinecap="round"
    />
    <Path
      d="M15.5851 26.5105V24.1587H12.188"
      stroke="white"
      strokeLinecap="round"
    />
    <Path
      d="M12.1879 25.7268V28.0786H15.585"
      stroke="white"
      strokeLinecap="round"
    />
    <Path d="M19.5046 28.0786H17.1528" stroke="white" strokeLinecap="round" />
    <Path d="M14.5398 21.0225H12.188" stroke="white" strokeLinecap="round" />
  </Svg>
);
export default DrawerHeaderQr;
