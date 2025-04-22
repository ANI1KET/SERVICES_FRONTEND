'use client';

import Swal from 'sweetalert2';
import { useSession } from 'next-auth/react';

import { PriceIcon } from '@/app/lib/icon/svg';
import { NewListedRoom } from '@/app/types/types';
import { cn } from '@/app/lib/utils/tailwindMerge';
import { useThemeState } from '@/app/providers/reactqueryProvider';
import { pushSavedRoom, updateNumber } from '@/app/(selected)/ServerAction';

interface NewRoomCardProps {
  roomCardDetails: NewListedRoom;
}

const ResponsiveNewRoomDetails: React.FC<NewRoomCardProps> = ({
  roomCardDetails,
}) => {
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
    <>
      <div className="text-right m-2 max-xsm:hidden">
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
            onClick={(e) => (e.currentTarget.innerText = 'Login required')}
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
      </div>

      <div
        className={cn(
          cacheTheme?.bg,
          cacheTheme?.textColor,
          cacheTheme?.borderColor,
          'max-xsm:hidden grid grid-cols-6 place-content-start mx-2 border-[1px] rounded-lg'
        )}
      >
        <p
          className={cn(
            cacheTheme?.borderColor,
            'col-span-2 border-r mr-2 ml-1 '
          )}
        >
          <span className="text-lg font-semibold flex items-center gap-1">
            <PriceIcon size={16} />
            Rs.{`${roomCardDetails?.price}`}
            <span className="text-sm ">/month</span>
            <span
              className={cn(
                'text-sm p-[2px] rounded-lg text-right ml-auto',
                cacheTheme?.activeBg,
                cacheTheme?.activeTextColor
              )}
            >
              {roomCardDetails.available ? '✅ Available' : '❌ Not Available'}
            </span>
          </span>
        </p>

        <span className="text-lg col-span-4 flex items-center gap-1 ">
          📌 {`${roomCardDetails?.city}, ${roomCardDetails?.location}`}
          {roomCardDetails?.direction && ` ( ${roomCardDetails?.direction} )`}
          {roomCardDetails?.verified && (
            <span
              className={cn(
                cacheTheme?.activeBg,
                cacheTheme?.activeTextColor,
                'text-sm p-[2px] rounded-lg ml-auto'
              )}
            >
              Verified
            </span>
          )}
        </span>

        <span
          className={cn(
            cacheTheme?.borderColor,
            'col-span-2 border-r mr-2 font-semibold flex items-center gap-1 ml-2 '
          )}
        >
          📞 {`+977-${roomCardDetails?.primaryContact}`}
        </span>

        <span className="col-span-4 flex items-center gap-2 ">
          🏘️ {`${roomCardDetails?.roomtype}`} for Rent{' '}
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
        </span>

        <hr className={cn(cacheTheme?.borderColor, 'col-span-6 border-1 ')} />

        <p className="flex items-center col-span-6 gap-2 ml-2">
          <span className="text-lg font-semibold col-span-1 ">Amenities:</span>
          {roomCardDetails?.amenities && (
            <span className="col-span-2 break-words">
              {roomCardDetails?.amenities.join(', ')}
            </span>
          )}
        </p>
      </div>
    </>
  );
};

export default ResponsiveNewRoomDetails;
