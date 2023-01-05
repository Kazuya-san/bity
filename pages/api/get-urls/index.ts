import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

const url = async (req: NextApiRequest, res: NextApiResponse) => {
  const page = (req.query["page"] as string) || "1";
  const limit = 10;

  const key = req.headers["x-api-key"];
  const session = await getSession({ req });

  const apiKey = await prisma.apiKey.findFirst({
    where: {
      key: key as string,
    },
  });

  if (session && session?.user?.isAdmin) {
    const data = await prisma.url.findMany({
      skip: (parseInt(page) - 1) * limit,
      take: limit,
    });

    const count = await prisma.url.count();

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Cache-Control",
      "s-maxage=1000000000, stale-while-revalidate"
    );

    return res.json({
      message: "success",
      data: data,
      pages: Math.ceil(count / limit),
    });
  } else {
    const data = await prisma.url.findMany({
      where: {
        userName: apiKey?.name,
      },
      // take: limit,
      skip: (parseInt(page) - 1) * limit,
      take: limit,
    });

    const count = await prisma.url.count();

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Cache-Control",
      "s-maxage=1000000000, stale-while-revalidate"
    );

    return res.json({
      message: "success",
      data: data,
      pages: Math.ceil(count / limit),
    });
  }
};

export default url;
