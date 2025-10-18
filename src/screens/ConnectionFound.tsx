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
    <View style={styles.container}>
      <BackHeader title="Connection Details" showBtn={true} />

      <View style={styles.content}>
        <KeyboardAvoidingContainer>
          <View style={styles.scrollContent}>
            <UserCard
              imageUrl={connection.avatar}
              companyName={connection.company}
              name={connection.name}
              designation={connection.designation}
              company_website={connection.company_website || ''}
            />
            <ContactDetailsCard
              email={connection.email}
              phone={connection.phone}
              address={connection.address}
              website={connection.company_website}
            />
            <AddNote heading="Add Note" value={note} onChangeText={setNote} />
          </View>
        </KeyboardAvoidingContainer>
      </View>

      <View style={styles.footer}>
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
      </View>
    </View>
  );
};

export default ConnectionFound;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  buttonHalf: {
    flex: 1,
  },
});
