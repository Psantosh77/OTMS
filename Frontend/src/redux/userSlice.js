import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  manufacturers: [],
  selectedBrand: "",
  models: [],
  selectedModel: "",
  brandModelSubmitted: false,
  loggedInEmail: null,
  userRole: null, // 'client', 'vendor', 'admin'
  isAuthenticated: false,
  selectedServices: [],
  serviceSearch: "",
  locationFilter: "",
  brandFilter: "",
  modelFilter: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setManufacturers(state, action) {
      state.manufacturers = action.payload;
    },
    setSelectedBrand(state, action) {
      state.selectedBrand = action.payload;
    },
    setModels(state, action) {
      state.models = action.payload;
    },
    setSelectedModel(state, action) {
      state.selectedModel = action.payload;
    },
    setBrandModelSubmitted(state, action) {
      state.brandModelSubmitted = action.payload;
    },
    setLoggedInEmail(state, action) {
      state.loggedInEmail = action.payload;
    },
    setUserRole(state, action) {
      state.userRole = action.payload;
    },
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    setUserInfo(state, action) {
      state.loggedInEmail = action.payload.email;
      state.userRole = action.payload.role;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    setServiceSearch(state, action) {
      state.serviceSearch = action.payload;
    },
    addSelectedService(state, action) {
      if (!state.selectedServices.some((s) => s.id === action.payload.id)) {
        state.selectedServices.push(action.payload);
      }
    },
    removeSelectedService(state, action) {
      state.selectedServices = state.selectedServices.filter(
        (s) => s.id !== action.payload
      );
    },
    setLocationFilter(state, action) {
      state.locationFilter = action.payload;
    },
    setBrandFilter(state, action) {
      state.brandFilter = action.payload;
      state.modelFilter = ""; // reset model when brand changes
    },
    setModelFilter(state, action) {
      state.modelFilter = action.payload;
    },
    resetUserState(state) {
      state.manufacturers = [];
      state.selectedBrand = "";
      state.models = [];
      state.selectedModel = "";
      state.brandModelSubmitted = false;
      state.loggedInEmail = null;
      state.userRole = null;
      state.isAuthenticated = false;
      state.selectedServices = [];
      state.serviceSearch = "";
      state.locationFilter = "";
      state.brandFilter = "";
      state.modelFilter = "";
    },
  },
});

export const {
  setManufacturers,
  setSelectedBrand,
  setModels,
  setSelectedModel,
  setBrandModelSubmitted,
  setLoggedInEmail,
  setUserRole,
  setIsAuthenticated,
  setUserInfo,
  setServiceSearch,
  addSelectedService,
  removeSelectedService,
  setLocationFilter,
  setBrandFilter,
  setModelFilter,
  resetUserState,
} = userSlice.actions;

export default userSlice.reducer;