import prisma from '@/prisma/prismaClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const ip =
    req.headers.get('x-forwarded-for') ||
    req.headers.get('x-real-ip') ||
    'unknown';

  const userAgent = req.headers.get('user-agent') || 'unknown';
  const deviceType = /mobile|android|iphone|ipad/i.test(userAgent)
    ? 'mobile'
    : 'desktop';

  const roomPromotion = await prisma.roomPromotion.findUnique({
    where: { shortUrl: id },
    select: {
      id: true,
      expiresAt: true,
      agreementId: true,
      originalUrl: true,
      agreement: {
        select: {
          pricePerClick: true,
        },
      },
    },
  });

  if (!roomPromotion || roomPromotion.expiresAt <= new Date()) {
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/not-found`, 301);
  }

  const { id: promotionId, agreement, agreementId } = roomPromotion;
  const { pricePerClick } = agreement;

  await prisma.$transaction([
    prisma.roomPromotion.update({
      where: { id: promotionId },
      data: {
        clicks: { increment: 1 },
        totalEarned: { increment: pricePerClick },
      },
    }),
    prisma.promotionAgreement.update({
      where: { id: agreementId },
      data: {
        totalEarned: { increment: pricePerClick },
      },
    }),
    prisma.userClick.create({
      data: {
        ip,
        deviceType,
        roomPromotionId: promotionId,
      },
    }),
  ]);

  return NextResponse.redirect(`${roomPromotion.originalUrl}`);
}
