import { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
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
import { BASE_URL } from '../config';
import { apiCall } from '../utils/helpers';

const EditProfile = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [availableTags, setAvailableTags] = useState([]);

  const initialTags = Array.isArray(route?.params?.data?.tags)
    ? route.params.data.tags
    : typeof route?.params?.data?.tags === 'string'
    ? route.params.data.tags.split(',')
    : [];

  const [profileData, setProfileData] = useState({
    ...route?.params?.data,
    tags: initialTags,
  });

  const [loading, setLoading] = useState(false);

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
        console.log('🚀 ~ fetchData ~ tags response:', response);
        setAvailableTags(response.data || response);
      } catch (error) {
        console.log('error fetching tags', error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (field: string, value: any) => {
    setProfileData(prevData => ({ ...prevData, [field]: value }));
  };

  const selectTag = (tag: any) => {
    const currentTags = profileData.tags || [];
    const tagName = tag.name || tag;

    const newTags = currentTags.includes(tagName)
      ? currentTags.filter(t => t !== tagName)
      : [...currentTags, tagName];

    handleInputChange('tags', newTags);
  };

  const isTagSelected = (tag: any) => {
    const tagName = tag.name || tag;
    const currentTags = profileData.tags || [];
    return currentTags.includes(tagName);
  };

  const handleSave = async () => {
    setLoading(true);
    const token = await getToken();
    try {
      const payload = {
        first_name: profileData.first_name || '',
        last_name: profileData.lastname || '',
        designation: profileData.designation || '',
        company_name: profileData.company_name || '',
        company_website: profileData.company_website || '',
        email: profileData.email || '',
        phone: profileData.phone || '',
        bio: profileData.bio || '',
        tags: Array.isArray(profileData.tags)
          ? profileData.tags.join(',')
          : profileData.tags || '',
      };

      console.log('Sending payload:', payload);

      await apiCall(BASE_URL + '/api/profile', 'PUT', payload, token);
      Toast.show('Profile updated successfully!', Toast.LONG);
      navigation.goBack();
    } catch (error) {
      console.log('error updating profile', error);
      if (error.response?.data?.errors) {
        const errorMessages = Object.values(error.response.data.errors)
          .flat()
          .join('\n');
        Toast.show(`Validation errors:\n${errorMessages}`, Toast.LONG);
      } else {
        Toast.show('Failed to update profile. Please try again.', Toast.LONG);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BackHeader title="Edit Profile" />
      <ScrollView>
        <Card style={styles.card}>
          <TouchableOpacity style={styles.imageBox} disabled={true}>
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

          {/* Updatable Fields */}
          <TextBox
            value={profileData?.first_name}
            label={'First Name'}
            labelStyle={styles.labelStyle}
            placeholder={''}
            onChangeText={text => handleInputChange('first_name', text)}
            required={true}
            style={styles.textBoxStyle}
            editable={true}
          />

          <TextBox
            value={profileData?.lastname}
            label={'Last Name'}
            labelStyle={styles.labelStyle}
            placeholder={''}
            onChangeText={text => handleInputChange('lastname', text)}
            required={true}
            style={styles.textBoxStyle}
            editable={true}
          />

          <TextBox
            value={profileData?.designation}
            label={'Designation'}
            labelStyle={styles.labelStyle}
            placeholder={''}
            onChangeText={text => handleInputChange('designation', text)}
            required={true}
            style={styles.textBoxStyle}
            editable={true}
          />

          <TextBox
            value={profileData?.company_name}
            label={'Company Name'}
            labelStyle={styles.labelStyle}
            placeholder={''}
            onChangeText={text => handleInputChange('company_name', text)}
            required={true}
            style={styles.textBoxStyle}
            editable={true}
          />

          <TextBox
            value={profileData?.company_website}
            label={'Company Website'}
            labelStyle={styles.labelStyle}
            placeholder={''}
            onChangeText={text => handleInputChange('company_website', text)}
            required={true}
            style={styles.textBoxStyle}
            editable={true}
          />

          {/* Tags Selection */}
          <View style={styles.tagContainer}>
            <Text style={styles.labelStyle}>
              Tags <Text style={styles.asterisk}> *</Text>
            </Text>
            <View style={styles.tagsWrapper}>
              {availableTags?.map((tag, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => selectTag(tag)}
                  style={
                    isTagSelected(tag) ? styles.tagsBoxActive : styles.tagsBox
                  }
                >
                  <CustomText
                    style={
                      isTagSelected(tag)
                        ? styles.labelStyleActive
                        : styles.labelStyle
                    }
                  >
                    {tag.name || tag}
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
            editable={true}
          />

          <TextBox
            value={profileData?.phone}
            label={'Phone Number'}
            labelStyle={styles.labelStyle}
            placeholder={''}
            onChangeText={text => handleInputChange('phone', text)}
            required={true}
            style={styles.textBoxStyle}
            editable={true}
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
            editable={true}
          />
        </Card>
      </ScrollView>
      <View style={styles.btnContainer}>
        <Button
          title={loading ? 'Saving...' : 'Save'}
          onPress={handleSave}
          style={{ width: '80%' }}
          textStyle={styles.btnTextStyle}
          disabled={loading}
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
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    color: COLORS.text,
    paddingRight: 20,
    minHeight: 100,
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
  readOnlySection: {
    marginTop: 20,
    padding: 15,
    backgroundColor: COLORS.background,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.placeholder,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    color: COLORS.text,
    marginBottom: 15,
  },
  readOnlyField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  readOnlyLabel: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    color: COLORS.text,
  },
  readOnlyValue: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: COLORS.text,
    flex: 1,
    textAlign: 'right',
  },
});
