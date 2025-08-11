// create a resuable component on react native button
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../utils/constants';
interface ButtonProps {
    title: string;
    onPress: () => void;
    style?: object;
    textStyle?: object;
}
const Button: React.FC<ButtonProps> = ({ title, onPress, style, textStyle }) => {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
export default Button; 