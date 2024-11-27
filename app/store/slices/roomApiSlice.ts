import apiSlice from "../apiSlice";

type ResponseData = {
  city: string;
  cities: { city: string }[];
  cityLocations: { location: string }[];
};

type CityData = {
  [key: string]:
    | {
        [key: string]: string[];
      }
    | string;
  city: string;
};

const RoomApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRoomLocations: builder.query<CityData, { category: string }>({
      query: ({ category }) => ({
        url: `/place/cities-locations?category=${category}`,
      }),
      transformResponse: (data: ResponseData, meta, arg) => {
        const citiesData = data.cities.reduce((acc, { city }) => {
          if (city === data.city) {
            acc[city] = data.cityLocations.map((loc) => loc.location);
          } else {
            acc[city] = [];
          }

          return acc;
        }, {} as { [key: string]: string[] });

        return { [arg.category]: citiesData, city: data.city };
      },
      keepUnusedDataFor: Infinity,
    }),
    getRoomCityLocations: builder.query<
      { location: string }[],
      { category: string; city: string }
    >({
      query: ({ category, city }) => {
        return {
          url: `/place/city-locations?category=${category}&city=${city}`,
        };
      },
      async onQueryStarted(
        arg: { category: string; city: string },
        { dispatch, queryFulfilled }
      ) {
        try {
          const { data: newData } = (await queryFulfilled) as {
            data: { location: string }[];
          };
          const transformedData = newData.map(
            (cityLocation) => cityLocation.location
          );
          dispatch(
            RoomApi.util.updateQueryData(
              "getRoomLocations",
              { category: arg.category },
              (draft) => {
                draft["city"] = arg.city;
                const draftCategory = draft[arg.category] as {
                  [key: string]: string[] | [];
                };
                if (!draftCategory[arg.city]) {
                  draftCategory[arg.city] = [];
                }

                draftCategory[arg.city] = transformedData;
              }
            )
          );
        } catch (error) {
          console.error("Error updating query data:", error);
        }
      },
    }),
    // getRoomCityLocations: builder.query<
    //   CityData,
    //   { category: string; city?: string }
    // >({
    //   query: ({ category }) => {
    //     return {
    //       url: `/location?category=${category}`,
    //     };
    //   },
    //   transformResponse: function (
    //     data: ResponseData,
    //     meta,
    //     arg: { category: string; city?: string }
    //   ) {
    //     return {
    //       [arg.category]: data.cities.reduce(
    //         (acc: { [key: string]: string[] }, cityObj) => {
    //           const city = cityObj.city;
    //           if (city === data.city) {
    //             acc[city] = data.cityLocations.map((loc) => loc.location);
    //           } else {
    //             acc[city] = [];
    //           }
    //           return acc;
    //         },
    //         {} as { [key: string]: string[] }
    //       ),
    //     };
    //   },
    //   async onQueryStarted(
    //     arg: { category: string; city?: string },
    //     { dispatch, queryFulfilled, getState }
    //   ) {
    //     // const currentState =
    //     //   getState().ApiSlice.queries['getRoomLocations("room")']?.data;
    //     // console.log(currentState);

    //     const cachedData = RoomApi.endpoints.getRoomLocations.select(arg)(
    //       getState()
    //     );
    //     // console.log("! ", cachedData.data);
    //     try {
    //       const { data: newData } = await queryFulfilled;

    //       // dispatch(
    //       //   // RoomApi.util.updateQueryData<CityData>("getRoomLocations", arg, (draft) => {
    //       //   RoomApi.util.updateQueryData("getRoomLocations", arg, (draft) => {
    //       //     console.log(
    //       //       "Draft data before merge : ",
    //       //       JSON.parse(JSON.stringify(draft))
    //       //     );
    //       //   })
    //       // );
    //     } catch {
    //       // Handle error
    //     }
    //   },
    // }),
  }),
});

export default RoomApi;
