import { Alert, Collapse, IconButton } from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";

type WarningAlertProps = {
  error: string;
  onClick: () => void;
};

function WarningAlert(props: WarningAlertProps) {
  const { error, onClick } = props;

  return (
    error && (
      <Collapse in={error.length > 0}>
        <Alert
          action={
            <IconButton color="inherit" size="small" onClick={onClick}>
              <GridCloseIcon fontSize="inherit" />
            </IconButton>
          }
          severity="warning"
        >
          {error}
        </Alert>
      </Collapse>
    )
  );
}

export default WarningAlert;
