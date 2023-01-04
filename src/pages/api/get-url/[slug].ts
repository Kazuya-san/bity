import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

const url = async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query["slug"];

  if (!slug || typeof slug !== "string") {
    res.statusCode = 404;

    res.json({ message: "pls use with a slug" });

    return;
  }

  const data = await prisma.url.findFirst({
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  if (!data) {
    res.statusCode = 404;

    res.send(JSON.stringify({ message: "slug not found" }));

    return;
  }

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=1000000000, stale-while-revalidate");

  //increment the count
  await prisma.url.update({
    where: {
      id: data.id,
    },
    data: {
      clicks: {
        increment: 1,
      },
    },
  });

  return res.json(data);
};

export default url;
