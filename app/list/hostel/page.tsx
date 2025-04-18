'use client';

import { Role } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  roomType,
  amenities,
  furnishingStatus,
} from '@/app/lib/scalableComponents';
import {
  FileInput,
  InputField,
  RadioGroup,
  OptionalField,
  CheckboxGroup,
} from '@/app//lib/ui/FormReusableComponent';
import { cn } from '@/app/lib/utils/tailwindMerge';
import { SubmitRoomDetails } from '../ServerAction';
import { upload_Images, upload_Video } from '../uploadUtils';
import { useThemeState } from '@/app/providers/reactqueryProvider';
import { RoomWithMedia, RoomWithMediaUrl } from '@/app/types/types';

const Hostel = () => {
  const router = useRouter();
  const cachedTheme = useThemeState();
  const queryClient = useQueryClient();
  const { data: session, status } = useSession();

  const {
    // reset,
    watch,
    trigger,
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RoomWithMedia>({
    defaultValues: {
      photos: [],
      videos: null,
      amenities: [],
      direction: null,
    },
  });

  const roomCreation = useMutation({
    mutationFn: (
      data: RoomWithMediaUrl & { postedBy: Role; listerId: string }
    ) =>
      SubmitRoomDetails({
        ...data,
      }),
    onSuccess: (response) => {
      queryClient.setQueryData(['CategoryDetails', 'room'], response);
      router.push(`/listed/room/${btoa(response.id)}`);
      // reset();
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
    if (status === 'unauthenticated') return;

    data.city =
      data.city.charAt(0).toUpperCase() + data.city.slice(1).toLowerCase();
    if (!data.roomtype)
      data.roomtype = `${data.bedroom > 0 ? data.bedroom : ''}B${
        data.hall > 0 ? 'H' : ''
      }${data.kitchen > 0 ? 'K' : ''}`;

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
          ? `https://www.youtube.com/embed/${uploadVideoUrlResult.value}`
          : null;

      roomCreation.mutate({
        ...data,
        photos: uploadImageUrls,
        videos: uploadVideoUrl ?? null,
        postedBy: session?.user.role as Role,
        listerId: session?.user.userId as string,
      });
    } catch (error) {
      console.log('object!!!');
      alert(
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
          <InputField
            id="name"
            label="Name"
            register={register('name', {
              required: 'Enter your name',
              onBlur: () => trigger('name'),
            })}
            errors={errors}
            handleEnterPress={handleEnterPress}
          />
          <InputField
            id="primaryContact"
            label="Contact"
            register={register('primaryContact', {
              required: 'Enter your number',
              pattern: {
                value: /^\d{10}$/,
                message: 'The number must be exactly 10 digits',
              },
              onBlur: () => trigger('primaryContact'),
            })}
            errors={errors}
            handleEnterPress={handleEnterPress}
          />
          <InputField
            id="ownerContact"
            label="Owner Contact"
            register={register('ownerContact', {
              required: 'Enter your number',
              pattern: {
                value: /^\d{10}$/,
                message: 'The number must be exactly 10 digits',
              },
              onBlur: () => trigger('ownerContact'),
            })}
            errors={errors}
            handleEnterPress={handleEnterPress}
          />
          <InputField
            id="city"
            label="City"
            register={register('city', {
              required: 'Enter the city',
              onBlur: () => trigger('city'),
            })}
            errors={errors}
            handleEnterPress={handleEnterPress}
          />
          <InputField
            id="location"
            label="Location"
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
            id="mincapacity"
            type="number"
            label="Min Capacity"
            register={register('mincapacity', {
              required: 'Enter minimum capacity of person',
              valueAsNumber: true,
              onBlur: () => trigger('mincapacity'),
            })}
            errors={errors}
            handleEnterPress={handleEnterPress}
          />
          <InputField
            id="maxcapacity"
            type="number"
            label="Max Capacity"
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

          <InputField
            type="number"
            id="bedroom"
            label="Bedroom"
            register={register('bedroom', {
              valueAsNumber: true,
              required: 'Bedroom is required',
              onBlur: () => trigger('roomtype'),
            })}
            errors={errors}
            handleEnterPress={handleEnterPress}
          />

          <InputField
            type="number"
            id="hall"
            label="Hall"
            register={register('hall', {
              valueAsNumber: true,
              required: 'Hall is required',
              onBlur: () => trigger('roomtype'),
            })}
            errors={errors}
            handleEnterPress={handleEnterPress}
          />

          <InputField
            type="number"
            id="kitchen"
            label="Kitchen"
            register={register('kitchen', {
              valueAsNumber: true,
              required: 'Kitchen is required',
              onBlur: () => trigger('roomtype'),
            })}
            errors={errors}
            handleEnterPress={handleEnterPress}
          />

          <InputField
            type="number"
            id="bathroom"
            label="Bathroom"
            register={register('bathroom', {
              valueAsNumber: true,
              required: 'Bathroom is required',
              onBlur: () => trigger('roomtype'),
            })}
            errors={errors}
            handleEnterPress={handleEnterPress}
          />
        </div>

        <RadioGroup
          label="Room Type"
          options={roomType}
          register={register('roomtype')}
          handleEnterPress={handleEnterPress}
          error={errors.roomtype?.message}
        />

        <CheckboxGroup
          label="Amenities"
          options={amenities}
          register={register('amenities')}
        />

        <RadioGroup
          label="Furnishing Status"
          handleEnterPress={handleEnterPress}
          register={register('furnishingStatus', {
            required: 'Furnishing status is required',
            onBlur: () => trigger('furnishingStatus'),
          })}
          error={errors.furnishingStatus?.message}
          options={furnishingStatus}
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
          disabled={isSubmitting || status === 'unauthenticated'}
          className={cn(
            cachedTheme?.activeBg,
            cachedTheme?.activeTextColor,
            `w-full py-2 px-4 rounded-md ${
              (isSubmitting || status === 'unauthenticated') &&
              'opacity-50 cursor-not-allowed'
            }`
          )}
        >
          {isSubmitting ? 'Listing...' : 'List'}
        </button>
      </form>
    </div>
  );
};

export default Hostel;
