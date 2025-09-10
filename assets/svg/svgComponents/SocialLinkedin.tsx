import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  xmlns?: string;
}

const SocialLinkedin = ({
  height = 32,
  width = 32,
  ...props
}: CustomSvgProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z"
      fill="#0077B5"
    />
    <Path
      d="M11.3076 24.1465H7.68164V13.252H11.3076V24.1465ZM20.209 12.9961C22.5949 12.9961 24.3836 14.5534 24.3838 17.8994V24.1465H20.7578V18.3174C20.7577 16.8538 20.2331 15.8547 18.9209 15.8545C17.9192 15.8545 17.3216 16.5282 17.0596 17.1787C16.9637 17.4118 16.9404 17.7369 16.9404 18.0625V24.1465H13.3145C13.3147 24.0982 13.3621 14.2717 13.3145 13.252H16.9404V14.7949C17.4217 14.0531 18.284 12.9961 20.209 12.9961ZM9.51855 8C10.7587 8.00018 11.5224 8.81376 11.5459 9.88184C11.5459 10.9279 10.7584 11.7646 9.49414 11.7646H9.4707C8.25362 11.7645 7.46682 10.9278 7.4668 9.88184C7.4668 8.81364 8.27814 8 9.51855 8Z"
      fill="white"
    />
  </Svg>
);
export default SocialLinkedin;
