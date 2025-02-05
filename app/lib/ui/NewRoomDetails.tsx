'use client';

import {
  PriceIcon,
  FurnishIcon,
  ContactIcon,
  ListedOnIcon,
  CapacityIcon,
  PostedByIcon,
  RoomTypeIcon,
  UpdatedOnIcon,
  HomeLocationIcon,
} from '@/app/lib/icon/svg';
import { NewListedRoom } from '@/app/types/types';
import { useThemeState } from '@/app/providers/reactqueryProvider';
import { cn } from '@/app/lib/utils/tailwindMerge';

interface NewRoomCardProps {
  roomCardDetails: NewListedRoom;
}

const NewRoomDetails: React.FC<NewRoomCardProps> = ({ roomCardDetails }) => {
  const cacheTheme = useThemeState();

  return (
    <div
      className={cn(
        cacheTheme?.bg,
        cacheTheme?.textColor,
        'w-[55vw] max-xsm:w-screen p-2 absolute right-1 top-3 bottom-3 max-xsm:static max-xsm:-mt-3 max-xsm:-z-0 overflow-y-scroll rounded-xl'
      )}
    >
      <div className="w-full h-full grid grid-cols-2 gap-2 ">
        <p className="hidden max-xsm:block col-span-2 ">
          <span className="flex items-center gap-2 text-sm">
            <HomeLocationIcon />
            Address
            {roomCardDetails.verified && (
              <span className="bg-green-500 p-[2px] rounded-lg ml-auto">
                Verified
              </span>
            )}
          </span>
          <span>{`${roomCardDetails.city}, ${roomCardDetails.location}`}</span>
        </p>
        <hr className="hidden max-xsm:block col-span-2" />
        <p className="hidden max-xsm:block border-r break-words">
          <span className="flex items-center gap-2 text-sm">
            <ContactIcon />
            Contact
          </span>
          <span>{`+977-${roomCardDetails.roomNumber}`}</span>
        </p>
        <p className="hidden max-xsm:block break-words">
          <span className="flex items-center gap-2 text-sm">
            <PriceIcon />
            Price
          </span>
          <span>{`Rs.${roomCardDetails.price}`}</span>
        </p>
        <hr className="hidden max-xsm:block col-span-2" />
        {/*  */}
        <p className="border-r break-words">
          <span className="flex items-center gap-2 text-sm">
            <RoomTypeIcon />
            Room Type
          </span>
          <span>{`${roomCardDetails.roomtype}`}</span>
        </p>
        <p className="break-words">
          <span className="flex items-center gap-2 text-sm">
            <FurnishIcon />
            Furinshing
          </span>
          <span>{`${roomCardDetails.furnishingStatus}`}</span>
        </p>
        <hr className="col-span-2" />
        <p className="border-r break-words">
          <span className="flex items-center gap-2 text-sm">
            <CapacityIcon />
            Capacity
          </span>
          <span>{`${roomCardDetails.mincapacity}-${roomCardDetails.maxcapacity}`}</span>
        </p>
        <p className="break-words">
          <span className="flex items-center gap-2 text-sm">
            <PostedByIcon />
            Posted By
          </span>
          <span>{`${roomCardDetails.postedBy}`}</span>
        </p>
        <hr className="col-span-2" />
        <p className="border-r break-words">
          <span className="flex items-center gap-2 text-sm">
            <ListedOnIcon />
            Listed On
          </span>
          <span>{new Date(roomCardDetails.createdAt).toDateString()}</span>
        </p>
        <p className="break-words ">
          <span className="flex items-center gap-2 text-sm">
            <UpdatedOnIcon />
            Updated On
          </span>
          <span>{new Date(roomCardDetails.updatedAt).toDateString()}</span>
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
    </div>
  );
};

export default NewRoomDetails;
