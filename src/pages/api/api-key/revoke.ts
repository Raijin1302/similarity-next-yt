import { NextApiRequest, NextApiResponse } from "next";
import { RevokeApiData } from "@/types/api";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { withMethods } from "@/lib/api-middlewares/with-methods";
import { db } from "@/lib/db";
import { z } from "zod";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<RevokeApiData>
) => {
  const user = await getServerSession(req, res, authOptions).then(
    (res) => res?.user
  );
  try {
    if (!user) {
      return res.status(401).json({
        error: "Unauthorized to perform this action",
        success: false,
      });
    }

    const validApiKey = await db.apiKey.findFirst({
      where: { userId: user.id, enabled: true },
    });

    if (!validApiKey) {
      return res.status(500).json({
        error: "This API key could not be revoked",
        success: false,
      });
    }

    //invalidate API Key

    await db.apiKey.update({
      where: { id: validApiKey.id },
      data: {
        enabled: false,
      },
    });

    return res.status(200).json({ error: null, success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues, success: false });
    }
    return res
      .status(500)
      .json({ error: "Internal Server Error", success: false });
  }
};

export default withMethods(["POST"], handler);
