import { Photo, PhotoExifData } from "@brobin/types/flickr";
import dayjs from "dayjs";
import { createFlickr } from "flickr-sdk";

const apiKey = process.env.FLICKR_API_KEY as string;
const userId = process.env.FLICKR_USER_ID as string;

const { flickr } = createFlickr(apiKey);

const byDateTaken = (a: Photo, b: Photo) =>
  dayjs(b.datetaken) > dayjs(a.datetaken) ? 1 : -1;

export async function getPhotos(): Promise<Photo[]> {
  return flickr("flickr.people.getPhotos", {
    user_id: userId,
    extras: "description,date_taken,url_m,url_l,url_o,tags,geo",
    per_page: "50",
  })
    .then((data) => data.photos.photo)
    .then((photos) => photos.sort(byDateTaken))
    .catch(() => []);
}

export async function getPhoto(photo_id: string) {
  return getPhotos().then((photos) => photos.find(({ id }) => id === photo_id));
}

export async function getPhotoExifData(
  photo_id: string
): Promise<PhotoExifData> {
  return flickr("flickr.photos.getExif", { photo_id }).then((data) => {
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
