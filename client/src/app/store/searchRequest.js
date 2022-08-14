import { createSlice } from '@reduxjs/toolkit';

const searchRequestSlice = createSlice({
  name: 'search',
  initialState: {
    entities: null,
    isSearchRequested: false,
    isFirstSearch: false
  },
  reducers: {
    searchRequestStart: (state, action) => {
      state.isSearchRequested = true;
      state.entities = action.payload;
    },
    searchRequestFinish: (state) => {
      state.isSearchRequested = false;
    },
    searchRequestClear: (state) => {
      state.isSearchRequested = false;
      state.entities = [];
    },
    searchFirstStatus: (state) => {
      state.isFirstSearch = true;
    }
  }
});

const {reducer: searchRequestReducer, actions} = searchRequestSlice;
const { searchRequestStart, searchRequestFinish, searchRequestClear, searchFirstStatus } = actions;

export const searchStart = (payload) => async (dispatch) => {
  try {
    await dispatch(searchRequestStart(payload));
  } finally {
  dispatch(searchRequestFinish());
  }
}

export const searchClear = () => async (dispatch) => {
    await dispatch(searchRequestClear());
}

export const searchFinish = () => async (dispatch) => {
  await dispatch(searchRequestFinish());
}

export const searchFirst = () => (dispatch) => {
  dispatch(searchFirstStatus());
}

export const getSearchStatus = () => (state) => state.search.isSearchRequested;
export const getSearchRequest = () => (state) => state.search.entities;
export const getFirstSearchStatus = () => (state) => state.search.isFirstSearch;

export default searchRequestReducer;
