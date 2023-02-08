const express = require("express");
const next = require("next");
const { PrismaClient } = require("@prisma/client");
// import express from "express";
// import next from "next";
// import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
app.prepare().then(() => {
  const server = express();

  //handle a request that is /:id and return me the id

  server.get("/:id", async (req, res) => {
    const slug = req.params.id;

    console.log(slug);

    if (!slug) {
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

    console.log(data.url);

    res.redirect(data.url);

    //return res.json(data);
  });

  server.get("/api/auth", (req, res) => {
    return handle(req, res);
  });

  server.get("/api/auth/callback", (req, res) => {
    return handle(req, res);
  });

  server.get("/api/create-api-key", (req, res) => {
    return handle(req, res);
  });

  server.post("/api/create-api-key", (req, res) => {
    return handle(req, res);
  });

  server.put("/api/create-api-key", (req, res) => {
    return handle(req, res);
  });

  server.delete("/api/create-api-key", (req, res) => {
    return handle(req, res);
  });

  server.get("/api/create-url", (req, res) => {
    return handle(req, res);
  });

  server.post("/api/create-url", (req, res) => {
    return handle(req, res);
  });

  server.put("/api/create-url", (req, res) => {
    return handle(req, res);
  });

  server.delete("/api/create-url", (req, res) => {
    return handle(req, res);
  });

  server.get("/api/get-url", (req, res) => {
    return handle(req, res);
  });

  server.get("/api/get-urls", (req, res) => {
    return handle(req, res);
  });

  server.get("*/*", (req, res) => {
    return handle(req, res);
  });
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
