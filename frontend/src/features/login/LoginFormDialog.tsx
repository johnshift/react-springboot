import loadable from "@loadable/component";

import { Dialog } from "@mui/material";

import PageLoader from "../../common/components/loaders/PageLoader";

const LoginForm = loadable(() => import("./LoginForm"), {
  fallback: <PageLoader />,
});

interface Props {
  onClose: () => void;
  open: boolean;
}

const LoginFormDialog = ({ open, onClose }: Props) => {
  return (
    <Dialog
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          margin: 0,
        },
      }}
    >
      <LoginForm onClose={onClose} />
    </Dialog>
  );
};

export default LoginFormDialog;
