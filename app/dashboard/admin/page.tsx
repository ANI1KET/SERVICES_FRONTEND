'use client';

import {
  useQuery,
  useMutation,
  useLazyQuery,
  useApolloClient,
} from '@apollo/client';
import { useForm } from 'react-hook-form';
import { MenuItem, Select } from '@mui/material';
import { memo, useCallback, useState } from 'react';

import {
  UPDATE_USER,
  DOWNGRADE_USER,
  REMOVE_USER_SUBS,
  GET_USER_BY_EMAIL_NUMBER,
} from '../graphQL/userQuery';
import { cn } from '@/app/lib/utils/tailwindMerge';
import { GET_BORKER_OWNER_STATS } from '../graphQL/dashboardQuery';
import { useThemeState } from '@/app/providers/reactqueryProvider';

const Admin = () => {
  const cachedTheme = useThemeState();
  const [toggleRole, setToggleRole] = useState(true);

  const {
    reset,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      number: '',
    },
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) setValue('number', '');
  };
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) setValue('email', '');
  };

  const [getUser, { data: userData }] = useLazyQuery<{
    userByEmailOrNumber: {
      id: string;
      email: string;
      role: string;
      permission: string[];
    };
  }>(GET_USER_BY_EMAIL_NUMBER);
  const { loading, data, error } = useQuery<{
    userCategoryStats: Array<{
      BROKER: {
        total: number;
        users: Array<{
          id: string;
          role: string;
          email: string;
          permission: string[];
        }>;
      };
      OWNER: {
        total: number;
        users: Array<{
          id: string;
          role: string;
          email: string;
          permission: string[];
        }>;
      };
    }>;
  }>(GET_BORKER_OWNER_STATS);

  const onSubmit = (data: { email: string; number: string }) => {
    getUser({ variables: { ...data } });

    reset({ email: '', number: '' });
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error fetching data.</p>;
  // if (errors) console.log('Error Finding User ', errors);
  return (
    <div className="w-full">
      <div className="w-full flex justify-center gap-10 mt-2">
        <div
          className={cn(
            cachedTheme?.bg,
            cachedTheme?.textColor,
            cachedTheme?.borderColor,
            'w-36 h-36 rounded-full flex flex-col justify-center items-center'
          )}
        >
          <span className="text-4xl">
            {data?.userCategoryStats[0]?.OWNER?.total}
          </span>
          OWNER
        </div>
        <div
          className={cn(
            cachedTheme?.bg,
            cachedTheme?.textColor,
            cachedTheme?.borderColor,
            'w-36 h-36 rounded-full flex flex-col justify-center items-center'
          )}
        >
          <span className="text-4xl">
            {data?.userCategoryStats[0]?.BROKER?.total}
          </span>
          BROKER
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn('w-full mt-10 grid grid-cols-3 max-xsm:grid-cols-1')}
      >
        <div className="col-span-1">
          <input
            type="email"
            {...register('email')}
            onChange={handleEmailChange}
            placeholder="Search by email"
            className={cn(
              cachedTheme?.bg,
              cachedTheme?.textColor,
              cachedTheme?.borderColor,
              'w-full p-2 border-r max-xsm:border-b max-xsm:border-r-0'
            )}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="col-span-1">
          <input
            type="text"
            className={cn(
              'w-full p-2',
              cachedTheme?.bg,
              cachedTheme?.textColor
            )}
            placeholder="Search by number"
            {...register('number', {
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Number must be exactly 10 digits',
              },
            })}
            onChange={handleNumberChange}
          />
          {errors.number && (
            <p className="text-red-500 text-sm">{errors.number.message}</p>
          )}
        </div>

        <div
          className={cn(
            'col-span-1 border flex items-center justify-center',
            cachedTheme?.activeBg,
            cachedTheme?.borderColor,
            cachedTheme?.activeTextColor
          )}
        >
          <button type="submit">Search</button>
        </div>
      </form>

      <div
        className={cn(
          cachedTheme?.bg,
          cachedTheme?.textColor,
          cachedTheme?.borderColor,
          'w-full flex justify-evenly p-2 border'
        )}
      >
        <div className="cursor-pointer" onClick={() => setToggleRole(true)}>
          OWNER
        </div>
        <div
          className={cn(
            'border ',
            cachedTheme?.activeBg,
            cachedTheme?.borderColor
          )}
        ></div>
        <div className="cursor-pointer" onClick={() => setToggleRole(false)}>
          BROKER
        </div>
      </div>

      {userData && userData.userByEmailOrNumber && (
        <div className={cn('p-1', cachedTheme?.bg, cachedTheme?.textColor)}>
          <DetailComponent
            key={'Searched'}
            user={userData.userByEmailOrNumber}
          />
        </div>
      )}

      {toggleRole ? (
        <div className={cn('p-1', cachedTheme?.bg, cachedTheme?.textColor)}>
          {data?.userCategoryStats[0]?.OWNER?.users.map((user) => (
            <DetailComponent user={user} key={`${user.id}`} />
          ))}
        </div>
      ) : (
        <div className={cn('p-1', cachedTheme?.bg, cachedTheme?.textColor)}>
          {data?.userCategoryStats[0]?.BROKER?.users.map((user) => (
            <DetailComponent user={user} key={`${user.id}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;

const DetailComponent = memo(
  ({
    user,
  }: {
    user: {
      id: string;
      role: string;
      email: string;
      permission: string[];
    };
  }) => {
    const client = useApolloClient();
    const cachedTheme = useThemeState();

    const [days, setDays] = useState<number>(1);
    const [rolePermission, setRolePermission] = useState<{
      [key: string]: { role: string; permission: string };
    }>({});
    const [permission, setPermission] = useState<{ [key: string]: string[] }>(
      {}
    );

    const [updateUser] = useMutation(UPDATE_USER);
    const [removeUserSubs] = useMutation(REMOVE_USER_SUBS);
    const [
      downgradeUser,
      // { data: userDowngradeData, error: userDowngradeError },
    ] = useMutation<{
      downgradePermission: {
        message: string;
      };
    }>(DOWNGRADE_USER);

    const downgradePermisson = useCallback(
      async (id: string, perm: string) => {
        await downgradeUser({
          variables: {
            userId: id,
            permission: perm,
          },
        });

        client.cache.modify({
          id: `User:${id}`,
          fields: {
            permission(existingPermissions) {
              return existingPermissions.filter(
                (experm: string) => experm !== perm
              );
            },
          },
        });
      },
      [client.cache, downgradeUser]
    );

    const upgradeUser = useCallback(
      async (id: string, permissions: string[]) => {
        if (!rolePermission[id]?.permission) return;

        const permission = rolePermission[id].permission;

        try {
          await updateUser({
            variables: {
              userId: id,
              durationInDays: days,
              permission: permission,
              role: rolePermission[id]?.role,
            },
          });

          client.cache.modify({
            id: `User:${id}`,
            fields: {
              permission() {
                return [...permissions, permission];
              },
              ...(rolePermission[id]?.role && {
                role() {
                  return rolePermission[id]?.role;
                },
              }),
            },
          });
        } catch (error) {
          console.error(`Failed to update user :`, error);
        } finally {
          setPermission({});
          setRolePermission({});
        }
      },
      [
        client.cache,
        days,
        rolePermission,
        setPermission,
        setRolePermission,
        updateUser,
      ]
    );

    const deleteUserSubs = useCallback(
      async (id: string) => {
        await removeUserSubs({
          variables: {
            userId: id,
          },
        });

        client.cache.evict({ id: `User:${id}` });
      },
      [client.cache, removeUserSubs]
    );

    const missingPermissions = [
      'room',
      'hostel',
      'vehicle',
      'property',
      'reMarketItem',
    ].filter((perm) => !user.permission.includes(perm));
    return (
      <div
        key={user.id}
        className={cn(
          cachedTheme?.borderColor,
          'w-full flex justify-between gap-5 p-1 border-b overflow-x-scroll'
        )}
      >
        <div className="">{user.id}</div>
        <div className="">{user.email}</div>
        <div className="">
          <Select
            value={rolePermission[user.id]?.role ?? user.role}
            onChange={(e) =>
              setRolePermission((prevState) => ({
                [user.id]: {
                  ...prevState[user.id],
                  role: e.target.value,
                },
              }))
            }
            className={cn(cachedTheme?.textColor, 'w-full')}
            disableUnderline
            variant="standard"
            sx={{
              width: '100%',
              background: 'transparent',
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none !important',
              },
              '& .MuiInputBase-root': {
                borderBottom: 'none !important',
              },
              '& .MuiSelect-select': {
                color: cachedTheme?.selectIcon,
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  color: cachedTheme?.selectMenuTextColor,
                  backgroundColor: cachedTheme?.selectMenuBg,
                },
              },
            }}
          >
            {['OWNER', 'BROKER', 'USER'].map((role) => (
              <MenuItem
                key={role}
                value={role}
                sx={{
                  '&.MuiMenuItem-root:hover': {
                    backgroundColor: cachedTheme?.selectMenuHoverFocused,
                  },
                  '&.Mui-focusVisible': {
                    backgroundColor: cachedTheme?.selectMenuHoverFocused,
                  },
                }}
              >
                {role}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="flex items-center">
          <p className="flex gap-1">
            {user.permission?.map((perm) => (
              <span
                key={perm}
                className="hover:bg-red-600 rounded-3xl p-1 cursor-pointer"
                onClick={() => downgradePermisson(user.id, perm)}
              >
                {perm}
              </span>
            ))}
            {rolePermission[user.id]?.permission && (
              <span key={rolePermission[user.id]?.permission} className="p-1">
                {rolePermission[user.id]?.permission}
              </span>
            )}
          </p>
          {permission[user.id]?.length > 0 && (
            <Select
              value={''}
              onChange={(e) => {
                const selectedPermission = e.target.value;

                setRolePermission((prevState) => ({
                  [user.id]: {
                    ...prevState[user.id],
                    permission: selectedPermission,
                  },
                }));

                setPermission((prevState) => ({
                  [user.id]: prevState[user.id].filter(
                    (perm) => perm !== selectedPermission
                  ),
                }));
              }}
              className={cn(cachedTheme?.textColor, 'w-full')}
              disableUnderline
              variant="standard"
              sx={{
                width: '15%',
                background: 'transparent',
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none !important',
                },
                '& .MuiInputBase-root': {
                  borderBottom: 'none !important',
                },
                '& .MuiSelect-select': {
                  color: cachedTheme?.selectIcon,
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    color: cachedTheme?.selectMenuTextColor,
                    backgroundColor: cachedTheme?.selectMenuBg,
                  },
                },
              }}
            >
              {permission[user.id].map((permission) => (
                <MenuItem
                  key={permission}
                  value={permission}
                  sx={{
                    '&.MuiMenuItem-root:hover': {
                      backgroundColor: cachedTheme?.selectMenuHoverFocused,
                    },
                    '&.Mui-focusVisible': {
                      backgroundColor: cachedTheme?.selectMenuHoverFocused,
                    },
                  }}
                >
                  {permission}
                </MenuItem>
              ))}
            </Select>
          )}
          <button
            type="button"
            onClick={() => setPermission({ [user.id]: missingPermissions })}
          >
            ➕
          </button>
        </div>

        <div className="flex gap-4 items-center">
          <input
            min="1"
            value={days}
            type="number"
            className="w-12 text-center"
            onChange={(e) => setDays(Number(e.target.value))}
          />
        </div>

        <div className="flex gap-4">
          <p
            className="cursor-pointer"
            onClick={() => upgradeUser(user.id, user.permission)}
          >
            📝
          </p>
          <p className="cursor-pointer" onClick={() => deleteUserSubs(user.id)}>
            🗑️
          </p>
        </div>
      </div>
    );
  }
);

DetailComponent.displayName = 'DetailComponent';
