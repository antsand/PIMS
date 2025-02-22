import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import {
  leafletMouseSlice,
  jwtSlice,
  keycloakReadySlice,
  mapViewZoomSlice,
  filterSlice,
  parcelLayerDataSlice,
  accessRequestSlice,
  agencySlice,
  lookupCodeSlice,
  parcelSlice,
  userSlice,
  networkSlice,
  projectSlice as disposalSlice,
} from './slices';
import projectWorkflowSlice from 'features/projects/common/slices/projectWorkflowSlice';
import projectSlice from 'features/projects/common/slices/projectSlice';
import projectTasksSlice from 'features/projects/common/slices/projectTasksSlice';
import ProjectWorkflowTasksSlice from 'features/projects/common/slices/projectWorkflowTasksSlice';
import projectStatusesSlice from 'features/projects/common/slices/projectStatusesSlice';
import propertyNameSlice from 'features/properties/common/slices/propertyNameSlice';

export const reducerObject = {
  loadingBar: loadingBarReducer,
  [lookupCodeSlice.name]: lookupCodeSlice.reducer,
  [parcelSlice.name]: parcelSlice.reducer,
  [accessRequestSlice.name]: accessRequestSlice.reducer,
  [agencySlice.name]: agencySlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [networkSlice.name]: networkSlice.reducer,
  [leafletMouseSlice.name]: leafletMouseSlice.reducer,
  [parcelLayerDataSlice.name]: parcelLayerDataSlice.reducer,
  [jwtSlice.name]: jwtSlice.reducer,
  [filterSlice.name]: filterSlice.reducer,
  [keycloakReadySlice.name]: keycloakReadySlice.reducer,
  [mapViewZoomSlice.name]: mapViewZoomSlice.reducer,

  [projectWorkflowSlice.name]: projectWorkflowSlice.reducer,
  [projectTasksSlice.name]: projectTasksSlice.reducer,
  [ProjectWorkflowTasksSlice.name]: ProjectWorkflowTasksSlice.reducer,
  [projectStatusesSlice.name]: projectStatusesSlice.reducer,
  [propertyNameSlice.name]: propertyNameSlice.reducer,
  [projectSlice.name]: projectSlice.reducer,
  [disposalSlice.name]: disposalSlice.reducer,
};

export const rootReducer = combineReducers(reducerObject);
