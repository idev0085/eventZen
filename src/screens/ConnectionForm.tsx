import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Toast from 'react-native-simple-toast';

// Components
import BackHeader from '../components/BackHeader';
import { COLORS, TEXT_SIZES } from '../utils/constants';
import DropdownField from '../components/dropDownField';
import Card from '../components/card';
import TextBox from '../components/ui/textBox';
import FileUploadCard from '../components/fileUploadCard';
import RatingSelectorCard from '../components/RatingSelectorCard';
import FilterDropDown from '../components/filterDropDown';
import Button from '../components/ui/button';
import KeyboardAvoidingContainer from '../components/keyboardAvoidingContainer';

// Hooks
import { useCreateConnection } from '../hooks/useConnections';
import { useTags } from '../hooks/useApi';

const ConnectionForm = () => {
  const { mutate: createConnection, isPending } = useCreateConnection();

  const { data: availableTags, isLoading: areTagsLoading } = useTags();

  const [formState, setFormState] = useState({
    title: 'Mr',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    company_name: '',
    job_title: '',
    website: '',
    address: '',
    visiting_card_image: '',
    rating: 'Normal',
    tag: [],
    note: '',
  });

  const handleInputChange = (field: string, value: any) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Basic Validation
    if (!formState.first_name || !formState.last_name || !formState.email) {
      Toast.show('First Name, Last Name, and Email are required.', Toast.LONG);
      return;
    }

    // Email Validation (Simple Regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      Toast.show('Please enter a valid email address.', Toast.LONG);
      return;
    }

    const payload = {
      title: formState.title,
      first_name: formState.first_name,
      last_name: formState.last_name,
      email: formState.email,
      phone: formState.phone,
      company_name: formState.company_name,
      job_title: formState.job_title,
      address: formState.address,
      visiting_card_image: formState.visiting_card_image,
      rating: formState.rating,
      tag: formState.tag,
      note: formState.note,
      // website: formState.website,
    };

    createConnection(payload);
  };

  return (
    <View style={styles.container}>
      <BackHeader title="Add Connection" showBtn={true} />

      {/* Main content area that grows */}
      <View style={styles.content}>
        <KeyboardAvoidingContainer>
          <View style={styles.scrollContent}>
            <Card style={styles.wrapper}>
              <DropdownField
                label="Title"
                required
                selectedValue={formState.title}
                onValueChange={value => handleInputChange('title', value)}
                options={['Mr', 'Mrs', 'Ms']}
              />
              <TextBox
                label="First Name"
                placeholder={'Enter first name'}
                required={true}
                value={formState.first_name}
                onChangeText={text => handleInputChange('first_name', text)}
                style={{ height: 50 }}
              />
              <TextBox
                label="Last Name"
                placeholder={'Enter last name'}
                required={true}
                value={formState.last_name}
                onChangeText={text => handleInputChange('last_name', text)}
                style={{ height: 50 }}
              />
              <TextBox
                label="Email"
                placeholder={'Enter email address'}
                required={true}
                keyboardType="email-address"
                autoCapitalize="none"
                value={formState.email}
                onChangeText={text => handleInputChange('email', text)}
                style={{ height: 50 }}
              />
              <TextBox
                label="Phone Number"
                placeholder={'Enter phone number'}
                keyboardType="phone-pad"
                value={formState.phone}
                onChangeText={text => handleInputChange('phone', text)}
                style={{ height: 50 }}
              />
              <TextBox
                label="Company Name"
                placeholder={'Enter company name'}
                value={formState.company_name}
                onChangeText={text => handleInputChange('company_name', text)}
                style={{ height: 50 }}
              />
              <TextBox
                label="Job Title"
                placeholder={'Enter job title'}
                value={formState.job_title}
                onChangeText={text => handleInputChange('job_title', text)}
                style={{ height: 50 }}
              />
              <TextBox
                label="Website"
                placeholder={'Enter website URL'}
                keyboardType="url"
                value={formState.website}
                onChangeText={text => handleInputChange('website', text)}
                style={{ height: 50 }}
              />
              <TextBox
                label="Address"
                placeholder={'Enter address'}
                value={formState.address}
                onChangeText={text => handleInputChange('address', text)}
                style={{ height: 50 }}
              />
              <FileUploadCard
                maxFiles={1}
                maxSizeMB={10}
                multiple={false}
                title="Select file to upload"
                description="SVG, PNG, JPG or GIF (max 10MB)"
                label="Visiting Card"
                labelStyle={{ fontSize: 14, fontWeight: '500' }}
                onFileChange={base64String =>
                  handleInputChange('visiting_card_image', base64String)
                }
              />
              <RatingSelectorCard
                labelStyle={{ fontSize: 14, fontWeight: '500' }}
                // Jab rating change ho, state update karo
                onRatingChange={newRating =>
                  handleInputChange('rating', newRating)
                }
                initialRating={formState.rating}
              />
              <FilterDropDown
                label="Tags"
                labelStyle={{
                  fontSize: 14,
                  fontWeight: '500',
                  marginBottom: 10,
                }}
                options={areTagsLoading ? [] : availableTags || []}
                selectedItems={formState.tag}
                onSelectionChange={selectedTags =>
                  handleInputChange('tag', selectedTags)
                }
              />
              <TextBox
                label="Note"
                placeholder={'Add a note...'}
                multiline
                numberOfLines={4}
                value={formState.note}
                onChangeText={text => handleInputChange('note', text)}
                style={{ height: 100, textAlignVertical: 'top' }}
                containerStyle={{ marginTop: 10 }}
              />
            </Card>
            <View style={styles.bottomSpacer} />
          </View>
        </KeyboardAvoidingContainer>
      </View>

      {/* Fixed footer at bottom */}
      <View style={styles.footer}>
        <Button
          title={isPending ? 'Saving...' : 'Save'}
          onPress={handleSave}
          disabled={isPending}
          style={{ borderRadius: 10, width: '100%' }}
          textStyle={{ fontSize: TEXT_SIZES.sm, fontWeight: '400' }}
        />
      </View>
    </View>
  );
};

export default ConnectionForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 15,
    paddingBottom: 10,
  },
  wrapper: {
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 14,
    alignSelf: 'center',
    width: '100%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: '#fff',
  },
  footer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  bottomSpacer: {
    height: 20,
  },
});
