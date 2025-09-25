import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import BackHeader from '../components/BackHeader';
import { COLORS, JPGIcon, PNGIcon, TEXT_SIZES } from '../utils/constants';
import UserCard from '../components/userCard';
import ContactDetailsCard from '../components/contactDetailsCard';
import RatingSelectorCard from '../components/RatingSelectorCard';
import FilterDropDown from '../components/filterDropDown';
import FileUploadCard from '../components/fileUploadCard';
import AddNote from '../components/addNote';
import Button from '../components/ui/button';
import { useUpdateConnection } from '../hooks/useConnections';
import { useTags } from '../hooks/useApi';
import { useDeleteFile, useUploadFile } from '../hooks/useFiles';

const ConnectionEdit = () => {
  const route = useRoute();
  const { connection } = route.params;

  const { data: availableTags, isLoading: areTagsLoading } = useTags();
  const { mutate: updateConnection, isPending } = useUpdateConnection();

  const [formData, setFormData] = useState({
    tags: connection.tags || [],
    rating: connection.rating || 'Normal',
    visitingCardImage: '',
    note: connection.note || '',
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const payload = {
      id: connection.id,
      ...formData,
    };
    updateConnection(payload);
  };

  const queryKeyToInvalidate = ['connection', connection.id];

  const { mutateAsync: uploadFileAsync, isPending: isUploading } =
    useUploadFile({ queryKeyToInvalidate });

  const { mutateAsync: deleteFileAsync, isPending: isDeleting } = useDeleteFile(
    { queryKeyToInvalidate },
  );

  const handleFileUpload = async (fileBase64: string) => {
    const payload = {
      detailsId: connection.id,
      type: 'connection' as const,
      file: fileBase64,
    };
    return await uploadFileAsync(payload);
  };

  const handleFileDelete = async (fileId: string) => {
    const payload = {
      detailsId: connection.id,
      type: 'connection' as const,
      fileId,
    };
    return await deleteFileAsync(payload);
  };

  // TODO: Refactored it later
  const getFileTypeIcon = (fileName: string) => {
    const ext = fileName?.split('.').pop()?.toLowerCase();
    if (ext === 'jpg' || ext === 'jpeg') return <JPGIcon />;
    if (ext === 'png') return <PNGIcon />;
    return null;
  };

  return (
    <>
      <BackHeader title="Edit Connection" showBtn={true} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <UserCard
          imageUrl={connection.avatarUrl}
          companyName={connection.companyName}
          name={connection.rep_name}
          designation={connection.rep_designation}
        />
        <ContactDetailsCard
          email={connection.rep_email}
          phone={connection.rep_phone}
          address={connection.rep_address}
          website={connection.company_website}
        />
        <View style={styles.section}>
          <FilterDropDown
            label="Tags"
            labelStyle={{ fontSize: 14, fontWeight: '700' }}
            options={areTagsLoading ? [] : availableTags || []}
            selectedItems={formData.tags}
            onSelectionChange={selectedTags =>
              handleInputChange('tags', selectedTags)
            }
          />
        </View>
        <View style={styles.section}>
          <RatingSelectorCard
            labelStyle={{ fontSize: 14, fontWeight: '700' }}
            initialRating={formData.rating}
            onRatingChange={newRating => handleInputChange('rating', newRating)}
          />
        </View>
        <View style={styles.section}>
          <FileUploadCard
            maxFiles={1}
            maxSizeMB={5}
            title="Upload Visiting Card"
            labelStyle={{ fontSize: 16, fontWeight: '700', marginBottom: 18 }}
            description="JPG or PNG (max 5MB)"
            onUpload={(fileBase64: string) => {
              handleInputChange('visitingCardImage', fileBase64);
            }}
            onDelete={() => {
              handleInputChange('visitingCardImage', '');
            }}
            autoUpload={false}
            showInitialFiles={true}
            label="Upload"
            type="connection"
          />
        </View>
        <AddNote
          heading="Note"
          placeholder="Update your note..."
          value={formData.note}
          onChangeText={text => handleInputChange('note', text)}
        />
      </ScrollView>
      <View style={styles.footer}>
        <Button
          title={isPending ? 'Saving...' : 'Save'}
          onPress={handleSave}
          disabled={isPending}
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
  list: {
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3EDFF',
    borderRadius: 10,
    gap: 5,
    marginBottom: 6,
  },
  fileName: {
    color: COLORS.primary,
    fontSize: TEXT_SIZES.xs,
    flex: 1,
  },
  fileInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
});
