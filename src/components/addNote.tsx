import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { COLORS } from '../utils/constants';
import Card from '../components/card';
import CustomText from '../components/ui/text';

interface AddNoteProps {
  heading?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
}
export default function AddNote({
  heading,
  placeholder,
  value,
  onChangeText,
}: AddNoteProps) {
  return (
    <Card style={styles.card}>
      <CustomText style={styles.textHeadng}>{heading}</CustomText>
      <TextInput
        style={styles.input}
        placeholder={placeholder || 'Add a note...'}
        value={value}
        onChangeText={onChangeText}
        multiline
        numberOfLines={4}
        underlineColorAndroid="transparent"
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    // marginHorizontal: 10,
    alignSelf: 'center',
    width: '95%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  input: {
    height: 100,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
    color: COLORS.text,
    backgroundColor: COLORS.background,
    fontFamily: 'Roboto-Regular',
    paddingVertical: 0,
  },
  textHeadng: {
    color: COLORS.text,
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    marginBottom: 10,
  },
});
