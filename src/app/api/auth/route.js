import { writeFile } from "fs/promises";
import { join } from "path";

export async function GET(req) {
  return Response.json({ message: "Hello, Next.js!" });
}
export async function POST(req) {
  const data = await req.formData();

  const _images = data.get("image");
  console.log(_images);
  const bytes = await _images.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const path = join("./public/images", _images.name);
  await writeFile(path, buffer);
  return Response.json({ message: "Hello, Next.js!", filePath: path });
}
