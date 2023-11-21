import { Album } from "@brobin/types/flickr";
import { getAlbums } from "@brobin/utils/flickr";
import { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  albums: Album[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const albums = await getAlbums();
  res.status(200).json({ albums });
}
