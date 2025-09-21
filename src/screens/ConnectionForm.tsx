import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import BackHeader from '../components/BackHeader';
import { COLORS, TEXT_SIZES } from '../utils/constants';
import DropdownField from '../components/dropDownField';
import Card from '../components/card';
import TextBox from '../components/ui/textBox';
import FileUploadCard from '../components/fileUploadCard';
import RatingSelectorCard from '../components/RatingSelectorCard';
import FilterDropDown from '../components/filterDropDown';
import Button from '../components/ui/button';

const ConnectionForm = () => {
  const [title, setTitle] = useState('Mr');

  // const options = [];
  const options = [
    'Electronics',
    'Clothing',
    'Home & Garden',
    'Sports & Outdoors',
    'Books & Media',
  ];

  const handleOnChange = () => {};

  const handleSave = () => {};
  return (
    <>
      <BackHeader title="Add Connection" showBtn={true} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.wrapper}>
          <DropdownField
            label="Title"
            required
            selectedValue={title}
            onValueChange={setTitle}
            options={['Mr', 'Mrs', 'Ms']}
          />
          <TextBox
            label="First Name"
            placeholder={''}
            required={true}
            editable={true}
            autoCapitalize="none"
            onChangeText={handleOnChange}
          />
          <TextBox
            label="Last Name"
            placeholder={''}
            required={true}
            editable={true}
            autoCapitalize="none"
            onChangeText={handleOnChange}
          />
          <TextBox
            label="Email"
            placeholder={''}
            required={true}
            editable={true}
            autoCapitalize="none"
            onChangeText={handleOnChange}
          />
          <TextBox
            label="Phone Number"
            placeholder={''}
            required={true}
            editable={true}
            autoCapitalize="none"
            onChangeText={handleOnChange}
          />
          <TextBox
            label="Company Name"
            placeholder={''}
            required={true}
            editable={true}
            autoCapitalize="none"
            onChangeText={handleOnChange}
          />
          <TextBox
            label="Job Title"
            placeholder={''}
            required={true}
            editable={true}
            autoCapitalize="none"
            onChangeText={handleOnChange}
          />
          <TextBox
            label="Website"
            placeholder={''}
            required={true}
            editable={true}
            autoCapitalize="none"
            onChangeText={handleOnChange}
          />
          <TextBox
            label="Address"
            placeholder={''}
            required={true}
            editable={true}
            autoCapitalize="none"
            onChangeText={handleOnChange}
          />
          <FileUploadCard
            maxFiles={1}
            maxSizeMB={10}
            multiple={false}
            title="Select file to upload"
            description="SVG, PNG, JPG or GIF (max 10MB)"
            label="Visiting Card"
            labelStyle={{ fontSize: 14, fontWeight: '400' }}
          />
          <RatingSelectorCard
            labelStyle={{ fontSize: 14, fontWeight: '400' }}
          />
          <FilterDropDown
            label="Tags"
            labelStyle={{ fontSize: 14, fontWeight: '400' }}
            options={options}
          />
        </Card>
      </ScrollView>
      <View style={styles.footer}>
        <Button
          title="Save"
          onPress={handleSave}
          style={{ borderRadius: 10, width: '100%' }}
          textStyle={{ fontSize: TEXT_SIZES.sm, fontWeight: '400' }}
        />
      </View>
    </>
  );
};

export default ConnectionForm;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    padding: 15,
    paddingBottom: 40,
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
    padding: 15,
  },
});
