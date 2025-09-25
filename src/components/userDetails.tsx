import { StyleSheet, View } from 'react-native';
import Card from '../components/card';
import CustomText from '../components/ui/text';
import { GreenBadge, COLORS } from '../utils/constants';
import Icon from '../components/icon';
interface UserDetailsProps {
  name?: string;
  designation?: string;
  company?: string;
  image?: string;
  isAttendeeDetails?: boolean;
  roles?: string[];
}
export default function CompanyDetails({
  name,
  designation,
  company,
  image,
  isAttendeeDetails = false,
  roles = [],
}: UserDetailsProps) {
  return (
    <Card style={styles.card}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <View style={styles.imageBox}>
            <Icon
              source={{ uri: image }}
              size={100}
              backgroundColor={COLORS.placeholder}
              borderRadius={50}
            />
          </View>
        </View>
        <View style={styles.rightContainer}>
          <CustomText style={styles.textName}>{name}</CustomText>
          <CustomText style={styles.textDesignation}>{designation}</CustomText>
          {company && company !== '' && (
            <View style={styles.companyBox}>
              {isAttendeeDetails && <GreenBadge />}
              <CustomText style={styles.textCompany}>{company}</CustomText>
            </View>
          )}

          <View style={styles.rolesWrapper}>
            {roles.length > 0 &&
              roles?.map((role, index) => (
                <View key={index} style={styles.roleBox}>
                  <CustomText style={styles.textMeta}>{role}</CustomText>
                </View>
              ))}
          </View>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    // marginHorizontal: 10,
    alignSelf: 'center',
    width: '95%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftContainer: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContainer: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  imageBox: {
    backgroundColor: COLORS.placeholder,
    borderRadius: 50,
    height: 100,
    width: 100,
  },
  textName: {
    color: COLORS.text,
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
  },
  textDesignation: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
  companyBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textCompany: {
    color: COLORS.primary,
    fontSize: 16,
    fontFamily: 'Roboto-SemiBold',
    marginLeft: 5,
  },
  roleBox: {
    backgroundColor: '#004FB833',
    marginRight: 5,
    marginBottom: 5,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
  },
  rolesWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 5,
  },
  textMeta: {
    color: COLORS.text,
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
});
