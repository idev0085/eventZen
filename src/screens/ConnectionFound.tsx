import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import BackHeader from '../components/BackHeader';
import { COLORS } from '../utils/constants';
import UserCard from '../components/userCard';
import ContactDetailsCard from '../components/contactDetailsCard';
import AddNote from '../components/addNote';
import Button from '../components/ui/button';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useUpdateConnectionNote } from '../hooks/useConnections';
import KeyboardAvoidingContainer from '../components/keyboardAvoidingContainer';

const ConnectionFound = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { connection } = route.params;

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
      <KeyboardAvoidingContainer>
        <BackHeader title="Connection Details" showBtn={true} />
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
      </KeyboardAvoidingContainer>
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
    backgroundColor: '#fff',
  },
  buttonHalf: {
    flex: 1,
  },
});
