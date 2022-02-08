import {
  Box,
  Button,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";

import ConfirmDetails from "./ConfirmDetails";
import LoginDetails from "./LoginDetails";
import ProfileDetails from "./ProfileDetails";
import RegisterContext from "./RegisterContext";

import useRegister from "./useRegister";
import VeilDetails from "./VeilDetails";

const RegisterForm = () => {
  const {
    started,
    setStarted,
    activeStep,
    handleStep,
    toggleState,
    payload,
    setPayload,
    toggleField,
    onChangeHandler,
    registerState,
    setRegisterState,
  } = useRegister();

  const steps = [
    {
      label: "Login Details",
      sub: "Username/Email can be used to login",
      content: (
        <LoginDetails
          showPassword={toggleState.password}
          togglePassword={() => toggleField("password")}
        />
      ),
    },
    {
      label: "Profile",
      sub: "Customize your personal info",
      content: <ProfileDetails />,
    },
    {
      label: "Veil Profile",
      sub: "Create your anonymous profile",
      content: (
        <VeilDetails
          showVeil={toggleState.veil}
          toggleVeil={() => toggleField("veil")}
        />
      ),
    },
    {
      label: "Confirm Account",
      sub: "Enter confirmation code",
      content: <ConfirmDetails />,
    },
  ];

  const checkCantProceed = (): boolean => {
    if (activeStep === 0) {
      const usernameOK = registerState.username.isValid;
      const emailOK = registerState.email.isValid;
      const passwordOK = registerState.password.isValid;

      if (usernameOK && emailOK && passwordOK) {
        return false;
      }
    }

    return true;
  };

  return (
    <RegisterContext.Provider
      value={{
        started,
        setStarted,
        activeStep,
        handleStep,
        toggleState,
        payload,
        setPayload,
        toggleField,
        onChangeHandler,
        registerState,
        setRegisterState,
      }}
    >
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={<Typography variant="caption">{step.sub}</Typography>}
            >
              {step.label}
            </StepLabel>
            <StepContent>
              {step.content}
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    disabled={checkCantProceed()}
                    variant="contained"
                    onClick={() => handleStep(true)}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? "Finish" : "Continue"}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={() => handleStep(false)}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </RegisterContext.Provider>
  );
};

export default RegisterForm;
