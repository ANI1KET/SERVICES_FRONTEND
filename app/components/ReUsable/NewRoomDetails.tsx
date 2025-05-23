'use client';

import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { ListedRoom } from '@/app/types/types';
import { cn } from '@/app/lib/utils/tailwindMerge';
import { timeAgo } from '../../lib/utils/timeCalculation';
import { updateNumber } from '@/app/components/ServerAction';
import { pushSavedRoom } from '@/app/(selected)/ServerAction';
import { useThemeState } from '@/app/providers/reactqueryProvider';
import { PriceIcon, FurnishIcon, CapacityIcon } from '@/app/lib/icon/svg';

interface NewRoomCardProps {
  roomCardDetails: ListedRoom;
}

const NewRoomDetails: React.FC<NewRoomCardProps> = ({ roomCardDetails }) => {
  const router = useRouter();
  const cacheTheme = useThemeState();
  const { data: session, update } = useSession();

  const showNumberInputPopup = async () => {
    const { value } = await Swal.fire({
      title: 'Contact',
      input: 'text',
      inputPlaceholder: 'Enter your number...',
      inputAttributes: {
        maxlength: '10',
        pattern: '[0-9]{10}',
        inputmode: 'numeric',
      },
      width: 300,
      padding: '1rem',
      showCancelButton: true,
      confirmButtonText: 'Done',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: 'rounded-xl shadow-lg',
        title: cn(cacheTheme?.textColor, 'text-lg font-bold'),
        confirmButton: cn(cacheTheme?.bg, cacheTheme?.textColor, 'rounded-lg'),
        cancelButton: cn(
          'rounded-lg',
          cacheTheme?.activeBg,
          cacheTheme?.activeTextColor
        ),
      },
      inputValidator: (value) => {
        return /^\d{10}$/.test(value)
          ? Promise.resolve(null)
          : Promise.resolve('Please enter a valid 10-digit number!');
      },
    });

    if (value) {
      const response = await updateNumber({
        number: value,
        userId: session?.user.userId as string,
      });
      if (response !== 'Failed')
        await update({
          ...session,
          user: {
            ...session?.user,
            number: value,
          },
        });
    }
  };
  return (
    <div
      className={cn(
        cacheTheme?.bg,
        cacheTheme?.textColor,
        'w-[55vw] max-xsm:w-screen p-2 absolute right-1 top-3 bottom-3 max-xsm:static max-xsm:-mt-3 max-xsm:-z-0 overflow-y-scroll rounded-xl'
      )}
    >
      <div className="w-full h-full grid grid-cols-2 gap-2 ">
        <div className="hidden max-xsm:grid col-span-2 grid-cols-3 gap-1">
          <p className="text-sm col-span-1">📌 Address</p>

          <p className="text-sm col-span-2 text-right ">
            {session ? (
              session?.user.permission?.includes('room') ? null : (
                <button
                  className={cn(
                    'text-sm p-[2px] rounded-lg cursor-pointer mr-1',
                    cacheTheme?.activeBg,
                    cacheTheme?.activeTextColor
                  )}
                  onClick={async (e) => {
                    const target = e.currentTarget;
                    const originalText = target.innerText;

                    try {
                      if (!session.user.number) showNumberInputPopup();
                      target.innerText = 'Interested';

                      const existingRooms = JSON.parse(
                        localStorage.getItem('InterestedRooms') || '[]'
                      );
                      if (existingRooms.includes(roomCardDetails.id)) {
                        return;
                      }

                      await pushSavedRoom({
                        roomId: roomCardDetails.id,
                        listerId: roomCardDetails.listerId,
                        userId: session.user.userId as string,
                      });

                      existingRooms.push(roomCardDetails.id);
                      localStorage.setItem(
                        'InterestedRooms',
                        JSON.stringify(existingRooms)
                      );

                      target.innerText = originalText;
                    } catch (error) {
                      // if (
                      //   error instanceof DOMException &&
                      //   error.name === 'QuotaExceededError'
                      // ) {
                      //   alert('Storage is full! Please clear some data.');
                      // } else {
                      console.log('Failed to save data.', error);
                      // }
                      target.innerText = 'Failed';
                    }
                  }}
                >
                  Interest
                </button>
              )
            ) : (
              <button
                title="Login to proceed"
                className={cn(
                  cacheTheme?.activeBg,
                  cacheTheme?.activeTextColor,
                  'text-sm p-[2px] rounded-lg cursor-pointer mr-1'
                )}
                onClick={() => router.push('/auth/login')}
              >
                Interest
              </button>
            )}

            <button
              title={`${btoa(roomCardDetails.id)}`}
              className={cn(
                cacheTheme?.activeBg,
                cacheTheme?.activeTextColor,
                'text-sm p-[2px] rounded-lg cursor-pointer mr-1'
              )}
              onClick={(e) => {
                const target = e.currentTarget;
                const originalText = target.innerText;
                navigator.clipboard
                  .writeText(btoa(roomCardDetails.id))
                  .then(() => {
                    target.innerText = 'Copied';
                  })
                  .catch(() => {
                    target.innerText = 'Failed';
                  })
                  .finally(() => {
                    setTimeout(() => {
                      target.innerText = originalText;
                    }, 1000);
                  });
              }}
            >
              Copy Id
            </button>
            {roomCardDetails.verified && (
              <span
                className={cn(
                  cacheTheme?.activeBg,
                  cacheTheme?.activeTextColor,
                  'p-[2px] rounded-lg mr-1'
                )}
              >
                Verified
              </span>
            )}
            <span
              className={cn(
                'text-sm p-[2px] rounded-lg',
                cacheTheme?.activeBg,
                cacheTheme?.activeTextColor,
                roomCardDetails.available ? '' : 'text-red-500'
              )}
            >
              {roomCardDetails.available ? 'Available' : 'Not Available'}
            </span>
          </p>

          <p className="col-span-3 ">
            {`${roomCardDetails.city}, ${roomCardDetails.location}`}
            {roomCardDetails?.direction && ` ( ${roomCardDetails?.direction} )`}
          </p>
        </div>

        <hr
          className={cn(
            cacheTheme?.borderColor,
            'hidden max-xsm:block col-span-2'
          )}
        />

        <div
          className={cn(
            cacheTheme?.borderColor,
            'hidden max-xsm:block border-r break-words'
          )}
        >
          <p className="flex items-center gap-2 text-sm">📞 Contact</p>
          <p>{`+977-${roomCardDetails.primaryContact}`}</p>
        </div>
        <div className="hidden max-xsm:block break-words">
          <p className="flex items-center gap-2 text-sm">
            <PriceIcon />
            Price
          </p>
          <p>{`Rs.${roomCardDetails.price}`}/month</p>
        </div>

        <hr
          className={cn(
            cacheTheme?.borderColor,
            'hidden max-xsm:block col-span-2'
          )}
        />

        {/*  */}

        <div className={cn(cacheTheme?.borderColor, 'border-r break-words')}>
          <p className="flex items-center gap-2 text-sm">🏷️ Name</p>
          <p>{roomCardDetails.name}</p>
        </div>
        <div className="break-words">
          <p className="flex items-center gap-2 text-sm">👤 Posted By</p>
          <p>{roomCardDetails.postedBy}</p>
        </div>

        <hr className={cn(cacheTheme?.borderColor, 'col-span-2')} />

        <div className={cn(cacheTheme?.borderColor, 'border-r break-words')}>
          <p className="flex items-center gap-2 text-sm">
            <CapacityIcon />
            Capacity
          </p>
          <p>{`${roomCardDetails.mincapacity}-${roomCardDetails.maxcapacity}`}</p>
        </div>
        <div className="break-words">
          <p className="flex items-center gap-2 text-sm">
            <FurnishIcon />
            Furinshing
          </p>
          <p>{roomCardDetails.furnishingStatus}</p>
        </div>

        <hr className={cn(cacheTheme?.borderColor, 'col-span-2')} />

        <div className={cn(cacheTheme?.borderColor, 'border-r break-words')}>
          <p className="flex items-center gap-2 text-sm">🏘️ Room Type</p>
          <p>{roomCardDetails.roomtype}</p>
          <p className="max-xsm:block hidden">
            {(() => {
              let details = '';
              const appendDetail = (count: number, singular: string) => {
                if (count > 0) {
                  if (details) details += ', ';
                  details += `${count} ${singular}${count > 1 ? 's' : ''}`;
                }
              };

              appendDetail(roomCardDetails.bedroom, 'Bedroom');
              appendDetail(roomCardDetails.hall, 'Hall');
              appendDetail(roomCardDetails.kitchen, 'Kitchen');
              appendDetail(roomCardDetails.bathroom, 'Bathroom');

              return details ? `(${details})` : '';
            })()}
          </p>
        </div>
        <div className="break-words ">
          <p className="flex items-center gap-2 text-sm">📅 Updated On</p>
          <p>{timeAgo(roomCardDetails.updatedAt)}</p>
          {/* <span>{new Date(roomCardDetails.updatedAt).toDateString()}</span> */}
        </div>

        <hr className={cn(cacheTheme?.borderColor, 'col-span-2')} />

        {/*  */}

        <div className="hidden max-xsm:block col-span-2 ">
          <p className="flex justify-center items-center gap-2 text-base font-semibold">
            Amenities
          </p>
          {roomCardDetails.amenities && (
            <p className="col-span-2 break-words">
              {roomCardDetails.amenities.join(', ')}
            </p>
          )}
        </div>

        <hr
          className={cn(
            cacheTheme?.borderColor,
            'hidden max-xsm:block col-span-2'
          )}
        />
      </div>
    </div>
  );
};

export default NewRoomDetails;
