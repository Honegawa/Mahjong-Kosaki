import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Article,
  DeletedArticle,
  RootState as RootStateArticle,
} from "../../interfaces/article";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import * as ACTIONS_ARTICLE from "../../redux/reducers/article";
import { allArticles } from "../../services/selectors/article.selector";
import axios, { AxiosError, AxiosResponse } from "axios";
import ENDPOINTS from "../../utils/contants/endpoints";
import { MODAL_TABS } from "../../utils/contants/dashboard";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridToolbar,
} from "@mui/x-data-grid";
import { Box, Button, CardContent } from "@mui/material";
import WarningAlert from "../WarningAlert";
import { Add } from "@mui/icons-material";
import DeleteDialog from "../DeleteDialog";
import ArticleForm from "./tabModals/ArticleForm";

function ArticleTab() {
  const [openModal, setOpenModal] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<Article>();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const articleStore: Article[] = useSelector((state: RootStateArticle) =>
    allArticles(state)
  );

  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = async () => {
    dispatch(ACTIONS_ARTICLE.FETCH_START());

    try {
      const response = await axios.get(ENDPOINTS.ARTICLE);
      const { data, status } = response;

      if (status === 200) {
        dispatch(ACTIONS_ARTICLE.FETCH_SUCCESS(data));
      }
    } catch (error) {
      dispatch(ACTIONS_ARTICLE.FETCH_FAILURE());
    }
  };

  const handleOpenCreate = () => setOpenModal(MODAL_TABS.createArticle);
  const handleOpenActionModal = useCallback(
    (id: GridRowId, modal: string) => () => {
      setOpenModal(modal);
      setSelectedArticle(articleStore.find((article) => article.id === id));
    },
    [articleStore]
  );

  const handleClose = () => {
    setOpenModal("");
    setSelectedArticle(undefined);
  };

  const handleDelete = async () => {
    if (!selectedArticle || !selectedArticle.id) return;

    try {
      dispatch(ACTIONS_ARTICLE.DELETE_START());

      const response: AxiosResponse = await axios.delete(
        `${ENDPOINTS.ARTICLE}/${selectedArticle.id}`,
        { withCredentials: true }
      );
      const { status } = response;

      if (status === 200) {
        const deletedArticle: DeletedArticle = {
          data: articleStore,
          id: selectedArticle.id,
        };

        dispatch(ACTIONS_ARTICLE.DELETE_SUCCESS(deletedArticle));

        handleClose();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status) {
          setError("Une erreur est survenue lors de la suppression du compte");
        }
      }

      dispatch(ACTIONS_ARTICLE.DELETE_FAILURE());
      handleClose();
    }
  };

  const columns = useMemo<GridColDef<Article>[]>(
    () => [
      { field: "id", headerName: "ID", type: "number", width: 60 },
      { field: "title", headerName: "Titre", minWidth: 120, flex: 2 },
      { field: "content", headerName: "Contenu", minWidth: 120, flex: 4 },
      {
        field: "createdAt",
        headerName: "Créé le",
        type: "dateTime",
        width: 140,
        valueGetter: (value, row) => {
          return new Date(row.createdAt);
        },
      },
      {
        field: "updatedAt",
        headerName: "Mise à jour le",
        type: "dateTime",
        width: 140,
        valueGetter: (value, row) => {
          return new Date(row.updatedAt);
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 120,
        type: "actions",
        getActions: (params) => [
          <GridActionsCellItem
            icon={<CreateIcon />}
            label="Modifier"
            onClick={handleOpenActionModal(params.id, MODAL_TABS.editArticle)}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Supprimer"
            onClick={handleOpenActionModal(params.id, MODAL_TABS.delete)}
          />,
        ],
      },
    ],
    [handleOpenActionModal]
  );

  return (
    <CardContent>
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        sx={{
          minHeight: 600,
          maxHeight: { xs: 600, md: 800 },
          width: "100%",
        }}
      >
        <Button
          onClick={handleOpenCreate}
          color="success"
          variant="contained"
          startIcon={<Add />}
          sx={{ width: "fit-content" }}
        >
          Créer un tournoi
        </Button>

        <WarningAlert error={error} onClick={() => setError("")} />

        <DataGrid
          rows={articleStore}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          rowSelection={false}
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }}
          autosizeOptions={{
            expand: true,
            includeHeaders: true,
            includeOutliers: true,
            outliersFactor: 2,
          }}
        />
      </Box>

      {(openModal === MODAL_TABS.createArticle ||
        openModal === MODAL_TABS.editArticle) && (
        <ArticleForm
          open={openModal}
          onClose={handleClose}
          selectedArticle={selectedArticle}
        />
      )}

      {openModal === MODAL_TABS.delete && (
        <DeleteDialog
          open={openModal}
          onClose={handleClose}
          onConfirm={handleDelete}
        />
      )}
    </CardContent>
  );
}

export default ArticleTab;
