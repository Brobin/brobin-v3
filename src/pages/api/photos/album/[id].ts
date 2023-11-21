import { AlbumDetail } from "@brobin/types/flickr";
import { getAlbumDetail } from "@brobin/utils/flickr";
import { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  album: AlbumDetail;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { id } = req.query;
  const albumId = Array.isArray(id) ? id[0] : id;
  const album = await getAlbumDetail(albumId!);
  res.status(200).json({ album });
}
