import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";
import { nanoid } from "nanoid";
const url = async (req: NextApiRequest, res: NextApiResponse) => {
  //make the body json

  const key = req.headers["x-api-key"];
  const session = await getSession({ req });

  if (!session?.user?.isAdmin && !key) {
    res.statusCode = 404;
    return res.json({
      code: 404,
      message: "invalid api key or none found and user not an admin",
    });
  }

  const apiKey = await prisma.apiKey.findFirst({
    where: {
      key: key as string,
    },
  });

  if (!apiKey && !session?.user?.isAdmin) {
    res.statusCode = 404;
    res.json({ code: 404, message: "invalid api key or none found" });

    return;
  }

  if (!apiKey?.valid && !session?.user?.isAdmin) {
    res.statusCode = 404;
    res.json({ code: 404, message: "api key is not valid" });

    return;
  }

  if (req.method !== "POST" && req.method !== "DELETE") {
    //find all urls and populate the table

    // const data = await prisma.url.findMany();
    // res.statusCode = 200;

    // res.json({ message: "success", data: data });

    // res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  if (req.method === "DELETE") {
    const { index } = req.query;

    const findData = await prisma.url.findFirst({
      where: {
        id: index as string,
        userName: apiKey?.name,
      },
    });

    // console.log(findData);

    if (!findData || (!!session && !!session?.user?.isAdmin)) {
      res.statusCode = 404;
      return res.json({ code: 404, message: "not authorized or not found" });
    }

    const data = await prisma.url.delete({
      where: {
        id: index as string,
      },
    });

    if (data) {
      return res.json({
        code: 200,
        message: "success",
        data: data,
      });
    } else {
      res.statusCode = 404;
      res.json({ code: 404, message: "invalid api key or none found" });

      return;
    }
  }

  //get api key from the header

  const { url } = req.body;

  let slug = nanoid(10);

  let data = await prisma.url.findFirst({
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  while (data) {
    slug = nanoid(10);
    data = await prisma.url.findFirst({
      where: {
        slug: {
          equals: slug,
        },
      },
    });
  }

  // //   console.log(data);

  // if (data) {
  //   res.statusCode = 404;
  //   res.json({ code: 404, message: "slug already Exists" });

  //   return;
  // }

  if (session?.user?.isAdmin) {
    const newUrl = await prisma.url.create({
      data: {
        slug: slug,
        url: url,
        fullUrl: process.env.CLIENT_URL + slug,
        user: {
          connect: {
            id: session?.user?.id ?? "",
          },
        },
        //   userId: session?.user?.id ?? "",
      },
    });

    return res.json({
      message: "success",
      data: newUrl,
    });
  } else {
    const newUrl = await prisma.url.create({
      data: {
        slug: slug,
        url: url,
        fullUrl: process.env.CLIENT_URL + slug,
        userName: apiKey?.name,
      },
    });

    return res.json({
      message: "success",
      data: newUrl,
    });
  }
};

export default url;
