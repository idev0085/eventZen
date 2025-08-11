import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { COLORS } from '../../utils/constants';
interface ButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  variant?: 'primary' | 'secondary' | 'outlined';
  loading?: boolean;
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}
const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  variant = 'primary',
  loading = false,
  disabled = false,
  iconLeft,
  iconRight,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: COLORS.secondary,
          borderColor: COLORS.secondary,
          textColor: COLORS.white,
        };
      case 'outlined':
        return {
          backgroundColor: 'transparent',
          borderColor: COLORS.primary,
          textColor: COLORS.primary,
        };

      default: // primary
        return {
          backgroundColor: COLORS.primary,
          borderColor: COLORS.primary,
          textColor: COLORS.white,
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: disabled
            ? COLORS.icon
            : variantStyles.backgroundColor,
          borderColor: variantStyles.borderColor,
          borderWidth: variant === 'outlined' ? 2 : 0,
          opacity: disabled ? 0.7 : 1,
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variantStyles.textColor} />
      ) : (
        <View style={styles.content}>
          {iconLeft && <View style={styles.icon}>{iconLeft}</View>}
          <Text
            style={[
              styles.buttonText,
              { color: variantStyles.textColor },
              textStyle,
            ]}
          >
            {title}
          </Text>
          {iconRight && <View style={styles.icon}>{iconRight}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    marginHorizontal: 6,
  },
});

export default Button;
