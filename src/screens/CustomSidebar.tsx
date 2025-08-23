import {
  Alert,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerProfile,
  DrawerMyAgenda,
  DrawerArrow,
  COLORS,
  DrawerHeaderQr,
  DrawerLogout,
  DrawerFavSession,
  DrawerSpeaker,
  DrawerExhibitor,
  DrawerSponsor,
  DrawerHelp,
  DrawerAbout,
  DrawerLocation,
  DrawerPrivacyPolicy,
  DrawerTermsCondition,
  PNG_IMAGES,
} from '../utils/constants';
import CustomText from '../components/ui/text';
import Icon from '../components/icon';
import Card from '../components/card';
import { DrawerContentScrollView } from '@react-navigation/drawer';
const ICON_SIZE = 30;
const CustomSideBarMenus = [
  {
    name: 'Profile',
    icon: DrawerProfile,
    route: 'Profile',
    arrow: DrawerArrow,
  },
  {
    name: 'My Agenda',
    icon: DrawerMyAgenda,
    route: 'MyAgenda',
    arrow: DrawerArrow,
  },
  {
    name: 'Favorite Session',
    icon: DrawerFavSession,
    route: 'FavoriteSession',
    arrow: DrawerArrow,
  },
  {
    name: 'Speakers',
    icon: DrawerSpeaker,
    route: 'Speakers',
    arrow: DrawerArrow,
  },
  {
    name: 'Exhibitors',
    icon: DrawerExhibitor,
    route: 'Exhibitors',
    arrow: DrawerArrow,
  },
  {
    name: 'Sponsors',
    icon: DrawerSponsor,
    route: 'Sponsors',
    arrow: DrawerArrow,
  },
  {
    name: 'Help and support',
    icon: DrawerHelp,
    route: 'Help and support',
    arrow: DrawerArrow,
  },
];
const CustomSideBarCMS = [
  {
    name: 'About',
    icon: DrawerAbout,
    route: 'About',
    arrow: DrawerArrow,
  },
  {
    name: 'Location',
    icon: DrawerLocation,
    route: 'Location',
    arrow: DrawerArrow,
  },
  {
    name: 'Privacy Policy',
    icon: DrawerPrivacyPolicy,
    route: 'PrivacyPolicy',
    arrow: DrawerArrow,
  },
  {
    name: 'Terms & Conditions',
    icon: DrawerTermsCondition,
    route: 'TermsConditions',
    arrow: DrawerArrow,
  },
];
export default function CustomSideBar() {
  return (
    <DrawerContentScrollView>
      <View style={styles.container}>
        <ImageBackground
          source={PNG_IMAGES.ProfileBg}
          style={styles.backgroundImage}
          imageStyle={styles.imageStyle}
        >
          <View style={styles.profileBox}>
            <View style={styles.profileleftContainer}>
              <View style={styles.imageBox}>
                <Icon
                  source={{ uri: 'https://reactjs.org/logo-og.png' }}
                  size={80}
                  backgroundColor={COLORS.placeholder}
                  borderRadius={50}
                />
              </View>
            </View>
            <View style={styles.profileRightContainer}>
              <CustomText style={styles.textName}>Debanjan Sarkar</CustomText>
              <CustomText style={styles.textEmail}>
                taylorblack@gmail.com
              </CustomText>
            </View>
            <TouchableOpacity style={styles.qrBox}>
              <DrawerHeaderQr />
            </TouchableOpacity>
          </View>
        </ImageBackground>

        {CustomSideBarMenus.map((item, index) => (
          <Card
            key={index}
            style={styles.card}
            onPress={() => {
              Alert.alert(`Navigating to ${item.name}`);
            }}
          >
            <View style={styles.menuWrapper}>
              <View style={styles.menuItem}>
                <item.icon width={ICON_SIZE} height={ICON_SIZE} />
                <CustomText style={styles.textMenu}>{item.name}</CustomText>
              </View>
              <item.arrow width={ICON_SIZE} height={ICON_SIZE} />
            </View>
          </Card>
        ))}

        <Card style={styles.card}>
          {CustomSideBarCMS.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.menuWrapper, { marginTop: 10 }]}
              onPress={() => {
                Alert.alert(`Navigating to ${item.name}`);
              }}
            >
              <View style={styles.menuItem}>
                <item.icon width={ICON_SIZE} height={ICON_SIZE} />
                <CustomText style={styles.textMenu}>{item.name}</CustomText>
              </View>
              <item.arrow width={ICON_SIZE} height={ICON_SIZE} />
            </TouchableOpacity>
          ))}
        </Card>
        <View
          style={{
            height: 80,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => Alert.alert('Logout Pressed')}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <DrawerLogout />{' '}
            <CustomText style={styles.textLogout}>Logout</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  card: {
    marginTop: 5,
    alignSelf: 'center',
    width: '90%',
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
  menuWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textMenu: {
    fontSize: 18,
    color: COLORS.black,
    fontFamily: 'Roboto-Regular',
    paddingLeft: 10,
  },
  backgroundImage: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  imageStyle: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileleftContainer: {
    marginLeft: 20,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileRightContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  imageBox: {
    backgroundColor: COLORS.placeholder,
    borderRadius: 50,
    height: 80,
    width: 80,
  },
  textName: {
    color: COLORS.white,
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
  },
  textEmail: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    marginTop: 5,
  },
  qrBox: {
    width: 60,
    height: 60,
    marginRight: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.qrBox,
  },
  textLogout: {
    color: COLORS.error,
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    paddingLeft: 10,
  },
});
