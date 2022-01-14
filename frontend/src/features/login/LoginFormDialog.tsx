import { Dialog } from "@mui/material";
import loadable from "@loadable/component";
import PageLoader from "../../components/PageLoader";

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
      <LoginForm />
    </Dialog>
  );
};

export default LoginFormDialog;
