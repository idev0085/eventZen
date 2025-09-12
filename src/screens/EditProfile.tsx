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
import {
  useProfile,
  useTags,
  useUpdateProfile,
  useUploadAvatar,
} from '../hooks/useApi';
import LoadingOverlay from '../components/loadingOverlay';
import { pickImage } from '../utils/imagePicker';

const EditProfile = () => {
  const { data: profileData, isLoading: isProfileLoading } = useProfile();
  const { data: availableTags, isLoading: areTagsLoading } = useTags();
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();

  const { mutate: uploadAvatar, isPending: isUploading } = useUploadAvatar();
  const [formData, setFormData] = useState<any>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handlePickAvatar = async () => {
    const file = await pickImage();
    if (!file) return;

    // Fixed file type validation
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];

    if (!validTypes.includes(file.type)) {
      Toast.show('Only JPG, JPEG and PNG images allowed', Toast.LONG);
      return;
    }

    uploadAvatar(file);
  };

  useEffect(() => {
    if (profileData) {
      setFormData({
        ...profileData,
        tag: Array.isArray(profileData.tag) ? profileData.tag : [],
      });
    }
  }, [profileData]);

  const validateField = (field: string, value: any): string => {
    switch (field) {
      case 'first_name':
        if (!value || value.trim().length === 0)
          return 'First name is required';
        if (value.trim().length < 2)
          return 'First name must be at least 2 characters';
        return '';

      case 'last_name':
        if (!value || value.trim().length === 0) return 'Last name is required';
        if (value.trim().length < 2)
          return 'Last name must be at least 2 characters';
        return '';

      case 'designation':
        if (!value || value.trim().length === 0)
          return 'Designation is required';
        return '';

      case 'company_name':
        if (!value || value.trim().length === 0)
          return 'Company name is required';
        return '';

      case 'email':
        if (!value || value.trim().length === 0) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value))
          return 'Please enter a valid email address';
        return '';

      case 'phone':
        if (!value || value.trim().length === 0)
          return 'Phone number is required';

        const phoneRegex = /^[+]?[0-9\s\-()]{10,}$/;
        if (!phoneRegex.test(value.replace(/\s/g, '')))
          return 'Please enter a valid phone number';
        return '';

      case 'bio':
        if (!value || value.trim().length === 0) return 'Bio is required';
        if (value.trim().length < 10)
          return 'Bio must be at least 10 characters';
        return '';

      case 'tag':
        if (!value || value.length === 0) return 'At least one tag is required';
        return '';

      case 'company_website':
        if (value && value.trim().length > 0) {
          try {
            new URL(value.startsWith('http') ? value : `https://${value}`);
          } catch {
            return 'Please enter a valid website URL';
          }
        }
        return '';

      default:
        return '';
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prevData: any) => ({ ...prevData, [field]: value }));

    // Validate field on change and update errors
    const error = validateField(field, value);
    setErrors(prev => ({
      ...prev,
      [field]: error,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // Validate all required fields
    const fieldsToValidate = [
      'first_name',
      'last_name',
      'designation',
      'company_name',
      'email',
      'phone',
      'bio',
      'tag',
    ];

    fieldsToValidate.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    // Validate company_website if provided
    if (formData.company_website) {
      const websiteError = validateField(
        'company_website',
        formData.company_website,
      );
      if (websiteError) {
        newErrors.company_website = websiteError;
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const selectTag = (tag: any) => {
    const currentTags = formData.tag || [];
    const tagName = tag.name || tag;

    const newTags = currentTags.includes(tagName)
      ? currentTags.filter(t => t !== tagName)
      : [...currentTags, tagName];

    handleInputChange('tag', newTags);
  };

  const isTagSelected = (tag: any) => {
    const tagName = tag.name || tag;
    return formData?.tag?.includes(tagName);
  };

  const handleSave = () => {
    if (!formData) return;

    if (!validateForm()) {
      const firstErrorField = Object.keys(errors).find(key => errors[key]);
      const firstErrorMessage = firstErrorField
        ? errors[firstErrorField]
        : 'Please fix the validation errors';

      Toast.show(firstErrorMessage, Toast.LONG);

      return;
    }

    const payload = {
      first_name: formData.first_name.trim(),
      last_name: formData.last_name.trim(),
      designation: formData.designation.trim(),
      company_name: formData.company_name.trim(),
      company_website: formData.company_website
        ? formData.company_website.trim()
        : null,
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      bio: formData.bio.trim(),
      tags: Array.isArray(formData.tag) ? formData.tag.join(',') : '',
    };

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
          <TouchableOpacity
            style={styles.imageBox}
            disabled={isUploading}
            onPress={handlePickAvatar}
          >
            <Icon
              source={{ uri: profileData?.imageUrl }}
              size={100}
              backgroundColor={COLORS.placeholder}
              borderRadius={50}
            />
            <View style={styles.imageBoxEdit}>
              {isUploading ? (
                <Text style={{ color: COLORS.white, fontSize: 12 }}>...</Text>
              ) : (
                <EditProfileIcon />
              )}
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
            value={formData?.last_name}
            label={'Last Name'}
            labelStyle={styles.labelStyle}
            placeholder={''}
            onChangeText={text => handleInputChange('last_name', text)}
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
            placeholder={'https://example.com'}
            onChangeText={text => handleInputChange('company_website', text)}
            required={false}
            style={styles.textBoxStyle}
            editable={true}
          />

          {/* Tags Selection */}
          <View style={styles.tagContainer}>
            <Text style={styles.labelStyle}>
              Tags <Text style={styles.asterisk}> *</Text>
            </Text>
            {errors.tag && <Text style={styles.errorText}>{errors.tag}</Text>}
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
            keyboardType="email-address"
            autoCapitalize="none"
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
            keyboardType="phone-pad"
          />

          <TextBox
            value={formData?.bio}
            label={'Bio'}
            labelStyle={styles.labelStyle}
            placeholder={'Tell us about yourself...'}
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
