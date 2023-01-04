import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

const url = async (req: NextApiRequest, res: NextApiResponse) => {
  const page = req.query["page"];
  const limit = 10;

  const session = await getSession({ req });

  const data = await prisma.url.findMany({
    where: {
      userId: session.user.id,
    },
    // take: limit,
    skip: parseInt(page - 1) * limit,
    take: limit,
  });

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=1000000000, stale-while-revalidate");

  return res.json(data);
};

export default url;
