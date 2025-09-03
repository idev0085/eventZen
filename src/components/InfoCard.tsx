import React from 'react';
import { StyleSheet, View } from 'react-native';
import CustomText from './ui/text';
import { TEXT_SIZES } from '../utils/constants';

interface InfoCardProps {
  icon: React.ReactNode;
  count: number;
  label: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, count, label }) => {
  return (
    <View style={styles.card}>
      <View style={styles.iconWrapper}>{icon}</View>
      <CustomText style={styles.count}>
        {count.toString().padStart(2, '0')}
      </CustomText>
      <CustomText style={styles.label}>{label}</CustomText>
    </View>
  );
};

export default InfoCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: '46%',
    maxWidth: '46%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    margin: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  iconWrapper: {
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  count: {
    fontSize: TEXT_SIZES.lg,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  label: {
    fontSize: TEXT_SIZES.sm,
    color: '#555',
  },
});
