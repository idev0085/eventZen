import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ViewStyle,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { COLORS, PartyPopperIcon, TEXT_SIZES } from '../utils/constants';
import SubTopicWrapper from './ui/subTopicWrapper';
import Toast from 'react-native-simple-toast';

// --- Type Definitions ---
interface UpcomingEventProps {
  eventDate: Date;
  containerStyle?: ViewStyle;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface TimeUnitProps {
  value: number;
  label: 'Day' | 'Hrs' | 'Min' | 'Sec';
}

// --- Helper Function ---
const calculateTimeLeft = (targetDate: Date): TimeLeft | null => {
  if (!targetDate) return null;

  const difference = +targetDate - +new Date();

  if (difference <= 0) {
    return null;
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

const handleEventLive = () => {
  Toast.show('Event is Live.', Toast.LONG);
};

// --- UI Sub-components ---
const TimeUnit: React.FC<TimeUnitProps> = ({ value, label }) => (
  <View style={styles.timeUnit}>
    <Text style={styles.timeValue}>{String(value ?? 0).padStart(2, '0')}</Text>
    <Text style={styles.timeLabel}>{label}</Text>
  </View>
);

const CountdownView: React.FC<{ timeLeft: TimeLeft }> = ({ timeLeft }) => (
  <SubTopicWrapper>
    <View>
      <Text style={styles.title}>Upcoming Event in..</Text>
      <View style={styles.timerContainer}>
        <TimeUnit value={timeLeft.days} label="Day" />
        <Text style={styles.separator}>:</Text>
        <TimeUnit value={timeLeft.hours} label="Hrs" />
        <Text style={styles.separator}>:</Text>
        <TimeUnit value={timeLeft.minutes} label="Min" />
        <Text style={styles.separator}>:</Text>
        <TimeUnit value={timeLeft.seconds} label="Sec" />
      </View>
    </View>
  </SubTopicWrapper>
);

const EventLiveView: React.FC = () => (
  <TouchableOpacity onPress={handleEventLive}>
    <ImageBackground
      source={require('../../assets/images/otp_bg.png')}
      style={styles.liveContainer}
      imageStyle={{ borderRadius: 16 }}
    >
      <PartyPopperIcon style={styles.partyPopper} />
      <View style={styles.liveTextContainer}>
        <Text style={styles.liveTitle}>Event Now Live !!</Text>
        <Text style={styles.liveSubtitle}>
          The event has officially started—join live sessions and stay updated
          in real time.
        </Text>
      </View>
    </ImageBackground>
  </TouchableOpacity>
);

// --- Main Component ---
const UpcomingEvent: React.FC<UpcomingEventProps> = ({
  eventDate,
  containerStyle,
}) => {
  // Initialize with zeros so no NaN
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!eventDate) return;

    const updateTime = () => {
      const newTimeLeft = calculateTimeLeft(eventDate);
      setTimeLeft(newTimeLeft);
    };

    updateTime(); // run immediately
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  return (
    <View style={[styles.container, containerStyle]}>
      {timeLeft ? <CountdownView timeLeft={timeLeft} /> : <EventLiveView />}
    </View>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
  },
  title: {
    fontSize: TEXT_SIZES.md,
    marginBottom: 15,
    fontWeight: '600',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeUnit: {
    backgroundColor: COLORS.eventTimeBox,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 70,
  },
  timeValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
  },
  timeLabel: {
    fontSize: TEXT_SIZES.xs,
    color: '#ffffff',
    marginTop: 2,
  },
  separator: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d0d0d0',
    marginHorizontal: 4,
    paddingBottom: 15,
  },
  liveContainer: {
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 18,
    marginHorizontal: 14,
  },
  partyPopper: {
    marginRight: 8,
  },
  liveTextContainer: {
    flex: 1,
  },
  liveTitle: {
    fontSize: TEXT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  liveSubtitle: {
    fontSize: TEXT_SIZES.xs,
    color: COLORS.white,
    marginTop: 4,
  },
});

export default UpcomingEvent;
