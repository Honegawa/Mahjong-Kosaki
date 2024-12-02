import { useEffect, useState } from "react";
import {
  Article,
  ArticleFormData,
  ArticlePicture,
  RootState as RootStateArticle,
  UpdatedArticle,
} from "../../../interfaces/article";
import cloneDeep from "lodash/cloneDeep";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { allArticles } from "../../../services/selectors/article.selector";
import * as ACTIONS_ARTICLE from "../../../redux/reducers/article";
import {
  MAX_UPLOAD_FILES,
  MODAL_TABS,
} from "../../../utils/contants/dashboard";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { findFormError } from "../../../utils/helpers/form.helper";
import axios, { AxiosError, AxiosResponse } from "axios";
import ENDPOINTS from "../../../utils/contants/endpoints";
import WarningAlert from "../../WarningAlert";
import { Img } from "../../templates/Img";
import { HighlightOff } from "@mui/icons-material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

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
    pictures: [],
  });
  const [pictures, setPictures] = useState<FileList | null>(null);
  const [removedPictures, setRemovesPictures] = useState<ArticlePicture[]>([]);
  const [error, setError] = useState({ images: "", server: "" });

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

  const handleDeleteImage = (image: ArticlePicture) => {
    setArticle((article) => ({
      ...article,
      pictures: article.pictures.filter((pic) => pic.id !== image.id),
    }));
    setRemovesPictures((pictures) => [...pictures, image]);
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files && files.length > MAX_UPLOAD_FILES - article.pictures.length) {
      setError((error) => ({
        ...error,
        images: "Vous ne pouvez pas excéder plus de 5 images par article.",
      }));
    } else {
      setError((error) => ({ ...error, images: "" }));
      setPictures(files);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (findFormError(error)) return;

    try {
      let response: AxiosResponse;
      const formData: ArticleFormData = {
        ...article,
        uploads: null,
        removedPictures: [],
      };
      if (pictures && pictures.length > 0) {
        formData.uploads = pictures;
      }

      if (selectedArticle && selectedArticle.id) {
        // Update
        dispatch(ACTIONS_ARTICLE.UPDATE_START());

        formData.removedPictures = removedPictures;

        response = await axios.put(
          `${ENDPOINTS.ARTICLE}/${selectedArticle.id}`,
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        // Create
        dispatch(ACTIONS_ARTICLE.POST_START());

        response = await axios.post(ENDPOINTS.ARTICLE, formData, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
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

        <Box
          display="flex"
          flexWrap="wrap"
          gap={2}
          marginY={2}
          justifyContent="center"
        >
          {article.pictures.map((pic, index) => (
            <Box key={pic.picture} position="relative">
              <IconButton
                onClick={() => handleDeleteImage(pic)}
                sx={{ position: "absolute", top: 0, right: 0 }}
              >
                <HighlightOff color="error" />
              </IconButton>
              <Img
                src={pic.picture}
                alt={`Photo article ${index}`}
                sx={{
                  width: { xs: "100%", md: 170 },
                  height: { md: 170 },
                  objectFit: "contain",
                }}
              />
            </Box>
          ))}
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          width="100%"
          justifyContent="center"
          gap={2}
        >
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput
              type="file"
              name="uploads"
              onChange={handleUpload}
              multiple
              accept=".jpg, .jpeg, .png"
            />
          </Button>
          {error.images && (
            <WarningAlert
              error={error.images}
              onClick={() => setError((error) => ({ ...error, images: "" }))}
            />
          )}
        </Box>

        <Box display="flex" flexDirection="column" gap={2}>
          {pictures ? (
            Array.from(pictures).map((picture) => (
              <Typography key={picture.name}>{picture.name}</Typography>
            ))
          ) : (
            <></>
          )}
        </Box>
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
