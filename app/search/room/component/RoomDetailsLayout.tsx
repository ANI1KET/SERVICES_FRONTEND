'use client';

import { memo } from 'react';

import { PriceIcon, FurnishIcon, CapacityIcon } from '@/app/lib/icon/svg';
import { NewListedRoom } from '@/app/types/types';
import { timeAgo } from '@/app/lib/utils/timeCalculation';

interface RoomDetailsProps {
  roomCardDetails: NewListedRoom;
}

const RoomDetailsLayout: React.FC<RoomDetailsProps> = memo(
  ({ roomCardDetails }) => {
    return (
      <div className="w-full h-full grid grid-cols-2 gap-2 text-2xl max-sm:text-sm">
        <p className="hidden max-xsm:block col-span-2 ">
          <span className="flex items-center gap-2 text-sm">
            📌 Address
            {roomCardDetails.verified && (
              <span className="bg-green-400 p-[2px] rounded-lg ml-auto">
                Verified
              </span>
            )}
          </span>
          <span>{`${roomCardDetails.city}, ${roomCardDetails.location}`}</span>
        </p>
        <hr className="hidden max-xsm:block col-span-2" />
        <p className="hidden max-xsm:block border-r break-words">
          <span className="flex items-center gap-2 text-sm">📞 Contact</span>
          <span>{`+977-${roomCardDetails.primaryContact}`}</span>
        </p>
        <p className="hidden max-xsm:block break-words">
          <span className="flex items-center gap-2 text-sm">📅 Listed On</span>
          <span>{new Date(roomCardDetails.createdAt).toDateString()}</span>
        </p>
        <hr className="hidden max-xsm:block col-span-2" />
        {/*  */}
        <p className="break-words border-r text-lg max-sm:text-sm">
          <span className="flex items-center gap-2 ">
            <PriceIcon />
            Price
          </span>
          <span>{`Rs.${roomCardDetails.price}`}</span>
        </p>
        <p className="break-words text-lg max-sm:text-sm">
          <span className="flex items-center gap-2 ">🏘️ Room Type</span>
          <span>
            {`${roomCardDetails.roomtype} `}
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
        </p>
        <hr className="col-span-2" />
        <p className="border-r break-words text-lg max-sm:text-sm">
          <span className="flex items-center gap-2 ">
            <CapacityIcon />
            Capacity
          </span>
          <span>{`${roomCardDetails.mincapacity}-${roomCardDetails.maxcapacity}`}</span>
        </p>
        <p className="break-words text-lg max-sm:text-sm">
          <span className="flex items-center gap-2 ">
            <FurnishIcon />
            Furinshing
          </span>
          <span>{`${roomCardDetails.furnishingStatus}`}</span>
        </p>
        <hr className="col-span-2" />
        <p className="break-words border-r text-lg max-sm:text-sm">
          <span className="flex items-center gap-2 ">👤 Posted By</span>
          <span>{`${roomCardDetails.postedBy}`}</span>
        </p>
        <p className="break-words text-lg max-sm:text-sm ">
          <span className="flex items-center gap-2 ">📅 Updated On</span>
          <span>{timeAgo(roomCardDetails.updatedAt)}</span>
          {/* <span>{new Date(roomCardDetails.updatedAt).toDateString()}</span> */}
        </p>
        <hr className="col-span-2" />
        <p className="break-words col-span-2 text-lg max-sm:text-sm">
          <span className="flex items-center justify-between w-full">
            <span className="w-1/2">📌 Location</span>
            <span className="w-1/2">
              {roomCardDetails.available ? '✅ Available' : '❌ Not Available'}
            </span>
          </span>
          <span>
            {`${roomCardDetails?.city}, ${roomCardDetails?.location}`}
            {roomCardDetails?.direction && ` ( ${roomCardDetails?.direction} )`}
          </span>
        </p>
        <hr className="col-span-2" />
        {/*  */}
        <p className="hidden max-xsm:block col-span-2 ">
          <span className="flex justify-center items-center gap-2 text-base font-semibold">
            Amenities
          </span>
          {roomCardDetails.amenities && (
            <span className="col-span-2 break-words">
              {roomCardDetails.amenities.join(', ')}
            </span>
          )}
        </p>
        <hr className="hidden max-xsm:block col-span-2" />
      </div>
    );
  }
);

RoomDetailsLayout.displayName = 'RoomDetailsLayout';
export default RoomDetailsLayout;
