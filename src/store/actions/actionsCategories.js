import { ADD_CATEGORY, DELETE_CATEGORY, RENAME_CATEGORY } from "../types/typesCategories";

export const addCategory = (newId, newCategoryName) => ({
  type: ADD_CATEGORY,
  payload: { newId, newCategoryName },
});

export const deleteCategory = (id) => ({
  type: DELETE_CATEGORY,
  payload: { id },
});

export const renameCategory = (id, newCategoryName) => ({
  type: RENAME_CATEGORY,
  payload: { id, newCategoryName },
});
