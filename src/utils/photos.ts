import { Album, Metadata, Photo } from "@brobin/types/photos";
import ExifReader from "exifreader";
import fs from "fs";
import path from "path";
import { titleCase } from "title-case";

const PHOTO_PATH = path.join(process.cwd(), "public/images/photos");
const WEB_PATH = path.join("/images", "photos");

function byDate(a: { date: string }, b: { date: string }) {
  if (a.date > b.date) return -1;
  if (b.date < b.date) return 1;
  return 0;
}

function byPhotoDate(a: Album, b: Album) {
  if (a.photos[0].date > b.photos[0].date) return -1;
  if (a.photos[0].date < b.photos[0].date) return 1;
  return 0;
}

function parseMetadata(filepath: string): Metadata {
  const file = fs.readFileSync(filepath);
  const tags = ExifReader.load(file);

  const latDirection = (tags.GPSLatitudeRef?.value || []) as string[];
  const latModifier = latDirection.includes("N") ? 1 : -1;
  const lngDirection = (tags.GPSLatitudeRef?.value || []) as string[];
  const lngModifier = lngDirection.includes("E") ? 1 : -1;

  return {
    Title:
      tags.title?.description ||
      (tags.UserComment as ExifReader.XmpTag)?.description ||
      null,
    DateTaken: tags.DateCreated?.description || null,
    Make: tags.Make?.description || null,
    Model: tags.Model?.description || null,
    SerialNumber: tags.SerialNumber?.description || null,
    LensModel: tags.LensModel?.description || null,
    LensSerialNumber: tags.LensSerialNumber?.description || null,
    ExposureProgram: tags.ExposureProgram?.description || null,
    ISO: Number(tags.ISOSpeedRatings?.description) || null,
    ShutterSpeed: tags.ShutterSpeedValue?.description || null,
    Aperture: tags.FNumber?.description || null,
    FocalLength: tags.FocalLength?.description || null,
    GPSLatitude: tags.GPSLatitude?.description
      ? Number(tags.GPSLatitude?.description) * latModifier
      : null,
    GPSLongitude: tags.GPSLongitude?.description
      ? Number(tags.GPSLongitude?.description) * lngModifier
      : null,
    Height: tags["Image Height"]?.value || null,
    Width: tags["Image Width"]?.value || null,
  };
}

export function getPhoto(album: string, filename: string): Photo {
  const metadata = parseMetadata(path.join(PHOTO_PATH, album, filename));

  return {
    id: filename.split(".")[0],
    path: path.join(WEB_PATH, album, filename),
    date: metadata.DateTaken!,
    metadata,
    size: {
      source: path.join(WEB_PATH, album, filename),
      width: metadata.Width || 1200,
      height: metadata.Height || 800,
    },
  };
}

export function getAlbum(slug: string): Album {
  return {
    slug,
    title: titleCase(slug.replace("-", " ")),
    photos: fs
      .readdirSync(path.join(PHOTO_PATH, slug))
      .map((filename) => getPhoto(slug, filename))
      .sort(byDate),
  };
}

export function getAlbums(): Album[] {
  return fs.readdirSync(PHOTO_PATH).map(getAlbum).sort(byPhotoDate);
}
