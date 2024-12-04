export interface Article {
  id: number | null;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  pictures: ArticlePicture[];
}

export type ArticleFormData = {
  id: number | null;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  pictures: ArticlePicture[];
  uploads: FileList | null;
  removedPictures: ArticlePicture[] | null;
};

export interface ArticlePicture {
  id?: number;
  picture: string;
}

export type RootState = {
  articles: {
    data: Article[];
    id: number;
  };
};

export type UpdatedArticle = {
  data: Article[];
  update: Article;
};

export type DeletedArticle = {
  data: Article[];
  id: number;
};
