import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, TEXT_SIZES } from '../utils/constants';

type RatingOption = 'Cold' | 'Normal' | 'Warm';

interface RatingSelectorCardProps {
  initialRating?: RatingOption;
  onRatingChange?: (rating: RatingOption) => void;
}

const RatingSelectorCard: React.FC<RatingSelectorCardProps> = ({
  initialRating = 'Warm',
  onRatingChange,
}) => {
  const [selectedRating, setSelectedRating] =
    useState<RatingOption>(initialRating);

  const handlePress = (rating: RatingOption) => {
    setSelectedRating(rating);
    if (onRatingChange) {
      onRatingChange(rating);
    }
  };

  const getEmoji = (rating: RatingOption) => {
    switch (rating) {
      case 'Cold':
        return '😰';
      case 'Normal':
        return '🙂';
      case 'Warm':
        return '😊';
      default:
        return '';
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Ratings</Text>
      <View style={styles.optionsContainer}>
        {['Cold', 'Normal', 'Warm'].map(rating => {
          const isSelected = selectedRating === rating;
          return (
            <TouchableOpacity
              key={rating}
              style={[
                styles.optionButton,
                isSelected && styles.selectedOptionButton,
              ]}
              onPress={() => handlePress(rating as RatingOption)}
            >
              <Text style={styles.emoji}>
                {getEmoji(rating as RatingOption)}
              </Text>
              <Text
                style={[
                  styles.optionText,
                  {
                    color: isSelected ? COLORS.primary : COLORS.black,
                  },
                ]}
              >
                {rating}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  optionButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  selectedOptionButton: {
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  emoji: {
    fontSize: 40,
    marginBottom: 5,
  },
  optionText: {
    fontSize: TEXT_SIZES.xxs,
  },
});

export default RatingSelectorCard;
