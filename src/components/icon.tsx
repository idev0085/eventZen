// create a component for react native image where image can have optional background color, size and border radius
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { COLORS } from '../utils/constants';
interface IconProps {
  source: any;
  size?: number;
  backgroundColor?: string;
  borderRadius?: number;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
}
const Icon: React.FC<IconProps> = ({
  source,
  size = 24,
  backgroundColor = COLORS.primary,
  borderRadius = 8,
  resizeMode = 'cover',
}) => {
  return (
    <Image
      source={source}
      style={[
        styles.icon,
        { width: size, height: size, backgroundColor, borderRadius },
      ]}
      resizeMode={resizeMode}
    />
  );
};
const styles = StyleSheet.create({
  icon: {
    resizeMode: 'contain',
    borderWidth: 0.5,
    borderColor: '#ccc',
  },
});
export default Icon;
