import React from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';

interface SubTopicWrapperProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const SubTopicWrapper = ({ children, style }: SubTopicWrapperProps) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

export default SubTopicWrapper;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 12,
    padding: 8,
  },
});
