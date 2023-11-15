import { Photo, PhotoExifData } from "@brobin/types/flickr";
import Flickr from "flickr-sdk";

const apiKey = process.env.FLICKR_API_KEY as string;
const userId = process.env.FLICKR_USER_ID as string;

const flickr = new Flickr(apiKey);

export async function getPhotos(): Promise<Photo[]> {
  return await flickr.people
    .getPhotos({
      user_id: userId,
      extras: "description,date_taken,url_o,url_l,tags",
      per_page: "50",
    })
    .then((res: { text: string }) => JSON.parse(res.text)["photos"]["photo"])
    .catch(() => []);
}

export async function getPhoto(photo_id: string) {
  return getPhotos().then((photos) => photos.find(({ id }) => id === photo_id));
}

export async function getPhotoExifData(
  photo_id: string
): Promise<PhotoExifData> {
  return flickr.photos
    .getExif({ photo_id })
    .then((res) => JSON.parse(res.text))
    .then((data) => {
      const tag = (tag: string) =>
        data.photo.exif.find((e: any) => e.tag === tag)?.raw._content || null;

      return {
        camera: data.photo.camera || null,
        lens: tag("LensModel") || tag("Lens"),
        exposure: tag("ExposureTime"),
        iso: tag("ISO"),
        focalLength: tag("FocalLength"),
        aperture: tag("FNumber"),
      };
    });
}
