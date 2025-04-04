'use client';

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';

import {
  GET_ROOM,
  GET_CITY_LOCATION_ROOMS,
  GET_LISTED_ROOMS_CITIES_LOCATIONS,
} from '@/app/dashboard/graphQL/roomQuery';
import RoomLayoutCard from './roomLayoutCard';
import SearchedLayout from './SearchedLayout';
import { LIMIT } from '@/app/lib/reusableConst';
import { MenuItem, Select } from '@mui/material';
import { NewListedRoom } from '@/app/types/types';
import { cn } from '@/app/lib/utils/tailwindMerge';
import { useThemeState } from '@/app/providers/reactqueryProvider';

const SearchLayout = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  const cachedTheme = useThemeState();

  const [isFilter, setIsFilter] = useState({ cityLocation: false, id: false });
  const [filterRooms, setFilterRooms] = useState({
    id: '',
    city: '',
    location: '',
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [citiesLocationsData, setCitiesLocationsData] = useState<
    Record<string, string[]>
  >({});

  const { data } = useQuery<{
    listedRoomCitiesLocations: { city: string; location: string }[];
  }>(GET_LISTED_ROOMS_CITIES_LOCATIONS, {
    variables: { id: session.data?.user.userId },
  });
  const [
    getCityLocationRooms,
    { data: cityLocationRoomsData, loading, error, fetchMore },
  ] = useLazyQuery<{
    cityLocationRooms: NewListedRoom[];
  }>(GET_CITY_LOCATION_ROOMS);
  const [getRoomData, { data: RoomData }] = useLazyQuery<{
    room: NewListedRoom;
  }>(GET_ROOM, { fetchPolicy: 'no-cache' });

  useEffect(() => {
    if (data?.listedRoomCitiesLocations) {
      const CitiesLocations = data.listedRoomCitiesLocations.reduce(
        (acc, { city, location }) => {
          if (!acc[city]) {
            acc[city] = [];
          }
          acc[city].push(location);
          return acc;
        },
        {} as Record<string, string[]>
      );

      setCitiesLocationsData(CitiesLocations);
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (filterRooms.id) {
      try {
        const roomId = atob(filterRooms.id);
        getRoomData({
          variables: { id: roomId },
        });
        setIsFilter({ ...isFilter, id: true });
      } catch (error) {
        console.log(error);
      }
    } else if (filterRooms.city) {
      getCityLocationRooms({
        variables: {
          offset: 0,
          limit: LIMIT,
          city: filterRooms.city,
          ...(filterRooms.location && { location: filterRooms.location }),
        },
      });
      setIsFilter({ ...isFilter, cityLocation: true });
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={cn('w-full max-xsm:hidden grid grid-cols-7')}
      >
        <input
          type="text"
          value={filterRooms.id}
          placeholder="Search by id"
          onChange={(e) => {
            setFilterRooms({
              city: '',
              location: '',
              id: e.target.value,
            });
          }}
          className={cn(
            cachedTheme?.bg,
            'col-span-2 px-2 ',
            cachedTheme?.textColor
          )}
        />

        <Select
          displayEmpty
          value={filterRooms.city}
          className={cn('col-span-2', cachedTheme?.bg, cachedTheme?.textColor)}
          onChange={(value) =>
            setFilterRooms({
              id: '',
              location: '',
              city: value.target.value,
            })
          }
          MenuProps={{
            PaperProps: {
              sx: {
                color: cachedTheme?.selectMenuTextColor,
                backgroundColor: cachedTheme?.selectMenuBg,
              },
            },
          }}
          sx={{
            '& .MuiSelect-select': {
              color: cachedTheme?.selectIcon,
            },
          }}
        >
          <MenuItem value="" disabled>
            City
          </MenuItem>
          {citiesLocationsData &&
            Object.keys(citiesLocationsData).map((city) => (
              <MenuItem
                key={city}
                value={city}
                sx={{
                  '&.MuiMenuItem-root:hover': {
                    backgroundColor: cachedTheme?.selectMenuHoverFocused,
                  },
                  '&.Mui-focusVisible': {
                    backgroundColor: cachedTheme?.selectMenuHoverFocused,
                  },
                }}
              >
                {city}
              </MenuItem>
            ))}
        </Select>

        <Select
          displayEmpty
          value={filterRooms.location}
          className={cn('col-span-2', cachedTheme?.bg, cachedTheme?.textColor)}
          disabled={!filterRooms?.city}
          onChange={(value) =>
            setFilterRooms({
              id: '',
              city: filterRooms.city,
              location: value.target.value,
            })
          }
          MenuProps={{
            PaperProps: {
              sx: {
                color: cachedTheme?.selectMenuTextColor,
                backgroundColor: cachedTheme?.selectMenuBg,
              },
            },
          }}
          sx={{
            '& .MuiSelect-select': {
              color: cachedTheme?.selectIcon,
            },
          }}
        >
          <MenuItem value="" disabled>
            Location
          </MenuItem>
          {citiesLocationsData &&
            filterRooms?.city &&
            citiesLocationsData[filterRooms.city] &&
            citiesLocationsData[filterRooms.city].map((location) => (
              <MenuItem
                key={location}
                value={location}
                sx={{
                  '&.MuiMenuItem-root:hover': {
                    backgroundColor: cachedTheme?.selectMenuHoverFocused,
                  },
                  '&.Mui-focusVisible': {
                    backgroundColor: cachedTheme?.selectMenuHoverFocused,
                  },
                }}
              >
                {location}
              </MenuItem>
            ))}
        </Select>

        <button
          type="submit"
          className={cn(
            cachedTheme?.activeBg,
            cachedTheme?.borderColor,
            cachedTheme?.activeTextColor,
            'col-span-1 border rounded-lg'
          )}
        >
          Search
        </button>
      </form>

      {RoomData && RoomData.room && isFilter.id && (
        <div>
          <svg
            width="30"
            height="30"
            fill="none"
            strokeWidth="2"
            className="mt-2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke={cachedTheme?.selectIcon}
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setIsFilter({ ...isFilter, id: false })}
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>

          <div className="grid lg:grid-cols-4 md:grid-cols-3 max-sm:grid-cols-2 max-xsm:grid-cols-1 gap-4 p-4">
            <RoomLayoutCard
              isFilter={isFilter}
              room={RoomData.room}
              setIsFilter={setIsFilter}
            />
          </div>
        </div>
      )}

      {cityLocationRoomsData && isFilter.cityLocation && (
        <div>
          <svg
            width="30"
            height="30"
            fill="none"
            strokeWidth="2"
            className="mt-2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke={cachedTheme?.selectIcon}
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setIsFilter({ ...isFilter, cityLocation: false })}
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          <SearchedLayout
            error={error}
            loading={loading}
            fetchMore={fetchMore}
            data={cityLocationRoomsData}
          />
        </div>
      )}

      <hr className={cn('border', cachedTheme?.borderColor)}></hr>

      {children}

      {isFilterOpen && (
        <div
          className={cn(
            cachedTheme?.bg,
            cachedTheme?.textColor,
            `fixed bottom-[7.8vh] left-0 right-0 flex flex-col items-center rounded-t-2xl transition-transform duration-300`
          )}
        >
          <form
            className={cn(
              cachedTheme?.borderColor,
              'grid grid-cols-1 gap-4 w-full border-2 rounded-t-2xl p-2'
            )}
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              value={filterRooms.id}
              placeholder="Search by id"
              onChange={(e) => {
                setFilterRooms({
                  city: '',
                  location: '',
                  id: e.target.value,
                });
              }}
              className={cn(
                'pt-2 px-2 text-lg',
                cachedTheme?.bg,
                cachedTheme?.textColor
              )}
            />

            <Select
              displayEmpty
              value={filterRooms.city}
              className={cn(cachedTheme?.bg, cachedTheme?.textColor)}
              onChange={(value) =>
                setFilterRooms({
                  id: '',
                  location: '',
                  city: value.target.value,
                })
              }
              MenuProps={{
                PaperProps: {
                  sx: {
                    color: cachedTheme?.selectMenuTextColor,
                    backgroundColor: cachedTheme?.selectMenuBg,
                  },
                },
              }}
              sx={{
                '& .MuiSelect-select': {
                  color: cachedTheme?.selectIcon,
                },
              }}
            >
              <MenuItem value="" disabled>
                City
              </MenuItem>
              {citiesLocationsData &&
                Object.keys(citiesLocationsData).map((city) => (
                  <MenuItem
                    key={city}
                    value={city}
                    sx={{
                      '&.MuiMenuItem-root:hover': {
                        backgroundColor: cachedTheme?.selectMenuHoverFocused,
                      },
                      '&.Mui-focusVisible': {
                        backgroundColor: cachedTheme?.selectMenuHoverFocused,
                      },
                    }}
                  >
                    {city}
                  </MenuItem>
                ))}
            </Select>

            <Select
              displayEmpty
              value={filterRooms.location}
              className={cn(cachedTheme?.bg, cachedTheme?.textColor)}
              disabled={!filterRooms?.city}
              onChange={(value) =>
                setFilterRooms({
                  id: '',
                  city: filterRooms.city,
                  location: value.target.value,
                })
              }
              MenuProps={{
                PaperProps: {
                  sx: {
                    color: cachedTheme?.selectMenuTextColor,
                    backgroundColor: cachedTheme?.selectMenuBg,
                  },
                },
              }}
              sx={{
                '& .MuiSelect-select': {
                  color: cachedTheme?.selectIcon,
                },
              }}
            >
              <MenuItem value="" disabled>
                Location
              </MenuItem>
              {citiesLocationsData &&
                filterRooms?.city &&
                citiesLocationsData[filterRooms.city] &&
                citiesLocationsData[filterRooms.city].map((location) => (
                  <MenuItem
                    key={location}
                    value={location}
                    sx={{
                      '&.MuiMenuItem-root:hover': {
                        backgroundColor: cachedTheme?.selectMenuHoverFocused,
                      },
                      '&.Mui-focusVisible': {
                        backgroundColor: cachedTheme?.selectMenuHoverFocused,
                      },
                    }}
                  >
                    {location}
                  </MenuItem>
                ))}
            </Select>

            <button
              type="submit"
              className={cn(
                cachedTheme?.activeBg,
                cachedTheme?.borderColor,
                cachedTheme?.activeTextColor,
                'w-[85%] p-2 border rounded-lg'
              )}
            >
              Search
            </button>
          </form>

          <div
            className={cn(
              cachedTheme?.borderColor,
              'cursor-pointer rounded-full p-1 backdrop-blur-3xl border-2 absolute bottom-[0.8vh] right-1'
            )}
            onClick={() => setIsFilterOpen((prev) => !prev)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={34}
              height={34}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentcolor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`lucide lucide-x`}
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </div>
        </div>
      )}

      {!isFilterOpen && (
        <div
          className={cn(
            cachedTheme?.bg,
            cachedTheme?.textColor,
            cachedTheme?.borderColor,
            'hidden max-xsm:block cursor-pointer fixed bottom-[8.5vh] right-1 p-2 text-xl rounded-lg border'
          )}
          onClick={() => setIsFilterOpen((prev) => !prev)}
        >
          Filters
        </div>
      )}
    </>
  );
};

export default SearchLayout;
