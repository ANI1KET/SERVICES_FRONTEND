import apiSlice from "../apiSlice";

const carApi = apiSlice.injectEndpoints({
  endpoints: () => ({}),
  // overrideExisting: true, // Set to true to override existing endpoints if needed
});

export default carApi;
