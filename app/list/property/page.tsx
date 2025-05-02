'use client';

import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { PropertyType, Role } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  PropertyPlotWidth,
  PropertyWithMedia,
  PropertyPlotLength,
  PropertyWithMediaUrl,
} from '@/app/types/types';
import {
  propertyType,
  propertyArea,
  propertyAmenities,
  propertyPlotWidth,
  propertyHouseArea,
  propertyPlotLength,
  propertyNearByAreas,
} from '@/app/lib/scalableComponents';
import {
  FileInput,
  InputField,
  RadioGroup,
  CheckboxGroup,
  SelectInputField,
  OptionalInputField,
} from '@/app//lib/ui/FormReusableComponent';
import { upload_Video } from '../uploadUtils';
import { cn } from '@/app/lib/utils/tailwindMerge';
import { useThemeState } from '@/app/providers/reactqueryProvider';
import { SubmitPropertyDetails, upload_Images } from '../ServerAction';

const Room = () => {
  const router = useRouter();
  const cachedTheme = useThemeState();
  const queryClient = useQueryClient();
  const { data: session, status } = useSession();
  const [isComplete, setIsComplete] = useState(false);
  const [sharedUnit, setSharedUnit] = useState<
    PropertyPlotLength | PropertyPlotWidth
  >();

  const {
    reset,
    watch,
    trigger,
    register,
    // unregister,
    handleSubmit: handleFormSubmit,
    formState: { errors },
  } = useForm<PropertyWithMedia>({
    shouldUnregister: true,
    defaultValues: {
      video: null,
      amenities: [],
      nearbyAreas: [],
      direction: null,
    },
  });
  const listingType = watch('propertyType');
  const plotWidthValue = watch('plotWidth');
  const plotLengthValue = watch('plotLength');

  const { mutate } = useMutation({
    mutationFn: (data: PropertyWithMediaUrl) =>
      SubmitPropertyDetails({
        ...data,
      }),
    onSuccess: (response) => {
      queryClient.setQueryData(['CategoryDetails', 'property'], response);
      reset();
      setIsComplete(false);
      router.push(`/listed/property/${btoa(response.id)}`);
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

  const onSubmit = async (data: PropertyWithMedia) => {
    if (status === 'unauthenticated') return;
    setIsComplete(true);

    // if (listingType === PropertyType.House) {
    //   unregister(['plotWidth', 'plotLength']);
    // } else if (listingType === PropertyType.Land) {
    //   unregister([
    //     'floors',
    //     'bedrooms',
    //     'kitchens',
    //     'bathrooms',
    //     'amenities',
    //     'builtUpArea',
    //   ]);
    // }

    data.city =
      data.city.charAt(0).toUpperCase() + data.city.slice(1).toLowerCase();
    data.location =
      data.location.charAt(0).toUpperCase() +
      data.location.slice(1).toLowerCase();

    try {
      const [uploadVideoUrl, uploadImageUrls, uploadDocumentUrls] =
        await Promise.allSettled([
          upload_Video(data.video),
          upload_Images('property', data.photos),
          upload_Images('propertyDocument', data.documents),
        ]);

      const ImageUrls =
        uploadImageUrls.status === 'fulfilled' ? uploadImageUrls.value : [];
      const DocumentUrls =
        uploadDocumentUrls.status === 'fulfilled'
          ? uploadDocumentUrls.value
          : [];
      const VideoUrl =
        uploadVideoUrl.status === 'fulfilled' && uploadVideoUrl.value
          ? `https://www.youtube.com/embed/${uploadVideoUrl.value}`
          : null;

      mutate({
        ...data,
        photos: ImageUrls,
        documents: DocumentUrls,
        video: VideoUrl ?? null,
        postedBy: session?.user.role as Role,
        sellerId: session?.user.userId as string,
      });
    } catch (error) {
      console.error(
        error instanceof Error ? error.message : 'An unknown error occurred'
      );
    }
  };

  useEffect(() => {
    const match = (plotWidthValue || plotLengthValue || '').match(/[a-zA-Z]+/);
    const unit = match?.[0] as
      | undefined
      | PropertyPlotWidth
      | PropertyPlotLength;
    setSharedUnit(unit);
  }, [plotWidthValue, plotLengthValue]);
  return (
    <div className="ml-[12vw] w-[70vw] max-sm:w-full max-sm:ml-0">
      <h2
        className={cn(
          cachedTheme?.textColor,
          'text-xl text-center font-bold mb-1'
        )}
      >
        List Property
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
          <InputField<PropertyWithMedia, 'title'>
            id="title"
            label="Title"
            trigger={trigger}
            register={register}
            rules={{
              required: 'Enter title',
            }}
            errors={errors}
            handleEnterPress={handleEnterPress}
          />
          <InputField<PropertyWithMedia, 'primaryContact'>
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
          <InputField<PropertyWithMedia, 'ownerContact'>
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
          <InputField<PropertyWithMedia, 'city'>
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
          <InputField<PropertyWithMedia, 'location'>
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

          <OptionalInputField<PropertyWithMedia, 'direction'>
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

          <InputField<PropertyWithMedia, 'price'>
            id="price"
            step={0.01}
            label="Price"
            type="number"
            trigger={trigger}
            register={register}
            rules={{
              valueAsNumber: true,
              required: 'Enter the room rent price',
            }}
            errors={errors}
            handleEnterPress={handleEnterPress}
          />

          <SelectInputField<PropertyWithMedia, 'area'>
            id="area"
            label="Total Area"
            register={register}
            rules={{
              validate: (val: string) =>
                val && /\d/.test(val) && /[a-zA-Z]/.test(val)
                  ? true
                  : 'Enter total land area',
            }}
            errors={errors}
            trigger={trigger}
            options={propertyArea}
            handleEnterPress={handleEnterPress}
          />
        </div>

        <RadioGroup<PropertyWithMedia, 'propertyType'>
          id="propertyType"
          errors={errors}
          register={register}
          label="Property Type"
          options={propertyType}
          handleEnterPress={handleEnterPress}
          rules={{ required: 'Enter Property Type' }}
        />

        {listingType === PropertyType.Land && (
          <div className="grid max-xsm:grid-cols-1 max-sm:grid-cols-2 grid-cols-3 gap-1">
            <SelectInputField<PropertyWithMedia, 'plotWidth'>
              id="plotWidth"
              label="Land Width"
              register={register}
              rules={{
                validate: (val: string) =>
                  val && /\d/.test(val) && /[a-zA-Z]/.test(val)
                    ? true
                    : 'Enter a plot width and select unit',
              }}
              errors={errors}
              trigger={trigger}
              options={
                sharedUnit
                  ? propertyPlotWidth.filter((opt) => opt === sharedUnit)
                  : propertyPlotWidth
              }
              handleEnterPress={handleEnterPress}
            />

            <SelectInputField<PropertyWithMedia, 'plotLength'>
              id="plotLength"
              label="Land Length"
              register={register}
              rules={{
                validate: (val: string) =>
                  val && /\d/.test(val) && /[a-zA-Z]/.test(val)
                    ? true
                    : 'Enter a plot length and select unit',
              }}
              errors={errors}
              trigger={trigger}
              options={
                sharedUnit
                  ? propertyPlotLength.filter((opt) => opt === sharedUnit)
                  : propertyPlotLength
              }
              handleEnterPress={handleEnterPress}
            />
          </div>
        )}

        {listingType === PropertyType.House && (
          <>
            <div className="grid max-xsm:grid-cols-1 max-sm:grid-cols-2 grid-cols-3 gap-1">
              <SelectInputField<PropertyWithMedia, 'builtUpArea'>
                id="builtUpArea"
                label="Built Area"
                register={register}
                rules={{
                  validate: (val: string) =>
                    val && /\d/.test(val) && /[a-zA-Z]/.test(val)
                      ? true
                      : 'Enter House Built Area',
                }}
                errors={errors}
                trigger={trigger}
                options={propertyHouseArea}
                handleEnterPress={handleEnterPress}
              />

              <InputField<PropertyWithMedia, 'floors'>
                id="floors"
                label="Floor"
                type="number"
                trigger={trigger}
                register={register}
                rules={{
                  valueAsNumber: true,
                  required: 'Floor is required',
                }}
                errors={errors}
                handleEnterPress={handleEnterPress}
              />
              <InputField<PropertyWithMedia, 'bedrooms'>
                id="bedrooms"
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
              <InputField<PropertyWithMedia, 'kitchens'>
                id="kitchens"
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
              <InputField<PropertyWithMedia, 'bathrooms'>
                type="number"
                id="bathrooms"
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

            <CheckboxGroup<PropertyWithMedia, 'amenities'>
              id="amenities"
              label="Amenities"
              register={register}
              options={propertyAmenities}
            />
          </>
        )}

        <CheckboxGroup<PropertyWithMedia, 'nearbyAreas'>
          id="nearbyAreas"
          register={register}
          label="NearBy Areas"
          options={propertyNearByAreas}
        />

        <FileInput<PropertyWithMedia, 'photos'>
          id="photos"
          label="Photos"
          multiple={true}
          errors={errors}
          accept="image/*"
          register={register}
          rules={{
            required: 'At least one Photo is required',
          }}
        />
        <FileInput<PropertyWithMedia, 'documents'>
          id="documents"
          multiple={true}
          errors={errors}
          accept="image/*"
          register={register}
          label={`${listingType ?? ''} Documents`}
          rules={{
            required: 'At least one Document is required',
          }}
        />
        <FileInput<PropertyWithMedia, 'video'>
          id="video"
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
