import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../common/lib/client";

const nickNameHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { nickname } = req.body;

  if (req.method !== "POST") return;
  if (id) {
    // change nickname
    const nickChange = await client.user.update({
      where: {
        id: Number(id),
      },
      data: {
        nickname,
      },
    });
    res.json(nickChange);
  } else {
    // find nickname
    try {
      const hasNickname = await client.user.findMany({
        where: {
          nickname,
        },
      });
      if (hasNickname.length === 0) {
        res.status(201).json({
          message: "닉네임을 사용할 수 있습니다.",
          hasNickname,
          nickname,
        });
      }
    } catch {
      res.status(500).json({
        message: "이미 존재하는 닉네임입니다.,다른 닉네임을 설정해주세요!",
      });
    }
  }
};

export default nickNameHandler;
