import express, { Request, Response } from "express";
import { getCode } from "./src/code";

const app = express();

app.get("/", function (req: Request, res: Response) {
  const code: string | undefined = req.query.code as string;

  try {
    const answer = getCode(code);
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(answer);
  } catch (error) {
    const statusCode =
      error instanceof Error && "statusCode" in error
        ? (error as any).statusCode
        : 500;
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";

    res.setHeader("Content-Type", "application/json");
    res.status(statusCode).json({ error: errorMessage });
  }
});

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000/?code=16.23");
});
