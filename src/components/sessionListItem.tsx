import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { GreenBadge, Timer, COLORS } from '../utils/constants';

interface ListItemProps {
  onPress?: () => void;
  time?: string;
  location?: string;
  isFavorite?: boolean;
  speakers?: {
    name: string;
    designation?: string;
    company?: string;
  }[];
  workshopNo?: string;
  status?: string;
  title?: string;
}

const SessionListItem: React.FC<ListItemProps> = ({
  time,
  location,
  isFavorite,
  speakers,
  workshopNo,
  status,
  title,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.sessionItem} onPress={onPress}>
      <View style={styles.leftWrapper}>
        <View style={styles.leftTimesWrapper}>
          <Timer
            height={15}
            width={15}
            color={status === 'Completed' ? COLORS.icon : COLORS.primary}
          />
          <Text
            style={
              status === 'Completed'
                ? styles.textTimeFrame
                : styles.textTimeFrameBlue
            }
          >
            {time}
          </Text>
        </View>
        <Text
          style={
            status === 'Completed'
              ? styles.textWorkshop
              : styles.textWorkshopBlack
          }
        >
          {workshopNo}
        </Text>
      </View>
      <View style={styles.midleDotWrapper}>
        <View
          style={[
            styles.activeDot,
            status === 'Completed'
              ? { backgroundColor: COLORS.textSecondary }
              : { backgroundColor: COLORS.primary },
          ]}
        />
      </View>
      <View style={styles.rightWrapper}>
        <Text style={styles.textWorkshop}>{title}</Text>
        {speakers?.length > 0 && (
          <Text
            style={
              status === 'Completed'
                ? styles.textSpeaker
                : styles.textSpeakerBlue
            }
          >
            Speaker
          </Text>
        )}
        {speakers?.map((speaker, index) => (
          <Text key={index} style={styles.textSpeakerName}>
            {speaker.name}
          </Text>
        ))}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  sessionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
  },
  leftWrapper: {
    width: '40%',
    height: '100%',
    justifyContent: 'center',
  },
  leftTimesWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  midleDotWrapper: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  rightWrapper: {
    width: '60%',
    height: '100%',
    justifyContent: 'center',
    paddingRight: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  description: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  textCompany: {
    fontSize: 14,
    color: COLORS.primary,
    marginTop: 4,
  },
  textWorkshop: {
    fontSize: 16,
    color: COLORS.textPrimary,
    fontFamily: 'Roboto-Bold',
    paddingRight: 10,
  },
  textWorkshopBlack: {
    fontSize: 16,
    color: COLORS.black,
    fontFamily: 'Roboto-Bold',
    paddingRight: 10,
  },
  textTimeFrame: {
    fontSize: 14,
    color: COLORS.textPrimary,
    marginLeft: 2,
    fontFamily: 'Roboto-Regular',
  },
  textTimeFrameBlue: {
    fontSize: 14,
    color: COLORS.primary,
    marginLeft: 2,
    fontFamily: 'Roboto-Regular',
  },
  textSpeaker: {
    fontSize: 12,
    color: COLORS.black,
    fontFamily: 'Roboto-Bold',
    marginTop: 4,
  },
  textSpeakerBlue: {
    fontSize: 12,
    color: COLORS.primary,
    fontFamily: 'Roboto-Bold',
    marginTop: 4,
  },
  textSpeakerName: {
    fontSize: 14,
    color: COLORS.textPrimary,
    fontFamily: 'Roboto-Regular',
    marginTop: 4,
    marginRight: 15,
  },
});

export default SessionListItem;
