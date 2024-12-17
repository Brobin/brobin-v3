import { Album, AlbumDetail, Photo, PhotoDetail } from "@brobin/types/flickr";
import dayjs from "dayjs";
import { createFlickr } from "flickr-sdk";

export const ALBUM_MAP: { [key: string]: string } = {
  wildlife_2024: "72177720322623500",
  wildlife_2023: "72177720322623476",
  astro: "72177720322644994",
  landscapes: "72177720322622630",
};

const apiKey = process.env.FLICKR_API_KEY as string;
const user_id = process.env.FLICKR_USER_ID as string;

// My GOODNESS, I wish the flickr typescript sdk had _REAL_ types
// instead of `any` spam, smdh

const { flickr } = createFlickr(apiKey);

const byDateTaken = (a: Photo, b: Photo) =>
  dayjs(b.datetaken) > dayjs(a.datetaken) ? 1 : -1;

const byTitle = (a: { title: string }, b: { title: string }) =>
  a.title > b.title ? 1 : -1;

export async function getAlbums(): Promise<Album[]> {
  return flickr("flickr.photosets.getList", {
    user_id,
    primary_photo_extras: "url_m",
  })
    .then((res) => res.photosets.photoset)
    .then((albums) =>
      albums
        .map((album: any) => ({
          id: album.id,
          title: album.title._content,
          slug: album.title._content.toLowerCase(),
          description: album.description._content,
          total: album.photos,
          updated: dayjs(Number(album.date_update) * 1000).format("YYYY-MM-DD"),
          primary: {
            source: album.primary_photo_extras.url_m,
            height: album.primary_photo_extras.height_m,
            width: album.primary_photo_extras.width_m,
          },
        }))
        .sort(byTitle)
    );
}

export async function getAlbumDetail(
  photoset_id: string | number
): Promise<AlbumDetail> {
  return flickr("flickr.photosets.getPhotos", {
    user_id,
    photoset_id: photoset_id.toString(),
    extras: "date_taken,url_m,url_l,url_o",
    per_page: "500",
  }).then((data) => ({
    id: data.photoset.id,
    title: data.photoset.title,
    slug: data.photoset.title.toLowerCase(),
    total: data.photoset.total,
    updated: dayjs(Number(data.photoset.date_update) * 1000).format(
      "YYYY-MM-DD"
    ),
    photos: data.photoset.photo
      .map((photo: any) => ({
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
          source: photo.url_o,
          height: photo.height_o,
          width: photo.width_o,
        },
      }))
      .sort(byDateTaken),
  }));
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
          latitude: Number(info.location.latitude),
          longitude: Number(info.location.longitude),
          county: info.location.county?._content ?? null,
          region: info.location.region._content,
          country: info.location.country._content,
        }
      : null,
  };
}
