import { StyleSheet, Touchable, View } from 'react-native';
import Card from '../components/card';
import CustomText from '../components/ui/text';
import { GreenBadge, COLORS } from '../utils/constants';
import Icon from '../components/icon';
import { timeAgo } from '../utils/helpers';
interface UserListProps {
  name?: string;
  designation?: string;
  company?: string;
  image?: string;
  notificationData?: object;
  viewSpeaker?: () => void;
}
export default function UserList({
  name,
  designation,
  company,
  image,
  notificationData,
  viewSpeaker,
}: UserListProps) {
  console.log('notificationData', notificationData);
  if (notificationData?.message) {
    return (
      <View
        style={
          notificationData?.isRead ? styles.containerRead : styles.container
        }
      >
        <View style={styles.leftContainer}>
          <View style={styles.imageBox}>
            <Icon
              source={{
                uri: notificationData?.imageUrl,
              }}
              size={80}
              backgroundColor={COLORS.placeholder}
              borderRadius={50}
            />
          </View>
        </View>
        <View style={styles.rightContainer}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <CustomText style={styles.textName}>
              {notificationData?.message}
            </CustomText>
          </View>

          {!notificationData?.isSpeaker ? (
            <View style={styles.spreakerBox}>
              <CustomText
                style={styles.spreakerBoxText}
                badge={true}
                badgeStyle={styles.badgeStyle}
                bgColor={COLORS.text}
              >
                Speaker
              </CustomText>
              <CustomText style={styles.spreakerBoxTextTimeText}>
                {timeAgo(notificationData?.created_at)}
              </CustomText>
            </View>
          ) : (
            <CustomText style={styles.textDesignation}>
              {timeAgo(notificationData?.created_at)}
            </CustomText>
          )}

          {!notificationData?.isSpeaker && (
            <CustomText style={styles.viewSpeakerText} onPress={viewSpeaker}>
              View Speaker
            </CustomText>
          )}
        </View>
        {!notificationData?.isRead && <View style={styles.badgeNew}></View>}
      </View>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background,
    padding: 10,
    marginVertical: 5,
  },
  containerRead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    padding: 10,
    marginVertical: 5,
  },
  leftContainer: {
    // width: '30%',
    //alignItems: 'center',
    // justifyContent: 'center',
    // marginRight: 10,
    marginLeft: 20,
  },
  rightContainer: {
    width: '60%',
    paddingLeft: 10,
    //justifyContent: 'center',
    marginRight: 10,
  },
  imageBox: {
    backgroundColor: COLORS.placeholder,
    borderRadius: 50,
    height: 80,
    width: 80,
  },
  textName: {
    color: COLORS.text,
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
  },
  textDesignation: {
    color: COLORS.textLight,
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    marginTop: 5,
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
  badgeNew: {
    width: 10,
    height: 10,
    backgroundColor: COLORS.warning,
    alignSelf: 'flex-start',
    borderRadius: 5,
    marginRight: 5,
  },
  spreakerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  spreakerBoxText: {
    color: COLORS.white,
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
  spreakerBoxTextTimeText: {
    color: COLORS.textLight,
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    marginLeft: 10,
  },
  badgeStyle: {
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 8,
    paddingLeft: 8,
  },
  viewSpeakerText: {
    color: COLORS.primary,
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    marginTop: 5,
  },
});
