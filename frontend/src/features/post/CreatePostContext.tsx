import { useMediaQuery, useTheme } from "@mui/material";
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useRef,
  RefObject,
} from "react";

import { MentionItem, SuggestionDataItem } from "react-mentions";

interface ICreatePostContext {
  postBody: string;
  setPostBody: Dispatch<SetStateAction<string>>;
  postBodyPlain: string;
  setPostBodyPlain: Dispatch<SetStateAction<string>>;
  postBodyRef: RefObject<HTMLTextAreaElement>;

  cursorPos: number;
  setCursorPos: Dispatch<SetStateAction<number>>;

  asVeil: boolean;
  setAsVeil: Dispatch<SetStateAction<boolean>>;

  mentions: MentionItem[];
  setMentions: Dispatch<SetStateAction<MentionItem[]>>;
  mentionsHint: SuggestionDataItem[];

  isMobile: boolean;
}

const CreatePostContext = createContext<ICreatePostContext>(
  {} as ICreatePostContext
);

export function CreatePostProvider({ children }: { children: ReactNode }) {
  const [postBody, setPostBody] = useState("");
  const [postBodyPlain, setPostBodyPlain] = useState("");
  const postBodyRef = useRef<HTMLTextAreaElement>(null);

  const [cursorPos, setCursorPos] = useState(0);

  const [asVeil, setAsVeil] = useState(false);

  const [mentions, setMentions] = useState<MentionItem[]>([]);
  const [mentionsHint] = useState<ICreatePostContext["mentionsHint"]>([
    {
      id: "john",
      display: "John Ballesteros",
    },
    {
      id: "nikka",
      display: "Nikka Melgar",
    },
    {
      id: "XXX",
      display: "XXX",
    },
  ]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <CreatePostContext.Provider
      value={{
        postBody,
        setPostBody,
        postBodyPlain,
        setPostBodyPlain,
        postBodyRef,
        cursorPos,
        setCursorPos,
        asVeil,
        setAsVeil,
        mentions,
        setMentions,
        mentionsHint,
        isMobile,
      }}
    >
      {children}
    </CreatePostContext.Provider>
  );
}

export default function useCreatePost() {
  return useContext(CreatePostContext);
}
