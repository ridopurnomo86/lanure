import { NextResponse } from "next/server";

export async function GET() {
  try {
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;

    if (!privateKey) {
      return NextResponse.json(
        { error: "IMAGEKIT_PRIVATE_KEY is not defined" },
        { status: 500 }
      );
    }

    const token = crypto.randomUUID();
    const expire = Math.floor(Date.now() / 1000) + 2400; // 40 minutes from now
    
    // We use a simple signature generation that's compatible with both Node and Edge
    // ImageKit expects an HMAC-SHA1 signature of (token + expire) using the private key
    
    const signature = await generateSignature(token + expire, privateKey);

    return NextResponse.json({
      token,
      expire,
      signature,
    });
  } catch (error: any) {
    console.error("ImageKit Auth Error:", error);
    return NextResponse.json(
      { error: "Failed to generate authentication parameters", details: error.message },
      { status: 500 }
    );
  }
}

async function generateSignature(message: string, secret: string) {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const messageData = encoder.encode(message);

  const key = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-1" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", key, messageData);
  
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
