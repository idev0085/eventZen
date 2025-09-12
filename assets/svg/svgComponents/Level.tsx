import * as React from 'react';
import Svg, { Path, SvgProps, Text } from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  strokeColor?: string;
  backgroundColor?: string;
  label?: string;
}

const Level = ({
  height = 21,
  width = 44,
  strokeColor = '#4E4E4E',
  backgroundColor = '#F0C800',
  label = '',
  ...props
}: CustomSvgProps) => (
  <Svg
    width={width + 8}
    height={height}
    viewBox="0 0 52 21"
    fill="none"
    {...props}
  >
    <Path d="M0 0H52L45.5556 10.5L52 21H0V0Z" fill={backgroundColor} />
    {label ? (
      <Text
        x={5} // slightly more left padding for longer shape
        y={height / 2}
        fontSize={8}
        fontWeight="bold"
        fill={strokeColor}
        textAnchor="start"
        alignmentBaseline="middle"
      >
        {label}
      </Text>
    ) : null}
  </Svg>
);

export default Level;
