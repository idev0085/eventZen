import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { COLORS } from '../../utils/constants';

const CustomText = ({
  style,
  children,
  badge = false,
  bgColor = COLORS.secondary,
  onPress,
  icon,
  ...props
}: {
  style?: any;
  children: React.ReactNode;
  badge?: boolean;
  bgColor?: string;
  icon?: React.ReactNode;
  onPress?: () => void;
}) => {
  if (badge) {
    return (
      <View style={[styles.badge, { backgroundColor: bgColor }]}>
        {icon}
        <Text style={[styles.text, styles.badgeText, style]} {...props}>
          {children}
        </Text>
      </View>
    );
  }
  return (
    <Text onPress={onPress} style={[styles.text, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto-Regular',
  },
  badge: {
    borderRadius: 8,
    // paddingHorizontal: 5,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 12,
    marginLeft: 5,
  },
});

export default CustomText;
