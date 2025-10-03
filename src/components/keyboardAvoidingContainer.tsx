import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

interface KeyboardAvoidingContainerProps {
  bottomOffset?: number;
  style?: ViewStyle;
  children: React.ReactNode;
}

const KeyboardAvoidingContainer = ({
  bottomOffset = 60,
  style,
  children,
}: KeyboardAvoidingContainerProps) => {
  return (
    <KeyboardAwareScrollView
      bottomOffset={bottomOffset}
      keyboardShouldPersistTaps="handled"
      style={[styles.container, style]}
      contentContainerStyle={styles.content}
    >
      {children}
    </KeyboardAwareScrollView>
  );
};

export default KeyboardAvoidingContainer;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flexGrow: 1 },
});
