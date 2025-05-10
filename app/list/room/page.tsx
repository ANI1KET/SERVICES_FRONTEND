'use client';

import { useState } from 'react';
import { Role } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  roomType,
  roomAmenities,
  furnishingStatus,
} from '@/app/lib/scalableComponents';
import {
  FileInput,
  InputField,
  RadioGroup,
  CheckboxGroup,
  OptionalInputField,
} from '@/app/components/ReUsable/FormReusableComponent';
import { upload_Video } from '../uploadUtils';
import { cn } from '@/app/lib/utils/tailwindMerge';
import { SubmitRoomDetails, upload_Images } from '../ServerAction';
import { useThemeState } from '@/app/providers/reactqueryProvider';
import { RoomWithMedia, RoomWithMediaUrl } from '@/app/types/types';

const Room = () => {
  const router = useRouter();
  const cachedTheme = useThemeState();
  const queryClient = useQueryClient();
  const { data: session, status } = useSession();
  const [isComplete, setIsComplete] = useState(false);

  const {
    reset,
    watch,
    trigger,
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
  } = useForm<RoomWithMedia>({
    defaultValues: {
      videos: null,
      amenities: [],
      direction: null,
    },
  });

  const { mutate } = useMutation({
    mutationFn: (data: RoomWithMediaUrl) =>
      SubmitRoomDetails({
        ...data,
      }),
    onSuccess: (response) => {
      queryClient.setQueryData(['CategoryDetails', 'room'], response);
      reset();
      setIsComplete(false);
      router.push(`/listed/room/${btoa(response.id)}`);
    },
    onError: (error) => {
      setIsComplete(false);
      console.error('Mutation failed:', error);
    },
  });

  const handleEnterPress = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const form = event.currentTarget.form;
      if (form) {
        const formElements = Array.from(form.elements) as HTMLElement[];
        const currentIndex = formElements.indexOf(event.currentTarget);
        const nextElement = formElements[currentIndex + 1];
        if (nextElement) {
          (nextElement as HTMLElement).focus();
        }
      }
    }
  };

  const onSubmit = async (data: RoomWithMedia) => {
    if (status === 'unauthenticated') return;
    setIsComplete(true);

    data.city =
      data.city.charAt(0).toUpperCase() + data.city.slice(1).toLowerCase();
    data.location =
      data.location.charAt(0).toUpperCase() +
      data.location.slice(1).toLowerCase();
    if (!data.roomtype)
      data.roomtype = `${data.bedroom > 0 ? data.bedroom : ''}B${
        data.hall > 0 ? 'H' : ''
      }${data.kitchen > 0 ? 'K' : ''}`;

    try {
      const [uploadVideoUrl, uploadImageUrls] = await Promise.allSettled([
        upload_Video(data.videos),
        upload_Images('room', data.photos),
      ]);

      const ImageUrls =
        uploadImageUrls.status === 'fulfilled' ? uploadImageUrls.value : [];
      const VideoUrl =
        uploadVideoUrl.status === 'fulfilled' && uploadVideoUrl.value
          ? `https://www.youtube.com/embed/${uploadVideoUrl.value}`
          : null;

      mutate({
        ...data,
        photos: ImageUrls,
        videos: VideoUrl ?? null,
        postedBy: session?.user.role as Role,
        listerId: session?.user.userId as string,
      });
    } catch (error) {
      console.error(
        error instanceof Error ? error.message : 'An unknown error occurred'
      );
    }
  };
  return (
    <div className="ml-[12vw] w-[70vw] max-sm:w-full max-sm:ml-0">
      <h2
        className={cn(
          cachedTheme?.textColor,
          'text-xl text-center font-bold mb-1'
        )}
      >
        List Room
      </h2>

      <form
        onSubmit={handleFormSubmit(onSubmit)}
        className={cn(
          cachedTheme?.bg,
          cachedTheme?.textColor,
          cachedTheme?.borderColor,
          'space-y-6 p-2 border rounded-lg shadow-lg'
        )}
      >
        <div className="grid max-xsm:grid-cols-1 max-sm:grid-cols-2 grid-cols-3 gap-1">
          <InputField<RoomWithMedia, 'name'>
            id="name"
            label="Name"
            trigger={trigger}
            register={register}
            rules={{
              required: 'Enter your name',
            }}
            errors={errors}
            handleEnterPress={handleEnterPress}
          />
          <InputField<RoomWithMedia, 'primaryContact'>
            id="primaryContact"
            label="Contact"
            trigger={trigger}
            register={register}
            rules={{
              required: 'Enter your number',
              pattern: {
                value: /^\d{10}$/,
                message: 'The number must be exactly 10 digits',
              },
            }}
            errors={errors}
            handleEnterPress={handleEnterPress}
          />
          <InputField<RoomWithMedia, 'ownerContact'>
            id="ownerContact"
            trigger={trigger}
            register={register}
            label="Owner Contact"
            rules={{
              required: 'Enter your number',
              pattern: {
                value: /^\d{10}$/,
                message: 'The number must be exactly 10 digits',
              },
            }}
            errors={errors}
            handleEnterPress={handleEnterPress}
          />
          <InputField<RoomWithMedia, 'city'>
            id="city"
            label="City"
            trigger={trigger}
            register={register}
            rules={{
              required: 'Enter the city',
            }}
            errors={errors}
            handleEnterPress={handleEnterPress}
          />
          <InputField<RoomWithMedia, 'location'>
            id="location"
            label="Location"
            trigger={trigger}
            register={register}
            rules={{
              required: 'Enter the room location',
            }}
            errors={errors}
            handleEnterPress={handleEnterPress}
          />

          <OptionalInputField<RoomWithMedia, 'direction'>
            id="direction"
            label="Direction"
            register={register}
            rules={{
              maxLength: {
                value: 30,
                message: 'Direction should not exceed 100 characters',
              },
            }}
            errors={errors}
            handleEnterPress={handleEnterPress}
          />

          <InputField<RoomWithMedia, 'price'>
            id="price"
            step={0.01}
            label="Price"
            type="number"
            trigger={trigger}
            register={register}
            rules={{
              required: 'Enter the room rent price',
            }}
            errors={errors}
            handleEnterPress={handleEnterPress}
          />
          <InputField<RoomWithMedia, 'mincapacity'>
            type="number"
            id="mincapacity"
            trigger={trigger}
            register={register}
            label="Min Capacity"
            rules={{
              valueAsNumber: true,
              required: 'Enter minimum capacity of person',
            }}
            errors={errors}
            handleEnterPress={handleEnterPress}
          />
          <InputField<RoomWithMedia, 'maxcapacity'>
            type="number"
            id="maxcapacity"
            trigger={trigger}
            register={register}
            label="Max Capacity"
            rules={{
              valueAsNumber: true,
              required: 'Enter maximum capacity of person',
              validate: (value) =>
                value > Number(watch('mincapacity')) ||
                'Max capacity must be greater than min capacity',
            }}
            errors={errors}
            handleEnterPress={handleEnterPress}
          />
          <InputField<RoomWithMedia, 'bedroom'>
            id="bedroom"
            type="number"
            label="Bedroom"
            trigger={trigger}
            register={register}
            rules={{
              valueAsNumber: true,
              required: 'Bedroom is required',
            }}
            errors={errors}
            handleEnterPress={handleEnterPress}
          />
          <InputField<RoomWithMedia, 'hall'>
            id="hall"
            label="Hall"
            type="number"
            trigger={trigger}
            register={register}
            rules={{
              valueAsNumber: true,
              required: 'Hall is required',
            }}
            errors={errors}
            handleEnterPress={handleEnterPress}
          />
          <InputField<RoomWithMedia, 'kitchen'>
            id="kitchen"
            type="number"
            label="Kitchen"
            trigger={trigger}
            register={register}
            rules={{
              valueAsNumber: true,
              required: 'Kitchen is required',
            }}
            errors={errors}
            handleEnterPress={handleEnterPress}
          />
          <InputField<RoomWithMedia, 'bathroom'>
            type="number"
            id="bathroom"
            label="Bathroom"
            trigger={trigger}
            register={register}
            rules={{
              valueAsNumber: true,
              required: 'Bathroom is required',
            }}
            errors={errors}
            handleEnterPress={handleEnterPress}
          />
        </div>

        <RadioGroup<RoomWithMedia, 'roomtype'>
          id="roomtype"
          errors={errors}
          label="Room Type"
          options={roomType}
          register={register}
          handleEnterPress={handleEnterPress}
        />

        <RadioGroup<RoomWithMedia, 'furnishingStatus'>
          register={register}
          id="furnishingStatus"
          label="Furnishing Status"
          options={furnishingStatus}
          rules={{
            required: 'Furnishing status is required',
          }}
          errors={errors}
          handleEnterPress={handleEnterPress}
        />

        <CheckboxGroup<RoomWithMedia, 'amenities'>
          id="amenities"
          label="Amenities"
          register={register}
          options={roomAmenities}
        />

        <FileInput<RoomWithMedia, 'photos'>
          id="photos"
          label="Photos"
          multiple={true}
          errors={errors}
          accept="image/*"
          register={register}
          rules={{
            required: 'At least one photo is required',
          }}
        />
        <FileInput<RoomWithMedia, 'videos'>
          id="videos"
          accept="video/*"
          register={register}
          label="Video (Optional)"
        />

        <button
          type="submit"
          disabled={isComplete || status === 'unauthenticated'}
          className={cn(
            cachedTheme?.activeBg,
            cachedTheme?.activeTextColor,
            `w-full py-2 px-4 rounded-md ${
              (isComplete || status === 'unauthenticated') &&
              'opacity-50 cursor-not-allowed'
            }`
          )}
        >
          {isComplete ? 'Listing...' : 'List'}
        </button>
      </form>
    </div>
  );
};

export default Room;
