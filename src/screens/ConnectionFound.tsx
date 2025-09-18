import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import BackHeader from '../components/BackHeader';
import { COLORS, TEXT_SIZES } from '../utils/constants';
import UserCard from '../components/userCard';
import ContactDetailsCard from '../components/contactDetailsCard';
import AddNote from '../components/addNote';
import Button from '../components/ui/button';

const ConnectionFound = () => {
  const [textArea, setTextArea] = useState('');
  const connectionFoundData = {
    message: 'Connection found!',
    id: 5,
    name: 'Caleb Paquette',
    company: 'Langosh Group',
    designation: 'Internist',
    company_website: 'https://example.com/benjamin.miller',
    email: 'caleb.paquette@example.com',
    phone: '5450496515',
    avatar:
      'https://png.pngtree.com/png-clipart/20200224/original/pngtree-cartoon-color-simple-male-avatar-png-image_5230557.jpg',
    visiting_card_image:
      'http://localhost:8000/storage/users/2025-09-08-1978261425-1757320798.png?v=1757329459',
    tags: 'Cloud,Fintech,SaaS',
    rating: 'Cold',
    address:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit dolorum aliquam quaerat.',
    bio: 'In quos libero laborum quidem ullam quas. At assumenda quam culpa commodi. Fugiat id omnis iure inventore modi ab.',
    note: 'This is a note',
  };
  const handleSave = () => {};

  return (
    <>
      <BackHeader title="Connection Details" showBtn={true} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <UserCard
          imageUrl={connectionFoundData.avatar}
          companyName={connectionFoundData.company}
          name={connectionFoundData.name}
          designation={connectionFoundData.designation}
        />
        <ContactDetailsCard
          email={connectionFoundData.email}
          phone={connectionFoundData.phone}
          address={connectionFoundData.address}
          website={connectionFoundData.company_website}
        />
        <AddNote heading="Add Note" onChangeText={setTextArea} />
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

export default ConnectionFound;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    paddingBottom: 30,
  },
  footer: {
    backgroundColor: '#fff',
    padding: 15,
  },
});
