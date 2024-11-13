import apiSlice from "../apiSlice";

type ResponseData = {
  city: string;
  cities: { city: string }[];
  cityLocations: { location: string }[];
};

type CityData = {
  [key: string]: { [key: string]: string[] };
};

const RoomApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRoomLocations: builder.query<CityData, string>({
      query: (category) => `/location?category=${category}`,
      transformResponse: function (data: ResponseData, meta, arg: string) {
        console.log(data);
        const transformedData = {
          [arg]: {
            [data.city]: data.cityLocations.map((cityObj) => cityObj.location),
          },
        };
        return transformedData;
      },
    }),
  }),
});

export default RoomApi;
