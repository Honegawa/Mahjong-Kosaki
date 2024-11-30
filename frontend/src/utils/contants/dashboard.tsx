import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PeopleIcon from "@mui/icons-material/People";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import TitleOutlinedIcon from "@mui/icons-material/TitleOutlined";
import DateRangeIcon from "@mui/icons-material/DateRange";

export const TABS = {
  user: {
    account: {
      name: "Compte",
      icon: <PersonIcon />,
      index: 0,
    },
    settings: {
      name: "Préférence",
      icon: <SettingsIcon />,
      index: 1,
    },
    subscription: {
      name: "Adhésion",
      icon: <InfoOutlinedIcon />,
      index: 2,
    },
  },
  admin: {
    userList: {
      name: "Liste des utilisateurs",
      icon: <PeopleIcon />,
      index: 3,
    },
    articleList: {
      name: "Liste des articles",
      icon: <FormatAlignLeftIcon />,
      index: 4,
    },
    gameList: {
      name: "Liste des matchs",
      index: 5,
      icon: <PlayCircleOutlinedIcon />,
    },
    tournamentList: {
      name: "Liste des tournois",
      icon: <TitleOutlinedIcon />,
      index: 6,
    },
    bookingList: {
      name: "Liste des réservations",
      icon: <DateRangeIcon />,
      index: 7,
    },
  },
};

export enum MODAL_TABS {
  delete = "delete",
  password = "password",
  email = "email",
  userInfos = "infos",
  createPerson = "createPerson",
  editPerson = "editPerson",
  createTournament = "createTournament",
  editTournament = "editTournament",
}

export const TOURNAMENT_CAPACITIES = [8, 16, 32, 64, 128];