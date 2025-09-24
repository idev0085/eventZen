import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, TEXT_SIZES } from '../utils/constants';
import Ionicons from '@react-native-vector-icons/ionicons';

interface FilterDropDownProps {
  label?: string;
  options?: string[];
  labelStyle?: object;
  selectedItems: string[];
  onSelectionChange: (selected: string[]) => void;
}

const FilterDropDown = ({
  label,
  options = [],
  labelStyle,
  selectedItems = [],
  onSelectionChange,
}: FilterDropDownProps) => {
  const [open, setOpen] = useState(false);

  const safeOptions = Array.isArray(options) ? options : [];
  const optionsLength = safeOptions.length;

  const toggleSelect = (item: string) => {
    const newSelection = selectedItems.includes(item)
      ? selectedItems.filter(s => s !== item)
      : [...selectedItems, item];

    onSelectionChange(newSelection);
  };

  const handleSelectAll = (list: string[]) => {
    const newSelection = [...new Set([...selectedItems, ...list])];
    onSelectionChange(newSelection);
  };

  const handleDeselectAll = (list: string[]) => {
    const newSelection = selectedItems.filter(s => !list.includes(s));
    onSelectionChange(newSelection);
  };

  const unselected = safeOptions.filter(opt => !selectedItems.includes(opt));

  return (
    <View style={styles.wrapper}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <TouchableOpacity
        style={styles.dropDownHeader}
        onPress={() => setOpen(!open)}
        disabled={optionsLength === 0}
      >
        <Text style={styles.headerText}>
          {selectedItems.length ? selectedItems.length : 0} Selected
        </Text>
        <Ionicons
          name={open ? 'chevron-up' : 'chevron-down'}
          color="#1f1f1f"
          size={20}
        />
      </TouchableOpacity>
      {optionsLength === 0 && (
        <Text style={styles.noOptionsText}>No options available</Text>
      )}
      {open && optionsLength > 0 && (
        <View style={styles.dropDownBody}>
          {selectedItems.length > 0 && (
            <View
              style={[
                styles.section,
                { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 },
              ]}
            >
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                  SELECTED ({selectedItems.length})
                </Text>
                <TouchableOpacity
                  onPress={() => handleDeselectAll(selectedItems)}
                >
                  <Text style={styles.sectionAction}>Deselect All</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={selectedItems}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.itemRow}
                    onPress={() => toggleSelect(item)}
                  >
                    <Ionicons
                      name="checkbox"
                      size={20}
                      color="#0e69e3"
                      style={{ marginRight: 8 }}
                    />
                    <Text style={styles.itemText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
          <View
            style={[
              styles.section,
              {
                borderTopRightRadius: selectedItems.length ? 0 : 8,
                borderTopLeftRadius: selectedItems.length ? 0 : 8,
                borderTopWidth: selectedItems.length ? 0 : 1,
              },
            ]}
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                UNSELECTED ({unselected.length}/{optionsLength})
              </Text>
              {unselected.length > 0 && (
                <TouchableOpacity onPress={() => handleSelectAll(unselected)}>
                  <Text style={styles.sectionAction}>Select All</Text>
                </TouchableOpacity>
              )}
            </View>
            <FlatList
              data={unselected}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.itemRow}
                  onPress={() => toggleSelect(item)}
                >
                  <Ionicons
                    name="square-outline"
                    size={20}
                    color="#BCCCDC"
                    style={{ marginRight: 8 }}
                  />
                  <Text style={styles.itemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default FilterDropDown;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  label: {
    fontSize: TEXT_SIZES.sm,
    fontWeight: '700',
    marginBottom: 6,
    color: COLORS.textPrimary,
  },
  dropDownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderColor: '#E0E0E0',
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
  },
  headerText: {
    fontSize: 14,
    color: '#333',
  },
  dropDownBody: {
    marginTop: 8,
  },
  section: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F5F5F5',
  },
  sectionTitle: {
    fontSize: TEXT_SIZES.xs,
    fontWeight: '500',
    color: '#555',
  },
  sectionAction: {
    fontSize: TEXT_SIZES.xs,
    fontWeight: '500',
    color: '#1976D2',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  itemText: {
    color: COLORS.tinyDot,
    fontSize: TEXT_SIZES.sm,
  },
  noOptionsText: {
    fontSize: TEXT_SIZES.sm,
    color: '#999',
    fontStyle: 'italic',
    padding: 12,
    textAlign: 'center',
  },
});
