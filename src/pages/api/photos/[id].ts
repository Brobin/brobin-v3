import { PhotoDetail } from "@brobin/types/flickr";
import { getPhotoDetail } from "@brobin/utils/flickr";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PhotoDetail>
) {
  const photo = await getPhotoDetail(req.query.id as string);
  res.status(200).json(photo);
}
