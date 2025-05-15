import {
  PropertyArea,
  PropertyHouseArea,
  PropertyPlotWidth,
} from '@/app/types/types';

export function AreaToSqft(value: number, unitPart: string): number {
  const AREA_CONVERSION_TO_SQFT: Record<PropertyArea, number> = {
    sqft: 1,
    acre: 43560,
    sqm: 10.7639,
    aana: 342.25,
    dhur: 182.25,
    bigha: 27225,
    kattha: 1361.25,
  };

  const unit = unitPart as PropertyArea;

  const multiplier = AREA_CONVERSION_TO_SQFT[unit];

  return Number((value * multiplier).toFixed(3));
}

export function BuiltAreaToSqft(value: number, unitPart: string): number {
  const AREA_CONVERSION_TO_SQFT: Record<PropertyHouseArea, number> = {
    sqft: 1,
    sqm: 10.7639,
  };

  const unit = unitPart as PropertyHouseArea;

  const multiplier = AREA_CONVERSION_TO_SQFT[unit];

  return Number((value * multiplier).toFixed(3));
}

export function LengthToFt(value: number, unitPart: string): number {
  const LENGTH_CONVERSION_TO_SQFT: Record<PropertyPlotWidth, number> = {
    ft: 1,
    mt: 3.28,
  };

  const unit = unitPart as PropertyPlotWidth;

  const multiplier = LENGTH_CONVERSION_TO_SQFT[unit];

  return Number((value * multiplier).toFixed(3));
}
