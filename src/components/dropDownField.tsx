import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
} from 'react-native';
import { COLORS, TEXT_SIZES } from '../utils/constants';
import Ionicons from '@react-native-vector-icons/ionicons';

interface DropdownFieldProps {
  label?: string;
  options: string[];
  selectedValue: string;
  onValueChange: (val: string) => void;
  required?: boolean;
}

const DropdownField: React.FC<DropdownFieldProps> = ({
  label,
  options,
  selectedValue,
  onValueChange,
  required = false,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.wrapper}>
      {label && (
        <Text style={styles.label}>
          {label} {required && <Text style={{ color: COLORS.error }}>*</Text>}
        </Text>
      )}

      {/* Header */}
      <TouchableOpacity style={styles.header} onPress={() => setOpen(true)}>
        <Text style={styles.headerText}>
          {selectedValue ? selectedValue : 'Select option'}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#333" />
      </TouchableOpacity>

      {/* Options Modal */}
      <Modal visible={open} transparent animationType="fade">
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setOpen(false)}
        >
          <View style={styles.dropdown}>
            <FlatList
              data={options}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionRow}
                  onPress={() => {
                    onValueChange(item);
                    setOpen(false);
                  }}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default DropdownField;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  label: {
    fontSize: TEXT_SIZES.sm,
    fontWeight: '600',
    marginBottom: 6,
    color: COLORS.textPrimary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#F5F5F5',
  },
  headerText: {
    fontSize: TEXT_SIZES.sm,
    color: '#333',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    padding: 20,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 8,
  },
  optionRow: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  optionText: {
    fontSize: TEXT_SIZES.sm,
    color: COLORS.textPrimary,
  },
});
