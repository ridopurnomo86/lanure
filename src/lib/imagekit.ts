/* eslint-disable @typescript-eslint/no-explicit-any */
import ImageKit from "imagekit-javascript";

export const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
export const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

export const authenticator = async () => {
  try {
    const response = await fetch("/api/imagekit/auth");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`,
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

export const getImageKitInstance = () => {
  return new ImageKit({
    publicKey: publicKey!,
    urlEndpoint: urlEndpoint!,
  });
};
