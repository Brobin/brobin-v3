import { Photo, PhotoDetail } from "@brobin/types/flickr";
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
    extras: "date_taken,url_m",
    per_page: "50",
  })
    .then((data) => data.photos.photo)
    .then((photos) =>
      photos.map((photo: any) => ({
        ...photo,
        medium: {
          source: photo.url_m,
          height: photo.height_m,
          width: photo.width_m,
        },
        large: {
          source: photo.url_l,
          height: photo.height_l,
          width: photo.width_l,
        },
        original: {
          source: photo.url_l,
          height: photo.height_l,
          width: photo.width_l,
        },
      }))
    )
    .then((photos: Photo[]) => photos.sort(byDateTaken))
    .catch(() => []);
}

export async function getPhotoDetail(photo_id: string): Promise<PhotoDetail> {
  const info = await flickr("flickr.photos.getInfo", { photo_id }).then(
    (data) => data.photo
  );

  const exifData = await flickr("flickr.photos.getExif", { photo_id }).then(
    (data) => data.photo
  );

  const sizes = await flickr("flickr.photos.getSizes", { photo_id }).then(
    (res) => res.sizes.size
  );

  const medium = sizes.find((size: any) => size.label === "Medium");
  const large = sizes.find((size: any) => size.label === "Large 1600");
  const original = sizes.find((size: any) => size.label === "Original");

  const tag = (tag: string) =>
    exifData.exif.find((e: any) => e.tag === tag)?.raw._content || null;

  return {
    id: info.id,
    title: info.title._content,
    description: info.description._content,
    tags: info.tags.tag.map((t: any) => t._content),
    datetaken: info.dates.taken,

    medium,
    large,
    original,

    exif: {
      camera: exifData.camera || null,
      lens: tag("LensModel") || tag("Lens"),
      exposure: tag("ExposureTime"),
      iso: tag("ISO"),
      focalLength: tag("FocalLength"),
      aperture: tag("FNumber"),
    },
    geo: info.geoperms?.ispublic
      ? {
          latitude: info.location.latitude,
          longitude: info.location.longitude,
          county: info.location.county._content,
          region: info.location.region._content,
          country: info.location.country._content,
        }
      : null,
  };
}
