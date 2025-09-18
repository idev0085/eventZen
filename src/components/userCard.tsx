import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import {
  COLORS,
  PNG_IMAGES,
  TEXT_SIZES,
  VerifiedBadgeIcon,
} from '../utils/constants';
import Icon from './icon';

interface UserCardProps {
  imageUrl: string;
  companyName: string;
  name: string;
  designation?: string;
}

const UserCard: React.FC<UserCardProps> = ({
  imageUrl,
  companyName,
  name,
  designation,
}) => {
  console.log('🚀 ~ UserCard ~ imageUrl:', imageUrl);
  return (
    <View style={styles.card}>
      <Icon
        source={{
          uri: imageUrl,
        }}
        size={80}
        backgroundColor={COLORS.placeholder}
        borderRadius={100}
      />
      <View style={styles.infoContainer}>
        {companyName && (
          <View style={styles.companyContainer}>
            <VerifiedBadgeIcon width={16} height={16} />
            <Text style={styles.companyName}>{companyName}</Text>
          </View>
        )}
        <Text style={styles.name}>{name ?? 'User Unknown'}</Text>
        <Text style={styles.designation}>{designation}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    marginHorizontal: 15,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  infoContainer: {
    marginLeft: 16,
    flex: 1,
  },
  companyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  companyName: {
    fontSize: TEXT_SIZES.xs,
    color: COLORS.primary,
    marginLeft: 4,
    fontWeight: '600',
  },
  name: {
    fontSize: TEXT_SIZES.lg,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 2,
    color: '#111827',
  },
  designation: {
    fontSize: TEXT_SIZES.xs,
    color: COLORS.textPrimary,
  },
});

export default UserCard;
