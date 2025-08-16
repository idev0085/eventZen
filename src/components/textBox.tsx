import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { COLORS } from '../utils/constants';

interface TextBoxProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    secureTextEntry?: boolean;
    style?: object;
    label?: string;
    required?: boolean;
    defaultValue?: string;
    editable?: boolean;
    disabled?: boolean;
    multiline?: boolean;
    numberOfLines?: number;
}

const TextBox: React.FC<TextBoxProps> = ({
    value,
    onChangeText,
    placeholder,
    secureTextEntry,
    style,
    label,
    required,
    defaultValue,
    editable = true,
    disabled = false,
    multiline = false,
    numberOfLines = 1,
}) => {
    return (
        <View style={styles.container}>
            {label && (
                <Text style={styles.label}>
                    {label}
                    {required && <Text style={styles.asterisk}> *</Text>}
                </Text>
            )}
            <TextInput
                style={[
                    styles.textBox,
                    multiline && styles.textArea,
                    style,
                    disabled && styles.disabled,
                ]}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                defaultValue={defaultValue}
                editable={editable && !disabled}
                multiline={multiline}
                numberOfLines={numberOfLines}
                placeholderTextColor={COLORS.placeholder}

            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 12,
    },
    label: {
        marginBottom: 4,
        fontSize: 16,
        color: COLORS.text,
    },
    asterisk: {
        color: 'red',
    },
    textBox: {
        height: 40,
        borderColor: COLORS.border,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 16,
        backgroundColor: COLORS.background,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    disabled: {
        backgroundColor: '#f0f0f0',
        color: '#a0a0a0',
    },
});

export default TextBox;