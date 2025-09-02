export type ArticleParams = { params: { slug: string[] } };
export type TagParams = { params: { tag: string } };

export type Article = {
  title: string;
  slug: string;
  date: string;
  link: string;
  preview: string;
  draft?: boolean;
  content: string;
  tags: string[];
  image: string | null;
};

export type BlogSidebarProps = {
  recent: Article[];
  tags: string[];
};
