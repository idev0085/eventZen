import React, { use, useEffect, useState } from 'react';
import {
  Alert,
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
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
  TEXT_SIZES,
} from '../utils/constants';
import CustomText from '../components/ui/text';
import Icon from '../components/icon';
import Card from '../components/card';
import { useAuth } from '../hooks/useAuth';
import { BASE_URL } from '../config';
import { apiCall, formatTimeRange } from '../utils/helpers';
import { getToken } from '../utils/tokenManager';
const ICON_SIZE = 22;
const ARROW_ICON_SIZE = 22;
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
    route: 'FavouriteSessionScreen',
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
    name: 'Help and Support',
    icon: DrawerHelp,
    route: 'Help and support',
    arrow: DrawerArrow,
  },
];
const CustomSideBarCMS = [
  {
    name: 'About',
    icon: DrawerAbout,
    route: 'AboutScreen',
    arrow: DrawerArrow,
  },
  {
    name: 'Location',
    icon: DrawerLocation,
    route: 'LocationScreen',
    arrow: DrawerArrow,
  },
  {
    name: 'Privacy Policy',
    icon: DrawerPrivacyPolicy,
    route: 'PrivacyPolicyScreen',
    arrow: DrawerArrow,
  },
  {
    name: 'Terms & Conditions',
    icon: DrawerTermsCondition,
    route: 'TermsConditionsScreen',
    arrow: DrawerArrow,
  },
];

export default function CustomSideBar({ navigation }: any) {
  const [apiData, setApiData] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
  };
  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      try {
        const response = await apiCall(
          BASE_URL + '/api/profile',
          'GET',
          undefined,
          token,
        );
        // Assuming the API returns an object with a 'data' array
        setApiData(response);
      } catch (error) {
        console.log('error fetching connections', error);
      } finally {
      }
    };
    fetchData();
  }, []);
  return (
    <ScrollView style={styles.container}>
      <View>
        <ImageBackground
          source={PNG_IMAGES.ProfileBg}
          style={styles.backgroundImage}
          imageStyle={styles.imageStyle}
        >
          <View style={styles.profileBox}>
            <View style={styles.profileleftContainer}>
              <View style={styles.imageBox}>
                <Icon
                  source={{ uri: apiData?.imageUrl }}
                  size={50}
                  backgroundColor={COLORS.placeholder}
                  borderRadius={50}
                />
              </View>
            </View>
            <View style={styles.profileRightContainer}>
              <CustomText style={styles.textName}>{apiData?.name}</CustomText>
              <CustomText style={styles.textEmail}>{apiData?.email}</CustomText>
            </View>
            <TouchableOpacity
              style={styles.qrBox}
              onPress={() => Alert.alert('Development Work in progress')}
            >
              <DrawerHeaderQr width={40} height={40} />
            </TouchableOpacity>
          </View>
        </ImageBackground>

        {CustomSideBarMenus.map((item, index) => (
          <Card
            key={index}
            style={styles.card}
            onPress={() => {
              item.route === 'Profile' ||
              item.route === 'FavouriteSessionScreen'
                ? navigation.navigate(`${item.route}`)
                : Alert.alert(`Navigating to ${item.route} Work in progress`);
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
                navigation.navigate(`${item.route}`);
              }}
            >
              <View style={styles.menuItem}>
                <item.icon width={ICON_SIZE} height={ICON_SIZE} />
                <CustomText style={styles.textMenu}>{item.name}</CustomText>
              </View>
              <item.arrow width={ARROW_ICON_SIZE} height={ARROW_ICON_SIZE} />
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
            onPress={handleLogout}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <DrawerLogout width={ICON_SIZE} height={ICON_SIZE} />{' '}
            <CustomText style={styles.textLogout}>Logout</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
    fontSize: TEXT_SIZES.xs,
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
    height: 50,
    width: 50,
  },
  textName: {
    color: COLORS.white,
    fontSize: TEXT_SIZES.md,
    fontFamily: 'Roboto-Bold',
    fontWeight: '700',
  },
  textEmail: {
    color: COLORS.white,
    fontSize: TEXT_SIZES.xs,
    fontFamily: 'Roboto-Regular',
    marginTop: 5,
  },
  qrBox: {
    width: 50,
    height: 50,
    marginRight: 30,
    borderRadius: 10,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.qrBox,
  },
  textLogout: {
    color: COLORS.logoutError,
    fontSize: TEXT_SIZES.xs,
    fontFamily: 'Roboto-Regular',
    paddingLeft: 10,
  },
});
