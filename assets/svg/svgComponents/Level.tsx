import * as React from 'react';
import Svg, { Path, SvgProps, Text } from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  strokeColor?: string;
  backgroundColor?: string;
  label?: string;
  fontSize?: number;
  paddingHorizontal?: number;
  minContentWidth?: number;
}

const Level = ({
  height = 21,
  // `width` is kept for backward compatibility but if `label` is provided
  // we compute the svg width dynamically from the text length.
  width = 44,
  strokeColor = '#4E4E4E',
  backgroundColor = '#F0C800',
  label = '',
  fontSize = 8,
  paddingHorizontal = 6,
  minContentWidth = 16,
  ...props
}: CustomSvgProps) => {
  // Coerce width/height (they can be NumberProp from react-native-svg) to numbers
  const numericWidth =
    typeof width === 'number' ? width : parseFloat(String(width as any)) || 0;
  const numericHeight =
    typeof height === 'number'
      ? height
      : parseFloat(String(height as any)) || 0;

  // If there's no label, preserve original fixed shape & sizing
  if (!label) {
    return (
      <Svg
        width={numericWidth + 8}
        height={numericHeight}
        viewBox={`0 0 52 ${numericHeight}`}
        fill="none"
        {...props}
      >
        <Path d="M0 0H52L45.5556 10.5L52 21H0V0Z" fill={backgroundColor} />
      </Svg>
    );
  }

  // Estimate text width. We can't measure glyphs easily inside react-native-svg,
  // so use a conservative char-width multiplier relative to fontSize.
  const charWidthFactor = 0.55; // conservative average character width
  const estimatedTextWidth = Math.max(
    minContentWidth,
    label.length * fontSize * charWidthFactor,
  );

  // Geometry constants based on the original shape
  const notchWidth = 6.4444; // original indentation on the right side

  // final content width in viewBox units
  const contentWidth = estimatedTextWidth + paddingHorizontal * 2;
  const svgContentWidth = contentWidth + notchWidth; // leave room for the notch

  // Build a path that scales horizontally according to svgContentWidth
  const notchX = svgContentWidth - notchWidth;
  const pathD = `M0 0 H${svgContentWidth} L${notchX} ${
    numericHeight / 2
  } L${svgContentWidth} ${numericHeight} H0 V0 Z`;

  return (
    <Svg
      width={svgContentWidth}
      height={height}
      viewBox={`0 0 ${svgContentWidth} ${height}`}
      fill="none"
      {...props}
    >
      <Path d={pathD} fill={backgroundColor} />
      <Text
        x={paddingHorizontal}
        y={numericHeight / 2}
        fontSize={fontSize}
        fontWeight="bold"
        fill={strokeColor}
        textAnchor="start"
        alignmentBaseline="middle"
      >
        {label}
      </Text>
    </Svg>
  );
};

export default Level;
