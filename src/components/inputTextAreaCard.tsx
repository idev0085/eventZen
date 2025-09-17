import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface InputTextAreaCardProps {
  title: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
  numberOfLines?: number;
}

const InputTextAreaCard: React.FC<InputTextAreaCardProps> = ({
  title,
  value,
  onChangeText,
  placeholder = 'Message',
  multiline = true,
  numberOfLines = 4,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={styles.textInput}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical="top" // For Android
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    height: 120,
  },
});

export default InputTextAreaCard;
