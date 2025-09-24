import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomText from './ui/text';
import { COLORS, TEXT_SIZES } from '../utils/constants';

interface ContactDetailsCardProps {
  email: string;
  phone: string;
  address: string;
  website?: string;
  labelTextStyle?: object;
  enablePhoneIcon?: boolean;
  enableEmailIcon?: boolean;
  onPressPhone?: () => void;
  onPressIcon?: () => void;
  onPressWebsite?: () => void;
}

const ContactDetailsCard = ({
  email,
  website,
  phone,
  address,
  enableEmailIcon,
  enablePhoneIcon,
  onPressPhone,
  onPressIcon,
  onPressWebsite,
  labelTextStyle,
}: ContactDetailsCardProps) => {
  return (
    <View style={styles.contactContainer}>
      <CustomText style={[styles.headerText, labelTextStyle]}>
        Contact Details
      </CustomText>
      {email && (
        <View>
          <View>
            <CustomText style={styles.subHeaderText}>Email</CustomText>
          </View>
          <CustomText style={styles.subHeaderValueText}>{email}</CustomText>
        </View>
      )}
      {phone && (
        <View>
          <View>
            <CustomText style={styles.subHeaderText}>Phone No.</CustomText>
          </View>
          <CustomText style={styles.subHeaderValueText}>{phone}</CustomText>
        </View>
      )}
      {address && (
        <View>
          <CustomText style={styles.subHeaderText}>Address</CustomText>
          <CustomText style={styles.subHeaderValueText}>{address}</CustomText>
        </View>
      )}
      {website && (
        <View>
          <CustomText style={styles.subHeaderText}>Website</CustomText>
          <CustomText
            style={[styles.subHeaderValueText, { color: COLORS.primary }]}
          >
            {website}
          </CustomText>
        </View>
      )}
    </View>
  );
};

export default ContactDetailsCard;

const styles = StyleSheet.create({
  contactContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  headerText: {
    fontSize: TEXT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: 5,
    marginBottom: 5,
  },
  subHeaderText: {
    fontSize: TEXT_SIZES.md,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: 10,
  },
  subHeaderValueText: {
    fontSize: TEXT_SIZES.sm,
    fontWeight: '400',
    color: '#595959',
  },
});
