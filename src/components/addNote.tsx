import React from 'react';
import { SafeAreaView, StyleSheet, TextInput, View } from 'react-native';
import { COLORS, TEXT_SIZES } from '../utils/constants';
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
      <SafeAreaView style={{ flex: 1 }}>
        <TextInput
          style={styles.input}
          placeholder={placeholder || 'Add a note...'}
          value={value}
          onChangeText={onChangeText}
          multiline
          underlineColorAndroid="transparent"
          editable
          numberOfLines={4}
          placeholderTextColor={'#B8B8B8'}
          textAlignVertical="top"
        />
      </SafeAreaView>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  input: {
    padding: 12,
    borderColor: COLORS.border,
    borderWidth: 2,
    borderRadius: 8,
    fontSize: 14,
    color: COLORS.text,
    backgroundColor: COLORS.background,
    fontFamily: 'Roboto-Regular',
    minHeight: 100,
  },
  textHeadng: {
    color: COLORS.text,
    fontSize: TEXT_SIZES.md,
    fontFamily: 'Roboto-Bold',
    marginBottom: 10,
  },
});
