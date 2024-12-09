"use client";

import React, { useEffect, useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import {
  PostedBy,
  RoomType,
  Aminities,
  FurnishingStatus,
} from "@/app/types/types";

type Room = {
  name: string;
  roomNumber: string;
  city: string;
  direction: string | null;
  location: string;
  price: number;
  ratings: number;
  mincapacity: number;
  maxcapacity: number;
  roomtype: RoomType;
  furnishingStatus: FurnishingStatus;
  amenities: Aminities[];
};

export type RoomWithMedia = Room & {
  photos: File[];
  videos: FileList | null;
};

export type RoomWithMediaUrl = Room & {
  photos: string[];
  videos: string | null;
};

// InputField Component
type InputFieldProps = {
  label: string;
  id: keyof Room;
  type?: string;
  register: ReturnType<UseFormRegister<Room>>;
  errors: FieldErrors<Room>;
  handleEnterPress: (
    event: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
};

export const InputField = ({
  label,
  id,
  type = "text",
  register,
  errors,
  handleEnterPress,
}: InputFieldProps) => (
  <div>
    <label htmlFor={id} className="block font-medium">
      {label}
    </label>
    <input
      type={type}
      id={id}
      {...register}
      onKeyDown={handleEnterPress}
      className="border rounded w-full p-1"
    />
    {errors[id] && (
      <p className="text-red-500 text-sm mt-1">{errors[id]?.message}</p>
    )}
  </div>
);

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
}: OptionalFieldProps) => (
  <div>
    <label htmlFor={id} className="block font-medium">
      {label} (Optional)
    </label>
    <input
      type="text"
      id={id}
      {...register}
      onKeyDown={handleEnterPress}
      className="border rounded w-full p-1"
    />
  </div>
);

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
}: FileInputProps) => (
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
      className="border rounded w-full p-2"
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

// PlusCheckbox Group
type PlusCheckboxGroupProps = {
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

export const PlusCheckboxGroup = ({
  label,
  options,
  register,
}: PlusCheckboxGroupProps) => (
  <div>
    <span className="block font-medium">{label}</span>
    <div className="grid grid-cols-3 lg:grid-cols-4 max-sm:grid-cols-3 max-xsm:grid-cols-2">
      {options.map((value) => (
        <label
          key={value}
          className="w-fit flex items-center border rounded-lg cursor-pointer "
        >
          <input
            type="checkbox"
            value={value}
            {...register}
            className="hidden peer"
          />
          <span className="font-bold px-1 border rounded-lg transition-colors duration-300 peer-checked:bg-black peer-checked:text-white">
            ✓
          </span>
          <span>{value}</span>
        </label>
      ))}
    </div>
  </div>
);

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
}: CheckedBoxProps) => (
  <div>
    <label className="flex gap-2 font-medium">
      {label}
      <input
        type="checkbox"
        {...register}
        checked={value}
        onChange={onChange}
        className="hidden peer"
      />
      <span className="font-bold px-1 border rounded-lg transition-colors duration-300 peer-checked:bg-black peer-checked:text-white">
        ✓
      </span>
    </label>
  </div>
);

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
            className="w-fit flex items-center border rounded-lg cursor-pointer"
          >
            <input
              type="checkbox"
              value={value}
              className="hidden peer"
              onChange={handleChange}
              checked={checkedValues.includes(value)}
            />
            <span className="p-1 rounded-lg transition-colors duration-300 peer-checked:bg-black peer-checked:text-white">
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
  onChange: (checked: boolean) => void;
};

export const CustomCheckbox = ({ label, onChange }: CustomCheckboxProps) => (
  <div>
    <label className="flex gap-2 font-medium">
      {label}
      <input
        type="checkbox"
        onChange={(event) => onChange(event.target.checked)}
        className="hidden peer"
      />
      <span className="font-bold px-1 border rounded-lg transition-colors duration-300 peer-checked:bg-black peer-checked:text-white">
        ✓
      </span>
    </label>
  </div>
);
