export const dynamic = 'force-dynamic';

import { getServerSession } from 'next-auth';

import { PromoterWithDeals } from '../types/types';
import { getPromoterDetails } from './ServerAction';
import { ListerPromotion } from './component/PageComponent';
import { authOptions } from '../api/auth/[...nextauth]/options';

const Promoter = async () => {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.userId;

    const promoterDetails: PromoterWithDeals | undefined =
      await getPromoterDetails(userId as string);

    if (!promoterDetails) {
      return (
        <div className="w-full flex justify-center items-center">
          No Promotion Record to Show
        </div>
      );
    }

    return (
      <main className="w-full flex flex-col gap-4 overflow-y-auto">
        {promoterDetails?.promotionDeals.map((promote, index: number) => (
          <ListerPromotion key={index + 1} index={index} promote={promote} />
        ))}
      </main>
    );
  } catch (error) {
    console.error('Error fetching promoter details:', error);
    return (
      <div className="w-full flex justify-center items-center">
        Failed to load promotion data.
      </div>
    );
  }
};

export default Promoter;
