import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import BackHeader from '../components/BackHeader';
import { COLORS, TEXT_SIZES } from '../utils/constants';
import UserCard from '../components/userCard';
import ContactDetailsCard from '../components/contactDetailsCard';
import AddNote from '../components/addNote';
import Button from '../components/ui/button';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useUpdateConnectionNote } from '../hooks/useConnections';

const ConnectionFound = () => {
  const [textArea, setTextArea] = useState('');
  const route = useRoute();
  const navigation = useNavigation();
  const { connection } = route.params;

  // Naya hook use karo
  const { mutate: updateNote, isPending } = useUpdateConnectionNote();

  const [note, setNote] = useState(connection.note || '');

  const handleSave = () => {
    updateNote({
      note: note,
      connectionId: connection.id,
    });
  };

  return (
    <>
      <BackHeader title="Connection Details" showBtn={true} />
      <ScrollView>
        <UserCard
          imageUrl={connection.avatar}
          companyName={connection.company}
          name={connection.name}
          designation={connection.designation}
        />
        <ContactDetailsCard
          email={connection.email}
          phone={connection.phone}
          address={connection.address}
          website={connection.company_website}
        />
        <AddNote heading="Add Note" value={note} onChangeText={setNote} />
      </ScrollView>
      <View style={styles.buttonRow}>
        <Button
          title="Cancel"
          variant="outlined"
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.buttonHalf}
        />
        <Button
          title={isPending ? 'Saving...' : 'Save'}
          onPress={handleSave}
          style={styles.buttonHalf}
          disabled={isPending}
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
