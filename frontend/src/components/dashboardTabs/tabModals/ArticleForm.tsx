import { useEffect, useState } from "react";
import {
  Article,
  RootState as RootStateArticle,
  UpdatedArticle,
} from "../../../interfaces/article";
import cloneDeep from "lodash/cloneDeep";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { allArticles } from "../../../services/selectors/article.selector";
import * as ACTIONS_ARTICLE from "../../../redux/reducers/article";
import { MODAL_TABS } from "../../../utils/contants/dashboard";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { findFormError } from "../../../utils/helpers/form.helper";
import axios, { AxiosError, AxiosResponse } from "axios";
import ENDPOINTS from "../../../utils/contants/endpoints";

type ArticleFormProps = {
  open: string;
  onClose: () => void;
  selectedArticle?: Article;
};

function ArticleForm(props: ArticleFormProps) {
  const { open, selectedArticle, onClose } = props;
  const [article, setArticle] = useState<Article>({
    id: null,
    title: "",
    content: "",
    createdAt: dayjs().toISOString(),
    updatedAt: dayjs().toISOString(),
    articlePictures: [],
  });
  const [error, setError] = useState({ server: "" });

  const dispatch = useDispatch();
  const articleStore: Article[] = useSelector((state: RootStateArticle) =>
    allArticles(state)
  );

  useEffect(() => {
    const articleClone = cloneDeep(selectedArticle);

    if (open === MODAL_TABS.editArticle && articleClone) {
      setArticle(articleClone);
    }
  }, [open, selectedArticle]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setArticle((article) => ({ ...article, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (findFormError(error)) return;

    try {
      let response: AxiosResponse;

      if (selectedArticle && selectedArticle.id) {
        // Update
        dispatch(ACTIONS_ARTICLE.UPDATE_START());

        response = await axios.put(
          `${ENDPOINTS.ARTICLE}/${selectedArticle.id}`,
          article,
          {
            withCredentials: true,
          }
        );
      } else {
        // Create
        dispatch(ACTIONS_ARTICLE.POST_START());

        response = await axios.post(ENDPOINTS.ARTICLE, article, {
          withCredentials: true,
        });
      }

      const { data, status } = response;

      if (status === 200) {
        const newArticle: Article = data.updatedArticle;

        const updatedArticle: UpdatedArticle = {
          data: articleStore,
          update: newArticle,
        };

        dispatch(ACTIONS_ARTICLE.UPDATE_SUCCESS(updatedArticle));
        onClose();
      } else if (status === 201) {
        const newArticle: Article = data.newArticle;

        dispatch(ACTIONS_ARTICLE.POST_SUCCESS(newArticle));
        onClose();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status) {
          setError((error) => ({
            ...error,
            server: `Une erreur est survenue lors de la ${
              article ? "modification" : "création"
            } de l'article.`,
          }));
        }
      }

      dispatch(ACTIONS_ARTICLE.POST_FAILURE());
    }
  };

  return (
    <Dialog
      open={
        open === MODAL_TABS.createArticle || open === MODAL_TABS.editArticle
      }
      onClose={onClose}
      PaperProps={{
        component: "form",
        sx: { width: "440px" },
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>
        {!selectedArticle ? "Création" : "Modification"} de l'article
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="title"
          name="title"
          type="text"
          label="Titre"
          value={article.title}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          required
          margin="dense"
          id="content"
          name="content"
          type="text"
          label="Contenu"
          value={article.content}
          onChange={handleChange}
          multiline
          minRows={3}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="inherit">
          Annuler
        </Button>
        <Button type="submit" variant="contained">
          {!selectedArticle ? "Créer" : "Modifier"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ArticleForm;
