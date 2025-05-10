'use client';

import {
  Control,
  PathValue,
  FieldPath,
  Controller,
  FieldValues,
  FieldErrors,
  UseFormTrigger,
  UseFormRegister,
  RegisterOptions,
} from 'react-hook-form';
import Slider from '@mui/material/Slider';
import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';

import { TextField } from '@mui/material';
import { cn } from '../../lib/utils/tailwindMerge';
import { useThemeState } from '@/app/providers/reactqueryProvider';

type StrictRegisterOptions<
  T extends FieldValues,
  K extends FieldPath<T>
> = PathValue<T, K> extends string
  ? Omit<RegisterOptions<T, K>, 'min' | 'max' | 'valueAsNumber' | 'valueAsDate'>
  : PathValue<T, K> extends number
  ? Omit<RegisterOptions<T, K>, 'minLength' | 'maxLength' | 'valueAsDate'>
  : PathValue<T, K> extends Date
  ? Extract<RegisterOptions<T, K>, { valueAsDate?: true }>
  : RegisterOptions<T, K>;

// InputField Component
type InputFieldProps<T extends FieldValues, K extends FieldPath<T>> = {
  id: K;
  step?: number;
  type?: string;
  label: string;
  errors: FieldErrors<T>;
  trigger: UseFormTrigger<T>;
  register: UseFormRegister<T>;
  // rules: RegisterOptions<T, K>;
  rules: StrictRegisterOptions<T, K>;
  handleEnterPress?: (
    event: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
};

export const InputField = <T extends FieldValues, K extends FieldPath<T>>({
  id,
  step,
  label,
  rules,
  errors,
  trigger,
  register,
  type = 'text',
  handleEnterPress,
}: InputFieldProps<T, K>) => {
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
        {...register(id, rules as RegisterOptions<T, K>)}
        // {...register(id, rules)}
        onBlur={() => trigger(id)}
        onKeyDown={handleEnterPress}
        className={cn(
          cachedTheme?.inputBg,
          cachedTheme?.inputColor,
          'border rounded w-full p-1'
        )}
      />
      {errors[id] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[id]?.message as string}
        </p>
      )}
    </div>
  );
};

// OptionalInputField Component
type OptionalInputFieldProps<T extends FieldValues, K extends FieldPath<T>> = {
  id: K;
  label: string;
  errors: FieldErrors<T>;
  register: UseFormRegister<T>;
  rules?: StrictRegisterOptions<T, K>;
  handleEnterPress: (
    event: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
};

export const OptionalInputField = <
  T extends FieldValues,
  K extends FieldPath<T>
>({
  id,
  label,
  rules,
  errors,
  register,
  handleEnterPress,
}: OptionalInputFieldProps<T, K>) => {
  const cachedTheme = useThemeState();

  return (
    <div>
      <label htmlFor={id} className="block font-medium">
        {label} (Optional)
      </label>
      <input
        type="text"
        id={id}
        // {...register}
        {...register(id, rules as RegisterOptions<T, K>)}
        onKeyDown={handleEnterPress}
        className={cn(
          cachedTheme?.inputBg,
          cachedTheme?.inputColor,
          'border rounded w-full p-1'
        )}
      />
      {errors[id] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[id]?.message as string}
        </p>
      )}
    </div>
  );
};

// Radio Group
type RadioGroupProps<T extends FieldValues, K extends FieldPath<T>> = {
  id: K;
  label: string;
  errors: FieldErrors<T>;
  options: OptionType<T, K>[];
  register: UseFormRegister<T>;
  rules?: RegisterOptions<T, K>;
  handleEnterPress: (
    event: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
};

export const RadioGroup = <T extends FieldValues, K extends FieldPath<T>>({
  id,
  label,
  rules,
  errors,
  options,
  register,
  handleEnterPress,
}: RadioGroupProps<T, K>) => (
  <div>
    <span className="block font-medium mb-2">{label}</span>
    <div className="space-y-2 grid grid-cols-3 lg:grid-cols-4 max-sm:grid-cols-2">
      {options.map((option) => (
        <label key={String(option)} className="flex items-center space-x-2">
          <input
            type="radio"
            value={String(option)}
            // {...register(id)}
            {...register(id, rules)}
            onKeyDown={handleEnterPress}
            className="cursor-pointer"
          />
          <span>{String(option)}</span>
        </label>
      ))}
    </div>
    {errors[id] && (
      <p className="text-red-500 text-sm mt-1">
        {errors[id].message as string}
      </p>
    )}
  </div>
);

// Checkbox Group
type CheckboxGroupProps<T extends FieldValues, K extends FieldPath<T>> = {
  id: K;
  label: string;
  errors?: FieldErrors<T>;
  options: OptionType<T, K>[];
  register: UseFormRegister<T>;
  rules?: RegisterOptions<T, K>;
};

export const CheckboxGroup = <T extends FieldValues, K extends FieldPath<T>>({
  id,
  label,
  rules,
  errors,
  options,
  register,
}: CheckboxGroupProps<T, K>) => (
  <div>
    <span className="block font-medium mb-2">{label}</span>
    <div className="grid grid-cols-3 lg:grid-cols-4 max-sm:grid-cols-2 gap-4">
      {options.map((value) => (
        <label key={String(value)} className="flex items-center space-x-2">
          <input
            type="checkbox"
            value={String(value)}
            {...register(id, rules)}
          />
          <span>{String(value)}</span>
        </label>
      ))}
      {errors?.[id] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[id].message as string}
        </p>
      )}
    </div>
  </div>
);

// File Input
type FileInputProps<T extends FieldValues, K extends FieldPath<T>> = {
  id: K;
  label: string;
  accept: string;
  multiple?: boolean;
  errors?: FieldErrors<T>;
  register: UseFormRegister<T>;
  rules?: RegisterOptions<T, K>;
};

export const FileInput = <T extends FieldValues, K extends FieldPath<T>>({
  id,
  label,
  rules,
  errors,
  accept,
  register,
  multiple = false,
}: FileInputProps<T, K>) => {
  const cachedTheme = useThemeState();

  return (
    <div>
      <label htmlFor={id} className="block font-medium">
        {label}
      </label>
      <input
        type="file"
        id={id}
        {...register(id, rules)}
        multiple={multiple}
        accept={accept}
        className={cn(cachedTheme?.borderColor, 'border rounded w-full p-2')}
      />
      {errors?.[id] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[id].message as string}
        </p>
      )}
    </div>
  );
};

//
type OptionType<T extends FieldValues, K extends FieldPath<T>> = PathValue<
  T,
  K
> extends Array<infer U>
  ? U
  : PathValue<T, K>;

// SELECT INPUT Component
type SelectInputFieldProps<T extends FieldValues, K extends FieldPath<T>> = {
  id: K;
  label: string;
  errors: FieldErrors<T>;
  trigger: UseFormTrigger<T>;
  options: OptionType<T, K>[];
  register: UseFormRegister<T>;
  rules: StrictRegisterOptions<T, K>;
  handleEnterPress?: React.KeyboardEventHandler<HTMLInputElement>;
};

export const SelectInputField = <
  T extends FieldValues,
  K extends FieldPath<T>
>({
  id,
  label,
  rules,
  errors,
  trigger,
  options,
  register,
  handleEnterPress,
}: SelectInputFieldProps<T, K>) => {
  const [numPart, setNumPart] = useState('');
  const [unitPart, setUnitPart] = useState<OptionType<T, K> | ''>('');

  const { name, ref, onChange, onBlur } = register(
    id,
    rules as RegisterOptions<T, K>
  );

  useEffect(() => {
    const fullValue = numPart && unitPart ? `${numPart}${unitPart}` : '';
    onChange({ target: { name, value: fullValue } });
  }, [name, numPart, unitPart, onChange]);

  return (
    <div className="">
      <label htmlFor={`${String(id)}-num`} className="block font-medium">
        {label}
      </label>

      <div className="flex w-1/3 ">
        <input
          id={`${String(id)}-num`}
          type="number"
          min={0}
          step="any"
          value={numPart}
          onBlur={() => {
            trigger(id);
            onBlur({ target: { name } });
          }}
          onKeyDown={handleEnterPress}
          className="w-24 p-1 border rounded "
          onChange={(e) => setNumPart(e.target.value)}
        />

        <Autocomplete<OptionType<T, K>>
          options={options}
          value={unitPart || null}
          disableClearable={true as false}
          onChange={(_, newUnit) => setUnitPart(newUnit || '')}
          renderInput={(params) => (
            <TextField
              {...params}
              inputRef={ref}
              error={!!errors[id]}
              onKeyDown={handleEnterPress}
              slotProps={{
                root: {
                  sx: {
                    '& .MuiOutlinedInput-root': {
                      height: '36px',
                    },
                    '& .MuiOutlinedInput-input': {
                      height: 'auto',
                      overflow: 'visible',
                      textOverflow: 'clip',
                    },
                  },
                },
              }}
            />
          )}
        />
      </div>

      {errors[id] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[id]?.message as string}
        </p>
      )}
    </div>
  );
};

// SELECT Component
type SelectFieldProps<T extends FieldValues, K extends FieldPath<T>> = {
  id: K;
  label: string;
  control: Control<T>;
  errors: FieldErrors<T>;
  options: OptionType<T, K>[];
  rules: StrictRegisterOptions<T, K>;
  handleEnterPress?: React.KeyboardEventHandler<HTMLInputElement>;
};

export const SelectField = <T extends FieldValues, K extends FieldPath<T>>({
  id,
  label,
  rules,
  errors,
  control,
  options,
  handleEnterPress,
}: SelectFieldProps<T, K>) => {
  return (
    <div className="">
      <label htmlFor={`${String(id)}-num`} className="block font-medium">
        {label}
      </label>

      <Controller
        name={id}
        rules={rules}
        control={control}
        render={({ field }) => (
          <Autocomplete<OptionType<T, K>>
            options={options}
            value={field.value || null}
            disableClearable={true as false}
            onChange={(_, newValue) => field.onChange(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                inputRef={field.ref}
                onKeyDown={handleEnterPress}
                error={!!errors[id]}
                slotProps={{
                  root: {
                    sx: {
                      '& .MuiOutlinedInput-root': { height: '36px' },
                      '& .MuiOutlinedInput-input': {
                        height: 'auto',
                        overflow: 'visible',
                        textOverflow: 'clip',
                      },
                    },
                  },
                }}
              />
            )}
          />
        )}
      />

      {errors[id] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[id]?.message as string}
        </p>
      )}
    </div>
  );
};

// DEFAULT SELECT FIELD
type DefaultSelectFieldProps<T extends FieldValues, K extends FieldPath<T>> = {
  id: K;
  control: Control<T>;
  options: OptionType<T, K>[];
  onChange: (value: OptionType<T, K> | null) => void;
};

export const DefaultSelectField = <
  T extends FieldValues,
  K extends FieldPath<T>
>({
  id,
  control,
  options,
  onChange,
}: DefaultSelectFieldProps<T, K>) => {
  return (
    <Controller
      name={id}
      control={control}
      render={({ field }) => (
        <Autocomplete<OptionType<T, K>>
          options={options}
          value={field.value || null}
          disableClearable={true as false}
          onChange={(_, newValue) => {
            field.onChange(newValue);
            onChange(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              inputRef={field.ref}
              slotProps={{
                root: {
                  sx: {
                    '& .MuiOutlinedInput-root': {
                      height: '36px',
                      '& fieldset': {
                        border: 'none',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      height: 'auto',
                      overflow: 'visible',
                      textOverflow: 'clip',
                    },
                  },
                },
              }}
            />
          )}
        />
      )}
    />
  );
};

// MULTIPLE SELECT FIELD
type MultipleSelectFieldProps<T extends FieldValues, K extends FieldPath<T>> = {
  id: K;
  disabled: boolean;
  control: Control<T>;
  options: OptionType<T, K>[];
};

export const MultipleSelectField = <
  T extends FieldValues,
  K extends FieldPath<T>
>({
  id,
  control,
  options,
  disabled = false,
}: MultipleSelectFieldProps<T, K>) => {
  return (
    <Controller
      name={id}
      control={control}
      render={({ field }) => (
        <Autocomplete
          multiple
          disableClearable
          // popupIcon={null}
          options={options}
          disabled={disabled}
          value={field.value || []}
          isOptionEqualToValue={(opt, val) => opt === val}
          onChange={(_, newValue) => field.onChange(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              inputRef={field.ref}
              slotProps={{
                root: {
                  sx: {
                    '& .MuiAutocomplete-inputRoot': {
                      display: 'flex',
                      overflowX: 'auto',
                      scrollbarWidth: 'none',
                      flexWrap: 'nowrap !important',
                      '&::-webkit-scrollbar': {
                        display: 'none',
                      },
                    },
                    '& .MuiAutocomplete-tag': {
                      flexShrink: 0,
                    },
                    '& .MuiOutlinedInput-root': {
                      height: '36px',
                      '& fieldset': {
                        border: 'none',
                      },
                    },
                  },
                },
              }}
            />
          )}
        />
      )}
    />
  );
};

// PlusCheckbox Group
type TickCheckboxGroupProps<T extends FieldValues, K extends FieldPath<T>> = {
  id: K;
  label: string;
  options: OptionType<T, K>[];
  register: UseFormRegister<T>;
};

export const TickCheckboxGroup = <
  T extends FieldValues,
  K extends FieldPath<T>
>({
  id,
  label,
  options,
  register,
}: TickCheckboxGroupProps<T, K>) => {
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
            key={String(value)}
            className={cn(
              cachedTheme?.borderColor,
              'w-fit flex items-center border rounded-lg cursor-pointer '
            )}
          >
            <input
              type="checkbox"
              value={String(value)}
              {...register(id)}
              className="hidden peer"
            />
            <span
              className={cn(
                cachedTheme?.borderColor,
                cachedTheme?.peerCheckedBg,
                cachedTheme?.peerCheckedText,
                'font-bold px-1 border-r rounded-lg transition-colors duration-300'
              )}
            >
              ✓
            </span>
            <span>{String(value)}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

// CheckedBoxProps Group
type CheckedBoxProps<T extends FieldValues> = {
  id: FieldPath<T>;
  label: string;
  control: Control<T>;
};

export const CheckedBox = <T extends FieldValues>({
  id,
  label,
  control,
}: CheckedBoxProps<T>) => {
  const cachedTheme = useThemeState();

  return (
    <Controller
      name={id}
      control={control}
      render={({ field }) => (
        <label className="flex gap-2 font-medium cursor-pointer">
          {label}
          <input
            type="checkbox"
            checked={!!field.value} // allows undefined initially
            onChange={(e) => field.onChange(e.target.checked)}
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
      )}
    />
  );
};

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
        onChange={(_: Event, newValue: number | number[]) => setPrice(newValue)}
        onChangeCommitted={(_, newValue: number | number[]) => {
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
        onChange={(_: Event, newValue: number | number[]) =>
          setRating(newValue)
        }
        onChangeCommitted={(_, newValue: number | number[]) => {
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
        onChange={(_: Event, newValue: number | number[]) =>
          setCapacity(newValue)
        }
        onChangeCommitted={(_, newValue: number | number[]) => {
          onChangeEnd(newValue);
        }}
      />
    </div>
  );
};

// CustomCheckBox
type CustomCheckboxGroupProps<T> = {
  options: T[];
  label: string;
  className: string;
  defaultValue?: T[];
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
  defaultValue?: boolean;
  onChange: (checked: boolean) => void;
};

export const CustomCheckbox = ({
  label,
  onChange,
  defaultValue,
}: CustomCheckboxProps) => {
  const cachedTheme = useThemeState();

  return (
    <div>
      <label className="flex gap-2 font-medium cursor-pointer">
        {label}
        <input
          type="checkbox"
          defaultChecked={defaultValue}
          onChange={(event) => onChange(event.target.checked)}
          className="hidden peer"
        />
        <span
          className={cn(
            cachedTheme?.borderColor,
            cachedTheme?.peerCheckedBg,
            cachedTheme?.peerCheckedText,
            'font-bold px-1 border rounded-lg transition-colors duration-300 '
          )}
        >
          ✓
        </span>
      </label>
    </div>
  );
};
