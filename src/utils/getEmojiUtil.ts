export type RatingOption = string;

export const getEmoji = (rating: RatingOption) => {
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
