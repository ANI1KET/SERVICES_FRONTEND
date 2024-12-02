interface WorkerEventData {
  image: File;
}

interface UploadChunkMessage {
  type: "UPLOAD_CHUNK";
  chunk: Uint8Array;
  offset: number;
  totalSize: number;
}

self.onmessage = async function (event: MessageEvent<WorkerEventData>) {
  const { image } = event.data;
  const chunkSize = 5 * 4 * 262144;
  let offset = 0;

  while (offset < image.size) {
    const chunk = image.slice(offset, offset + chunkSize);

    const uint8ArrayChunk = await readImageChunkAsUint8Array(chunk);

    const message: UploadChunkMessage = {
      type: "UPLOAD_CHUNK",
      chunk: uint8ArrayChunk,
      offset,
      totalSize: image.size,
    };
    self.postMessage(message);

    offset += chunkSize;
  }

  // self.postMessage({ type: "UPLOAD_COMPLETE" });
};

function readImageChunkAsUint8Array(blob: Blob): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        resolve(new Uint8Array(reader.result as ArrayBuffer));
      } else {
        reject(new Error("Failed to read file chunk"));
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(blob);
  });
}
