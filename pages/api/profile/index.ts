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
    try {
      if (!req.body) {
        res.status(400).json({ error: "No data provided" });
        return;
      }

      const {
        name,
        githubProfile,
        youtubeChannel: youtubeProfile,
        likedCategories,
        skills,
      } = req.body;

      if (
        !name ||
        !githubProfile ||
        !youtubeProfile ||
        !likedCategories ||
        !skills
      ) {
        res.status(400).json({ error: "Missing Data" });
        return;
      }

      const profile = await prisma.profile.create({
        data: {
          name,
          email: session?.user?.email,
          image: session?.user?.image ?? "",
          userId: session?.user?.id ?? "",
          githubProfile,
          youtubeProfile,
          likedCategories: likedCategories.split(","),
          skills: skills.split(","),
        },
      });
      res.status(200).json(profile);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
      console.log(e);
    }
  } else {
    res.json({
      error: "You must be sign in to view the protected content on this page.",
    });
  }
}
