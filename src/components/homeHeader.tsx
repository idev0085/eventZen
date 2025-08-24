import React from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import DrawerMenuButton from './drawerMenuButton';
import {
  COLORS,
  NotificationBellIcon,
  PNG_IMAGES,
  TEXT_SIZES,
} from '../utils/constants';

const HomeHeader = ({
  username,
  welcomeMessage,
  profileImage,
  bellIcon,
}: any) => {
  const handleNotification = () => {
    Alert.alert('Notification Bell Icon Clicked');
  };

  return (
    <ImageBackground source={PNG_IMAGES.OtpBg} style={styles.headerBackground}>
      <View style={styles.headerContainer}>
        {/* Drawer Menu Icon */}
        <DrawerMenuButton />
        {/* Profile image and text */}
        <View style={styles.profileInfo}>
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
          <View style={styles.textContainer}>
            <Text style={styles.username}>
              {username ? username : 'Arafat Alim'}
            </Text>
            <Text style={styles.welcomeMessage}>
              {welcomeMessage ? welcomeMessage : 'Welcome !'}
            </Text>
          </View>
        </View>
        {/* Bell Icon */}
        <TouchableOpacity onPress={handleNotification}>
          <NotificationBellIcon width={20} height={20} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  headerBackground: {
    width: '100%',
    height: 100,
    justifyContent: 'flex-end',
    paddingBottom: 20,
    backgroundColor: COLORS.primary, // fallback color
  },
  imageStyle: {},
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingLeft: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  textContainer: {},
  username: {
    fontSize: TEXT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.white,
  },
  welcomeMessage: {
    fontSize: TEXT_SIZES.sm,
    color: COLORS.white,
    marginTop: 5,
  },
});
