'use client';

import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { PriceIcon } from '@/app/lib/icon/svg';
import { cn } from '@/app/lib/utils/tailwindMerge';
import { ListedProperty } from '@/app/types/types';
import { updateNumber } from '@/app/components/ServerAction';
import { pushSavedProperty } from '@/app/(selected)/ServerAction';
import { useThemeState } from '@/app/providers/reactqueryProvider';

interface PropertyCardProps {
  propertyCardDetails: ListedProperty;
}

const ResponsivePropertyDetails: React.FC<PropertyCardProps> = ({
  propertyCardDetails,
}) => {
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
        cancelButton: cn(
          'rounded-lg',
          cacheTheme?.activeBg,
          cacheTheme?.activeTextColor
        ),
        popup: 'rounded-xl shadow-lg',
        title: cn(cacheTheme?.textColor, 'text-lg font-bold'),
        confirmButton: cn(cacheTheme?.bg, cacheTheme?.textColor, 'rounded-lg'),
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

                  const existingProperties = JSON.parse(
                    localStorage.getItem('InterestedProperties') || '[]'
                  );
                  if (existingProperties.includes(propertyCardDetails.id)) {
                    return;
                  }

                  await pushSavedProperty({
                    propertyId: propertyCardDetails.id,
                    userId: session.user.userId as string,
                    listerId: propertyCardDetails.sellerId,
                  });

                  existingProperties.push(propertyCardDetails.id);
                  localStorage.setItem(
                    'InterestedProperties',
                    JSON.stringify(existingProperties)
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
            Rs.{`${propertyCardDetails.price}`}
            <span
              className={cn(
                'text-sm p-[2px] rounded-lg text-right ml-auto',
                cacheTheme?.activeBg,
                cacheTheme?.activeTextColor
              )}
            >
              {propertyCardDetails.available ? '✅ Available' : '❌ Sold'}
            </span>
          </span>
        </p>

        <span className="text-lg col-span-4 flex items-center gap-1 ">
          📌 {`${propertyCardDetails?.city}, ${propertyCardDetails?.location}`}
          {propertyCardDetails?.direction &&
            ` ( ${propertyCardDetails?.direction} )`}
          {propertyCardDetails?.verified && (
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
          📞 {`+977-${propertyCardDetails?.primaryContact}`}
        </span>

        {propertyCardDetails.propertyType === 'House' ? (
          <p className="flex items-center col-span-4 gap-2">
            Amenities:
            {propertyCardDetails.amenities && (
              <span className="col-span-2 break-words">
                {propertyCardDetails.amenities.join(', ')}
              </span>
            )}
          </p>
        ) : null}

        <hr className={cn(cacheTheme?.borderColor, 'col-span-6 border-1 ')} />

        <p className="flex items-center col-span-6 gap-2 ml-2">
          <span className="text-lg font-semibold col-span-1 ">
            Nearby Areas:
          </span>
          {propertyCardDetails?.nearbyAreas && (
            <span className="col-span-2 break-words">
              {propertyCardDetails.nearbyAreas.join(', ')}
            </span>
          )}
        </p>
      </div>
    </>
  );
};

export default ResponsivePropertyDetails;
