import localStorageService from '../services/localStorage.service';
import { createAction, createSlice } from '@reduxjs/toolkit';
import isOutdated from '../utils/isOutdated';
import scheduleService from '../services/schedule.service';

const initialState = localStorageService.getAccessToken()
  ? {
    entities: null,
    isLoading: true,
    error: null,
    auth: { userId: localStorageService.getUserId() },
    isLoggedIn: true,
    dataLoaded: false
  }
  : {
    entities: null,
    isLoading: false,
    error: null,
    auth: null,
    isLoggedIn: false,
    dataLoaded: false
  };

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    scheduleRequested: (state) => {
      state.isLoading = true;
    },
    scheduleReceived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    scheduleReceivedFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    scheduleCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    scheduleUpdateSuccessed: (state, action) => {
      state.entities[
        state.entities.findIndex((u) => u._id === action.payload._id)
        ] = action.payload;
    },
    scheduleRemoved: (state, action) => {
      state.entities = state.entities.filter(
        (c) => c._id !== action.payload
      );
    }
  }
});

const {reducer: scheduleReducer, actions} = scheduleSlice;
const {
  scheduleRequested,
  scheduleReceived,
  scheduleReceivedFailed,
  scheduleCreated,
  scheduleUpdateSuccessed,
  scheduleRemoved
} = actions;

const addScheduleRequested = createAction('schedule/addScheduleRequested');
const updateScheduleRequested = createAction('schedule/updateScheduleRequested');
const updateScheduleFailed = createAction('schedule/updateScheduleFailed');
const removeScheduleRequested = createAction('schedule/removeScheduleRequested');


export const loadScheduleList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().schedule;
  if (isOutdated(lastFetch)) {
    dispatch(scheduleRequested());

    try {
      const { content} = await scheduleService.getSchedualList();
      dispatch(scheduleReceived(content));
    } catch (error) {
      dispatch(scheduleReceivedFailed(error.message));
    }
  }
};

export const createSchedule = (payload) => async (dispatch, getState) => {
  dispatch(addScheduleRequested());
  try {
    const { content } = await scheduleService.createSchedual(payload);
    dispatch(scheduleCreated(content));
  } catch (error) {
    dispatch(scheduleReceivedFailed(error.message));
  }
};

export const removeSchedule = (scheduleId) => async (dispatch) => {
  dispatch(removeScheduleRequested());
  try {
    const { content } = await scheduleService.removeSchedual(scheduleId);
    if (!content) {
      dispatch(scheduleRemoved(scheduleId));
    }
  } catch (error) {
    dispatch(scheduleReceivedFailed(error.message));
  }
};

export const updateSchedule = (payload) => async (dispatch) => {
  dispatch(updateScheduleRequested());
  try {
    const { content } = await scheduleService.updateSchedual(payload);
    dispatch(scheduleUpdateSuccessed(content));
    // history.push(`/users/${content._id}`);
  } catch (error) {
    dispatch(updateScheduleFailed(error.message));
  }
};

export default scheduleReducer;