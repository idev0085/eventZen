import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import BackHeader from '../components/BackHeader';
import UserCard from '../components/userCard';
import ContactDetailsCard from '../components/contactDetailsCard';
import RatingSelectorCard from '../components/RatingSelectorCard';
import FilterDropDown from '../components/filterDropDown';
import { COLORS, TEXT_SIZES } from '../utils/constants';
import FileUploadCard from '../components/fileUploadCard';
import AddNote from '../components/addNote';
import Button from '../components/ui/button';

const ConnectionEdit = () => {
  const options = [
    'Electronics',
    'Clothing',
    'Home & Garden',
    'Sports & Outdoors',
    'Books & Media',
  ];

  const handleSave = () => {};
  return (
    <>
      <BackHeader title="Connection Details" showBtn={true} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <UserCard imageUrl="" companyName="" name="" designation="" />
        <ContactDetailsCard email={''} phone={''} address={''} website={''} />
        <View style={styles.section}>
          <FilterDropDown
            label="Tags"
            labelStyle={{ fontSize: 14, fontWeight: '400' }}
            options={options}
          />
        </View>
        <View style={styles.section}>
          <RatingSelectorCard
            labelStyle={{ fontSize: 14, fontWeight: '400' }}
          />
        </View>
        <View style={styles.section}>
          <FileUploadCard
            maxFiles={1}
            maxSizeMB={10}
            multiple={false}
            title="Select file to upload"
            description="SVG, PNG, JPG or GIF (max 10MB)"
            label="Visiting Card"
            labelStyle={{ fontSize: 14, fontWeight: '400' }}
          />
        </View>
        <AddNote heading="Add note" placeholder="Message" />
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

export default ConnectionEdit;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#F4F4F4',
    paddingBottom: 20,
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
  section: {
    backgroundColor: COLORS.white,
    marginHorizontal: 14,
    marginTop: 10,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  footer: {
    backgroundColor: '#fff',
    padding: 15,
  },
});
