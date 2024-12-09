import {
  uploadImage,
  uploadVideo,
  uploadChunkImage,
  uploadChunkVideo,
  getImageResumableUploadUrl,
  getvideoResumableUploadUrl,
} from "@/app/list/ServerAction";

export const upload_Images = async (
  photos: FileList | File[]
): Promise<string[]> => {
  const photosArray = Array.from(photos);
  const uploadImagePromises = photosArray.map(async (image) => {
    let uploadImageUrl: string | undefined;
    if (image.size / 1024 < 5120) {
      uploadImageUrl = await uploadImage({
        fileName: image.name,
        fileType: image.type,
        file: image,
      });
    } else {
      const imageUploadResumableUrl = await getImageResumableUploadUrl({
        fileName: image.name,
        fileType: image.type,
      });
      const imageWorker = new Worker(
        new URL("@/app/lib/webWorker/ImageChunkWorker.ts", import.meta.url)
      );

      uploadImageUrl = await new Promise<string>((resolve, reject) => {
        imageWorker.postMessage({ image });
        imageWorker.onmessage = async (event: MessageEvent) => {
          const { type, chunk, offset, totalSize } = event.data;
          if (type === "UPLOAD_CHUNK") {
            try {
              const chunkUploadUrl = await uploadChunkImage({
                chunk,
                offset,
                totalSize,
                resumableUrl: imageUploadResumableUrl,
              });
              if (offset + chunk.byteLength >= totalSize) {
                imageWorker.terminate();
                resolve(chunkUploadUrl as string);
              }
            } catch (error) {
              reject(error);
            }
          }
        };
        imageWorker.onerror = (error) => reject(error);
      });
    }

    if (uploadImageUrl) {
      return uploadImageUrl;
    } else {
      throw new Error("Failed to upload image");
    }
  });

  return Promise.all(uploadImagePromises);
};

export const upload_Video = async (
  videoFile: FileList | null
): Promise<string | undefined> => {
  if (videoFile instanceof FileList) {
    const video = videoFile[0];
    if (video.size / 1024 < 51200) {
      return await uploadVideo({
        fileName: video.name,
        file: video,
      });
    } else {
      const videoUploadResumableUrl = await getvideoResumableUploadUrl({
        fileName: video.name,
      });

      const videoWorker = new Worker(
        new URL("@/app/lib/webWorker/VideoChunkWorker.ts", import.meta.url)
      );

      return new Promise<string>((resolve, reject) => {
        videoWorker.postMessage({ video });

        videoWorker.onmessage = async (event: MessageEvent) => {
          const { type, chunk, offset, totalSize } = event.data;
          if (type === "UPLOAD_CHUNK") {
            try {
              const chunkUploadUrl = await uploadChunkVideo({
                chunk,
                offset,
                totalSize,
                resumableUrl: videoUploadResumableUrl,
              });

              if (offset + chunk.byteLength >= totalSize) {
                videoWorker.terminate();
                resolve(chunkUploadUrl as string);
              }
            } catch (error) {
              reject(error);
            }
          }
        };

        videoWorker.onerror = (error) => reject(error);
      });
    }
  }
  return undefined;
};

// let uploadImageUrl;
// let uploadVideoUrl;

//   const image = data.photos[0];
//   if (image.size / 1024 < 5120) {
//     uploadImageUrl = await uploadImage({
//       fileName: image.name,
//       fileType: image.type,
//       file: image,
//     });
//   } else {
//     const imageUploadResumableUrl = await getImageResumableUploadUrl({
//       fileName: image.name,
//       fileType: image.type,
//     });
//     const imageWorker = new Worker(
//       new URL("@/app/lib/webWorker/ImageChunkWorker.ts", import.meta.url)
//     );
//     imageWorker.postMessage({ image });
//     imageWorker.onmessage = async (event: MessageEvent) => {
//       const { type, chunk, offset, totalSize } = event.data;
//       if (type === "UPLOAD_CHUNK") {
//         uploadImageUrl = await uploadChunkImage({
//           chunk,
//           offset,
//           totalSize,
//           resumableUrl: imageUploadResumableUrl,
//         });
//         if (offset + chunk.byteLength >= totalSize) {
//           imageWorker.terminate();
//         }
//       }
//     };
//   }

// const videoFile = data.videos;
// if (videoFile instanceof FileList) {
//   const video = videoFile[0];
//   if (video.size / 1024 < 51200) {
//     uploadVideoUrl = await uploadVideo({
//       fileName: video.name,
//       file: video,
//     });
//   } else {
//     const videoUploadResumableUrl = await getvideoResumableUploadUrl({
//       fileName: video.name,
//     });
//     const videoWorker = new Worker(
//       new URL("@/app/lib/webWorker/VideoChunkWorker.ts", import.meta.url)
//     );
//     videoWorker.postMessage({ video });
//     videoWorker.onmessage = async (event: MessageEvent) => {
//       const { type, chunk, offset, totalSize } = event.data;
//       if (type === "UPLOAD_CHUNK") {
//         uploadVideoUrl = await uploadChunkVideo({
//           chunk,
//           offset,
//           totalSize,
//           resumableUrl: videoUploadResumableUrl,
//         });
//         console.log(uploadVideoUrl);
//         if (offset + chunk.byteLength >= totalSize) {
//           videoWorker.terminate();
//         }
//       }
//     };
//   }
// }
