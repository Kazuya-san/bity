import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

const url = async (req: NextApiRequest, res: NextApiResponse) => {
  //make the body json

  if (req.method !== "POST" && req.method !== "DELETE") {
    //find all urls and populate the table

    const data = await prisma.url.findMany();
    res.statusCode = 200;

    res.json({ message: "success", data: data });

    // res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  if (req.method === "DELETE") {
    const { index } = req.query;

    const data = await prisma.url.delete({
      where: {
        id: index as string,
      },
    });

    return res.json({
      message: "success",
      data: data,
    });
  }

  const { slug, url } = req.body;
  const session = await getSession({ req });

  const data = await prisma.url.findFirst({
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  //   console.log(data);

  if (data) {
    res.statusCode = 404;
    res.json({ code: 404, message: "slug already Exists" });

    return;
  }

  if (session) {
    const newUrl = await prisma.url.create({
      data: {
        slug: slug,
        url: url,
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
      },
    });

    return res.json({
      message: "success",
      data: newUrl,
    });
  }
};

export default url;
