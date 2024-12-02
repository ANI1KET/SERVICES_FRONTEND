"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

import {
  InputField,
  OptionalField,
  RadioGroup,
  CheckboxGroup,
  FileInput,
  RoomWithMedia,
  RoomWithMediaUrl,
} from "@/app//lib/ui/FormReusableComponent";
import {
  getImageResumableUploadUrl,
  getvideoResumableUploadUrl,
  SubmitRoomDetails,
  uploadChunkImage,
  uploadChunkVideo,
} from "./serverAction";

const Room = () => {
  const [listedRoomData, setListedRoomData] = useState<RoomWithMediaUrl[]>();

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

  const onSubmit = async (data: RoomWithMedia) => {
    // data.city =
    //   data.city.charAt(0).toUpperCase() + data.city.slice(1).toLowerCase();

    try {
      const image = data.photos[0];
      console.log(image.size / 1024);
      // const imageUploadResumableUrl = await getImageResumableUploadUrl({
      //   fileName: image.name,
      //   fileType: image.type,
      // });

      // const imageWorker = new Worker(
      //   new URL("@/app/lib/webWorker/ImageChunkWorker.ts", import.meta.url)
      // );

      // imageWorker.postMessage({ image });

      // imageWorker.onmessage = async (event: MessageEvent) => {
      //   const { type, chunk, offset, totalSize } = event.data;

      //   if (type === "UPLOAD_CHUNK") {
      //     const uploadImageUrl = await uploadChunkImage({
      //       chunk,
      //       offset,
      //       totalSize,
      //       resumableUrl: imageUploadResumableUrl,
      //     });
      //     console.log(uploadImageUrl);

      //     if (offset + chunk.byteLength >= totalSize) {
      //       imageWorker.terminate();
      //     }
      //   }
      // };

      // const videoFile = data.videos;
      // if (videoFile instanceof FileList) {
      //   const video = videoFile[0];
      //   const videoUploadResumableUrl = await getvideoResumableUploadUrl({
      //     fileName: video.name,
      //   });

      //   const videoWorker = new Worker(
      //     new URL("@/app/lib/webWorker/VideoChunkWorker.ts", import.meta.url)
      //   );

      //   videoWorker.postMessage({ video });

      //   videoWorker.onmessage = async (event: MessageEvent) => {
      //     const { type, chunk, offset, totalSize } = event.data;

      //     if (type === "UPLOAD_CHUNK") {
      //       const uploadVideoUrl = await uploadChunkVideo({
      //         chunk,
      //         offset,
      //         totalSize,
      //         resumableUrl: videoUploadResumableUrl,
      //       });
      //       console.log(uploadVideoUrl);

      //       if (offset + chunk.byteLength >= totalSize) {
      //         videoWorker.terminate();
      //       }
      //     }
      //   };
      // }

      // const roomData = await SubmitRoomDetails({
      //   name: data.name,
      //   roomNumber: data.roomNumber,
      //   city: data.city,
      //   direction: data.direction,
      //   location: data.location,
      //   photos: ["data.photos"],
      //   videos: "data.videos",
      //   price: data.price,
      //   ratings: data.ratings,
      //   mincapacity: data.mincapacity,
      //   maxcapacity: data.maxcapacity,
      //   roomtype: data.roomtype,
      //   furnishingStatus: data.furnishingStatus,
      //   amenities: data.amenities,
      // });

      // setListedRoomData((prev) => (prev ? [...prev, roomData] : [roomData]));
      // reset();
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "An unknown error occurred"
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
        {/* <div className="grid max-sm:grid-cols-1 grid-cols-2 gap-1"> */}
        {/* <InputField
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
        /> */}

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
    </div>
  );
};

export default Room;
