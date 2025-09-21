import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, TEXT_SIZES } from '../utils/constants';
import { Ionicons } from '@react-native-vector-icons/ionicons';

interface FilterDropDownProps {
  label?: string;
  options?: string[];
  labelStyle?: object;
}

const FilterDropDown = ({
  label,
  options = [],
  labelStyle,
}: FilterDropDownProps) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  // Safe array operations
  const safeOptions = Array.isArray(options) ? options : [];
  const optionsLength = safeOptions.length;

  const toggleSelect = (item: string) => {
    if (selected.includes(item)) {
      setSelected(selected.filter(s => s !== item));
    } else {
      setSelected([...selected, item]);
    }
  };

  const handleSelectAll = (list: string[]) =>
    setSelected([...new Set([...selected, ...list])]);

  const handleDeselectAll = (list: string[]) =>
    setSelected(selected.filter(s => !list.includes(s)));

  const unselected = safeOptions.filter(opt => !selected.includes(opt));

  return (
    <View style={styles.wrapper}>
      {/* label */}
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <TouchableOpacity
        style={styles.dropDownHeader}
        onPress={() => setOpen(!open)}
        disabled={optionsLength === 0} // Disable if no options
      >
        <Text style={styles.headerText}>
          {selected.length ? selected.length : 0} Selected
        </Text>

        <Ionicons
          name={open ? 'chevron-up' : 'chevron-down'}
          color="#1f1f1f"
          size={20}
        />
      </TouchableOpacity>

      {/* Show message if no options */}
      {optionsLength === 0 && (
        <Text style={styles.noOptionsText}>No options available</Text>
      )}

      {/* Drop-down body */}
      {open && optionsLength > 0 && (
        <View style={styles.dropDownBody}>
          {/* selected section */}
          {selected.length > 0 && (
            <View
              style={[
                styles.section,
                {
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                },
              ]}
            >
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                  SELECTED ({selected.length})
                </Text>
                <TouchableOpacity onPress={() => handleDeselectAll(selected)}>
                  <Text style={styles.sectionAction}>Deselect All</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={selected}
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
          {/* unselected Section */}
          <View
            style={[
              styles.section,
              {
                borderTopRightRadius: selected.length ? 0 : 8,
                borderTopLeftRadius: selected.length ? 0 : 8,
                borderTopWidth: selected.length ? 0 : 1,
              },
            ]}
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                UNSELECTED ({unselected.length}/{optionsLength})
              </Text>
              {unselected.length > 0 && (
                <TouchableOpacity onPress={() => handleSelectAll(unselected)}>
                  <Text style={styles.sectionAction}>{`${
                    selected.length !== optionsLength ? 'Select All' : ''
                  }`}</Text>
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
    margin: 10,
    backgroundColor: '#fff',
    marginHorizontal: 2,
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
