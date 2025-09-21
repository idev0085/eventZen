import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, Download, DownloadIcon, TEXT_SIZES } from '../utils/constants';
import BackHeader from '../components/BackHeader';
import LoadingOverlay from '../components/loadingOverlay';
import UserCard from '../components/userCard';
import ContactDetails from '../components/contactDetails';
import Button from '../components/ui/button';
import AddNote from '../components/addNote';
import { getEmoji, RatingOption } from '../utils/getEmojiUtil';

const connectionData = {
  id: 'con-1',
  companyName: 'Tech Innovations Inc.',
  company_website: 'https://techinnovations.com',
  rep_name: 'Jane Doe',
  rep_email: 'email',
  rep_phone: '+1234567890',
  avatarUrl:
    'https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg',
  tags: ['Fintech', 'Cloud', 'SaaS', 'Fintech', 'Cloud'],
  rating: 'Cold | Warm',
  visitingCardUrl:
    'https://st.depositphotos.com/17620692/61016/v/450/depositphotos_610167492-stock-illustration-luxury-dark-blue-gold-background.jpg',
  note: 'Follow up in two weeks.',
  rep_address: '', // missing
  rep_designation: '', // missing
};

const ConnectionDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [textArea, setTextArea] = useState('');

  if (isLoading) {
    return <LoadingOverlay visible={isLoading} />;
  }

  const renderRating = (rating: RatingOption | string) => {
    const ratingArr = rating?.split('|');

    return (
      <View style={styles.ratingContainer}>
        {Array.isArray(ratingArr) && ratingArr.length
          ? ratingArr.map(rate => (
              <Text key={rate} style={styles.emojiStyle}>
                {getEmoji(rate.trim())}
              </Text>
            ))
          : ''}
      </View>
    );
  };

  const handleEdit = () => {};

  return (
    <>
      <BackHeader title="Connection Details" showBtn={true} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <UserCard
          imageUrl={connectionData.avatarUrl}
          companyName={connectionData.companyName}
          name={connectionData.rep_name}
          designation={connectionData.rep_designation}
        />
        <ContactDetails
          heading="Contact Details"
          email={connectionData.rep_email}
          phone={connectionData.rep_phone}
          address={connectionData.rep_address}
          website={connectionData.company_website}
        />
        {/* Tags Component */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Tag</Text>
          <View style={styles.tagsContainer}>
            {connectionData.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
        {/* Ratings Component */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Ratings</Text>
          {renderRating(connectionData.rating)}
        </View>
        {/* Render Visiting Card View Component*/}
        <View style={styles.section}>
          <View style={styles.downloadContainer}>
            <Text style={styles.sectionHeading}>Visting Card</Text>
            <TouchableOpacity style={styles.downloadIconTextStyle}>
              <DownloadIcon />
              <Text style={styles.downloadText}>Download</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={{
              uri: `${connectionData.visitingCardUrl}`,
            }}
            style={[
              styles.downloadVisitingCard,
              { width: '100%', height: 200 },
            ]}
          />
        </View>
        {/* Render Add Note View Component*/}
        <AddNote
          heading="Add Note"
          value={connectionData.note}
          editable={false}
          textInputStyle={{ color: '#4E4E4E' }}
        />

        <View style={styles.footer}>
          <Button
            title="Edit"
            onPress={handleEdit}
            style={{ borderRadius: 10, width: '100%' }}
            textStyle={{ fontSize: TEXT_SIZES.sm, fontWeight: '400' }}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default ConnectionDetails;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#F4F4F4',
    paddingBottom: 20,
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
  sectionHeading: {
    fontSize: TEXT_SIZES.md,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CACACA',
  },
  tagText: {
    fontSize: TEXT_SIZES.xs,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: TEXT_SIZES.md,
    fontWeight: '600',
  },
  downloadContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  downloadText: {
    color: COLORS.primary,
  },
  downloadIconTextStyle: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  downloadVisitingCard: {
    borderRadius: 10,
  },
  emojiStyle: {
    fontSize: 34,
    borderWidth: 1,
    padding: 20,
    borderRadius: 10,
    borderColor: '#EEEEEE',
  },
  footer: {
    backgroundColor: '#fff',
    padding: 15,
  },
});
