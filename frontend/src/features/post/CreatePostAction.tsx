import { useCallback } from "react";
import { Button, ButtonGroup } from "@mui/material";

import useToast from "../toast/useToast";
import useCreatePost from "./CreatePostContext";

import FingerprintIcon from "@mui/icons-material/Fingerprint";
import PersonIcon from "@mui/icons-material/Person";

const CreatePostAction = () => {
  const { asVeil, setAsVeil, createPost } = useCreatePost();
  const { toastInfo } = useToast();

  const handlePostAs = useCallback(() => {
    const msg = !asVeil ? "Posting Anonymously" : "Posting as John Ballesteros";
    toastInfo(msg);
    setAsVeil(!asVeil);
  }, [asVeil, setAsVeil, toastInfo]);

  return (
    <ButtonGroup size="large" variant="outlined" color="secondary">
      <Button onClick={createPost}>Post</Button>
      <Button size="medium" onClick={handlePostAs}>
        {asVeil ? <FingerprintIcon /> : <PersonIcon />}
      </Button>
    </ButtonGroup>
  );
};

export default CreatePostAction;
