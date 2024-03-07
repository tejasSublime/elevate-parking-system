import { writeFile } from "fs/promises";
import { join } from "path";

import { PrismaClient } from "@prisma/client";
import { verifyToken } from "@/helper/jwtconfig";
import validator from "@/helper/validate";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const tokenData = await verifyToken();

    if (!tokenData.success) {
      return Response.json(tokenData);
    }
    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const image = formData.get("image");

    const ValidatorRules = {
      title: "required|max:100",
      description: "required|max:500",
    };

    const { error, status } = await new Promise((resolve) => {
      validator({ title, description }, ValidatorRules, {}, (error, status) => {
        resolve({ error, status });
      });
    });

    if (!status) {
      return Response.json({
        message: "validation error",
        success: false,
        data: { ...error.errors },
      });
    }

    if (!image) {
      return Response.json({
        message: "Image is required",
        success: false,
        data: {},
      });
    }

    let feedData = await prisma.feeds.create({
      data: {
        employeeId: tokenData.data.id,
        title,
        description,
        image: "",
      },
    });

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const imageNameArray = image.name.split(".");
    const ext = imageNameArray[imageNameArray.length - 1];
    const imageName = feedData.id + "." + ext;
    const path = join("./public/blog", imageName);
    await writeFile(path, buffer);

    await prisma.feeds.update({
      where: {
        id: feedData.id,
      },
      data: {
        image: "blog/" + imageName,
      },
    });
    feedData = await prisma.feeds.findUnique({
      where: {
        id: feedData.id,
      },
    });
    return Response.json({
      message: "Feed created successfully",
      data: feedData,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return Response.json({
      message: error.message,
      success: false,
      data: {},
    });
  }
}

export async function GET(req) {
  try {
    const tokenData = await verifyToken();

    if (!tokenData.success) {
      const feeds = await prisma.feeds.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

      return Response.json({
        message: "Feeds fetched successfully",
        data: feeds,
        success: true,
      });
    }

    const feeds = await prisma.feeds.findMany({
      where: {
        employeeId: tokenData.data.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json({
      message: "Feeds fetched successfully",
      data: feeds,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return Response.json({
      message: error.message,
      success: false,
      data: {},
    });
  }
}

export async function PUT(req) {
  try {
    const tokenData = await verifyToken();

    if (!tokenData.success) {
      return Response.json({
        message: "Not authorized",
        success: false,
        data: {},
      });
    }

    const formData = await req.formData();
    const id = formData.get("id");
    const title = formData.get("title");
    const description = formData.get("description");

    const ValidatorRules = {
      title: "required|max:100",
      description: "required|max:500",
      id: "required",
    };

    const { error, status } = await new Promise((resolve) => {
      validator(
        { title, description, id },
        ValidatorRules,
        {},
        (error, status) => {
          resolve({ error, status });
        }
      );
    });

    if (!status) {
      return Response.json({
        message: "validation error",
        success: false,
        data: { ...error.errors },
      });
    }
    const image = formData.get("image");
    if (image) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const imageNameArray = image.name.split(".");
      const ext = imageNameArray[imageNameArray.length - 1];
      const imageName = id + "." + ext;
      const path = join("./public/blog", imageName);
      await writeFile(path, buffer);
      await prisma.feeds.update({
        where: {
          id: id,
          employeeId: tokenData.data.id,
        },
        data: {
          image: "blog/" + imageName,
        },
      });
    }

    const feedData = await prisma.feeds.update({
      where: {
        id: id,
        employeeId: tokenData.data.id,
      },
      data: {
        title,
        description,
      },
    });
    return Response.json({
      message: "Feed updated successfully",
      data: feedData,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return Response.json({
      message: error.message,
      success: false,
      data: {},
    });
  }
}

export async function DELETE(req) {
  try {
    const tokenData = await verifyToken();
    if (!tokenData.success) {
      return Response.json(tokenData);
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const ValidatorRules = {
      id: "required",
    };

    const { error, status } = await new Promise((resolve) => {
      validator({ id }, ValidatorRules, {}, (error, status) => {
        resolve({ error, status });
      });
    });

    if (!status) {
      return Response.json({
        message: "validation error",
        success: false,
        data: { ...error.errors },
      });
    }

    const imagePath = await prisma.feeds.findUnique({
      where: {
        id: id,
        employeeId: tokenData.data.id,
      },
      select: {
        image: true,
      },
    });

    // if (imagePath) {
    //   const filePath = join("./public/blog", imagePath.image);
    //   await unlink.remove(filePath);
    // }

    await prisma.feeds.delete({
      where: {
        id: id,
        employeeId: tokenData.data.id,
      },
    });
    return Response.json({
      message: "Feed deleted successfully",
      data: {},
      success: true,
    });
  } catch (error) {
    console.error(error);
    return Response.json({
      message: error.message,
      success: false,
      data: {},
    });
  }
}
