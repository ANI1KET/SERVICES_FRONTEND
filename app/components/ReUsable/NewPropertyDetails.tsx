'use client';

import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import {
  PropertyArea,
  ListedProperty,
  PropertyPlotWidth,
  PropertyHouseArea,
  PropertyPlotLength,
} from '@/app/types/types';
import {
  PriceIcon,
  PlotSizeIcon,
  HouseAreaIcon,
  PropertyAreaIcon,
} from '@/app/lib/icon/svg';
import {
  propertyArea,
  propertyPlotWidth,
  propertyHouseArea,
  propertyPlotLength,
} from '@/app/lib/scalableComponents';
import { cn } from '@/app/lib/utils/tailwindMerge';
import { SelectCoversion } from './FormReusableComponent';
import { updateNumber } from '@/app/components/ServerAction';
import { pushSavedRoom } from '@/app/(selected)/ServerAction';
import { useThemeState } from '@/app/providers/reactqueryProvider';

interface NewRoomCardProps {
  propertyCardDetails: ListedProperty;
}

const NewPropertyDetails: React.FC<NewRoomCardProps> = ({
  propertyCardDetails,
}) => {
  const router = useRouter();
  const cacheTheme = useThemeState();
  const { data: session, update } = useSession();

  const formatCount = (count: number, word: string) =>
    `${count} ${word}${count === 1 ? '' : 's'}`;

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
              session?.user.permission?.includes('property') ? null : (
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
                        localStorage.getItem('InterestedProperties') || '[]'
                      );
                      if (existingRooms.includes(propertyCardDetails.id)) {
                        return;
                      }

                      await pushSavedRoom({
                        roomId: propertyCardDetails.id,
                        userId: session.user.userId as string,
                        listerId: propertyCardDetails.sellerId,
                      });

                      existingRooms.push(propertyCardDetails.id);
                      localStorage.setItem(
                        'InterestedProperties',
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
              title={`${btoa(propertyCardDetails.id)}`}
              className={cn(
                cacheTheme?.activeBg,
                cacheTheme?.activeTextColor,
                'text-sm p-[2px] rounded-lg cursor-pointer mr-1'
              )}
              onClick={(e) => {
                const target = e.currentTarget;
                const originalText = target.innerText;
                navigator.clipboard
                  .writeText(btoa(propertyCardDetails.id))
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
            {propertyCardDetails.verified && (
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
                propertyCardDetails.available ? '' : 'text-red-500'
              )}
            >
              {propertyCardDetails.available ? 'Available' : 'Sold'}
            </span>
          </p>

          <p className="col-span-3 ">
            {`${propertyCardDetails.city}, ${propertyCardDetails.location}`}
            {propertyCardDetails?.direction &&
              ` ( ${propertyCardDetails?.direction} )`}
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
          <p>{`+977-${propertyCardDetails.primaryContact}`}</p>
        </div>
        <div className="hidden max-xsm:block break-words">
          <p className="flex items-center gap-2 text-sm">
            <PriceIcon />
            Price
          </p>
          <p>Rs.{propertyCardDetails.price}</p>
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
          <p>{propertyCardDetails.title}</p>
        </div>
        <div className="break-words">
          <p className="flex items-center gap-2 text-sm">👤 Posted By</p>
          <p>{propertyCardDetails.postedBy}</p>
        </div>

        <hr className={cn(cacheTheme?.borderColor, 'col-span-2')} />

        <div className={cn(cacheTheme?.borderColor, 'border-r break-words')}>
          <p className="flex items-center gap-2 text-sm">
            {propertyCardDetails.propertyType === 'House' ? '🏠 ' : '🌄 '}Type
          </p>
          <p>
            {propertyCardDetails.propertyType === 'House' ? 'House' : 'Land'}
          </p>
        </div>
        <div className="break-words">
          <p className="flex items-center gap-2 text-sm">
            <PropertyAreaIcon /> Area
          </p>
          <SelectCoversion<PropertyArea>
            label="area"
            maxWidth="100px"
            options={propertyArea}
            value={propertyCardDetails.area}
          />
        </div>

        <hr className={cn(cacheTheme?.borderColor, 'col-span-2')} />

        {propertyCardDetails.propertyType === 'House' ? (
          <>
            <div
              className={cn(cacheTheme?.borderColor, 'border-r break-words')}
            >
              <p className="flex items-center gap-2 text-sm">
                <HouseAreaIcon />
                BuiltUpArea
              </p>
              <SelectCoversion<PropertyHouseArea>
                maxWidth="100px"
                label="builtUpArea"
                options={propertyHouseArea}
                value={propertyCardDetails.builtUpArea}
              />
            </div>

            <div className="break-words ">
              🏠 {formatCount(propertyCardDetails.floors, 'floor')},
              {formatCount(propertyCardDetails.bedrooms, 'bedroom')},
              {formatCount(propertyCardDetails.kitchens, 'kitchen')},
              {formatCount(propertyCardDetails.bathrooms, 'bathroom')}
            </div>
          </>
        ) : (
          <>
            <div
              className={cn(cacheTheme?.borderColor, 'border-r break-words')}
            >
              <p className="flex items-center gap-2 text-sm">
                <PlotSizeIcon />
                Plot Width
              </p>
              <SelectCoversion<PropertyPlotWidth>
                maxWidth="100px"
                label="plotWidth"
                options={propertyPlotWidth}
                value={propertyCardDetails.plotWidth}
              />
            </div>

            <div className="break-words ">
              <p className="flex items-center gap-2 text-sm">
                <PlotSizeIcon />
                Plot Width
              </p>
              <SelectCoversion<PropertyPlotLength>
                maxWidth="100px"
                label="plotWidth"
                options={propertyPlotLength}
                value={propertyCardDetails.plotLength}
              />
            </div>
          </>
        )}

        <hr className={cn(cacheTheme?.borderColor, 'col-span-2')} />

        {/*  */}

        <div className="hidden max-xsm:block col-span-2 ">
          <p className="flex justify-center items-center gap-2 text-base font-semibold">
            Nearby Areas
          </p>
          {propertyCardDetails.nearbyAreas && (
            <p className="col-span-2 break-words">
              {propertyCardDetails.nearbyAreas.join(', ')}
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

export default NewPropertyDetails;
