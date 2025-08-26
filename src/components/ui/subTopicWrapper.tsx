import React from 'react';
import { StyleSheet, View } from 'react-native';

interface SubTopicWrapperProps {
  children: React.ReactNode;
  // style?: object;
}

const SubTopicWrapper = ({ children }: SubTopicWrapperProps) => {
  return <View style={styles.container}>{children}</View>;
};

export default SubTopicWrapper;

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    marginHorizontal: 12,
    padding: 8,
  },
});
