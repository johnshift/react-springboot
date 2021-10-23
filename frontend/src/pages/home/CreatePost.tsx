import PostAs from './PostAs';
import { useState } from 'preact/hooks';
import Emojis from './Emojis';
import IconButton from '../../components/reusable/IconButton';
import Mention from '../../components/svg/MentionSvg';

import Schedule from '../../components/svg/ScheduleSvg';
import EmoticonSvg from '../../components/svg/EmoticonSvg';

const Image = () => (
  <a
    href="/someuser"
    class="
      bg-true-gray-400 rounded-full
      h-15 w-15 
      md:h-20 md:w-20
    "
  />
);

const PostBtn = () => (
  <button
    type="button"
    class="border-r border-2 text-white bg-pink-800 hover:bg-pink-700 font-medium text-sm px-5 py-2.5 text-center focus:outline-none"
  >
    Post
  </button>
);

const ImageArea = () => (
  <div
    class=" flex
    w-18/100 md:w-25/100 lg:w-18/100 lg:justify-center
    "
  >
    <Image />
  </div>
);

const FormArea = () => {
  const [showEmojis, setShowEmojis] = useState(false);
  const [text, setText] = useState('');

  return (
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
          aria-label="share your secrets!"
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
                setShowEmojis(!showEmojis);
              }}
            />
            <IconButton icon={<Mention />} label="mention a person" />
            <IconButton icon={<Schedule />} label="schedule when to post" />
          </div>
          <div class="flex h-full w-65/100 justify-end items-center">
            <PostBtn />
            <PostAs />
          </div>
        </div>

        {/* EMOJIS */}
        <div class={showEmojis ? 'visible' : 'hidden'}>
          <Emojis text={text} setText={setText} setShowEmojis={setShowEmojis} />
        </div>
      </div>
    </div>
  );
};

const CreatePost = () => (
  <div
    class="
    flex justify-between w-full mb-5 p-3 pt-5
    h-200px
    bg-light-100 shadow-md
    "
  >
    <ImageArea />
    <FormArea />
  </div>
);

export default CreatePost;
