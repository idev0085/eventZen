import React from 'react';
import Svg, { Rect, Path, SvgProps } from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  xmlns?: string;
}

const DownloadIcon = ({
  height = 39,
  width = 39,
  ...props
}: CustomSvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 39 39" fill="none" {...props}>
    <Rect x="0.5" y="0.5" width="38" height="38" rx="19" fill="#E2E2E2" />
    <Path
      d="M22.4119 22.4081L19.5031 19.4993L16.5942 22.4081"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M19.5032 19.4993V26.0441"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M25.6044 24.146C26.3137 23.7593 26.874 23.1474 27.1969 22.4069C27.5198 21.6665 27.5869 20.8395 27.3877 20.0567C27.1884 19.2738 26.7341 18.5796 26.0965 18.0836C25.4588 17.5876 24.6742 17.318 23.8664 17.3175H22.9501C22.73 16.4661 22.3197 15.6757 21.7502 15.0057C21.1806 14.3357 20.4666 13.8035 19.6617 13.4492C18.8569 13.0949 17.9822 12.9276 17.1034 12.96C16.2247 12.9924 15.3647 13.2236 14.5881 13.6361C13.8115 14.0487 13.1386 14.632 12.6199 15.3421C12.1012 16.0522 11.7502 16.8707 11.5933 17.7359C11.4364 18.6012 11.4778 19.4908 11.7142 20.3378C11.9506 21.1848 12.376 21.9672 12.9583 22.6261"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22.4119 22.4081L19.5031 19.4993L16.5942 22.4081"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default DownloadIcon;
