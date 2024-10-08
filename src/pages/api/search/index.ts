import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../common/lib/client";

const searchKeywords = async (req: NextApiRequest, res: NextApiResponse) => {
  const { keyword } = req.query;
  if (req.method === "GET") {
    try {
      const allKeywords = await client.product.findMany({
        where: {
          OR: [
            { title: { contains: keyword as string } },
            { hashTag: { some: { tag: { contains: keyword as string } } } },
          ],
        },
        include: {
          imgurl: true,
          hashTag: true,
        },
      });
      res.status(200).send(allKeywords);
    } catch (err) {
      res.status(400).send({ message: "검색 실패!" });
    }
  }
};

export default searchKeywords;
