;

import { generateToken } from "@/helper/jwtconfig";
import { decrypt, encrypt } from "@/helper/security";
import validator from "@/helper/validate";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const password = searchParams.get("password");
    const reqBodydata = {};
    searchParams.forEach((value, key) => {
      // console.log(`${key}: ${value}`);
      reqBodydata[key] = value;
    });

    const ValidatorRules = {
      email: "required|email",
      password: "required",
    };

    const { error, status } = await new Promise((resolve) => {
      validator(reqBodydata, ValidatorRules, {}, (error, status) => {
        resolve({ error, status });
      });
    });
    if (!status) {
      return Response.json({
        message: "validation error",
        data: { ...error.errors },
      });
    }

    const employeeData = await prisma.employee.findFirst({
      where: {
        emailID: email,
      },
    });

    if (!employeeData) {
      return Response.json({
        message: "User not found",
        success: false,
        data: {},
      });
    }

    const decryptedPassword = decrypt(employeeData.password);
    if (decryptedPassword !== password) {
      return Response.json({
        message: "Invalid credentials",
        success: false,
        data: {},
      });
    }

    const dataForToken = {
      id: employeeData.id,
    };

    let token = await generateToken(dataForToken);

    return Response.json({
      message: "user sccessfully login",
      success: true,
      data: {
        employeeId: employeeData.id,
        token,
      },
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

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { email, userName, password } = reqBody;
    console.log(reqBody);
    const ValidatorRules = {
      email: "required|email",
      userName: "required",
      password: "required",
    };

    const { error, status } = await new Promise((resolve) => {
      validator(reqBody, ValidatorRules, {}, (error, status) => {
        resolve({ error, status });
      });
    });

    if (!status) {
      return Response.json({
        message: "validation error",
        data: { ...error.errors },
      });
    }

    const encryptedPassword = encrypt(password);

    const employeeData = await prisma.employee.create({
      data: {
        emailID: email,
        userName: userName,
        password: encryptedPassword,
      },
    });

    const dataForToken = {
      id: employeeData.id,
    };

    let token = await generateToken(dataForToken);
    return Response.json({
      message: "User created successfully",
      data: {
        employeeId: employeeData.id,
        token,
      },
      success: true,
    });
  } catch (error) {
    console.error(error);
    return Response.json({
      message: "Something went wrong",
      data: error,
      success: false,
    });
  }
}
