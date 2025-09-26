import { StyleSheet, TouchableOpacity, View, Alert } from 'react-native';
import { COLORS } from '../utils/constants';
import Icon from '../components/icon';
import Card from '../components/card';
import CustomText from '../components/ui/text';
import TextBox from '../components/ui/textBox';
import Button from '../components/ui/button';
import { ScrollView } from 'react-native-gesture-handler';
import BackHeader from '../components/BackHeader';
import LoadingOverlay from '../components/loadingOverlay';
import { useProfile } from '../hooks/useApi';
import { getToken } from '../utils/tokenManager';
import { ONESIGNAL_API_KEY, BASE_URL } from '../config';
import Toast from 'react-native-simple-toast';
import { apiCall } from '../utils/helpers';
import { useAuth } from '../hooks/useAuth';
const ViewProfile = ({ navigation }) => {
  const { logout } = useAuth();
  const { data: profileData, isLoading } = useProfile();
  console.log('🚀 ~ ViewProfile ~ profileData:', profileData);

  if (isLoading) {
    return <LoadingOverlay visible={true} />;
  }
  // // Fetch profile data

  //create a fuction for deleteAccount
  const deleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteAccountApiCall();
            logout();
          },
        },
      ],
      { cancelable: true },
    );
  };

  const deleteAccountApiCall = async () => {
    const token = await getToken();
    try {
      await apiCall(BASE_URL + '/api/delete-account', 'GET', undefined, token);
    } catch (error) {
      Toast.show('Failed to delete account. Please try again.', Toast.LONG);
    }
  };

  return (
    <>
      <BackHeader title="View Profile" />
      <ScrollView>
        <Card style={styles.card}>
          <TouchableOpacity style={styles.imageBox}>
            <Icon
              source={{ uri: profileData?.imageUrl }}
              size={100}
              backgroundColor={COLORS.placeholder}
              borderRadius={50}
            />
          </TouchableOpacity>

          <CustomText style={styles.textLabel}>Name</CustomText>
          <CustomText style={styles.textMeta}>{profileData?.name}</CustomText>

          <CustomText style={styles.textLabel}>Designation</CustomText>
          <CustomText style={styles.textMeta}>
            {profileData?.designation}
          </CustomText>

          <CustomText style={styles.textLabel}>Company Name</CustomText>
          <CustomText style={styles.textMeta}>
            {profileData?.company_name}
          </CustomText>

          <View style={styles.tagContainer}>
            <CustomText style={styles.textLabel}>Tags</CustomText>
            <View style={styles.tagsWrapper}>
              {profileData?.tag?.length
                ? profileData.tag.map((tag, index) => (
                    <View key={index} style={styles.tagsBox}>
                      <CustomText style={styles.textMeta}>{tag}</CustomText>
                    </View>
                  ))
                : null}
            </View>
          </View>

          <CustomText style={styles.textLabel}>Email Id</CustomText>
          <CustomText style={styles.textMeta}>{profileData?.email}</CustomText>

          <CustomText style={styles.textLabel}>Phone No.</CustomText>
          <CustomText style={styles.textMeta}>{profileData?.phone}</CustomText>

          <CustomText style={styles.textLabel}>Bio</CustomText>
          <TextBox
            value={profileData?.bio}
            label={''}
            labelStyle={styles.textMeta}
            placeholder={''}
            onChangeText={() => {}}
            style={styles.textAreaStyle}
            multiline={true}
            numberOfLines={10}
            editable={false} // make it read-only
          />

          <CustomText style={styles.textLogout} onPress={deleteAccount}>
            Delete Account
          </CustomText>
        </Card>
      </ScrollView>
      <View style={styles.btnContainer}>
        <Button
          title={'Edit'}
          onPress={() =>
            navigation.navigate('EditProfile', {
              data: profileData,
            })
          }
          style={{ width: '95%' }}
          textStyle={styles.btnTextStyle}
        />
      </View>
    </>
  );
};

export default ViewProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  card: {
    marginHorizontal: 10,
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
  imageBox: {
    backgroundColor: COLORS.placeholder,
    borderRadius: 50,
    height: 100,
    width: 100,
    alignSelf: 'center',
  },
  textLabel: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    color: COLORS.text,
    marginTop: 20,
  },
  textMeta: {
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    color: COLORS.text,
  },
  tagContainer: {
    marginTop: 10,
  },
  tagsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 10,
  },
  tagsBox: {
    backgroundColor: COLORS.background,
    padding: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textAreaStyle: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    color: COLORS.text,
    paddingRight: 20,
    minHeight: 100,
  },
  btnContainer: {
    height: 80,
    width: '100%',
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTextStyle: {
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    color: COLORS.white,
  },
  textLogout: {
    color: COLORS.logoutError,
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: COLORS.background,
  },
});
