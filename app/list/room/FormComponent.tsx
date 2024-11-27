"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

import {
  Room,
  InputField,
  OptionalField,
  RadioGroup,
  CheckboxGroup,
  FileInput,
} from "@/app/lib/ui/FormReusableComponent";

type FormComponentProps = {
  handleSubmit: (formData: Room) => Promise<Room>;
};

const FormComponent = ({ handleSubmit }: FormComponentProps) => {
  const [listedRoomData, setListedRoomData] = useState<Room[]>();

  const {
    watch,
    reset,
    trigger,
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Room>({
    defaultValues: {
      direction: null,
      photos: [],
      videos: null,
      amenities: [],
    },
  });

  const handleEnterPress = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (event.key === "Enter") {
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

  const onSubmit = async (data: Room) => {
    data.city =
      data.city.charAt(0).toUpperCase() + data.city.slice(1).toLowerCase();
    try {
      const dataa = await handleSubmit(data);
      setListedRoomData((prev) => (prev ? [...prev, dataa] : [data]));
      // reset();
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  };
  console.log(listedRoomData);

  return (
    <>
      <form
        onSubmit={handleFormSubmit(onSubmit)}
        className="space-y-6 p-2 border rounded-lg shadow-lg bg-white"
      >
        <div className="grid max-sm:grid-cols-1 grid-cols-2 gap-1">
          <InputField
            label="Name"
            id="name"
            register={register("name", {
              required: "Enter your name",
              onBlur: () => trigger("name"),
            })}
            errors={errors}
            handleEnterPress={handleEnterPress}
          />
          <InputField
            label="Number"
            id="roomNumber"
            register={register("roomNumber", {
              required: "Enter your number",
              pattern: {
                value: /^\d{10}$/,
                message: "The number must be exactly 10 digits",
              },
              onBlur: () => trigger("roomNumber"),
            })}
            errors={errors}
            handleEnterPress={handleEnterPress}
          />
          <InputField
            label="City"
            id="city"
            register={register("city", {
              required: "Enter the city",
              onBlur: () => trigger("city"),
            })}
            errors={errors}
            handleEnterPress={handleEnterPress}
          />
          <InputField
            label="Location"
            id="location"
            register={register("location", {
              required: "Enter the room location",
              onBlur: () => trigger("location"),
            })}
            errors={errors}
            handleEnterPress={handleEnterPress}
          />

          <OptionalField
            id="direction"
            label="Direction"
            register={register("direction")}
            handleEnterPress={handleEnterPress}
          />

          <InputField
            label="Price"
            id="price"
            type="number"
            register={register("price", {
              required: "Enter the room rent price",
              onBlur: () => trigger("price"),
            })}
            errors={errors}
            handleEnterPress={handleEnterPress}
          />
          <InputField
            label="Min Capacity"
            id="mincapacity"
            type="number"
            register={register("mincapacity", {
              required: "Enter minimum capacity of person",
              valueAsNumber: true,
              onBlur: () => trigger("mincapacity"),
            })}
            errors={errors}
            handleEnterPress={handleEnterPress}
          />
          <InputField
            label="Max Capacity"
            id="maxcapacity"
            type="number"
            register={register("maxcapacity", {
              required: "Enter maximum capacity of person",
              valueAsNumber: true,
              validate: (value) =>
                value > Number(watch("mincapacity")) ||
                "Max capacity must be greater than min capacity",
              onBlur: () => trigger("maxcapacity"),
            })}
            errors={errors}
            handleEnterPress={handleEnterPress}
          />
        </div>

        <RadioGroup
          label="Room Type"
          options={["ONE_BHK", "TWO_BHK", "FLAT"]}
          register={register("roomtype", {
            required: "Room type is required",
            onBlur: () => trigger("roomtype"),
          })}
          handleEnterPress={handleEnterPress}
          error={errors.roomtype?.message}
        />

        <CheckboxGroup
          label="Amenities"
          options={["PARKING", "WIFI"]}
          register={register("amenities")}
        />

        <RadioGroup
          label="Furnishing Status"
          options={["FURNISHED", "SEMIFURNISHED", "UNFURNISHED"]}
          register={register("furnishingStatus", {
            required: "Furnishing status is required",
            onBlur: () => trigger("furnishingStatus"),
          })}
          handleEnterPress={handleEnterPress}
          error={errors.furnishingStatus?.message}
        />

        <FileInput
          label="Photos"
          id="photos"
          register={register("photos", {
            required: "At least one photo is required",
          })}
          multiple={true}
          accept="image/*"
          error={errors.photos?.message}
        />
        <FileInput
          label="Videos (Optional)"
          id="videos"
          register={register("videos")}
          accept="video/*"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md ${
            isSubmitting && "opacity-50 cursor-not-allowed"
          }`}
        >
          {isSubmitting ? "Listing..." : "List"}
        </button>
      </form>

      {listedRoomData && (
        <div className="mt-2 font-bold text-xl">
          <h2>Listed Rooms</h2>
          <div className="space-y-6 mt-4">
            {listedRoomData.map((roomData, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-full"
              >
                <div className="flex flex-col w-full">
                  {/* Room Image */}
                  {roomData.photos && roomData.photos.length > 0 && (
                    <div className="w-full mb-4">
                      <img
                        src={URL.createObjectURL(roomData.photos[0])}
                        alt={`Room ${index}`}
                        className="w-full h-80 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  {/* Room Details */}
                  <div className="w-full">
                    {/* Room Name */}
                    <h3 className="text-lg font-semibold">{roomData.name}</h3>

                    {/* Room Type and Capacity */}
                    <p className="text-sm text-gray-500">
                      {roomData.roomtype} - Capacity: {roomData.mincapacity} to{" "}
                      {roomData.maxcapacity}
                    </p>

                    {/* Price */}
                    <p className="text-xl font-semibold text-green-600">
                      {roomData.price} USD
                    </p>

                    {/* Location */}
                    <p className="text-sm text-gray-500">
                      Location: {roomData.location}
                    </p>

                    {/* Direction */}
                    <p className="text-sm text-gray-500">
                      Direction: {roomData.direction}
                    </p>

                    {/* Furnishing Status */}
                    <p className="text-sm text-gray-500">
                      Furnishing: {roomData.furnishingStatus}
                    </p>

                    {/* Amenities */}
                    {roomData.amenities && roomData.amenities.length > 0 && (
                      <ul className="mt-2 text-sm text-gray-500">
                        {roomData.amenities.map((amenity, idx) => (
                          <li key={idx}>{amenity}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default FormComponent;
