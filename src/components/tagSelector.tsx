import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';

const ALL_TAGS = [
  {
    id: 1,
    name: 'Data',
  },
  {
    id: 2,
    name: 'Startup',
  },
  {
    id: 3,
    name: 'Technology',
  },
  {
    id: 4,
    name: 'CLoud',
  },
  {
    id: 5,
    name: 'Business',
  },
  {
    id: 6,
    name: 'Security',
  },
  {
    id: 7,
    name: 'Networking',
  },
  {
    id: 8,
    name: 'AI',
  },
];

const TagItem = ({ label, isSelected, onPress }) => {
  const iconName = isSelected ? 'checkbox-marked' : 'checkbox-blank-outline';
  const iconColor = isSelected ? '#007AFF' : '#B0B0B0';

  return (
    <Pressable style={styles.tagItemContainer} onPress={onPress}>
      <MaterialIcons name={iconName} size={24} color={iconColor} />
      <Text style={styles.tagItemLabel}>{label}</Text>
    </Pressable>
  );
};

const TagSelector = () => {
  const [selectedIds, setSelectedIds] = useState(new Set([1, 2]));

  return (
    <View style={styles.container}>
      <View>{/* Header: e.g Tag */}</View>
      <View>
        <TagItem label={''} />
      </View>
    </View>
  );
};

export default TagSelector;

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: '90%',
    maxHeight: '60%',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingBottom: 12,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#888',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#A0A0A0',
    letterSpacing: 0.5,
  },
  actionText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  tagItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  tagItemLabel: {
    fontSize: 16,
    marginLeft: 12,
    color: '#333',
  },
});
