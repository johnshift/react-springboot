import {
  Box,
  Button,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";

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
    register,
    isLoading,
    setIsLoading,
  } = useRegister();

  const steps = [
    {
      label: "Login Details",
      sub: "Provide Username and Email",
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
      content: <VeilDetails />,
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
    } else if (activeStep === 1) {
      const firstnameOK = registerState.firstname.isValid;
      const lastnameOK = registerState.lastname.isValid;

      if (firstnameOK && lastnameOK && payload.desc.trim().length !== 0) {
        return false;
      }
    } else if (activeStep === 2) {
      const veilOK = registerState.veil.isValid;
      const veilNoConflict = payload.username !== payload.veil;

      if (veilOK && veilNoConflict && payload.veildesc.trim().length !== 0) {
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
        isLoading,
        setIsLoading,
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
                    disabled={isLoading || checkCantProceed()}
                    variant="contained"
                    onClick={async () => {
                      if (activeStep === 2) {
                        register();
                        return;
                      }

                      if (activeStep === 3) {
                        alert("todo");
                        return;
                      }

                      handleStep(true);
                    }}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1
                      ? "Complete Registration"
                      : "Continue"}
                  </Button>
                  <Button
                    disabled={index === 0 || index === 3}
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
