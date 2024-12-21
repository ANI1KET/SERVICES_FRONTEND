'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  FileInput,
  InputField,
  RadioGroup,
  OptionalField,
  CheckboxGroup,
} from '@/app//lib/ui/FormReusableComponent';
import { SubmitRoomDetails } from '../ServerAction';
import { upload_Images, upload_Video } from '../uploadUtils';
import { RoomWithMedia, RoomWithMediaUrl } from '@/app/types/types';

const Room = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    watch,
    reset,
    trigger,
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RoomWithMedia>({
    defaultValues: {
      direction: null,
      photos: [],
      videos: null,
      amenities: [],
    },
  });

  const roomCreation = useMutation({
    mutationFn: (data: RoomWithMediaUrl) =>
      SubmitRoomDetails({
        ...data,
      }),
    onSuccess: (response) => {
      queryClient.setQueryData(['roomDetails'], response);
      reset();
      router.push(`/listed/room/${btoa(response.id)}`);
    },
    onError: (error) => {
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
    data.city =
      data.city.charAt(0).toUpperCase() + data.city.slice(1).toLowerCase();

    try {
      const [uploadImageUrlsResult, uploadVideoUrlResult] =
        await Promise.allSettled([
          upload_Images(data.photos),
          upload_Video(data.videos),
        ]);

      const uploadImageUrls =
        uploadImageUrlsResult.status === 'fulfilled'
          ? uploadImageUrlsResult.value
          : [];
      const uploadVideoUrl =
        uploadVideoUrlResult.status === 'fulfilled' &&
        uploadVideoUrlResult.value
          ? `https://www.youtube.com/watch?v=${uploadVideoUrlResult.value}`
          : null;

      roomCreation.mutate({
        ...data,
        photos: uploadImageUrls,
        videos: uploadVideoUrl ?? null,
      });
    } catch (error) {
      alert(
        error instanceof Error ? error.message : 'An unknown error occurred'
      );
    }
  };

  return (
    <div className="">
      <h2 className="text-xl font-bold mb-1">List Room</h2>

      <form
        onSubmit={handleFormSubmit(onSubmit)}
        className="space-y-6 p-2 border rounded-lg shadow-lg bg-white"
      >
        <div className="grid max-sm:grid-cols-1 grid-cols-2 gap-1">
          <InputField
            label="Name"
            id="name"
            register={register('name', {
              required: 'Enter your name',
              onBlur: () => trigger('name'),
            })}
            errors={errors}
            handleEnterPress={handleEnterPress}
          />
          <InputField
            label="Number"
            id="roomNumber"
            register={register('roomNumber', {
              required: 'Enter your number',
              pattern: {
                value: /^\d{10}$/,
                message: 'The number must be exactly 10 digits',
              },
              onBlur: () => trigger('roomNumber'),
            })}
            errors={errors}
            handleEnterPress={handleEnterPress}
          />
          <InputField
            label="City"
            id="city"
            register={register('city', {
              required: 'Enter the city',
              onBlur: () => trigger('city'),
            })}
            errors={errors}
            handleEnterPress={handleEnterPress}
          />
          <InputField
            label="Location"
            id="location"
            register={register('location', {
              required: 'Enter the room location',
              onBlur: () => trigger('location'),
            })}
            errors={errors}
            handleEnterPress={handleEnterPress}
          />

          <OptionalField
            id="direction"
            label="Direction"
            register={register('direction')}
            handleEnterPress={handleEnterPress}
          />

          <InputField
            id="price"
            step={0.01}
            label="Price"
            type="number"
            register={register('price', {
              required: 'Enter the room rent price',
              onBlur: () => trigger('price'),
            })}
            errors={errors}
            handleEnterPress={handleEnterPress}
          />
          <InputField
            label="Min Capacity"
            id="mincapacity"
            type="number"
            register={register('mincapacity', {
              required: 'Enter minimum capacity of person',
              valueAsNumber: true,
              onBlur: () => trigger('mincapacity'),
            })}
            errors={errors}
            handleEnterPress={handleEnterPress}
          />
          <InputField
            label="Max Capacity"
            id="maxcapacity"
            type="number"
            register={register('maxcapacity', {
              required: 'Enter maximum capacity of person',
              valueAsNumber: true,
              validate: (value) =>
                value > Number(watch('mincapacity')) ||
                'Max capacity must be greater than min capacity',
              onBlur: () => trigger('maxcapacity'),
            })}
            errors={errors}
            handleEnterPress={handleEnterPress}
          />
        </div>

        <RadioGroup
          label="Room Type"
          options={['ONE_BHK', 'TWO_BHK', 'FLAT']}
          register={register('roomtype', {
            required: 'Room type is required',
            onBlur: () => trigger('roomtype'),
          })}
          handleEnterPress={handleEnterPress}
          error={errors.roomtype?.message}
        />

        <CheckboxGroup
          label="Amenities"
          options={['PARKING', 'WIFI']}
          register={register('amenities')}
        />

        <RadioGroup
          label="Furnishing Status"
          options={['FURNISHED', 'SEMIFURNISHED', 'UNFURNISHED']}
          register={register('furnishingStatus', {
            required: 'Furnishing status is required',
            onBlur: () => trigger('furnishingStatus'),
          })}
          handleEnterPress={handleEnterPress}
          error={errors.furnishingStatus?.message}
        />

        <FileInput
          label="Photos"
          id="photos"
          register={register('photos', {
            required: 'At least one photo is required',
          })}
          multiple={true}
          accept="image/*"
          error={errors.photos?.message}
        />
        <FileInput
          label="Videos (Optional)"
          id="videos"
          register={register('videos')}
          accept="video/*"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-black text-white py-2 px-4 rounded-md ${
            isSubmitting && 'opacity-50 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? 'Listing...' : 'List'}
        </button>
      </form>
    </div>
  );
};

export default Room;
