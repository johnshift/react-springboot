import { useState } from 'preact/hooks';
import IconButton from '../reusable/IconButton';
import EmoticonSvg from '../svg/EmoticonSvg';
import MentionSvg from '../svg/MentionSvg';
import ScheduleSvg from '../svg/ScheduleSvg';
import EmojiSelection from './EmojiSelection';
import PostAs from './PostAs';

const CreatePost = () => {
  const [showEmojiSelection, setShowEmojiSelection] = useState(false);
  const [text, setText] = useState('');

  return (
    <div
      class="
        flex justify-between w-full mb-5 p-3 pt-5
        h-200px
        bg-light-100 shadow-md
      "
    >
      <div
        class="
          flex
          w-18/100 md:w-25/100 lg:w-18/100 lg:justify-center
        "
      >
        {/* PROFILE PICTURE */}
        <a
          href="/someuser"
          aria-label="Profile Picture"
          class="
            bg-true-gray-400 rounded-full
            h-15 w-15 
            md:h-20 md:w-20
          "
        />
      </div>
      <div class="p-2 w-82/100 md:w-75/100 lg:w-82/100">
        {/* TEXTAREA */}
        <div class="h-65/100 pb-5">
          <textarea
            id="message"
            name="message"
            value={text}
            onChange={(e) => {
              setText((e.target as HTMLInputElement).value);
            }}
            aria-label="share your secrets"
            class="
            w-full h-full bg-light-50 py-1 px-3 resize-none
            text-base outline-none text-gray-700 
            rounded border border-gray-300 
            focus:border-pink-600 
          "
            placeholder="Want to share a secret?"
          />
        </div>

        {/* FORM BUTTONS */}
        <div class="h-25/100">
          <div class="flex border-t border-gray-300 pt-3 items-center">
            <div class="flex h-full w-35/100 text-true-gray-600 justify-around items-center">
              <IconButton
                icon={<EmoticonSvg />}
                label="select emoji"
                onClick={() => {
                  setShowEmojiSelection(!showEmojiSelection);
                }}
              />
              <IconButton icon={<MentionSvg />} label="mention a person" />
              <IconButton icon={<ScheduleSvg />} label="schedule when to post" />
            </div>
            <div class="flex h-full w-65/100 justify-end items-center">
              <button
                type="button"
                aria-label="Create Post"
                class="border-r border-2 text-white bg-pink-800 hover:bg-pink-700 font-medium text-sm px-5 py-2.5 text-center focus:outline-none"
              >
                Post
              </button>
              <PostAs />
            </div>
          </div>

          {/* EmojiSelection */}
          <div class={`z-20 ${showEmojiSelection ? 'visible' : 'hidden'}`} tabIndex={0}>
            <EmojiSelection
              text={text}
              setText={setText}
              setShowEmojiSelection={setShowEmojiSelection}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
