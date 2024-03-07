import { verifyToken } from "@/helper/jwtconfig";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function GET() {
  try {
    const tokenData = await verifyToken();

    
    if (!tokenData.success) {
      return Response.json(tokenData);
    }

    const data = await prisma.employee.findFirst({
      where: {
        id: tokenData.data.id,
      },
      select: {
        emailID: true,
        userName: true,
        id: true,
        password: false,
      },
    });
    if (!data) {
      return Response.json({
        message: "Data not found",
        success: false,
        data: {},
      });
    }
    return Response.json({
      message: "Data found successfully",
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);
    return Response.json({
      message: "Something went wrong",
      success: false,
      data: {},
    });
  }
}
