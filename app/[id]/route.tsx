import { UAParser } from 'ua-parser-js';
import prisma from '@/prisma/prismaClient';
import { NextRequest, NextResponse } from 'next/server';
import { RateLimiterMemory } from 'rate-limiter-flexible';

// In-memory rate limiter for dev/local testing
const rateLimiter = new RateLimiterMemory({
  points: 10, // max 10 requests
  duration: 600, // per 60 seconds
});

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // —— PARAM PARSING ——
  const { id } = await params;

  // —— CLIENT IP ——
  const ip =
    req.headers.get('x-forwarded-for') ||
    req.headers.get('x-real-ip') ||
    'unknown';

  // —— RATE LIMIT CHECK ——
  try {
    await rateLimiter.consume(ip);
  } catch {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Too Many Requests</title>
          <style>
            body { font-family: sans-serif; text-align: center; padding: 4rem; }
            h1 { font-size: 2.5rem; color: #e00; margin-bottom: 1rem; }
            p  { font-size: 1.2rem; }
          </style>
        </head>
        <body>
          <h1>429 - Too Many Requests</h1>
          <p>You've hit the rate limit. Please wait few minutes and try again.</p>
        </body>
      </html>
    `;
    return new NextResponse(html, {
      status: 429,
      headers: { 'Content-Type': 'text/html' },
    });
  }

  // —— DEVICE PARSING ——
  const userAgent = req.headers.get('user-agent') || 'unknown';
  const parser = new UAParser(userAgent);
  const device = parser.getDevice();

  let deviceModel: string | null = null;
  if (device.vendor && device.model) {
    deviceModel = `${device.vendor} ${device.model}`;
  }

  let deviceType: string | null = deviceModel;
  if (!deviceType && device.type) {
    deviceType = device.type;
  }
  if (!deviceType) {
    deviceType = /mobile|android|iphone|ipad/i.test(userAgent)
      ? 'Mobile'
      : 'Desktop';
  }

  // —— MAIN LOGIC ——
  try {
    const roomPromotion = await prisma.roomPromotion.findUnique({
      where: { shortUrl: id },
      select: {
        id: true,
        expiresAt: true,
        agreementId: true,
        originalUrl: true,
        agreement: { select: { pricePerClick: true } },
      },
    });

    if (!roomPromotion || roomPromotion.expiresAt <= new Date()) {
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}/not-found`,
        301
      );
    }

    const {
      agreement,
      originalUrl,
      agreementId,
      id: promotionId,
    } = roomPromotion;
    const { pricePerClick } = agreement;

    // Record click, earnings, and user metadata
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
        data: { totalEarned: { increment: pricePerClick } },
      }),
      prisma.userClick.create({
        data: {
          ip,
          deviceType,
          roomPromotionId: promotionId,
        },
      }),
    ]);

    // Redirect to the original URL
    return NextResponse.redirect(originalUrl);
  } catch (err) {
    console.error('🔴 Unexpected error in GET /api/[id]:', err);
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Server Error</title>
          <style>
            body { font-family: sans-serif; text-align: center; padding: 4rem; }
            h1 { font-size: 2.5rem; color: #e00; margin-bottom: 1rem; }
            p  { font-size: 1.2rem; }
          </style>
        </head>
        <body>
          <h1>500 - Internal Server Error</h1>
          <p>Something went wrong on our end. Please try again later.</p>
        </body>
      </html>
    `;
    return new NextResponse(html, {
      status: 500,
      headers: { 'Content-Type': 'text/html' },
    });
  }
}
