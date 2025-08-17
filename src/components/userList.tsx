import { StyleSheet, View } from 'react-native';
import Card from '../components/card';
import CustomText from '../components/text';
import { GreenBadge, COLORS } from '../utils/constants';
import Icon from '../components/icon';
interface UserListProps {
  name?: string;
  designation?: string;
  company?: string;
  image?: string;
}
export default function UserList({
  name,
  designation,
  company,
  image,
}: UserListProps) {
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
          <View style={styles.companyBox}>
            <GreenBadge />
            <CustomText style={styles.textCompany}>{company}</CustomText>
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
});
