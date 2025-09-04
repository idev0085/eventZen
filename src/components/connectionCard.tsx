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
import CustomText from './ui/text';
import SubTopicWrapper from './ui/subTopicWrapper';

// --- Type Definitions ---

interface Connection {
  id: string;
  avatarUrl: string;
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
    <SubTopicWrapper style={[styles.wrapper, containerStyle]}>
      <View>
        <CustomText style={styles.headerTitle}>Connections</CustomText>
        <View style={styles.cardContainer}>
          {/* Profile Pictures Section */}
          <View style={styles.profilesContainer}>
            {connections.map((connection, index) => (
              <Image
                key={connection.id}
                source={{ uri: connection?.avatarUrl }}
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
    </SubTopicWrapper>
  );
};

// --- Styles ---

const styles = StyleSheet.create({
  wrapper: {
    margin: 16,
    width: '92%',
  },
  headerTitle: {
    fontSize: TEXT_SIZES.md,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  cardContainer: {
    backgroundColor: COLORS.white,
    width: '100%',
    borderRadius: 10,
    padding: 15,
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
    color: COLORS.textPrimary,
    marginBottom: 14,
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
    fontSize: TEXT_SIZES.sm,
  },
});

export default ConnectionsCard;
