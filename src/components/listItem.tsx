import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { COLORS } from '../utils/constants';

interface ListItemProps {
    title: string;
    description?: string;
    leftImage?: ImageSourcePropType;
    rightImage?: ImageSourcePropType;
    onPress?: () => void;
}

const ListItem: React.FC<ListItemProps> = ({ title, description, leftImage, rightImage, onPress }) => {
    return (
        <TouchableOpacity style={styles.item} onPress={onPress}>
            {leftImage && <Image source={leftImage} style={styles.image} />}
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                {description && <Text style={styles.description}>{description}</Text>}
            </View>
            {rightImage && <Image source={rightImage} style={styles.image} />}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: COLORS.background,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    image: {
        width: 24,
        height: 24,
        marginHorizontal: 8,
        resizeMode: 'contain',
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
    },
    description: {
        fontSize: 14,
        color: COLORS.textSecondary,
    },
});

export default ListItem;