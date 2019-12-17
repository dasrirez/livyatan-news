export const SELECT_CATEGORY = 'category:select'

export const selectCategory = (category) => {
  return {
    type: SELECT_CATEGORY,
    payload: {
      category,
    },
  }
};