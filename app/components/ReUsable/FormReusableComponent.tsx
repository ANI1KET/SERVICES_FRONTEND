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
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';

import {
  AreaToSqft,
  LengthToFt,
  SqftToArea,
  FtToLength,
  BuiltAreaToSqft,
  SqftToBuiltArea,
} from '@/app/lib/utils/PropertyListingConversion';
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

//
type OptionType<T extends FieldValues, K extends FieldPath<T>> = PathValue<
  T,
  K
> extends Array<infer U>
  ? U
  : PathValue<T, K>;

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
  onChange?: (value: OptionType<T, K> | null) => void;
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
            if (onChange) onChange(newValue);
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

// Dynamic Slider
type DynamicSliderProps = {
  min: number;
  max: number;
  step: number;
  label: string;
  defaultValue?: number | number[];
  onChangeEnd: (value: number | number[]) => void;
};

export const DynamicSlider: React.FC<DynamicSliderProps> = ({
  min,
  max,
  step,
  label,
  onChangeEnd,
  defaultValue,
}) => {
  const cachedTheme = useThemeState();
  const [range, setRange] = useState<number[] | number>(
    defaultValue || [min, max]
  );

  return (
    <>
      <label className="block font-medium">{label}</label>
      <Slider
        min={min}
        max={max}
        step={step}
        value={range}
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
        getAriaLabel={() => `${label}`}
        getAriaValueText={(value) => `${value}`}
        valueLabelFormat={(value) => `Rs.${value}`}
        onChange={(_: Event, newValue: number | number[]) => setRange(newValue)}
        onChangeCommitted={(_, newValue: number | number[]) => {
          onChangeEnd(newValue);
        }}
      />
    </>
  );
};

// Price Slider
type PriceSliderProps = {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number | number[];
  onChangeEnd: (value: number | number[]) => void;
};

export const PriceSlider: React.FC<PriceSliderProps> = ({
  min = 0,
  step = 500,
  onChangeEnd,
  max = 100000,
  defaultValue,
}) => {
  const cachedTheme = useThemeState();
  const [price, setPrice] = useState<number[] | number>(
    defaultValue ?? [min, max]
  );

  return (
    <React.Fragment>
      <label className="block font-medium">Price</label>

      <div className="pl-2">
        <Slider
          min={min}
          max={max}
          step={step}
          value={price}
          sx={{
            width: '98%',
            color: 'black',
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
          onChange={(_: Event, newValue: number | number[]) =>
            setPrice(newValue)
          }
          onChangeCommitted={(_, newValue: number | number[]) => {
            onChangeEnd(newValue);
          }}
        />
      </div>
    </React.Fragment>
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

//
type PropertyUnitKey = 'area' | 'plotWidth' | 'plotLength' | 'builtUpArea';

const PropertyUnitsFunction = {
  area: AreaToSqft,
  plotWidth: LengthToFt,
  plotLength: LengthToFt,
  builtUpArea: BuiltAreaToSqft,
};

// SELECT INPUT Component
type SelectInputFieldProps<
  T extends FieldValues,
  K extends FieldPath<T>,
  O extends string
> = {
  id: K;
  options: O[];
  label: string;
  errors: FieldErrors<T>;
  trigger: UseFormTrigger<T>;
  register: UseFormRegister<T>;
  rules: StrictRegisterOptions<T, K>;
  handleEnterPress?: React.KeyboardEventHandler<HTMLInputElement>;
};

export const SelectInputField = <
  T extends FieldValues,
  K extends FieldPath<T>,
  O extends string
>({
  id,
  label,
  rules,
  errors,
  trigger,
  options,
  register,
  handleEnterPress,
}: SelectInputFieldProps<T, K, O>) => {
  const [numPart, setNumPart] = useState('');
  const [unitPart, setUnitPart] = useState<O | ''>('');

  const { name, ref, onChange, onBlur } = register(id, {
    ...(rules as RegisterOptions<T, K>),
    validate: () => {
      if (!numPart) return 'Enter a number';
      if (!unitPart) return 'Select a unit';
      return true;
    },
  });

  useEffect(() => {
    if (numPart && unitPart) {
      const unitValue = PropertyUnitsFunction[id as PropertyUnitKey](
        parseFloat(numPart),
        unitPart
      );
      onChange({ target: { name, value: unitValue } });
    }
  }, [id, name, numPart, unitPart, onChange]);

  return (
    <div className="">
      <label htmlFor={`${String(id)}-num`} className="block font-medium">
        {label}
      </label>

      <div className="flex w-1/3 ">
        <input
          min={1}
          step={0.1}
          type="number"
          value={numPart}
          onBlur={() => {
            trigger(id);
            onBlur({ target: { name } });
          }}
          id={`${String(id)}-num`}
          onKeyDown={handleEnterPress}
          className="w-24 p-1 border rounded "
          onChange={(e) => setNumPart(e.target.value)}
        />

        <Autocomplete<O>
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

// SliderSelect
type SliderSelectProps<
  T extends FieldValues,
  K extends FieldPath<T>,
  O extends string
> = {
  id: K;
  options: O[];
  label: string;
  sliderMin?: number;
  sliderMax?: number;
  sliderStep?: number;
  register: UseFormRegister<T>;
};

export const SliderSelect = <
  T extends FieldValues,
  K extends FieldPath<T>,
  O extends string
>({
  id,
  label,
  options,
  register,
  sliderMin = 1,
  sliderStep = 1,
  sliderMax = 10000,
}: SliderSelectProps<T, K, O>) => {
  const cachedTheme = useThemeState();
  const [unitPart, setUnitPart] = useState<O | ''>('');
  const [numPart, setNumPart] = useState<number>(sliderMin);

  const { name, ref, onChange } = register(id);

  useEffect(() => {
    if (numPart && unitPart) {
      const unitValue = PropertyUnitsFunction[id as PropertyUnitKey](
        numPart,
        unitPart
      );
      onChange({ target: { name, value: unitValue } });
    } else {
      onChange({ target: { name, value: undefined } });
    }
  }, [id, name, numPart, unitPart, onChange]);

  return (
    <div className="w-full">
      <div className="flex items-center">
        <label
          htmlFor={String(id)}
          className="w-0 font-medium whitespace-nowrap"
        >
          {label}
        </label>

        <div className="flex-1 flex justify-center">
          <Autocomplete<O>
            options={options}
            value={unitPart || null}
            disableClearable={true as false}
            onChange={(_, newUnit) => setUnitPart(newUnit || '')}
            renderInput={(params) => (
              <TextField
                {...params}
                inputRef={ref}
                placeholder="Unit"
                sx={{
                  width: 'auto',
                  minWidth: '100px',
                  '& .MuiOutlinedInput-root': {
                    height: '25px',
                  },
                }}
              />
            )}
          />
        </div>
      </div>

      <Slider
        min={sliderMin}
        max={sliderMax}
        value={numPart}
        step={sliderStep}
        valueLabelDisplay="auto"
        sx={{
          width: '100%',
          color: 'black',
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
        onChange={(_, value) => {
          if (typeof value === 'number') setNumPart(value);
        }}
      />
    </div>
  );
};

// SliderSelect
type SliderSelectOutputProps<
  T extends FieldValues,
  K extends FieldPath<T>,
  O extends string
> = {
  label: K;
  options: O[];
  sliderMin: number;
  sliderMax: number;
  sliderStep: number;
  // defaultValue?: number | number[];
  onChange: (selectedValues: number) => void;
};

export const SliderSelectOutput = <
  T extends FieldValues,
  K extends FieldPath<T>,
  O extends string
>({
  label,
  options,
  onChange,
  sliderMax,
  sliderMin,
  sliderStep,
}: SliderSelectOutputProps<T, K, O>) => {
  const cachedTheme = useThemeState();
  const [unitPart, setUnitPart] = useState<O | ''>('');
  const [numPart, setNumPart] = useState<number>(sliderMin);

  return (
    <div className="w-full">
      <div className="flex items-center">
        <span className="w-0 font-medium whitespace-nowrap">
          {label.charAt(0).toUpperCase() + label.slice(1)}
        </span>

        <div className="flex-1 flex justify-center">
          <Autocomplete<O>
            options={options}
            value={unitPart || null}
            disableClearable={true as false}
            onChange={(_, newUnit) => setUnitPart(newUnit || '')}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Unit"
                sx={{
                  width: 'auto',
                  minWidth: '100px',
                  '& .MuiOutlinedInput-root': {
                    height: '25px',
                  },
                }}
              />
            )}
          />
        </div>
      </div>

      <Slider
        min={sliderMin}
        max={sliderMax}
        value={numPart}
        step={sliderStep}
        valueLabelDisplay="auto"
        sx={{
          width: '100%',
          color: 'black',
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
        onChange={(_, value) => {
          if (typeof value === 'number') setNumPart(value);
        }}
        onChangeCommitted={(_, newValue: number | number[]) => {
          if (unitPart) {
            const unitValue = PropertyUnitsFunction[label as PropertyUnitKey](
              newValue as number,
              unitPart
            );

            onChange(unitValue);
          }
        }}
      />
    </div>
  );
};

//
const PropertyUnitsMethod = {
  area: SqftToArea,
  plotWidth: FtToLength,
  plotLength: FtToLength,
  builtUpArea: SqftToBuiltArea,
};

const UnitPart = {
  area: 'sqft',
  plotWidth: 'ft',
  plotLength: 'ft',
  builtUpArea: 'sqft',
};

// SelectCoversion
type SelectCoversionProps<O extends string> = {
  options: O[];
  value: number;
  maxWidth?: string;
  label: PropertyUnitKey;
};

export const SelectCoversion = <O extends string>({
  label,
  value,
  options,
  maxWidth,
}: SelectCoversionProps<O>) => {
  const [convertedValue, setConvertedValue] = useState(value);
  const [unitPart, setUnitPart] = useState<O | ''>(UnitPart[label] as O);

  const convertValue = (unitValue: string) => {
    const convertedValue = PropertyUnitsMethod[label](value, unitValue);
    setConvertedValue(convertedValue);
  };
  return (
    <div className="flex items-center">
      {convertedValue}

      <div onClick={(e) => e.stopPropagation()}>
        <Autocomplete<O>
          options={options}
          value={unitPart || null}
          disableClearable={true as false}
          onChange={(_, newUnit) => {
            const unitValue = newUnit || '';
            setUnitPart(unitValue);
            convertValue(unitValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Unit"
              sx={{
                width: 'auto',
                maxWidth: maxWidth ?? '100px',
                '& .MuiOutlinedInput-root': {
                  height: '30px',
                },
                '& fieldset': {
                  border: 'none',
                },
                '&:hover fieldset': {
                  border: 'none',
                },
                '&.Mui-focused fieldset': {
                  border: 'none',
                },
              }}
            />
          )}
        />
      </div>
    </div>
  );
};
