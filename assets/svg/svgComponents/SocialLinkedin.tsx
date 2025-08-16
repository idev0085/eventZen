import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  xmlns?: string;
}

const SocialLinkedin = ({
  height = 20,
  width = 20,
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
      fill="#0077B5"
      d="M0 16C0 7.163 7.163 0 16 0s16 7.163 16 16-7.163 16-16 16S0 24.837 0 16Z"
    />
    <Path
      fill="#fff"
      d="M11.308 24.146H7.682V13.252h3.626v10.894Zm8.901-11.15c2.386 0 4.175 1.557 4.175 4.903v6.247h-3.626v-5.829c0-1.463-.525-2.462-1.837-2.463-1.002 0-1.6.674-1.861 1.325-.096.233-.12.558-.12.884v6.084h-3.626c0-.049.048-9.875 0-10.895h3.626v1.543c.482-.742 1.344-1.799 3.269-1.799ZM9.519 8c1.24 0 2.003.814 2.027 1.882 0 1.046-.788 1.883-2.052 1.883h-.023c-1.217 0-2.004-.837-2.004-1.883C7.467 8.814 8.278 8 9.519 8Z"
    />
  </Svg>
);
export default SocialLinkedin;
