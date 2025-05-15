'use client';

import { memo } from 'react';

import {
  PropertyArea,
  ListedProperty,
  PropertyPlotWidth,
  PropertyPlotLength,
} from '@/app/types/types';
import {
  PriceIcon,
  KitchenIcon,
  BathRoomIcon,
  PlotSizeIcon,
  HouseAreaIcon,
  PropertyAreaIcon,
} from '@/app/lib/icon/svg';
import {
  propertyArea,
  propertyHouseArea,
  propertyPlotWidth,
  propertyPlotLength,
} from '@/app/lib/scalableComponents';
import { cn } from '@/app/lib/utils/tailwindMerge';
import { useThemeState } from '@/app/providers/reactqueryProvider';
import { SelectCoversion } from '../../ReUsable/FormReusableComponent';

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
        <div
          className={cn(
            cachedTheme?.borderColor,
            'break-words text-lg max-sm:text-sm'
          )}
        >
          <span className="flex items-center gap-2 ">
            <PropertyAreaIcon /> Area
          </span>
          <SelectCoversion<PropertyArea>
            label="area"
            options={propertyArea}
            value={propertyCardDetails.area}
          />
        </div>

        <hr className={cn(cachedTheme?.borderColor, 'col-span-2')} />

        {propertyCardDetails.propertyType === 'House' && (
          <>
            <p
              className={cn(
                cachedTheme?.borderColor,
                'max-xsm:hidden border-r break-words text-lg max-sm:text-sm'
              )}
            >
              <span className="flex items-center gap-2 ">📞 Contact</span>
              <span>{propertyCardDetails.primaryContact}</span>
            </p>

            <div className="break-words text-lg max-sm:text-sm ">
              <span className="flex items-center gap-2 ">
                <HouseAreaIcon />
                BuiltUpArea
              </span>
              <SelectCoversion<PropertyArea>
                label="builtUpArea"
                options={propertyHouseArea}
                value={propertyCardDetails.builtUpArea}
              />
            </div>

            <hr className={cn(cachedTheme?.borderColor, 'col-span-2')} />

            <p
              className={cn(
                cachedTheme?.borderColor,
                'border-r break-words text-lg max-sm:text-sm'
              )}
            >
              <span className="flex items-center gap-2 ">
                🏢 Floors:- {propertyCardDetails.floors}
              </span>
            </p>
            <p className="break-words text-lg max-sm:text-sm">
              <span className="flex items-center gap-2 ">
                🛏️ Bedrooms:- {propertyCardDetails.bedrooms}
              </span>
            </p>

            <hr className={cn(cachedTheme?.borderColor, 'col-span-2')} />

            <p
              className={cn(
                cachedTheme?.borderColor,
                'break-words border-r text-lg max-sm:text-sm'
              )}
            >
              <span className="flex items-center gap-2 ">
                <KitchenIcon /> Kitchens:- {propertyCardDetails.kitchens}
              </span>
            </p>
            <p className="break-words text-lg max-sm:text-sm ">
              <span className="flex items-center gap-2 ">
                <BathRoomIcon /> Bathrooms:- {propertyCardDetails.bathrooms}
              </span>
            </p>

            <hr className={cn(cachedTheme?.borderColor, 'col-span-2')} />

            {/* <p className="col-span-2 flex items-center gap-2 text-lg max-sm:text-sm">
              Amenities:-{' '}
              {propertyCardDetails.amenities &&
                propertyCardDetails.amenities.join(', ')}
            </p> */}

            {/* <hr className={cn(cachedTheme?.borderColor, 'col-span-2')} /> */}
          </>
        )}

        {propertyCardDetails.propertyType === 'Land' && (
          <>
            <div
              className={cn(
                cachedTheme?.borderColor,
                'border-r break-words text-lg max-sm:text-sm'
              )}
            >
              <span className="flex items-center gap-2 ">
                <PlotSizeIcon />
                Plot Width
              </span>
              <SelectCoversion<PropertyPlotWidth>
                label="plotWidth"
                options={propertyPlotWidth}
                value={propertyCardDetails.plotWidth}
              />
            </div>

            <div className="break-words text-lg max-sm:text-sm">
              <span className="flex items-center gap-2 ">
                <PlotSizeIcon />
                Plot Length
              </span>
              <SelectCoversion<PropertyPlotLength>
                label="plotLength"
                options={propertyPlotLength}
                value={propertyCardDetails.plotLength}
              />
            </div>

            <hr className={cn(cachedTheme?.borderColor, 'col-span-2')} />
          </>
        )}

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
      </div>
    );
  }
);

PropertyDetailsLayout.displayName = 'PropertyDetailsLayout';
export default PropertyDetailsLayout;
