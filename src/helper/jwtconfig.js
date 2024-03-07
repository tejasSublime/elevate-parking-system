import { verify, sign } from "jsonwebtoken";
import { encrypt, decrypt } from "@/helper/security";
import { headers } from "next/headers";

export async function verifyToken(req) {
  try {
    const headersList = headers();
    const token = headersList.get("token");
    if (!token) {
      return {
        message: "A Token is Required for Authentication",
        success: false,
        data: {},
      };
    }
    const _decryptToken = decrypt(token);
    let decodedData = verify(_decryptToken, process.env.JWT_TOKEN || "");

    if (typeof decodedData !== "object") {
      decodedData = {};
    }

    return { success: true, data: decodedData.data, message: "Token Verified" };
  } catch (error) {
    return {
      success: false,
      data: {},
      message: error.message,
    };
  }
}
export async function generateToken(data) {
  data.iat = Date.now();
  const token = await sign({ data }, process.env.JWT_TOKEN || "", {
    expiresIn: "10d",
  });
  return encrypt(token);
}
