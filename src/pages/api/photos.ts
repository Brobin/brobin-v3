import { Photo } from "@brobin/types/flickr";
import { getPhotos } from "@brobin/utils/flickr";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<Photo[]>
) {
  const photos = await getPhotos();
  res.status(200).json(photos);
}
