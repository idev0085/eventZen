import { StyleSheet, Touchable, TouchableOpacity, View } from 'react-native';
import CustomText from '../components/ui/text';
import { COLORS, Level } from '../utils/constants';
import Icon from '../components/icon';
import { timeAgo } from '../utils/helpers';
interface UserListProps {
  name?: string;
  designation?: string;
  company?: string;
  image?: string;
  notificationData?: object;
  attendeesData?: object;
  speakersData?: object;
  viewSpeaker?: () => void;
  viewDetails?: (id: string | number) => void;
  exhibitorsData?: object;
  sponsorsData?: object;
  isSingle?: boolean;
}

export default function UserList({
  name,
  designation,
  company,
  image,
  notificationData,
  viewSpeaker,
  attendeesData,
  viewDetails,
  speakersData,
  exhibitorsData,
  sponsorsData,
  isSingle = false,
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
              backgroundColor={COLORS.white}
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
        {!notificationData?.isRead ? (
          <View style={styles.badgeNew}></View>
        ) : (
          <View style={styles.badgeBlank}></View>
        )}
      </View>
    );
  }
  if (attendeesData?.name) {
    return (
      <TouchableOpacity
        style={styles.containerAttendees}
        onPress={() => viewDetails(attendeesData?.id)}
        disabled={isSingle}
      >
        <View style={styles.leftContainer}>
          <View style={styles.imageBox}>
            <Icon
              source={{
                uri: attendeesData?.image_url,
              }}
              size={80}
              backgroundColor={COLORS.white}
              borderRadius={50}
            />
          </View>
        </View>
        <View style={styles.rightContainerAttendees}>
          {attendeesData?.name && (
            <CustomText style={styles.textName}>
              {attendeesData?.name}
            </CustomText>
          )}

          {attendeesData?.role && (
            <CustomText style={styles.textDesignation}>
              {attendeesData?.role}
            </CustomText>
          )}

          {attendeesData?.company_name && (
            <CustomText style={styles.viewSpeakerText} onPress={viewSpeaker}>
              {attendeesData?.company_name}
            </CustomText>
          )}

          {attendeesData?.roles.length > 0 && (
            <View style={styles.rolesWrapper}>
              {attendeesData?.roles?.map((role, index) => (
                <View key={index} style={styles.roleBox}>
                  <CustomText style={styles.textMeta}>{role}</CustomText>
                </View>
              ))}
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  }
  if (speakersData?.name) {
    return (
      <TouchableOpacity
        style={styles.containerAttendees}
        onPress={() => viewDetails(speakersData?.id)}
        disabled={isSingle}
      >
        <View style={styles.leftContainer}>
          <View style={styles.imageBox}>
            <Icon
              source={{
                uri: speakersData?.image_url,
              }}
              size={80}
              backgroundColor={COLORS.white}
              borderRadius={50}
            />
          </View>
        </View>
        <View style={styles.rightContainerAttendees}>
          {speakersData?.name && (
            <CustomText style={styles.textName}>
              {speakersData?.name}
            </CustomText>
          )}

          {speakersData?.role && (
            <CustomText style={styles.textDesignation}>
              {speakersData?.role}
            </CustomText>
          )}

          {speakersData?.company_name && (
            <CustomText style={styles.viewSpeakerText} onPress={viewSpeaker}>
              {speakersData?.company_name}
            </CustomText>
          )}

          {speakersData?.roles?.length > 0 && (
            <View style={styles.rolesWrapper}>
              {speakersData?.roles?.map((role, index) => (
                <View key={index} style={styles.roleBox}>
                  <CustomText style={styles.textMeta}>{role}</CustomText>
                </View>
              ))}
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  }
  if (exhibitorsData?.name) {
    return (
      <TouchableOpacity
        style={styles.containerAttendees}
        onPress={() => viewDetails(exhibitorsData?.id)}
        disabled={isSingle}
      >
        <View style={styles.leftContainer}>
          <View style={styles.imageBox}>
            <Icon
              source={{
                uri: isSingle
                  ? exhibitorsData?.avatar
                  : exhibitorsData?.image_url,
              }}
              size={80}
              backgroundColor={COLORS.white}
              borderRadius={50}
            />
          </View>
        </View>
        <View style={styles.rightContainerExhibitors}>
          {exhibitorsData?.name && (
            <CustomText style={styles.textName}>
              {exhibitorsData?.name}
            </CustomText>
          )}

          {exhibitorsData?.location && (
            <CustomText style={styles.viewSpeakerText}>
              Booth No. {exhibitorsData?.location}
            </CustomText>
          )}
        </View>
      </TouchableOpacity>
    );
  }
  if (sponsorsData?.name) {
    return (
      <TouchableOpacity
        style={styles.containerAttendees}
        onPress={() => viewDetails(sponsorsData?.id)}
        disabled={isSingle}
      >
        <View style={styles.leftContainer}>
          <View style={styles.imageBox}>
            <Icon
              source={{
                uri: isSingle ? sponsorsData?.avatar : sponsorsData?.image_url,
              }}
              size={80}
              backgroundColor={COLORS.white}
              borderRadius={50}
            />
          </View>
        </View>
        <View style={styles.rightContainerExhibitors}>
          {sponsorsData?.name && (
            <CustomText style={styles.textName}>
              {sponsorsData?.name}
            </CustomText>
          )}

          <View style={{ margin: 5 }} />

          {sponsorsData?.level && sponsorsData?.level !== '' && (
            <Level
              backgroundColor={sponsorsData?.color_code || COLORS.primary}
              strokeColor={COLORS.white}
              label={sponsorsData?.level || 'N/A'}
            />
          )}

          {/* {sponsorsData?.level === 'Gold' && (
            <Level
              backgroundColor={COLORS.warning}
              strokeColor="#fff"
              label="Gold"
            />
          )} */}
          {/* {sponsorsData?.level === 'Silver' && (
            <Level
              backgroundColor={COLORS.icon}
              strokeColor="#fff"
              label="Silver"
            />
          )} */}
          {/* {sponsorsData?.level === 'Bronze' && (
            <Level
              backgroundColor={COLORS.bronze}
              strokeColor="#fff"
              label="Bronze"
            />
          )} */}
          {/* {sponsorsData?.level === 'Platinum' && (
            <Level
              backgroundColor={COLORS.textInputPrimary}
              strokeColor={COLORS.textPrimary}
              label="Platinum"
            />
          )} */}
          {/* <CustomText style={styles.viewSpeakerText}>
            {exhibitorsData?.location}
          </CustomText> */}
        </View>
      </TouchableOpacity>
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
  containerAttendees: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    padding: 10,
    marginVertical: 5,
    width: '95%',
    margin: 10,
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
  rightContainerAttendees: {
    width: '70%',
    paddingLeft: 10,
    // justifyContent: 'center',
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
    fontFamily: 'Roboto-Bold',
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
  badgeBlank: {
    width: 10,
    height: 10,
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
  rightContainerExhibitors: {
    width: '70%',
    paddingLeft: 10,
    justifyContent: 'center',
    marginRight: 10,
  },
});
