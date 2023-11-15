export type ArticleParams = { params: { slug: string[] } };
export type TagParams = { params: { tag: string } };

export type Article = {
  title: string;
  slug: string;
  date: string;
  link: string;
  preview: string;
  content: string;
  tags: string[];
};

export type BlogSidebarProps = {
  recent: Article[];
  tags: string[];
};
