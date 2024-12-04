import { Box, InputAdornment, TextField } from "@mui/material";
import { SubscriptionFormData } from "../../interfaces/subscriptions";
import { InfoOutlined, MailOutline, PhoneIphone } from "@mui/icons-material";
import { DatePicker, DateValidationError } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

type FormStepProps = {
  subscription: SubscriptionFormData;
  error: {
    email: string;
    EMANumber: string;
    phone: string;
    postalCode: string;
    birthdate: string;
  };
  date: Dayjs | null;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeEMANumber: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangePhone: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePostalCode: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeDate: (value: Dayjs | null) => void;
  handleErrorDate: (newError: DateValidationError) => void;
};

function FormStep(props: FormStepProps) {
  const {
    subscription,
    error,
    date,
    handleChange,
    handleChangeEMANumber,
    handleChangePhone,
    handleChangeEmail,
    handlePostalCode,
    handleChangeDate,
    handleErrorDate,
  } = props;

  return (
    <>
      <Box
        display="flex"
        width="100%"
        sx={{
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 0, md: 2 },
        }}
      >
        <TextField
          autoFocus
          required
          margin="dense"
          id="firstname"
          name="firstname"
          label="Prénom"
          type="text"
          onChange={handleChange}
          value={subscription.firstname}
          fullWidth
          variant="outlined"
        />
        <TextField
          required
          margin="dense"
          id="lastname"
          name="lastname"
          label="Nom"
          type="text"
          onChange={handleChange}
          value={subscription.lastname}
          fullWidth
          variant="outlined"
        />
      </Box>

      <DatePicker
        name="birthdate"
        label="Date de naissance"
        value={date}
        onChange={handleChangeDate}
        onError={(newError) => handleErrorDate(newError)}
        maxDate={dayjs().subtract(8, "years")}
        sx={{ width: "100%", marginTop: 1 }}
        slotProps={{
          textField: {
            helperText: error.birthdate,
            required: true,
          },
        }}
      />

      <TextField
        required
        margin="dense"
        label="Email"
        name="email"
        type="email"
        value={subscription.email}
        onChange={handleChangeEmail}
        error={error.email.length > 0}
        helperText={error.email}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MailOutline />
            </InputAdornment>
          ),
        }}
      />

      <Box
        display="flex"
        width="100%"
        sx={{
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 0, md: 2 },
        }}
      >
        <TextField
          margin="dense"
          id="phone"
          name="phone"
          label="Téléphone"
          inputMode="numeric"
          onChange={handleChangePhone}
          value={subscription.phone ?? ""}
          error={error.phone.length > 0}
          helperText={error.phone}
          fullWidth
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIphone />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          margin="dense"
          id="EMANumber"
          name="EMANumber"
          label="Numéro EMA"
          inputMode="numeric"
          onChange={handleChangeEMANumber}
          value={subscription.EMANumber ?? ""}
          error={error.EMANumber.length > 0}
          helperText={error.EMANumber}
          fullWidth
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <InfoOutlined />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TextField
        required
        margin="dense"
        id="address"
        name="address"
        label="Adresse"
        type="text"
        onChange={handleChange}
        value={subscription.address}
        fullWidth
        variant="outlined"
      />
      <Box
        display="flex"
        width="100%"
        sx={{
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 0, md: 2 },
        }}
      >
        <TextField
          required
          margin="dense"
          id="postalCode"
          name="postalCode"
          label="Code postal"
          type="text"
          onChange={handlePostalCode}
          value={subscription.postalCode}
          error={error.postalCode.length > 0}
          helperText={error.postalCode}
          fullWidth
          variant="outlined"
        />
        <TextField
          required
          margin="dense"
          id="city"
          name="city"
          label="Ville"
          type="text"
          onChange={handleChange}
          value={subscription.city}
          fullWidth
          variant="outlined"
        />
      </Box>
    </>
  );
}

export default FormStep;
