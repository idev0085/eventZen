import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, LeftArrowIcon, TEXT_SIZES } from '../utils/constants';

interface CustomHeaderProps {
  title: string;
  onBackPress: () => void;
}

const CustomHeader = ({ title, onBackPress }: CustomHeaderProps) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <LeftArrowIcon />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'transparent',
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: TEXT_SIZES.md,
    color: COLORS.white,
  },
});

export default CustomHeader;
