interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  desc: string;
  veil: string;
  veildesc: string;
}

interface ToggleState {
  password: boolean;
  veil: boolean;
}

interface RegisterField {
  isValid: boolean;
  msg: string;
  msgColor: string;
}

type RegisterState = Record<keyof RegisterPayload, RegisterField>;

type AvailabilityField = {
  available: boolean;
  msg: string;
  msgColor: string;
};

interface AvailabilityState {
  username: AvailabilityField;
  email: AvailabilityField;
  veil: AvailabilityField;
}

type ToggledField = "password" | "veil";
