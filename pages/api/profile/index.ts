// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (session) {
    const profile = await prisma.profile.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        image: session?.user?.image ?? "",
        userId: session?.user?.id ?? "",
        githubProfile: req.body.githubProfile,
        youtubeProfile: req.body.youtubeChannel,
        likedCategories: req.body.likedCategories.split(","),
        skills: req.body.skills.split(","),
      },
    });

    res.json(profile);
  } else {
    res.json({
      error: "You must be sign in to view the protected content on this page.",
    });
  }
}
