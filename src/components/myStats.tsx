import React from 'react';
import { StyleSheet, View } from 'react-native';
import SubTopicWrapper from './ui/subTopicWrapper';
import CustomText from './ui/text';
import {
  CalendarFilledIcon,
  NetworkFilledIcon,
  FavoriteFilledIcon,
  TEXT_SIZES,
} from '../utils/constants';
import InfoCard from './InfoCard';

// Dummy data file
export interface Stat {
  id: string;
  icon: React.ReactNode; // React Native SVG icon
  count: number;
  label: string;
}

export const statsData: Stat[] = [
  {
    id: '1',
    icon: <CalendarFilledIcon />,
    count: 6,
    label: 'My Agenda',
  },
  {
    id: '2',
    icon: <NetworkFilledIcon />,
    count: 11,
    label: 'Connections',
  },
  {
    id: '3',
    icon: <FavoriteFilledIcon />,
    count: 8,
    label: 'Sessions Attendees',
  },
];

const MyStats = ({ ...props }) => {
  return (
    <SubTopicWrapper>
      <CustomText style={styles.headerTitle}>My Stats</CustomText>
      <View style={styles.cardsWrapper}>
        {/* {statsData.map(stat => (
          <InfoCard
            key={stat.id}
            icon={stat.icon}
            count={stat.count}
            label={stat.label}
          />
        ))} */}
        <InfoCard
          icon={<CalendarFilledIcon />}
          count={props?.data?.totalAgents}
          label={'My Agenda'}
        />
        <InfoCard
          icon={<NetworkFilledIcon />}
          count={props?.data?.totalConnections}
          label={'Connections'}
        />
        <InfoCard
          icon={<FavoriteFilledIcon />}
          count={props?.data?.totalSessionAttendee}
          label={'Sessions Attendees'}
        />
      </View>
    </SubTopicWrapper>
  );
};

export default MyStats;

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: TEXT_SIZES.md,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  cardsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
});
