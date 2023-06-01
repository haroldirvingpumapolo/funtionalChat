import { ADD_CATEGORY, DELETE_CATEGORY, RENAME_CATEGORY } from "../types/typesCategories";

const initialState = {
  categories: [
    { id: 1616885652491, categoryName: 'Information' },
    { id: 2616885694522, categoryName: 'Off-Topic' },
  ]
};

const reducerCategories = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORY: {
      const { newId, newCategoryName } = action.payload;
      const newCategory = { id: newId, categoryName: newCategoryName };
      return {
        ...state,
        categories: [...state.categories, newCategory],
      };
    }

    case DELETE_CATEGORY: {
      const { id } = action.payload;
      const updatedCategories = state.categories.filter(category => category.id !== id);
      return {
        ...state,
        categories: updatedCategories,
      };
    }

    case RENAME_CATEGORY: {
      const { id, newCategoryName } = action.payload;
      const updatedCategories = [...state.categories]
      updatedCategories.forEach(category => category.id === id && (category.categoryName = newCategoryName));
      return {
        ...state,
        categories: updatedCategories,
      };
    }
    default:
      return state;
  }
};

export default reducerCategories;
