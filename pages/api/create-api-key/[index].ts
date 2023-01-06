import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";

const key = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  //make the body json

  if (
    req.method !== "POST" &&
    req.method !== "DELETE" &&
    req.method !== "PUT"
  ) {
    //find all urls and populate the table
    let limit = 10;
    const page = req.query["page"] as string;

    if (session && session?.user?.isAdmin) {
      const data = await prisma.apiKey.findMany({
        //paginate
        skip: (parseInt(page) - 1) * limit,
        take: limit,
      });

      const count = await prisma.apiKey.count();
      res.statusCode = 200;

      return res.json({
        message: "success",
        data: data,
        pages: Math.ceil(count / limit),
      });
    }

    // res.statusCode = 404;
    // res.json({ code: 404, message: "You are not an admin", data: [] });
  }

  if (req.method === "DELETE") {
    if (session && session?.user?.isAdmin) {
      const { index } = req.query;

      const data = await prisma.apiKey.delete({
        where: {
          id: index as string,
        },
      });

      return res.json({
        message: "success",
        data: data,
      });
    } else {
      res.statusCode = 404;
      res.json({ code: 404, message: "You are not an admin" });
    }
  }

  if (req.method === "PUT") {
    if (session && session?.user?.isAdmin) {
      const { index } = req.query;

      const data = await prisma.apiKey.update({
        where: {
          id: index as string,
        },
        data: {
          valid: req.body.valid === true ? true : false,
        },
      });

      return res.json({
        message: "success",
        data: data,
      });
    } else {
      res.statusCode = 404;
      res.json({ code: 404, message: "You are not an admin" });
    }
  }

  if (session && session?.user?.isAdmin) {
    let key = uuidv4();

    const data = await prisma.apiKey.findFirst({
      where: {
        key: {
          equals: key,
        },
      },
    });

    //   console.log(data);

    if (data) {
      res.statusCode = 404;
      res.json({ code: 404, message: "Key already Exists" });
      return;
    }

    const newKey = await prisma.apiKey.create({
      data: {
        key: key,
        name: req.body.name,
      },
    });

    return res.json({
      message: "success",
      data: newKey,
    });
  } else {
    res.statusCode = 404;
    res.json({ code: 404, message: "You are not an admin" });
  }

  // res.statusCode = 404;
  // res.json({ code: 404, message: "You are not an admin" });
};

export default key;
