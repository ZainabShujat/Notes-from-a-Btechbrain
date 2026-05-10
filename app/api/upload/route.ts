import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";


export async function POST(req: Request) {
  try {
    const data = await req.formData();

    const file = data.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${Date.now()}-${file.name}`;

    const uploadPath = path.join(
      process.cwd(),
      "public/assets/articles",
      fileName
    );

    await writeFile(uploadPath, buffer);

    return NextResponse.json({
      url: `/assets/articles/${fileName}`,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}