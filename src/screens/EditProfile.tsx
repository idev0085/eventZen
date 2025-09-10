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
import { useProfile, useTags, useUpdateProfile } from '../hooks/useApi';
import LoadingOverlay from '../components/loadingOverlay';

const EditProfile = () => {
  const { data: profileData, isLoading: isProfileLoading } = useProfile();
  const { data: availableTags, isLoading: areTagsLoading } = useTags();
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();

  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    if (profileData) {
      setFormData({
        ...profileData,
        tags: Array.isArray(profileData.tags) ? profileData.tags : [],
      });
    }
  }, [profileData]);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prevData: any) => ({ ...prevData, [field]: value }));
  };

  const selectTag = (tag: any) => {
    const currentTags = formData.tags || [];
    const tagName = tag.name || tag;
    const newTags = currentTags.includes(tagName)
      ? currentTags.filter(t => t !== tagName)
      : [...currentTags, tagName];
    handleInputChange('tags', newTags);
  };

  const isTagSelected = (tag: any) => {
    const tagName = tag.name || tag;
    return formData?.tags?.includes(tagName);
  };

  const handleSave = () => {
    if (!formData) return;
    if (!formData.first_name || !formData.lastname) {
      Toast.show('First and Last name are required.', Toast.LONG);
      return;
    }

    const payload = {
      first_name: formData.first_name,
      last_name: formData.lastname,
      designation: formData.designation || '',
      company_name: formData.company_name || '',
      company_website: formData.company_website
        ? formData.company_website
        : null,
      email: formData.email,
      phone: formData.phone || '',
      bio: formData.bio || '',
      tags: Array.isArray(formData.tags) ? formData.tags.join(',') : '',
    };

    console.log('payload___', payload);

    updateProfile(payload);
  };
  const isLoading = isProfileLoading || areTagsLoading;

  if (isLoading || !formData) {
    return <LoadingOverlay visible={true} />;
  }

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
            value={formData?.first_name}
            label={'First Name'}
            labelStyle={styles.labelStyle}
            placeholder={''}
            onChangeText={text => handleInputChange('first_name', text)}
            required={true}
            style={styles.textBoxStyle}
            editable={true}
          />

          <TextBox
            value={formData?.lastname}
            label={'Last Name'}
            labelStyle={styles.labelStyle}
            placeholder={''}
            onChangeText={text => handleInputChange('lastname', text)}
            required={true}
            style={styles.textBoxStyle}
            editable={true}
          />

          <TextBox
            value={formData?.designation}
            label={'Designation'}
            labelStyle={styles.labelStyle}
            placeholder={''}
            onChangeText={text => handleInputChange('designation', text)}
            required={true}
            style={styles.textBoxStyle}
            editable={true}
          />

          <TextBox
            value={formData?.company_name}
            label={'Company Name'}
            labelStyle={styles.labelStyle}
            placeholder={''}
            onChangeText={text => handleInputChange('company_name', text)}
            required={true}
            style={styles.textBoxStyle}
            editable={true}
          />

          <TextBox
            value={formData?.company_website}
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
            value={formData?.email}
            label={'Email Address'}
            labelStyle={styles.labelStyle}
            placeholder={''}
            onChangeText={text => handleInputChange('email', text)}
            required={true}
            style={styles.textBoxStyle}
            editable={true}
          />

          <TextBox
            value={formData?.phone}
            label={'Phone Number'}
            labelStyle={styles.labelStyle}
            placeholder={''}
            onChangeText={text => handleInputChange('phone', text)}
            required={true}
            style={styles.textBoxStyle}
            editable={true}
          />

          <TextBox
            value={formData?.bio}
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
          title={isUpdating ? 'Saving...' : 'Save'}
          onPress={handleSave}
          style={{ width: '80%' }}
          textStyle={styles.btnTextStyle}
          disabled={isUpdating}
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
