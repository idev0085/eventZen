import * as React from 'react';
import Svg, { SvgProps, Rect, Path } from 'react-native-svg';

interface RightArrowButtonProps extends SvgProps {
  isDisabled?: boolean;
  color?: string;
}
const RightArrowButton: React.FC<RightArrowButtonProps> = ({
  height = 69,
  width = 68,
  isDisabled = false,
  color = '#004FB8',
  ...props
}) => {
  const activeFillColor = color;
  const disabledFillColor = '#E0E0E0';
  const activeStrokeColor = '#F3F3F3';
  const disabledStrokeColor = '#BDBDBD';
  const activeArrowColor = '#fff';
  const disabledArrowColor = '#757575';

  const currentFill = isDisabled ? disabledFillColor : activeFillColor;
  const currentStroke = isDisabled ? disabledStrokeColor : activeStrokeColor;
  const currentArrowColor = isDisabled ? disabledArrowColor : activeArrowColor;

  return (
    <Svg width={width} height={height} fill="none" {...props}>
      <Rect width={58} height={58} x={5.5} y={5} fill={currentFill} rx={29} />
      <Rect
        width={58}
        height={58}
        x={5.5}
        y={5}
        stroke={currentStroke}
        strokeWidth={10}
        rx={29}
      />
      <Path
        stroke={currentArrowColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M26.5 34h16M34.5 26l8 8-8 8"
      />
    </Svg>
  );
};

export default RightArrowButton;
