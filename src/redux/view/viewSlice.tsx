import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface ViewerState {
  view: 'calendar' | 'year-view' | 'list';
}

const initialState: ViewerState = {
  view: 'calendar'
};


export const viewSlice = createSlice({
  name: 'viewer',
  initialState,

  reducers: {
    setView:(state, action: PayloadAction<any>) => {
      state.view = action.payload;
    }
  },
 
});

export const { setView } = viewSlice.actions;
export const getView = (state: RootState) => state.viewer.view;

export default viewSlice.reducer;