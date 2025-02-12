'use client';

import {
  PriceIcon,
  ContactIcon,
  RoomTypeIcon,
  HomeLocationIcon,
} from '@/app/lib/icon/svg';
import { NewListedRoom } from '@/app/types/types';
import { cn } from '@/app/lib/utils/tailwindMerge';
import { useThemeState } from '@/app/providers/reactqueryProvider';

interface NewRoomCardProps {
  roomCardDetails: NewListedRoom;
}

const ResponsiveNewRoomDetails: React.FC<NewRoomCardProps> = ({
  roomCardDetails,
}) => {
  const cacheTheme = useThemeState();

  return (
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
        </span>
      </p>

      <span className="text-lg col-span-4 flex items-center gap-1 ">
        <HomeLocationIcon size={16} />
        {`${roomCardDetails?.city}, ${roomCardDetails?.location}`}
        {roomCardDetails?.verified && (
          <span className="text-sm p-1 bg-green-500 rounded-lg ml-auto">
            Verified
          </span>
        )}
      </span>

      <span
        className={cn(
          cacheTheme?.borderColor,
          'col-span-2 border-r mr-2 flex items-center gap-1 ml-2 '
        )}
      >
        <ContactIcon size={14} />
        {`+977-${roomCardDetails?.primaryContact}`}
      </span>

      <span className="col-span-4 flex items-center gap-2 ">
        <RoomTypeIcon size={14} />
        {`${roomCardDetails?.roomtype}`} for Rent
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
  );
};

export default ResponsiveNewRoomDetails;
