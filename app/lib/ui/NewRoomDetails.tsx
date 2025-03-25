'use client';

import { useCallback } from 'react';

import { PriceIcon, FurnishIcon, CapacityIcon } from '@/app/lib/icon/svg';
import { NewListedRoom } from '@/app/types/types';
import { useThemeState } from '@/app/providers/reactqueryProvider';
import { cn } from '@/app/lib/utils/tailwindMerge';

interface NewRoomCardProps {
  roomCardDetails: NewListedRoom;
}

const NewRoomDetails: React.FC<NewRoomCardProps> = ({ roomCardDetails }) => {
  const cacheTheme = useThemeState();

  const timeAgo = useCallback((date: string): string => {
    const now = new Date();
    const past = new Date(date);
    const diffMs = now.getTime() - past.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  }, []);
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
            <span
              className={cn(
                'text-sm p-[2px] rounded-lg cursor-pointer mr-1',
                cacheTheme?.activeBg,
                cacheTheme?.activeTextColor
              )}
              onClick={(e) => {
                const target = e.currentTarget;
                const originalText = target.innerText;

                try {
                  const existingRooms = JSON.parse(
                    localStorage.getItem('SavedRooms') || '[]'
                  );
                  if (!existingRooms.includes(roomCardDetails.userId)) {
                    existingRooms.push(roomCardDetails.userId);
                  }

                  localStorage.setItem(
                    'SavedRooms',
                    JSON.stringify(existingRooms)
                  );
                  target.innerText = 'Saved';
                } catch (error) {
                  if (
                    error instanceof DOMException &&
                    error.name === 'QuotaExceededError'
                  ) {
                    alert('Storage is full! Please clear some data.');
                  } else {
                    alert('Failed to save data.');
                  }
                  target.innerText = 'Failed';
                }

                setTimeout(() => {
                  target.innerText = originalText;
                }, 1000);
              }}
            >
              Save
            </span>

            <span
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
                    setTimeout(() => {
                      target.innerText = originalText;
                    }, 1000);
                  })
                  .catch(() => {
                    target.innerText = 'Failed';
                    setTimeout(() => {
                      target.innerText = originalText;
                    }, 1000);
                  });
              }}
            >
              Copy Id
            </span>
            {roomCardDetails.verified && (
              <span
                className={cn(
                  cacheTheme?.activeBg,
                  cacheTheme?.activeTextColor,
                  'p-[2px] rounded-lg '
                )}
              >
                Verified
              </span>
            )}
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
          <p>{`${roomCardDetails.postedBy}`}</p>
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
          <p>{`${roomCardDetails.furnishingStatus}`}</p>
        </div>
        <hr className={cn(cacheTheme?.borderColor, 'col-span-2')} />
        <div className={cn(cacheTheme?.borderColor, 'border-r break-words')}>
          <p className="flex items-center gap-2 text-sm">🏘️ Room Type</p>
          <p>{`${roomCardDetails.roomtype} `}</p>
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
