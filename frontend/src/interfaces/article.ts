export interface Article {
  id?: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  articlePictures: ArticlePicture[];
}

export type ArticleDetailData = {
  id: number;
  data: Article[];
};

export interface ArticlePicture {
  id?: number;
  picture: string;
}

export type RootState = {
  articles: {
    data: Article[];
  };
};
