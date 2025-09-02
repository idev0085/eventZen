import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { COLORS, TEXT_SIZES } from '../utils/constants';

// --- Type Definitions ---

interface Connection {
  id: string;
  imageUrl: string;
}

interface ConnectionsCardProps {
  connections: Connection[];
  onStartNetworking: () => void;
  containerStyle?: ViewStyle;
}

// --- Main Component ---

const ConnectionsCard: React.FC<ConnectionsCardProps> = ({
  connections,
  onStartNetworking,
  containerStyle,
}) => {
  return (
    <View style={[styles.wrapper, containerStyle]}>
      <Text style={styles.headerTitle}>Connections</Text>
      <View style={styles.cardContainer}>
        {/* Profile Pictures Section */}
        <View style={styles.profilesContainer}>
          {connections.map((connection, index) => (
            <Image
              key={connection.id}
              source={{ uri: connection.imageUrl }}
              style={[
                styles.profileImage,
                index > 0 ? styles.overlappingImage : {},
              ]}
            />
          ))}
        </View>

        {/* Description Text */}
        <Text style={styles.descriptionText}>
          Connect and start networking with people
        </Text>

        {/* Action Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={onStartNetworking}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Start Networking</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// --- Styles ---

const styles = StyleSheet.create({
  wrapper: {
    margin: 16,
    width: '90%',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1c1c1e',
    marginBottom: 12,
  },
  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  profilesContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  overlappingImage: {
    marginLeft: -16,
  },
  descriptionText: {
    fontSize: TEXT_SIZES.xs,
    color: '#6c6c6e',
    // textAlign: '',
    marginBottom: 24,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '70%',
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 14,
  },
});

export default ConnectionsCard;
