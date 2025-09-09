import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Timer, COLORS, TEXT_SIZES } from '../utils/constants';

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
  const isCompleted = status === 'Completed';
  const primaryColor = isCompleted ? COLORS.textSecondary : COLORS.primary;
  const textColor = isCompleted ? COLORS.textSecondary : COLORS.textPrimary;

  const speakerText =
    Array.isArray(speakers) && speakers.length > 0
      ? speakers.map(speaker => speaker.name).join(' · ')
      : '';
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
        {Array.isArray(speakers) && speakers?.length > 0 && (
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
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {speakers?.map((speaker, index) => (
            <>
              <Text>{speaker.name}</Text>
              {index < speakers.length - 1 && (
                <Text style={styles.speakerSeparator}> · </Text>
              )}
            </>
          ))}
        </View>
        ;
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  sessionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    //height: 150,
  },
  leftWrapper: {
    width: '40%',
    //  height: '100%',
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
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  rightWrapper: {
    width: '50%',
    flexWrap: 'nowrap',
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
    fontSize: TEXT_SIZES.sm,
    color: COLORS.textPrimary,
    fontFamily: 'Roboto-Bold',
    paddingRight: 4,
  },
  textWorkshopBlack: {
    fontSize: TEXT_SIZES.sm,
    color: COLORS.black,
    fontFamily: 'Roboto-Bold',
    paddingRight: 4,
  },
  textTimeFrame: {
    fontSize: TEXT_SIZES.xxs,
    color: COLORS.textPrimary,
    marginLeft: 2,
    fontFamily: 'Roboto-Regular',
  },
  textTimeFrameBlue: {
    fontSize: TEXT_SIZES.xxs,
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
  speakerSeparator: {
    fontSize: TEXT_SIZES.sm,
    color: COLORS.textSecondary,
    lineHeight: 10,
  },
});

export default SessionListItem;
