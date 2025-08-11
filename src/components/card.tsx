import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../utils/constants';
import { formatDate } from '../utils/helpers';
interface CardProps {
    children: React.ReactNode;
    onPress?: () => void;
    style?: object;
}

const Card: React.FC<CardProps> = ({ children, onPress, style }) => {
    const Wrapper = onPress ? TouchableOpacity : View;
    return (
        <Wrapper style={[styles.card, style]} onPress={onPress}>
            <View style={styles.content}>
                {children}
            </View>
        </Wrapper>
    );
};
const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.primary,
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    content: {
        flexDirection: 'column',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    description: {
        fontSize: 14,
        color: '#fff',
        marginTop: 4,
    },
    date: {
        fontSize: 12,
        color: '#ccc',
        marginTop: 8,
    },
});
export default Card;