import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Search, COLORS } from '../utils/constants';
import TextBox from '../components/ui/textBox';

interface SearchUIProps {
  heading?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
}
export default function SearchUI({
  placeholder,
  value,
  onChangeText,
}: SearchUIProps) {
  return (
    <View style={{ margin: 10 }}>
      <TextBox
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        style={styles.searchBox}
        rightIcon={<Search />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    // marginHorizontal: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: COLORS.textLight,
    height: 50,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 40,
    fontSize: 18,
    color: COLORS.black,
    fontFamily: 'Roboto-Regular',
  },
});
