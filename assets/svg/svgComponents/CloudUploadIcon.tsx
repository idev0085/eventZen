import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  xmlns?: string;
}

const CloudUploadIcon = ({
  height = 25,
  width = 25,
  ...props
}: CustomSvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 25 25" fill="none" {...props}>
    <Path
      d="M15.4119 15.408L12.5031 12.4991L9.59424 15.408"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12.5032 12.4991V19.044"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M18.6044 17.146C19.3137 16.7593 19.874 16.1474 20.1969 15.4069C20.5198 14.6665 20.5869 13.8395 20.3877 13.0567C20.1884 12.2738 19.7341 11.5796 19.0965 11.0836C18.4588 10.5876 17.6742 10.318 16.8664 10.3175H15.9501C15.73 9.46612 15.3197 8.67571 14.7502 8.00571C14.1806 7.3357 13.4666 6.80353 12.6617 6.44921C11.8569 6.09488 10.9822 5.92762 10.1034 5.96C9.22467 5.99238 8.36466 6.22355 7.58808 6.63614C6.81151 7.04873 6.13857 7.63201 5.61986 8.34211C5.10115 9.05221 4.75017 9.87066 4.59331 10.7359C4.43644 11.6012 4.47777 12.4908 4.71419 13.3378C4.95061 14.1848 5.37597 14.9672 5.95829 15.6261"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15.4119 15.408L12.5031 12.4991L9.59424 15.408"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default CloudUploadIcon;
