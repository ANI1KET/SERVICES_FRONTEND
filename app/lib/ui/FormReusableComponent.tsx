'use client';

import Slider from '@mui/material/Slider';
import React, { useEffect, useState } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import {
  Room,
  RoomType,
  PostedBy,
  Aminities,
  RoomWithMedia,
  FurnishingStatus,
} from '@/app/types/types';
import { cn } from '../utils/tailwindMerge';
import { useThemeState } from '@/app/providers/reactqueryProvider';

// InputField Component
type InputFieldProps = {
  step?: number;
  type?: string;
  label: string;
  id: keyof Room;
  register: ReturnType<UseFormRegister<Room>>;
  errors: FieldErrors<Room>;
  handleEnterPress: (
    event: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
};

export const InputField = ({
  id,
  step,
  label,
  type = 'text',
  register,
  errors,
  handleEnterPress,
}: InputFieldProps) => {
  const cachedTheme = useThemeState();

  return (
    <div>
      <label htmlFor={id} className="block font-medium">
        {label}
      </label>
      <input
        id={id}
        step={step}
        type={type}
        min={0}
        {...register}
        onKeyDown={handleEnterPress}
        className={cn(
          cachedTheme?.inputBg,
          cachedTheme?.inputColor,
          'border rounded w-full p-1'
        )}
      />
      {errors[id] && (
        <p className="text-red-500 text-sm mt-1">{errors[id]?.message}</p>
      )}
    </div>
  );
};

// OptionalField Component
type OptionalFieldProps = {
  id: keyof Room;
  label: string;
  register: ReturnType<UseFormRegister<Room>>;
  handleEnterPress: (
    event: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
};

export const OptionalField = ({
  id,
  label,
  register,
  handleEnterPress,
}: OptionalFieldProps) => {
  const cachedTheme = useThemeState();

  return (
    <div>
      <label htmlFor={id} className="block font-medium">
        {label} (Optional)
      </label>
      <input
        type="text"
        id={id}
        {...register}
        onKeyDown={handleEnterPress}
        className={cn(
          cachedTheme?.inputBg,
          cachedTheme?.inputColor,
          'border rounded w-full p-1'
        )}
      />
    </div>
  );
};

// Radio Group
type RadioGroupProps = {
  label: string;
  options: string[];
  register: ReturnType<UseFormRegister<Room>>;
  error?: string;
  handleEnterPress: (
    event: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
};

export const RadioGroup = ({
  label,
  options,
  register,
  error,
  handleEnterPress,
}: RadioGroupProps) => (
  <div>
    <span className="block font-medium mb-2">{label}</span>
    <div className="space-y-2 grid grid-cols-3 lg:grid-cols-4 max-sm:grid-cols-2">
      {options.map((option) => (
        <label key={option} className="flex items-center space-x-2">
          <input
            type="radio"
            value={option}
            {...register}
            onKeyDown={handleEnterPress}
            className="cursor-pointer"
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

// Checkbox Group
type CheckboxGroupProps = {
  label: string;
  options: Aminities[];
  register: ReturnType<UseFormRegister<Room>>;
};

export const CheckboxGroup = ({
  label,
  options,
  register,
}: CheckboxGroupProps) => (
  <div>
    <span className="block font-medium mb-2">{label}</span>
    <div className="grid grid-cols-3 lg:grid-cols-4 max-sm:grid-cols-2 gap-4">
      {options.map((value) => (
        <label key={value} className="flex items-center space-x-2">
          <input type="checkbox" value={value} {...register} />
          <span>{value}</span>
        </label>
      ))}
    </div>
  </div>
);

// File Input
type FileInputProps = {
  label: string;
  id: keyof RoomWithMedia;
  register: ReturnType<UseFormRegister<RoomWithMedia>>;
  multiple?: boolean;
  accept?: string;
  error?: string;
};

export const FileInput = ({
  label,
  id,
  register,
  multiple = false,
  accept,
  error,
}: FileInputProps) => {
  const cachedTheme = useThemeState();

  return (
    <div>
      <label htmlFor={id} className="block font-medium">
        {label}
      </label>
      <input
        type="file"
        id={id}
        {...register}
        multiple={multiple}
        accept={accept}
        className={cn(cachedTheme?.borderColor, 'border rounded w-full p-2')}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

// PlusCheckbox Group
type TickCheckboxGroupProps = {
  label: string;
  options: Aminities[] | PostedBy[] | RoomType[] | FurnishingStatus[];
  register: ReturnType<
    UseFormRegister<{
      amenities: Aminities;
      postedby: PostedBy;
      roomtype: RoomType;
      furnishingstatus: FurnishingStatus;
    }>
  >;
};

export const TickCheckboxGroup = ({
  label,
  options,
  register,
}: TickCheckboxGroupProps) => {
  const cachedTheme = useThemeState();

  return (
    <div>
      <span className="block font-medium">{label}</span>
      <div
        className={cn(
          cachedTheme?.borderColor,
          'grid grid-cols-3 lg:grid-cols-4 max-sm:grid-cols-3 max-xsm:grid-cols-2'
        )}
      >
        {options.map((value) => (
          <label
            key={value}
            className={cn(
              cachedTheme?.borderColor,
              'w-fit flex items-center border rounded-lg cursor-pointer '
            )}
          >
            <input
              type="checkbox"
              value={value}
              {...register}
              className="hidden peer"
            />
            <span
              className={cn(
                cachedTheme?.borderColor,
                cachedTheme?.peerCheckedBg,
                cachedTheme?.peerCheckedText,
                'font-bold px-1 border-r rounded-lg transition-colors duration-300'
              )}
              style={{}}
            >
              ✓
            </span>
            <span>{value}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

// CheckedBoxProps Group
type CheckedBoxProps = {
  label: string;
  value: boolean;
  register: ReturnType<UseFormRegister<{ verified: boolean }>>;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const CheckedBox = ({
  label,
  register,
  value,
  onChange,
}: CheckedBoxProps) => {
  const cachedTheme = useThemeState();

  return (
    <div>
      <label className="flex gap-2 font-medium cursor-pointer ">
        {label}
        <input
          type="checkbox"
          {...register}
          checked={value}
          onChange={onChange}
          className="hidden peer"
        />
        <span
          className={cn(
            cachedTheme?.borderColor,
            cachedTheme?.peerCheckedBg,
            cachedTheme?.peerCheckedText,
            'font-bold px-1 border rounded-lg transition-colors duration-300'
          )}
        >
          ✓
        </span>
      </label>
    </div>
  );
};

// CustomCheckBox
type CustomCheckboxGroupProps<T> = {
  options: T[];
  label: string;
  defaultValue: T[];
  className: string;
  onChange: (selectedValues: T[]) => void;
};

export const CustomCheckboxGroup = <T extends string>({
  label,
  options,
  onChange,
  className,
  defaultValue,
}: CustomCheckboxGroupProps<T>) => {
  const cachedTheme = useThemeState();
  const [checkedValues, setCheckedValues] = useState<T[]>([]);

  const handleChange = ({
    target: { value, checked },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const updatedValues = checked
      ? [...checkedValues, value as T]
      : checkedValues.filter((val) => val !== value);

    setCheckedValues(updatedValues);
    onChange(updatedValues);
  };

  useEffect(() => {
    setCheckedValues(defaultValue ? defaultValue : []);
  }, [defaultValue]);
  return (
    <div>
      <span className="block font-medium">{label}</span>
      <div className={className}>
        {options.map((value) => (
          <label
            key={value}
            className={cn(
              cachedTheme?.borderColor,
              'w-fit flex items-center border rounded-lg cursor-pointer'
            )}
          >
            <input
              type="checkbox"
              value={value}
              className="hidden peer"
              onChange={handleChange}
              checked={checkedValues.includes(value)}
            />
            <span
              className={cn(
                cachedTheme?.peerCheckedBg,
                cachedTheme?.peerCheckedText,
                'p-1 rounded-lg transition-colors duration-300'
              )}
            >
              {value}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

// CheckedBoxProps Group
type CustomCheckboxProps = {
  label: string;
  defaultValue: boolean;
  onChange: (checked: boolean) => void;
};

export const CustomCheckbox = ({
  label,
  defaultValue,
  onChange,
}: CustomCheckboxProps) => (
  <div>
    <label className="flex gap-2 font-medium">
      {label}
      <input
        type="checkbox"
        defaultChecked={defaultValue}
        onChange={(event) => onChange(event.target.checked)}
        className="hidden peer"
      />
      <span className="font-bold px-1 border rounded-lg transition-colors duration-300 peer-checked:bg-black peer-checked:text-white">
        ✓
      </span>
    </label>
  </div>
);

// Price Slider
type PriceSliderProps = {
  defaultValue?: number | number[];
  onChangeEnd: (value: number | number[]) => void;
};

export const PriceSlider: React.FC<PriceSliderProps> = ({
  onChangeEnd,
  defaultValue,
}) => {
  const cachedTheme = useThemeState();
  const [price, setPrice] = useState<number[] | number>(
    defaultValue ?? [0, 10000]
  );

  return (
    <>
      <label className="block font-medium">Price</label>
      <Slider
        min={0}
        step={500}
        max={100000}
        value={price}
        sx={{
          color: 'black',
          width: '98%',
          margin: 'auto',
          '& .MuiSlider-thumb': {
            backgroundColor: cachedTheme?.selectIcon,
          },
          '& .MuiSlider-track': {
            backgroundColor: cachedTheme?.selectIcon,
          },
          '& .MuiSlider-rail': {
            backgroundColor: cachedTheme?.sliderRailColor,
          },
        }}
        valueLabelDisplay="auto"
        getAriaLabel={() => 'Price'}
        getAriaValueText={(value) => `${value}`}
        valueLabelFormat={(value) => `Rs.${value}`}
        onChange={(event: Event, newValue: number | number[]) =>
          setPrice(newValue)
        }
        onChangeCommitted={(event, newValue: number | number[]) => {
          onChangeEnd(newValue);
        }}
      />
    </>
  );
};

// Rating Slider
type RatingSliderProps = {
  defaultValue?: number | number[];
  onChangeEnd: (value: number | number[]) => void;
};

export const RatingSlider: React.FC<RatingSliderProps> = ({
  onChangeEnd,
  defaultValue,
}) => {
  const cachedTheme = useThemeState();
  const [rating, setRating] = useState<number[] | number>(
    defaultValue ?? [0, 5]
  );

  return (
    <div className="w-full">
      <label className="block font-medium">Rating</label>
      <Slider
        min={0}
        max={5}
        step={1}
        value={rating}
        sx={{
          color: 'black',
          width: '98%',
          margin: 'auto',
          '& .MuiSlider-thumb': {
            backgroundColor: cachedTheme?.selectIcon,
          },
          '& .MuiSlider-track': {
            backgroundColor: cachedTheme?.selectIcon,
          },
          '& .MuiSlider-rail': {
            backgroundColor: cachedTheme?.sliderRailColor,
          },
        }}
        valueLabelDisplay="auto"
        getAriaLabel={() => 'Rating'}
        getAriaValueText={(value) => `${value}`}
        onChange={(event: Event, newValue: number | number[]) =>
          setRating(newValue)
        }
        onChangeCommitted={(event, newValue: number | number[]) => {
          onChangeEnd(newValue);
        }}
      />
    </div>
  );
};

// Capacity Slider
type CapacitySliderProps = {
  defaultValue?: number | number[];
  onChangeEnd: (value: number | number[]) => void;
};

export const CapacitySlider: React.FC<CapacitySliderProps> = ({
  onChangeEnd,
  defaultValue,
}) => {
  const cachedTheme = useThemeState();
  const [capacity, setCapacity] = useState<number[] | number>(
    defaultValue ?? [2, 20]
  );

  return (
    <div className="w-full">
      <label className="block font-medium">Capacity</label>
      <Slider
        min={2}
        max={20}
        step={1}
        value={capacity}
        sx={{
          color: 'black',
          width: '98%',
          margin: 'auto',
          '& .MuiSlider-thumb': {
            backgroundColor: cachedTheme?.selectIcon,
          },
          '& .MuiSlider-track': {
            backgroundColor: cachedTheme?.selectIcon,
          },
          '& .MuiSlider-rail': {
            backgroundColor: cachedTheme?.sliderRailColor,
          },
        }}
        valueLabelDisplay="auto"
        getAriaLabel={() => 'Capacity'}
        getAriaValueText={(value) => `${value}`}
        valueLabelFormat={(value) => `${value}P`}
        onChange={(event: Event, newValue: number | number[]) =>
          setCapacity(newValue)
        }
        onChangeCommitted={(event, newValue: number | number[]) => {
          onChangeEnd(newValue);
        }}
      />
    </div>
  );
};
