'use client';

import { memo } from 'react';

import { ListedProperty } from '@/app/types/types';
import { cn } from '@/app/lib/utils/tailwindMerge';
import { timeAgo } from '@/app/lib/utils/timeCalculation';
import { useThemeState } from '@/app/providers/reactqueryProvider';
import { PriceIcon, FurnishIcon, CapacityIcon } from '@/app/lib/icon/svg';

interface PropertyDetailsProps {
  propertyCardDetails: ListedProperty;
}

const PropertyDetailsLayout: React.FC<PropertyDetailsProps> = memo(
  ({ propertyCardDetails }) => {
    const cachedTheme = useThemeState();

    return (
      <div
        className={cn(
          'w-full h-full grid grid-cols-2 gap-2 text-2xl max-sm:text-sm'
        )}
      >
        <p className="hidden max-xsm:block col-span-2 ">
          <span className="flex items-center gap-2 text-sm">
            📞 Contact
            {propertyCardDetails.verified && (
              <span
                className={cn(
                  cachedTheme?.activeBg,
                  cachedTheme?.activeTextColor,
                  'p-[2px] rounded-lg ml-auto'
                )}
              >
                Verified
              </span>
            )}
          </span>
          <span>{`+977-${propertyCardDetails.primaryContact}`}</span>
        </p>
        <hr
          className={cn(
            cachedTheme?.borderColor,
            'hidden max-xsm:block col-span-2'
          )}
        />
        {/* <p className="hidden max-xsm:block border-r break-words">
          <span className="flex items-center gap-2 text-sm">📞 Contact</span>
          <span>{`+977-${roomCardDetails.primaryContact}`}</span>
        </p>
        <p className="hidden max-xsm:block break-words">
          <span className="flex items-center gap-2 text-sm">📅 Listed On</span>
          <span>{timeAgo(roomCardDetails.createdAt)}</span>
          <span>{new Date(roomCardDetails.createdAt).toDateString()}</span>
        </p>
        <hr className="hidden max-xsm:block col-span-2" /> */}
        {/*  */}
        <p
          className={cn(
            cachedTheme?.borderColor,
            'break-words border-r text-lg max-sm:text-sm'
          )}
        >
          <span className="flex items-center gap-2 ">
            <PriceIcon />
            Price
          </span>
          <span>{`Rs.${propertyCardDetails.price}`}</span>
        </p>
        <p className={cn('break-words text-lg max-sm:text-sm')}>
          <span className="flex items-center gap-2 ">🏘️ Room Type</span>
          <span>{`${propertyCardDetails.propertyType} `}</span>
        </p>
        <hr className={cn(cachedTheme?.borderColor, 'col-span-2')} />
        <p
          className={cn(
            cachedTheme?.borderColor,
            'border-r break-words text-lg max-sm:text-sm'
          )}
        >
          <span className="flex items-center gap-2 ">
            <CapacityIcon />
            Capacity
          </span>
          {/* <span>{`${propertyCardDetails.mincapacity}-${propertyCardDetails.maxcapacity}`}</span> */}
        </p>
        <p className="break-words text-lg max-sm:text-sm">
          <span className="flex items-center gap-2 ">
            <FurnishIcon />
            Furinshing
          </span>
          {/* <span>{`${propertyCardDetails.furnishingStatus}`}</span> */}
        </p>
        <hr className={cn(cachedTheme?.borderColor, 'col-span-2')} />
        <p
          className={cn(
            cachedTheme?.borderColor,
            'break-words border-r text-lg max-sm:text-sm'
          )}
        >
          <span className="flex items-center gap-2 ">👤 Posted By</span>
          <span>{`${propertyCardDetails.postedBy}`}</span>
        </p>
        <p className="break-words text-lg max-sm:text-sm ">
          <span className="flex items-center gap-2 ">📅 Updated On</span>
          <span>{timeAgo(propertyCardDetails.updatedAt)}</span>
          {/* <span>{new Date(roomCardDetails.updatedAt).toDateString()}</span> */}
        </p>
        <hr className={cn(cachedTheme?.borderColor, 'col-span-2')} />
        <p className="break-words col-span-2 text-lg max-sm:text-sm">
          <span className="flex items-center justify-between w-full">
            <span className="w-1/2">📌 Location</span>
            <span className="w-1/2">
              {propertyCardDetails.available ? '✅ Available' : '❌ Sold'}
            </span>
          </span>
          <span>
            {`${propertyCardDetails.city}, ${propertyCardDetails.location}`}
            {propertyCardDetails?.direction &&
              ` ( ${propertyCardDetails.direction} )`}
          </span>
        </p>
        <hr className={cn(cachedTheme?.borderColor, 'col-span-2')} />
        {/*  */}
        <p className="hidden max-xsm:block col-span-2 ">
          <span className="flex justify-center items-center gap-2 text-base font-semibold">
            Amenities
          </span>
          {/* {propertyCardDetails.amenities && (
            <span className="col-span-2 break-words">
              {propertyCardDetails.amenities.join(', ')}
            </span>
          )} */}
        </p>
        <hr
          className={cn(
            cachedTheme?.borderColor,
            'hidden max-xsm:block col-span-2'
          )}
        />
      </div>
    );
  }
);

PropertyDetailsLayout.displayName = 'PropertyDetailsLayout';
export default PropertyDetailsLayout;
