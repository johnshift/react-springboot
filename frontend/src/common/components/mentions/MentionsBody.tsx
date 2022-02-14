interface Props {
  body: string;
  isPostBody?: boolean;
}

import { Mention, MentionsInput, SuggestionDataItem } from "react-mentions";

import postBodyClasses from "../../../styles/postMentionsBody.module.css";
import commentsBodyClasses from "../../../styles/commentsMentionsBody.module.css";

const MentionsBody = ({ body, isPostBody = false }: Props) => {
  const classNames = isPostBody ? postBodyClasses : commentsBodyClasses;

  return (
    <MentionsInput classNames={classNames} value={body} className="mentions">
      <Mention
        trigger=""
        markup="^__display__^"
        // markup="@[__display__](__id__)"
        className={classNames.mentions__mention}
        data={[] as SuggestionDataItem[]}
        appendSpaceOnAdd
        // displayTransform={(id: string, display: string) => {
        //   return `<a href='/${display}'>${display}</a>`;
        // }}
      />
    </MentionsInput>
  );
};

export default MentionsBody;
