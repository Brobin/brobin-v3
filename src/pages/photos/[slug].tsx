import Album from "@brobin/pages/photos/album/[id]";
import { ALBUM_MAP, getAlbumDetail } from "@brobin/utils/flickr";

export default Album;

interface Params {
  params: { slug: string };
}

export async function getServerSideProps({ params: { slug } }: Params) {
  const id = ALBUM_MAP[slug];
  const album = await getAlbumDetail(id);
  return { props: { album } };
}
