import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { VerifiedBadgeIcon } from '../utils/constants';

interface UserCardProps {
  imageUrl: string;
  companyName: string;
  userName: string;
  userTitle: string;
}

const UserCard: React.FC<UserCardProps> = ({
  imageUrl,
  companyName,
  userName,
  userTitle,
}) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.avatar} />
      <View style={styles.infoContainer}>
        <View style={styles.companyContainer}>
          <VerifiedBadgeIcon width={16} height={16} />
          <Text style={styles.companyName}>{companyName}</Text>
        </View>
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.userTitle}>{userTitle}</Text>
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
    borderRadius: 40,
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
    fontSize: 14,
    color: '#4b5563',
    marginLeft: 4,
    fontWeight: '600',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  userTitle: {
    fontSize: 16,
    color: '#6b7280',
  },
});

export default UserCard;
