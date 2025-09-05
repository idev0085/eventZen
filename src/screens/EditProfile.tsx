import { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EditProfileIcon, COLORS } from '../utils/constants';
import Icon from '../components/icon';
import Card from '../components/card';
import CustomText from '../components/ui/text';
import TextBox from '../components/ui/textBox';
import Button from '../components/ui/button';
import { ScrollView } from 'react-native-gesture-handler';
import BackHeader from '../components/BackHeader';
import Toast from 'react-native-simple-toast';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getToken } from '../utils/tokenManager';
const MOCK_DATA_TAGS = ['Blockchain & FinTech', 'CloudTrends'];
import { BASE_URL } from '../config';
import { apiCall, formatTimeRange } from '../utils/helpers';
const EditProfile = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [tags, setTags] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      try {
        const response = await apiCall(
          BASE_URL + '/api/tags',
          'GET',
          undefined,
          token,
        );
        // Assuming the API returns an object with a 'data' array
        setTags(response);
      } catch (error) {
        console.log('error fetching connections', error);
      } finally {
      }
    };
    fetchData();
  }, []);
  const [profileData, setProfileData] = useState(route?.params?.data);

  const handleInputChange = (field: string, value: any) => {
    setProfileData(prevData => ({ ...prevData, [field]: value }));
  };

  const selectTag = (tag: string) => {
    const currentTags = profileData.tags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];
    handleInputChange('tags', newTags);
  };

  const handleSave = async () => {
    const token = await getToken();
    console.log('profileData', profileData);
    try {
      await apiCall(BASE_URL + '/api/profile', 'PUT', profileData, token);
      Toast.show('Profile updated successfully!', Toast.LONG);
      navigation.goBack();
    } catch (error) {
      console.log('error updating profile', error);
      Toast.show('Failed to update profile. Please try again.', Toast.LONG);
    }
  };

  return (
    <>
      <BackHeader title="Edit Profile" />
      <ScrollView>
        <Card style={styles.card}>
          <TouchableOpacity style={styles.imageBox}>
            <Icon
              source={{ uri: profileData?.imageUrl }}
              size={100}
              backgroundColor={COLORS.placeholder}
              borderRadius={50}
            />
            <View style={styles.imageBoxEdit}>
              <EditProfileIcon />
            </View>
          </TouchableOpacity>

          <TextBox
            value={profileData?.first_name}
            label={'First Name'}
            labelStyle={styles.labelStyle}
            placeholder={''}
            onChangeText={text => handleInputChange('first_name', text)}
            required={true}
            style={styles.textBoxStyle}
          />

          <TextBox
            value={profileData?.lastname}
            label={'Last Name'}
            labelStyle={styles.labelStyle}
            placeholder={''}
            onChangeText={text => handleInputChange('lastname', text)}
            required={true}
            style={styles.textBoxStyle}
          />

          <TextBox
            value={profileData?.designation}
            label={'Designation'}
            labelStyle={styles.labelStyle}
            placeholder={''}
            onChangeText={text => handleInputChange('designation', text)}
            required={true}
            style={styles.textBoxStyle}
          />

          <TextBox
            value={profileData?.company_name}
            label={'Company Name'}
            labelStyle={styles.labelStyle}
            placeholder={''}
            onChangeText={text => handleInputChange('company_name', text)}
            required={true}
            style={styles.textBoxStyle}
          />

          {/* <TextBox
            value={profileData?.company_website}
            label={'Company Website'}
            labelStyle={styles.labelStyle}
            placeholder={''}
            onChangeText={text => handleInputChange('company_website', text)}
            required={true}
            style={styles.textBoxStyle}
          /> */}
          <View style={styles.tagContainer}>
            <Text style={styles.labelStyle}>
              Tags <Text style={styles.asterisk}> *</Text>
            </Text>
            <View style={styles.tagsWrapper}>
              {tags?.map((tag, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => selectTag(tag)}
                  style={
                    profileData.tags.includes(tag)
                      ? styles.tagsBoxActive
                      : styles.tagsBox
                  }
                >
                  <CustomText
                    style={
                      profileData.tags.includes(tag)
                        ? styles.labelStyleActive
                        : styles.labelStyle
                    }
                  >
                    {tag}
                  </CustomText>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TextBox
            value={profileData?.email}
            label={'Email Address'}
            labelStyle={styles.labelStyle}
            placeholder={''}
            onChangeText={text => handleInputChange('email', text)}
            required={true}
            style={styles.textBoxStyle}
          />

          <TextBox
            value={profileData?.phone}
            label={'Phone Number'}
            labelStyle={styles.labelStyle}
            placeholder={''}
            onChangeText={text => handleInputChange('phone', text)}
            required={true}
            style={styles.textBoxStyle}
          />

          <TextBox
            value={profileData?.bio}
            label={'Bio'}
            labelStyle={styles.labelStyle}
            placeholder={''}
            onChangeText={text => handleInputChange('bio', text)}
            required={true}
            style={styles.textAreaStyle}
            multiline={true}
            numberOfLines={10}
          />
        </Card>
      </ScrollView>
      <View style={styles.btnContainer}>
        <Button
          title={'Save'}
          onPress={handleSave}
          style={{ width: '80%' }}
          textStyle={styles.btnTextStyle}
        />
      </View>
    </>
  );
};

export default EditProfile;

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
  imageBoxEdit: {
    backgroundColor: COLORS.primary,
    height: 40,
    width: 40,
    position: 'absolute',
    right: 0,
    bottom: 0,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBoxStyle: {
    marginTop: 10,
    marginBottom: 10,
    height: 40,
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    color: COLORS.text,
    paddingRight: 20,
  },
  textAreaStyle: {
    marginTop: 10,
    marginBottom: 10,
    //height: 40,
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    color: COLORS.text,
    paddingRight: 20,
  },
  labelStyle: {
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    color: COLORS.text,
  },
  labelStyleActive: {
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    color: COLORS.white,
  },
  asterisk: {
    color: 'red',
  },
  tagContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  tagsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  tagsBox: {
    backgroundColor: COLORS.background,
    padding: 10,
    marginBottom: 10,
    marginRight: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagsBoxActive: {
    backgroundColor: COLORS.primary,
    padding: 10,
    marginBottom: 10,
    marginRight: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTextStyle: {
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    color: COLORS.white,
  },
  btnContainer: {
    height: 80,
    width: '100%',
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
