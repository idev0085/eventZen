import React from 'react';
import Svg, {
  Path,
  Defs,
  RadialGradient,
  Stop,
  SvgProps,
} from 'react-native-svg';

/**
 * Interface for the EmojiNormalFace component props.
 * Extends SvgProps to allow passing standard SVG properties.
 * @property {string} [shadowColor] - The color for the face's shadow. Defaults to '#EB8F00'.
 * @property {string} [featureColor] - The color for the eyes and mouth. Defaults to '#422B0D'.
 * @property {string} [highlightColor] - The color for the eye highlights. Defaults to '#896024'.
 */
interface EmojiNormalFaceProps extends SvgProps {
  shadowColor?: string;
  featureColor?: string;
  highlightColor?: string;
}

const EmojiNormalFace: React.FC<EmojiNormalFaceProps> = ({
  shadowColor = '#EB8F00',
  featureColor = '#422B0D',
  highlightColor = '#896024',
  width = 41,
  height = 40,
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 41 40"
      fill="none"
      {...props}
    >
      <Defs>
        <RadialGradient
          id="paint0_radial_120_6283"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(20.5 19.3845) scale(16.6951 16.6951)"
        >
          <Stop offset={0.5} stopColor="#FDE030" />
          <Stop offset={0.92} stopColor="#F7C02B" />
          <Stop offset={1} stopColor="#F4A223" />
        </RadialGradient>
      </Defs>
      <Path
        d="M20.5 35.769C12.3224 35.769 3.5 30.6397 3.5 19.3845C3.5 8.12931 12.3224 3 20.5 3C25.0431 3 29.2345 4.49483 32.3414 7.22069C35.7121 10.2103 37.5 14.431 37.5 19.3845C37.5 24.3379 35.7121 28.5293 32.3414 31.519C29.2345 34.2448 25.0138 35.769 20.5 35.769Z"
        fill="url(#paint0_radial_120_6283)"
      />
      <Path
        d="M14.7552 12.9478C13.5271 12.9478 12.4104 13.9853 12.4104 15.7088C12.4104 17.4322 13.5271 18.4669 14.7552 18.4669C15.9863 18.4669 17.1001 17.4293 17.1001 15.7088C17.1001 13.9883 15.998 12.9478 14.7552 12.9478Z"
        fill={featureColor}
      />
      <Path
        d="M14.6528 14.0997C14.2366 13.9004 13.7353 14.0763 13.5331 14.4925C13.3778 14.8178 13.4481 15.2076 13.709 15.4597C14.1252 15.659 14.6264 15.4832 14.8286 15.067C14.984 14.7416 14.9136 14.3518 14.6528 14.0997Z"
        fill={highlightColor}
      />
      <Path
        d="M26.0104 12.9478C24.7823 12.9478 23.6655 13.9853 23.6655 15.7088C23.6655 17.4322 24.7823 18.4669 26.0104 18.4669C27.2385 18.4669 28.3552 17.4293 28.3552 15.7088C28.3552 13.9883 27.2385 12.9478 26.0104 12.9478Z"
        fill={featureColor}
      />
      <Path
        d="M25.8935 14.0997C25.4773 13.9004 24.9761 14.0763 24.7738 14.4925C24.6185 14.8178 24.6888 15.2076 24.9497 15.4597C25.3659 15.659 25.8671 15.4832 26.0693 15.067C26.2247 14.7416 26.1543 14.3518 25.8935 14.0997Z"
        fill={highlightColor}
      />
      <Path
        d="M20.3246 27.7994C17.6662 27.8199 15.1279 26.7032 13.3487 24.7277C13.2139 24.5724 13.1817 24.3525 13.2667 24.1649C13.3517 23.9744 13.5393 23.8513 13.7474 23.8484C13.8412 23.8484 13.9349 23.8748 14.017 23.9217C15.4298 24.7336 17.7922 25.7418 20.3246 25.7418H20.3656C22.8951 25.7418 25.2605 24.7336 26.6703 23.9217C26.7524 23.8748 26.8462 23.8484 26.9399 23.8484C27.148 23.8513 27.3356 23.9744 27.4206 24.1649C27.5086 24.3525 27.4763 24.5724 27.3386 24.7277C25.5594 26.7032 23.0153 27.8229 20.3568 27.7994"
        fill={featureColor}
      />
      <Path
        d="M34.5364 9.64478C36.0986 12.1655 36.9135 15.1668 36.9135 18.5053C36.9135 23.4587 35.1255 27.6501 31.7549 30.6398C28.648 33.3656 24.4273 34.8898 19.9135 34.8898C14.62 34.8898 9.06864 32.7355 5.79175 28.166C8.94554 33.3422 14.878 35.7691 20.4997 35.7691C25.0135 35.7691 29.2342 34.2449 32.3411 31.5191C35.7118 28.5294 37.4997 24.3381 37.4997 19.3846C37.4997 15.6505 36.4826 12.3325 34.5364 9.64478Z"
        fill={shadowColor}
      />
    </Svg>
  );
};

export default EmojiNormalFace;
