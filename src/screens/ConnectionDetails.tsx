import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { COLORS } from '../utils/constants';
import BackHeader from '../components/BackHeader';
import LoadingOverlay from '../components/loadingOverlay';
import UserCard from '../components/userCard';
import ContactDetails from '../components/contactDetails';
import AddNote from '../components/addNote';
import Button from '../components/ui/button';

const connectionData = {
  company_name: 'Company Name',
  avatar:
    'https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png',
  name: 'Michael Chen',
  role: 'Additional Director',
  contact_details: {
    email: 'digitalaptech@gmail.com',
    phone: '+1 7346274598',
    address:
      'EN-34 (9th Floor), Block-EN, Sector – V, Salt Lake City, Kolkata – 700091, West Bengal, India.',
    website: 'digitalaptech.com',
  },
};

const ConnectionDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [textArea, setTextArea] = useState('');

  if (isLoading) {
    return <LoadingOverlay visible={isLoading} />;
  }

  const handleCancel = () => {};
  const handleSave = () => {};

  return (
    <>
      <BackHeader title="Connection Details" showBtn={true} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <UserCard
          imageUrl={connectionData.avatar}
          companyName={connectionData.company_name}
          name={connectionData.name}
          designation={connectionData.role}
        />
        <ContactDetails
          heading="Contact Details"
          email={connectionData.contact_details.email}
          phone={connectionData.contact_details.phone}
          address={connectionData.contact_details.address}
          website={connectionData.contact_details.website}
        />
        <AddNote
          heading="Add Note"
          onChangeText={setTextArea}
          placeholder="Message"
        />

        {/* Button Row */}
        <View style={styles.buttonRow}>
          <Button
            title="Cancel"
            variant="outlined"
            onPress={handleCancel}
            style={styles.buttonHalf}
          />
          <Button title="Save" onPress={handleSave} style={styles.buttonHalf} />
        </View>
      </ScrollView>
    </>
  );
};

export default ConnectionDetails;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: COLORS.white,
    paddingBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    gap: 10,
  },
  buttonHalf: {
    flex: 1,
  },
});
