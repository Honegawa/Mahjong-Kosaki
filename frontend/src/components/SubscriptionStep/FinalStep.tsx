import { Box, Typography } from "@mui/material";

function FinalStep() {
  return (
    <>
      <Box sx={{ flex: "1 1 auto" }} />
      <Typography sx={{ mt: 2, mb: 1 }}>
        Votre demande d&apos;adhésion sera prise en compte dès la réception du
        bulletin d&apos;adhésion et de la cotisation.
      </Typography>
      <Typography>Bulletin d&apos;adhésion à envoyer à Kosaki :</Typography>
      <Typography>
        20 bis rue de Reims - 93600 Aulnay-sous-Bois ou asso.kosaki@gmail.com
      </Typography>
      <Box sx={{ flex: "1 1 auto" }} />
    </>
  );
}

export default FinalStep;
