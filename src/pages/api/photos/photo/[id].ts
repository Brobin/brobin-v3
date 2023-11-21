import { PhotoDetail } from "@brobin/types/flickr";
import { Taxon } from "@brobin/types/inaturalist";
import { getPhotoDetail } from "@brobin/utils/flickr";
import { searchTaxonomy } from "@brobin/utils/inaturalist";
import { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  photo: PhotoDetail;
  taxonomy: Taxon[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { id } = req.query;
  const photoId = Array.isArray(id) ? id[0] : id;
  const photo = await getPhotoDetail(photoId!);
  const taxonomy = await searchTaxonomy(photo.title);
  res.status(200).json({ photo, taxonomy });
}
