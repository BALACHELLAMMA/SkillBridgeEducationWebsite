
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormDataState {
  firstName: string;
  lastName: string;
  userEmail: string;
  phoneNumber: string;
  subject: string;
  message: string;
}

const initialFormData: FormDataState = {
  firstName: '',
  lastName: '',
  userEmail: '',
  phoneNumber: '',
  subject: '',
  message: '',

};

// Create a slice with a reducer for the form data
const formDataSlice = createSlice({
  name: "formData",
  initialState: initialFormData,
  reducers: {
    updateFormData: (state, action: PayloadAction<Partial<FormDataState>>) => {
      return { ...state, ...action.payload };
    },

  },
});

// Extract the action creator from the slice
export const { updateFormData } = formDataSlice.actions;

// Create the Redux store using configureStore
const store = configureStore({
  reducer: {
    formData: formDataSlice.reducer,
  },
});

export default store;
