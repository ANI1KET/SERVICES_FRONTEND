"use server";

import { Readable } from "stream";
import { google } from "googleapis";
// import { getServerSession } from "next-auth";

// import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { RoomWithMediaUrl } from "@/app/lib/ui/FormReusableComponent";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

const { credentials } = await oauth2Client.refreshAccessToken();
const accessToken = credentials.access_token;

export async function uploadImage({
  fileName,
  fileType,
  file,
}: {
  fileName: string;
  fileType: string;
  file: File;
}) {
  "use server";
  try {
    const fileStream = new Readable();
    fileStream.push(Buffer.from(await file.arrayBuffer()));
    fileStream.push(null);

    const response = await drive.files.create({
      requestBody: {
        name: fileName,
        mimeType: fileType,
        parents: ["11X7grkDG1HMGpuyg4VRcbYZjeSg6BBqs"],
      },
      media: {
        mimeType: fileType,
        body: fileStream,
      },
      fields: "id, webViewLink",
    });

    const { id, webViewLink } = response.data;

    return webViewLink
      ? webViewLink
      : `https://drive.google.com/file/d/${id}/view`;
  } catch (error) {
    throw error;
  }
}

export async function getImageResumableUploadUrl({
  fileName,
  fileType,
}: {
  fileName: string;
  fileType: string;
}) {
  "use server";
  try {
    const response = await fetch(
      "https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          name: fileName,
          mimeType: fileType,
          parents: ["11X7grkDG1HMGpuyg4VRcbYZjeSg6BBqs"],
        }),
      }
    );

    const locationHeader = response.headers.get("Location");

    if (!locationHeader) {
      throw new Error("Error generating imageUploadResumableUrl");
    }

    return locationHeader;
  } catch (error) {
    console.error("Error initiating resumable upload:", error);
    throw error;
  }
}

export async function uploadChunkImage({
  resumableUrl,
  chunk,
  offset,
  totalSize,
}: {
  resumableUrl: string;
  chunk: Uint8Array;
  offset: number;
  totalSize: number;
}) {
  "use server";
  try {
    const response = await fetch(resumableUrl, {
      method: "PUT",
      headers: {
        "Content-Range": `bytes ${offset}-${
          offset + chunk.length - 1
        }/${totalSize}`,
        "Content-Type": "application/octet-stream",
        Authorization: `Bearer ${accessToken}`,
      },
      body: Buffer.from(chunk),
    });

    if (response.status === 200) {
      const imageData = await response.json();
      return `https://drive.google.com/file/d/${imageData.id}/view`;
    }
  } catch (error) {
    console.error("Error uploading chunk:", error);
    throw error;
  }
}

const youtube = google.youtube({
  version: "v3",
  auth: oauth2Client,
});
// const authUrl = oauth2Client.generateAuthUrl({
//   access_type: "offline",
//   scope: "https://www.googleapis.com/auth/youtube.upload",
// });

export async function uploadVideo({
  fileName,
  file,
}: {
  fileName: string;
  file: File;
}) {
  "use server";
  try {
    const fileStream = new Readable();
    fileStream.push(Buffer.from(await file.arrayBuffer()));
    fileStream.push(null);

    const videoMetadata = {
      snippet: {
        title: fileName,
        description: "Video uploaded using YouTube API",
      },
      status: {
        privacyStatus: "public",
      },
    };

    const media = {
      body: fileStream,
    };

    const res = await youtube.videos.insert({
      part: ["snippet", "status"],
      requestBody: videoMetadata,
      media: media,
    });

    if (!res.data.id) {
      throw new Error("Error uploading video");
    }

    return res.data.id;
  } catch (error) {
    throw error;
  }
}

export async function getvideoResumableUploadUrl({
  fileName,
}: {
  fileName: string;
}) {
  "use server";
  try {
    const response = await fetch(
      "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          snippet: {
            title: fileName,
            description: "Listing",
            tags: ["example", "upload"],
            categoryId: "22",
          },
          status: {
            privacyStatus: "public",
          },
        }),
      }
    );

    const locationHeader = response.headers.get("Location");

    if (!locationHeader) {
      throw new Error("Error generating YouTube resumable upload URL");
    }

    return locationHeader;
  } catch (error) {
    console.error("Error initiating YouTube upload:", error);
    throw error;
  }
}

export async function uploadChunkVideo({
  resumableUrl,
  chunk,
  offset,
  totalSize,
}: {
  resumableUrl: string;
  chunk: Uint8Array;
  offset: number;
  totalSize: number;
}) {
  "use server";
  try {
    const response = await fetch(resumableUrl, {
      method: "PUT",
      headers: {
        "Content-Range": `bytes ${offset}-${
          offset + chunk.length - 1
        }/${totalSize}`,
        "Content-Type": "application/octet-stream",
        Authorization: `Bearer ${accessToken}`,
      },
      body: Buffer.from(chunk),
    });

    if (response.status === 200) {
      const videoData = await response.json();
      return `https://www.youtube.com/watch?v=${videoData.id}`;
    }
  } catch (error) {
    console.error("Error uploading chunk:", error);
    throw error;
  }
}

export async function SubmitRoomDetails(formData: RoomWithMediaUrl) {
  "use server";
  try {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return formData;
  } catch (error) {
    throw new Error(error?.toString() || "An unknown error occurred");
  }
}
