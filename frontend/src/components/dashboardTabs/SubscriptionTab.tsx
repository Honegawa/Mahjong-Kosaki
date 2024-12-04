import { Box, Button, CardContent, Typography } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../utils/contexts/Auth.context";
import { AuthContextType } from "../../interfaces/user";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { DATE_FORMATTER } from "../../utils/helpers/date.helper";

function SubscriptionTab() {
  const { user } = useContext(AuthContext) as AuthContextType;

  const renderContent = () => {
    let render;
    if (!user) {
      render = <>Erreur</>;
    } else {
      if (!user.subscription) {
        render = (
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography>
              Vous n’avez pas encore adhéré à l’association.
            </Typography>
            <Link to={"/subscription"}>
              <Button variant="contained">Adhérer</Button>
            </Link>
          </Box>
        );
      } else {
        const subDate = dayjs(user.subscription).add(1, "year");
        const today = dayjs();

        if (subDate.isBefore(today)) {
          render = (
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography>
                Votre adhésion à l’association a expiré le
                <Typography fontWeight={600}>
                  {DATE_FORMATTER.format(new Date(subDate.toISOString()))}.
                </Typography>
              </Typography>
              <Link to={"/subscription"}>
                <Button variant="contained">Renouveler</Button>
              </Link>
            </Box>
          );
        } else {
          render = (
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography>
                Votre adhésion à l’association expire le
                <Typography fontWeight={600}>
                  {DATE_FORMATTER.format(new Date(subDate.toISOString()))}.
                </Typography>
              </Typography>
            </Box>
          );
        }
      }
    }

    return render;
  };

  return (
    <CardContent>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        gap={2}
        minHeight={340}
      >
        <Box sx={{ flex: "1 0 auto" }} />
        {renderContent()}
        <Box sx={{ flex: "1 0 auto" }} />
      </Box>
    </CardContent>
  );
}

export default SubscriptionTab;
