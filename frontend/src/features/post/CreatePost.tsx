import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Divider,
  IconButton,
  Paper,
  SvgIcon,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ScheduleIcon from "@mui/icons-material/Schedule";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import PersonIcon from "@mui/icons-material/Person";

import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import useToast from "../toast/useToast";
import SelectEmoji from "./SelectEmoji";

const CreatePostField = ({
  postBody,
  setPostBody,
  setCursorPos,
}: {
  postBody: string;
  setPostBody: Dispatch<SetStateAction<string>>;
  setCursorPos: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <TextField
      label="Create Post"
      placeholder="Something you want to share?"
      multiline
      rows={4}
      // fullWidth
      sx={{ mb: 2 }}
      focused
      color="secondary"
      value={postBody}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        setPostBody(e.currentTarget.value);
        setCursorPos(e.target.selectionStart as number);
      }}
      onBlur={(e) => {
        setCursorPos(e.target.selectionStart as number);
      }}
      onClick={(e: unknown) => {
        setCursorPos(
          (e as ChangeEvent<HTMLInputElement>).target.selectionStart as number
        );
      }}
    />
  );
};

const CreatePostOptions = ({
  postBody,
  setPostBody,
  cursorPos,
}: {
  postBody: string;
  setPostBody: Dispatch<SetStateAction<string>>;
  cursorPos: number;
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));

  const size = isMobile ? "medium" : "large";

  const [openEmoji, setOpenEmoji] = useState(false);

  return (
    <>
      <IconButton
        aria-label="select emoji"
        size={size}
        onClick={() => setOpenEmoji(true)}
      >
        <FavoriteIcon fontSize="inherit" />
      </IconButton>
      <IconButton aria-label="mention" size={size}>
        <SvgIcon fontSize="inherit">
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M20 12a8 8 0 10-3.562 6.657l1.11 1.664A9.953 9.953 0 0112 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10v1.5a3.5 3.5 0 01-6.396 1.966A5 5 0 1115 8h2v5.5a1.5 1.5 0 003 0V12zm-8-3a3 3 0 100 6 3 3 0 000-6z" />
        </SvgIcon>
      </IconButton>
      <IconButton aria-label="schedule" size={size}>
        <ScheduleIcon fontSize="inherit" />
      </IconButton>
      <SelectEmoji
        open={openEmoji}
        onClose={() => setOpenEmoji(false)}
        postBody={postBody}
        setPostBody={setPostBody}
        cursorPos={cursorPos}
      />
    </>
  );
};
const CreatePostAction = () => {
  const [asVeil, setAsVeil] = useState(true);
  const [startPostAs, setStartPostAs] = useState(false);
  const { toastInfo } = useToast();

  useEffect(() => {
    if (startPostAs) {
      const msg = asVeil
        ? "Posting Anonymously"
        : "Posting as John Ballesteros";
      toastInfo(msg);
    }
  }, [asVeil]);

  return (
    <ButtonGroup size="large" variant="outlined" color="secondary">
      <Button>Post </Button>
      <Button
        size="medium"
        onClick={() => {
          if (!startPostAs) {
            setStartPostAs(true);
          }
          setAsVeil(!asVeil);
        }}
      >
        {asVeil ? <FingerprintIcon /> : <PersonIcon />}
      </Button>
    </ButtonGroup>
  );
};

const CreatePost = () => {
  const [postBody, setPostBody] = useState("");

  const [cursorPos, setCursorPos] = useState(0);

  return (
    <Paper sx={{ width: "clamp(300px, 100%, 480px)" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 2,
        }}
      >
        <CreatePostField
          postBody={postBody}
          setPostBody={setPostBody}
          setCursorPos={setCursorPos}
        />
        <Divider />
        <Box sx={{ display: "flex", justifyContent: "space-between", pt: 2 }}>
          <Box>
            <CreatePostOptions
              postBody={postBody}
              setPostBody={setPostBody}
              cursorPos={cursorPos}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <CreatePostAction />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default CreatePost;
