import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { COLORS } from '../../utils/constants';

const CustomText = ({
  style,
  children,
  badge = false,
  ...props
}: {
  style?: any;
  children: React.ReactNode;
  badge?: boolean;
}) => {
  if (badge) {
    return (
      <View style={styles.badge}>
        <Text style={[styles.text, styles.badgeText, style]} {...props}>
          {children}
        </Text>
      </View>
    );
  }
  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto-Regular',
  },
  badge: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default CustomText;
