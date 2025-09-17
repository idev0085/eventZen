import React from 'react';
import Svg, {
  Path,
  Defs,
  RadialGradient,
  LinearGradient,
  Stop,
  SvgProps,
} from 'react-native-svg';

/**
 * Interface for the EmojiColdFace component props.
 * @property {string} [shadowColor] - The color for the face's shadow. Defaults to '#EB8F00'.
 * @property {string} [featureColor] - The color for the eyes, eyebrows, and mouth. Defaults to '#422B0D'.
 * @property {string} [highlightColor] - The color for the eye highlights. Defaults to '#896024'.
 * @property {string} [tearReflectionColor] - The color for the reflection in the tear. Defaults to '#81D4FA'.
 */
interface EmojiColdFaceProps extends SvgProps {
  shadowColor?: string;
  featureColor?: string;
  highlightColor?: string;
  tearReflectionColor?: string;
}

const EmojiColdFace: React.FC<EmojiColdFaceProps> = ({
  shadowColor = '#EB8F00',
  featureColor = '#422B0D',
  highlightColor = '#896024',
  tearReflectionColor = '#81D4FA',
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
          id="paint0_radial_120_6260"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(20.9891 19.2333) scale(16.5412 16.5411)"
        >
          <Stop offset={0.5} stopColor="#FDE030" />
          <Stop offset={0.92} stopColor="#F7C02B" />
          <Stop offset={1} stopColor="#F4A223" />
        </RadialGradient>
        <LinearGradient
          id="paint1_linear_120_6260"
          x1="20.9891"
          y1="35.4667"
          x2="20.9891"
          y2="3"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.39} stopColor="#40C0E7" stopOpacity={0} />
          <Stop offset={1} stopColor="#5F7AFF" />
        </LinearGradient>
        <RadialGradient
          id="paint2_radial_120_6260"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(8.50002 19.2468) scale(9.69944 14.937)"
        >
          <Stop offset={0.46} stopColor="#29B6F6" />
          <Stop offset={1} stopColor="#1E88E5" />
        </RadialGradient>
      </Defs>
      <Path
        d="M20.9891 35.4667C12.8869 35.4667 4.14575 30.3847 4.14575 19.2333C4.14575 8.08199 12.8869 3 20.9891 3C25.4903 3 29.6431 4.48104 32.7213 7.18175C36.061 10.1438 37.8324 14.3256 37.8324 19.2333C37.8324 24.1411 36.061 28.2938 32.7213 31.2559C29.6431 33.9566 25.4613 35.4667 20.9891 35.4667Z"
        fill="url(#paint0_radial_120_6260)"
      />
      <Path
        d="M34.8975 9.58325C36.4453 12.0807 37.2526 15.0544 37.2526 18.362C37.2526 23.2698 35.4812 27.4225 32.1416 30.3846C29.0633 33.0853 24.8815 34.5954 20.4093 34.5954C15.1646 34.5954 9.66442 32.4609 6.41772 27.9336C9.54245 33.062 15.4202 35.4666 20.9901 35.4666C25.4623 35.4666 29.6441 33.9565 32.7224 31.2558C36.062 28.2937 37.8334 24.141 37.8334 19.2332C37.8334 15.5335 36.8257 12.2462 34.8975 9.58325Z"
        fill={shadowColor}
      />
      <Path
        d="M20.9891 35.4667C12.8869 35.4667 4.14575 30.3847 4.14575 19.2333C4.14575 8.08199 12.8869 3 20.9891 3C25.4903 3 29.6431 4.48104 32.7213 7.18175C36.061 10.1438 37.8324 14.3256 37.8324 19.2333C37.8324 24.1411 36.061 28.2938 32.7213 31.2559C29.6431 33.9566 25.4613 35.4667 20.9891 35.4667Z"
        fill="url(#paint1_linear_120_6260)"
      />
      <Path
        d="M21.1066 29.9777C22.2246 29.9777 23.334 30.1693 24.3881 30.5382C26.6242 31.3193 28.5612 28.7958 27.2631 26.821C25.9099 24.7795 23.8044 24.1987 21.1066 24.1987C18.4088 24.1987 16.3063 24.7534 14.953 26.8123C13.652 28.7899 15.5919 31.3077 17.828 30.5294C18.8821 30.1606 19.9915 29.9748 21.1066 29.9777Z"
        fill={featureColor}
      />
      <Path
        d="M8.18929 32.04C5.73248 32.04 3.83325 29.6558 3.83325 27.6143C3.83325 26.1797 4.47504 24.5158 5.384 22.21C5.49726 21.8702 5.64827 21.5275 5.79928 21.15C6.23197 20.0697 6.6124 18.8994 7.19321 17.8859C7.46909 17.3922 8.09345 17.218 8.58423 17.4939C8.74686 17.5868 8.88335 17.7204 8.97628 17.8859C9.51642 18.882 9.88814 19.9594 10.4486 21.2168C12.0371 24.7713 12.4814 26.2088 12.4814 27.6434C12.5366 29.6674 10.6083 32.04 8.18929 32.04Z"
        fill="url(#paint2_radial_120_6260)"
      />
      <Path
        d="M10.8475 29.3247C10.2928 30.1959 9.03247 30.0217 9.03247 28.5958C9.03247 27.684 9.21833 23.0027 10.0024 23.659C11.2744 24.7248 11.6374 28.1108 10.8475 29.3247Z"
        fill={tearReflectionColor}
      />
      <Path
        d="M10.4749 12.517C9.83605 12.6302 9.80411 13.5595 10.5011 13.5914C12.0402 13.6147 13.5271 13.0455 14.6596 12.003C15.0894 11.6313 15.4553 11.1927 15.737 10.6991C15.9055 10.458 15.8474 10.127 15.6093 9.95565C15.3711 9.78431 15.0372 9.84529 14.8658 10.0834L14.8368 10.1125C13.6955 11.3873 12.1593 12.2324 10.4749 12.517Z"
        fill={featureColor}
      />
      <Path
        d="M27.53 10.1205L27.501 10.0915C27.3326 9.85045 26.9986 9.79237 26.7576 9.9608C26.5165 10.1292 26.4585 10.4632 26.6298 10.7042C26.9144 11.195 27.2803 11.6335 27.713 12.0023C28.8456 13.0448 30.3324 13.6111 31.8716 13.585C32.5685 13.553 32.5366 12.6238 31.8948 12.5105C30.2105 12.2288 28.6742 11.3867 27.53 10.1205Z"
        fill={featureColor}
      />
      <Path
        d="M15.2978 15.4697C14.081 15.4697 12.9746 16.4977 12.9746 18.2053C12.9746 19.9128 14.081 20.9379 15.2978 20.9379C16.5175 20.9379 17.621 19.9099 17.621 18.2053C17.621 16.5006 16.5291 15.4697 15.2978 15.4697Z"
        fill={featureColor}
      />
      <Path
        d="M15.1956 16.6114C14.7833 16.4139 14.2867 16.5882 14.0863 17.0005C13.9324 17.3229 14.0021 17.7091 14.2605 17.9589C14.6729 18.1563 15.1695 17.9821 15.3699 17.5697C15.5238 17.2474 15.4541 16.8612 15.1956 16.6114Z"
        fill={highlightColor}
      />
      <Path
        d="M26.4497 15.4697C25.2329 15.4697 24.1265 16.4977 24.1265 18.2053C24.1265 19.9128 25.2329 20.9379 26.4497 20.9379C27.6665 20.9379 28.7729 19.9099 28.7729 18.2053C28.7729 16.5006 27.6665 15.4697 26.4497 15.4697Z"
        fill={featureColor}
      />
      <Path
        d="M26.3338 16.6114C25.9215 16.4139 25.4249 16.5882 25.2245 17.0005C25.0706 17.3229 25.1403 17.7091 25.3987 17.9589C25.8111 18.1563 26.3077 17.9821 26.5081 17.5697C26.662 17.2474 26.5923 16.8612 26.3338 16.6114Z"
        fill={highlightColor}
      />
    </Svg>
  );
};

export default EmojiColdFace;
