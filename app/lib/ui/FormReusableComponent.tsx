import { FieldErrors, UseFormRegister } from "react-hook-form";

type Aminities = "PARKING" | "WIFI";

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
  roomtype: "ONE_BHK" | "TWO_BHK" | "FLAT";
  furnishingStatus: "FURNISHED" | "SEMIFURNISHED" | "UNFURNISHED";
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
    <label className="block font-medium mb-2">{label}</label>
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
    <label className="block font-medium mb-2">{label}</label>
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
