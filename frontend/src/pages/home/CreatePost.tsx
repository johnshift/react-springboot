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

const Heart = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-7 w-7"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
      clipRule="evenodd"
    />
  </svg>
);

const Mention = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
    />
  </svg>
);

const Edit = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
    <path
      fillRule="evenodd"
      d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
      clipRule="evenodd"
    />
  </svg>
);

const PostBtn = () => (
  <button
    type="button"
    class="border-r border-2 text-white bg-pink-800 hover:bg-pink-700 font-medium text-sm px-5 py-2.5 text-center"
  >
    Post
  </button>
);

const PostAs = () => (
  <button
    type="button"
    class="text-white bg-pink-800 hover:bg-pink-700 font-medium text-sm p-2.5 text-center inline-flex items-center mr-3"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M6.625 2.655A9 9 0 0119 11a1 1 0 11-2 0 7 7 0 00-9.625-6.492 1 1 0 11-.75-1.853zM4.662 4.959A1 1 0 014.75 6.37 6.97 6.97 0 003 11a1 1 0 11-2 0 8.97 8.97 0 012.25-5.953 1 1 0 011.412-.088z"
        clipRule="evenodd"
      />
      <path
        fillRule="evenodd"
        d="M5 11a5 5 0 1110 0 1 1 0 11-2 0 3 3 0 10-6 0c0 1.677-.345 3.276-.968 4.729a1 1 0 11-1.838-.789A9.964 9.964 0 005 11zm8.921 2.012a1 1 0 01.831 1.145 19.86 19.86 0 01-.545 2.436 1 1 0 11-1.92-.558c.207-.713.371-1.445.49-2.192a1 1 0 011.144-.83z"
        clipRule="evenodd"
      />
      <path
        fillRule="evenodd"
        d="M10 10a1 1 0 011 1c0 2.236-.46 4.368-1.29 6.304a1 1 0 01-1.838-.789A13.952 13.952 0 009 11a1 1 0 011-1z"
        clipRule="evenodd"
      />
    </svg>
  </button>
);

const FormBody = () => (
  <div
    class="
    h-65/100 pb-5
  "
  >
    <textarea
      id="message"
      name="message"
      class="
      w-full h-full bg-light-50 rounded border border-gray-300 focus:border-pink-600 text-base outline-none text-gray-700 py-1 px-3 resize-none
      "
      placeholder="Want to share a secret?"
    />
  </div>
);

const FormBtns = () => (
  <div
    class="
    h-25/100
  "
  >
    <div class="flex border-t border-gray-300 pt-3 items-center">
      <div class="flex h-full w-35/100 text-true-gray-600 justify-around items-center">
        <button class="focus:outline-none hover:text-pink-800">
          <Heart />
        </button>
        <button class="focus:outline-none hover:text-pink-800">
          <Mention />
        </button>
        <button class="focus:outline-none hover:text-pink-800">
          <Edit />
        </button>
      </div>
      <div class="flex h-full w-65/100 justify-end items-center">
        <PostBtn />
        <PostAs />
      </div>
    </div>
  </div>
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

const FormArea = () => (
  <div
    class="
    p-2
    w-82/100 md:w-75/100 lg:w-82/100
    "
  >
    <FormBody />
    <FormBtns />
  </div>
);

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
