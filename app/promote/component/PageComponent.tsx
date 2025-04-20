'use client';

import { useCallback, useState } from 'react';

import { cn } from '@/app/lib/utils/tailwindMerge';
import { removeRoom, renewPromotion } from '../ServerAction';
import { Promotion, PromotionDeal } from '@/app/types/types';
import { useThemeState } from '@/app/providers/reactqueryProvider';
import { getExpirationStatus } from '@/app/lib/utils/timeCalculation';

export const ListerPromotion: React.FC<{
  index: number;
  promote: PromotionDeal;
}> = ({ index, promote }) => {
  const cachedTheme = useThemeState();
  const [promotions, setPromotions] = useState(promote);

  const removeRoomPormotion = async (
    totalEarned: number,
    roomPromotionId: string
  ) => {
    const response = await removeRoom(totalEarned, roomPromotionId, promote.id);
    if (!response) return;

    setPromotions((prev) => {
      return {
        ...prev,
        totalEarned: prev.totalEarned - totalEarned,
        promotions: prev.promotions.filter(
          (promote) => promote.id !== roomPromotionId
        ),
      };
    });
  };

  const renewRoomPormotion = async (roomPromotionId: string) => {
    const response = await renewPromotion(roomPromotionId);
    if (!response) return;

    setPromotions((prev) => {
      return {
        ...prev,
        promotions: prev.promotions.map((promote) =>
          promote.id === roomPromotionId
            ? {
                ...promote,
                expiresAt: new Date(
                  Date.now() + 7 * 24 * 60 * 60 * 1000
                ).toISOString(),
              }
            : promote
        ),
      };
    });
  };
  return (
    <div className={cn('')}>
      <div
        className={cn(
          cachedTheme.bg,
          cachedTheme.borderColor,
          'w-full flex flex-col max-sm:flex-row border-t rounded-t-lg '
        )}
      >
        <div className="flex max-sm:flex-col justify-between max-sm:w-1/2">
          <p className="max-sm:order-1 order-1 col-span-2  max-sm:col-span-1">
            👤 {promotions.lister.name}
          </p>
          <p className="max-sm:order-3 order-2 col-span-2 max-sm:col-span-1">
            📞 {promotions.lister.number}
          </p>
          <p className="max-sm:order-5 order-3 col-span-3 max-sm:col-span-1">
            📧 {promotions.lister.email}
          </p>
        </div>

        <div className="flex max-sm:flex-col justify-around max-sm:w-1/2">
          <p className="max-sm:order-2 order-4 col-span-2 max-sm:col-span-1">
            💰 {promotions.pricePerClick ?? 0} /visit
          </p>
          <p className="max-sm:order-4 order-5 max-sm:col-span-1">
            💵 {promotions.totalEarned ?? 0}
          </p>
        </div>
      </div>

      <div className="flex overflow-x-auto">
        {promotions.promotions.map((promotion, promotionIndex) => (
          <RoomPromotion
            promotion={promotion}
            key={`${index + 1}${promotionIndex}`}
            renewRoomPormotion={renewRoomPormotion}
            removeRoomPormotion={removeRoomPormotion}
          />
        ))}
      </div>
    </div>
  );
};

export const RoomPromotion: React.FC<{
  promotion: Promotion;
  renewRoomPormotion: (roomPromotionId: string) => void;
  removeRoomPormotion: (totalEarned: number, roomPromotionId: string) => void;
}> = ({ promotion, renewRoomPormotion, removeRoomPormotion }) => {
  const cachedTheme = useThemeState();
  const { message, isExpired } = getExpirationStatus(promotion.expiresAt);

  const copyPromotionLink = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const target = e.currentTarget;
      const originalText = target.innerText;
      const fullUrl = `${window.location.origin}/${promotion.shortUrl}`;

      navigator.clipboard
        .writeText(fullUrl)
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
    },
    [promotion.shortUrl]
  );
  return (
    <div
      className={cn(
        cachedTheme.bg,
        cachedTheme.borderColor,
        'h-fit flex-shrink-0 border rounded-b-lg xl:w-1/5 lg:w-1/4 md:w-1/3 max-sm:w-1/2 max-xsm:w-full'
      )}
    >
      <p className="p-1">👤 {promotion.room.name}</p>
      <p className="p-1">💵 {promotion.room.price} /month</p>
      <p className="p-1">
        🌏 {promotion.room.location} ({promotion.room.city})
      </p>
      <p className="pl-4">💸 {promotion.totalEarned} earned</p>
      <p className="pl-4 pb-2 flex justify-between items-center">
        ⏳ {message}
        {isExpired && (
          <button
            className={cn(
              cachedTheme.activeTextColor,
              cachedTheme.activeBorderColor,
              'p-[1px] border bg-red-500 rounded-lg'
            )}
            onClick={() => renewRoomPormotion(promotion.id)}
          >
            Renew
          </button>
        )}
      </p>

      <p className="flex justify-between">
        <button
          className={cn(
            cachedTheme.activeBg,
            cachedTheme.activeTextColor,
            cachedTheme.activeBorderColor,
            'p-1 border rounded-lg hover:scale-105'
          )}
          onClick={() =>
            removeRoomPormotion(promotion.totalEarned, promotion.id)
          }
        >
          Remove
        </button>

        <button
          className={cn(
            cachedTheme.activeBg,
            cachedTheme.activeTextColor,
            cachedTheme.activeBorderColor,
            'p-1 border rounded-lg hover:scale-105'
          )}
          onClick={copyPromotionLink}
        >
          Share
        </button>
      </p>
    </div>
  );
};
