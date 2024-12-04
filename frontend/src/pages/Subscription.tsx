import { useContext, useEffect, useState } from "react";
import { SubscriptionFormData } from "../interfaces/subscriptions";
import { AuthContext } from "../utils/contexts/Auth.context";
import { AuthContextType } from "../interfaces/user";
import {
  Box,
  Button,
  Card,
  CardContent,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import styles from "../styles/Subscription.module.css";
import REGEX from "../utils/contants/regex";
import { SUBSCRIPTION_STEPS } from "../utils/contants/subscription";
import FinalStep from "../components/SubscriptionStep/FinalStep";
import FormStep from "../components/SubscriptionStep/FormStep";
import PDFStep from "../components/SubscriptionStep/PDFStep";
import { Dayjs } from "dayjs";
import { DateValidationError } from "@mui/x-date-pickers";
import { findFormError } from "../utils/helpers/form.helper";

function Subscription() {
  const { user } = useContext(AuthContext) as AuthContextType;
  const [activeStep, setActiveStep] = useState(0);
  const [subscription, setSubscription] = useState<SubscriptionFormData>({
    firstname: "",
    lastname: "",
    email: "",
    EMANumber: "",
    phone: "",
    birthdate: "",
    address: "",
    postalCode: "",
    city: "",
  });
  const [date, setDate] = useState<Dayjs | null>(null);
  const [error, setError] = useState({
    email: "",
    EMANumber: "",
    phone: "",
    postalCode: "",
    birthdate: "",
  });

  useEffect(() => {
    if (user) {
      setSubscription((subcription) => ({
        ...subcription,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        EMANumber: user.EMANumber,
        phone: user.phone,
      }));
    }
  }, [user]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSubscription((subscription) => ({ ...subscription, [name]: value }));
  };

  const handleChangeEMANumber = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    if (value.length > 0 && !REGEX.EMA.test(value)) {
      setError((error) => ({
        ...error,
        EMANumber: "Format incorrect. Exemple de format valide: 42123456.",
      }));
    } else {
      setError((error) => ({ ...error, EMANumber: "" }));
    }

    setSubscription((subscription) => ({ ...subscription, [name]: value }));
  };

  const handleChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (value.length > 0 && !REGEX.phone.test(value)) {
      setError((error) => ({
        ...error,
        phone: "Format incorrect. Exemple de format valide: 0123456789.",
      }));
    } else {
      setError((error) => ({ ...error, phone: "" }));
    }

    setSubscription((subscription) => ({ ...subscription, [name]: value }));
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (value.length > 0 && !REGEX.email.test(value)) {
      setError((error) => ({
        ...error,
        email: "Adresse email invalide.",
      }));
    } else {
      setError((error) => ({
        ...error,
        email: "",
      }));
    }

    setSubscription((subscription) => ({ ...subscription, [name]: value }));
  };

  const handlePostalCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (value.length > 0 && !REGEX.postalCode.test(value)) {
      setError((error) => ({
        ...error,
        postalCode: "Format incorrect. Exemple de format valide: 75000.",
      }));
    } else {
      setError((error) => ({ ...error, postalCode: "" }));
    }

    setSubscription((subscription) => ({ ...subscription, [name]: value }));
  };

  const handleChangeDate = (value: Dayjs | null) => {
    setDate(value);

    if (value && value.isValid()) {
      setSubscription((subscription) => ({
        ...subscription,
        birthdate: value.toISOString(),
      }));
    } else if (!value) {
      setSubscription((subscription) => ({
        ...subscription,
        birthdate: "",
      }));
    }
  };

  const handleErrorDate = (newError: DateValidationError) => {
    console.log(newError);
    switch (newError) {
      case "minDate":
        setError((error) => ({ ...error, birthdate: "Date invalide." }));
        break;

      case "maxDate":
        setError((error) => ({
          ...error,
          birthdate: "Vous devez avoir au moins 8ans.",
        }));
        break;

      case "invalidDate":
        setError((error) => ({ ...error, birthdate: "Date invalide." }));
        break;

      default:
        setError((error) => ({ ...error, birthdate: "" }));
        break;
    }
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <FormStep
            subscription={subscription}
            error={error}
            date={date}
            handleChange={handleChange}
            handleChangeEMANumber={handleChangeEMANumber}
            handleChangeEmail={handleChangeEmail}
            handleChangePhone={handleChangePhone}
            handlePostalCode={handlePostalCode}
            handleChangeDate={handleChangeDate}
            handleErrorDate={handleErrorDate}
          />
        );
      case 1:
        return <PDFStep subscription={subscription} />;
      case 2:
        return <FinalStep />;
      default:
        return <></>;
    }
  };

  const findEmptyField = () => {
    const ignonredKeys = ["EMANumber", "phone"];
    return Object.entries(subscription).find(
      ([key, value]) => !ignonredKeys.includes(key) && value.length === 0
    )
      ? true
      : false;
  };

  return (
    <Box
      sx={{ width: { xs: "100%", md: 600 } }}
      className={styles.subscriptionPage}
    >
      <Typography variant="h4" component={"h1"} fontWeight={600}>
        Adhésion
      </Typography>

      <Stepper activeStep={activeStep} alternativeLabel>
        {SUBSCRIPTION_STEPS.map((label) => {
          const stepProps: { completed?: boolean } = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <Box sx={{ flex: "1 0 auto" }} />

      <Box className={styles.subscriptionContainer}>
        <Card>
          <CardContent className={styles.subscriptionCard}>
            {renderStep()}

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                pt: 2,
                justifyContent: "center",
              }}
            >
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
                variant="contained"
              >
                Retour
              </Button>
              {activeStep < 2 && (
                <Button
                  onClick={handleNext}
                  variant="contained"
                  disabled={
                    activeStep === 0 &&
                    (!!findFormError(error) || findEmptyField())
                  }
                >
                  {activeStep === SUBSCRIPTION_STEPS.length - 1
                    ? "Fin"
                    : "Suivant"}
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ flex: "1 0 auto" }} />
    </Box>
  );
}

export default Subscription;
