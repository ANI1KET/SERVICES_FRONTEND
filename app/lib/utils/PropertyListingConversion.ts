import {
  PropertyArea,
  PropertyHouseArea,
  PropertyPlotWidth,
} from '@/app/types/types';
import {
  AREA_CONVERSION_TO_SQFT,
  LENGTH_CONVERSION_TO_SQFT,
  BUILT_AREA_CONVERSION_TO_SQFT,
} from '../scalableComponents';

export function AreaToSqft(value: number, unitPart: string): number {
  const unit = unitPart as PropertyArea;

  const multiplier = AREA_CONVERSION_TO_SQFT[unit];

  return Number((value * multiplier).toFixed(3));
}

export function BuiltAreaToSqft(value: number, unitPart: string): number {
  const unit = unitPart as PropertyHouseArea;

  const multiplier = BUILT_AREA_CONVERSION_TO_SQFT[unit];

  return Number((value * multiplier).toFixed(3));
}

export function LengthToFt(value: number, unitPart: string): number {
  const unit = unitPart as PropertyPlotWidth;

  const multiplier = LENGTH_CONVERSION_TO_SQFT[unit];

  return Number((value * multiplier).toFixed(3));
}

export function SqftToArea(value: number, unitPart: string): number {
  const unit = unitPart as PropertyArea;

  const multiplier = AREA_CONVERSION_TO_SQFT[unit];

  return Number((value / multiplier).toFixed(2));
}

export function SqftToBuiltArea(value: number, unitPart: string): number {
  const unit = unitPart as PropertyHouseArea;

  const multiplier = BUILT_AREA_CONVERSION_TO_SQFT[unit];

  return Number((value / multiplier).toFixed(2));
}

export function FtToLength(value: number, unitPart: string): number {
  const unit = unitPart as PropertyPlotWidth;

  const multiplier = LENGTH_CONVERSION_TO_SQFT[unit];

  return Number((value / multiplier).toFixed(2));
}
