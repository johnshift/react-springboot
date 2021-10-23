import IconButton from '../../components/reusable/IconButton';

type EmojisProps = {
  text: string;
  setText: Function;
  setShowEmojis: Function;
};

const Emojis = ({ text, setText, setShowEmojis }: EmojisProps) => (
  <div
    class="
            -mt-5
          left-22 
          md:right-20
          lg:left-998px lg:mr-15
          xl:left-1295px  xl:mr-80
          "
  >
    <div class="fixed top-0 left-0 h-screen w-screen z-1" onClick={() => setShowEmojis(false)} />

    <div
      class="
          absolute mt-6 w-40 rounded-md shadow-lg bg-white focus:outline-none z-2 text-left
          h-200px w-50
          "
      style={{ overflowY: 'scroll', maxHeight: '100%' }}
      tabIndex={-1}
    >
      <div class="grid grid-cols-5">
        {emojis.map((emoji, i) => {
          return (
            <IconButton
              key={i}
              icon={emoji.symbol}
              label={emoji.label}
              onClick={() => {
                setText(`${text}${emoji.symbol}`);
                setShowEmojis(false);
                console.log('emoji: ', emoji);
              }}
            />
            // <button
            //   key={i}
            //   type="button"
            //   aria-label={emoji.label}
            //   class="bg-white hover:bg-light-500 rounded-full p-2 outline-none focus:outline-none"
            //   onClick={() => {
            //     setText(`${text}${emoji.symbol}`);
            //     setShowEmojis(false);
            //     console.log('emoji: ', emoji);
            //   }}
            // >
            //   {emoji.symbol}
            // </button>
          );
        })}
      </div>
    </div>
  </div>
);
export default Emojis;

export const emojis = [
  {
    symbol: '🙂',
    label: 'slightly smiling face',
  },
  {
    symbol: '😆',
    label: 'grinning squinting face',
  },
  {
    symbol: '🤣',
    label: 'rolling on the floor laughing',
  },
  {
    symbol: '😅',
    label: 'grinning face with sweat',
  },
  {
    symbol: '😁',
    label: 'beaming face with smiling eyes',
  },
  {
    symbol: '😊',
    label: 'smiling face with smiling eyes',
  },
  {
    symbol: '😳',
    label: 'flushed face',
  },
  {
    symbol: '🤭',
    label: 'face with hand over mouth',
  },
  {
    symbol: '😚',
    label: 'kissing face with closed eyes',
  },
  {
    symbol: '🤗',
    label: 'smiling face with open hands',
  },
  {
    symbol: '😘',
    label: 'face blowing a kiss',
  },
  {
    symbol: '🥰',
    label: 'smiling face with hearts',
  },
  {
    symbol: '😍',
    label: 'smiling face with heart-eyes',
  },
  {
    symbol: '🤩',
    label: 'star-struck',
  },
  {
    symbol: '😇',
    label: 'smiling face with halo',
  },
  {
    symbol: '🤫',
    label: 'shushing face',
  },
  {
    symbol: '🥲',
    label: 'smiling face with tear',
  },
  {
    symbol: '😉',
    label: 'winking face',
  },
  {
    symbol: '😝',
    label: 'squinting face with tongue',
  },
  {
    symbol: '🤪',
    label: 'zany face',
  },
  {
    symbol: '🤤',
    label: 'drooling face',
  },
  {
    symbol: '😎',
    label: 'smiling face with sunglasses',
  },
  {
    symbol: '😲',
    label: 'astonished face',
  },
  {
    symbol: '🤯',
    label: 'exploding head',
  },
  {
    symbol: '🥳',
    label: 'partying face',
  },
  {
    symbol: '🤔',
    label: 'thinking face',
  },
  {
    symbol: '🤨',
    label: 'face with raised eyebrow',
  },
  {
    symbol: '😐',
    label: 'neutral face',
  },
  {
    symbol: '😒',
    label: 'unamused face',
  },
  {
    symbol: '🙄',
    label: 'face exhaling',
  },
  {
    symbol: '😔',
    label: 'pensive face',
  },
  {
    symbol: '😟',
    label: 'worried face',
  },
  {
    symbol: '🤧',
    label: 'sneezing face',
  },
  {
    symbol: '😷',
    label: 'face with medical mask',
  },
  {
    symbol: '🤮',
    label: 'face vomiting',
  },
  {
    symbol: '😫',
    label: 'tired face',
  },
  {
    symbol: '😭',
    label: 'loudly crying face',
  },
  {
    symbol: '😨',
    label: 'fearful face',
  },
  {
    symbol: '😱',
    label: 'face screaming in fear',
  },
  {
    symbol: '😖',
    label: 'confounded face',
  },
  {
    symbol: '😠',
    label: 'angry face',
  },
  {
    symbol: '😤',
    label: 'face with steam from nose',
  },
  {
    symbol: '😡',
    label: 'pouting face',
  },
  {
    symbol: '🤬',
    label: 'face with symbols on mouth',
  },
  {
    symbol: '😈',
    label: 'angry face with horns',
  },
  {
    symbol: '💖',
    label: 'sparkling heart',
  },
  {
    symbol: '💔',
    label: 'broken heart',
  },
  {
    symbol: '💕',
    label: 'two hearts',
  },
  {
    symbol: '💞',
    label: 'revolving hearts',
  },
  {
    symbol: '💓',
    label: 'beating heart',
  },
  {
    symbol: '💩',
    label: 'pile of poo',
  },
  {
    symbol: '🤡',
    label: 'clown face',
  },
  {
    symbol: '🍆',
    label: 'eggplant',
  },
  {
    symbol: '💤',
    label: 'zzz',
  },
  {
    symbol: '💦',
    label: 'sweat droplets',
  },
  {
    symbol: '👉',
    label: 'backhand index pointing right',
  },
  {
    symbol: '👌',
    label: 'OK hand',
  },
  {
    symbol: '👍',
    label: 'thumbs up',
  },
  {
    symbol: '🤝',
    label: 'handshake',
  },
  {
    symbol: '🙏',
    label: 'folded hands',
  },
  {
    symbol: '✌',
    label: 'peace hand',
  },
  {
    symbol: '🤘',
    label: 'rock-and-roll gesture',
  },
  {
    symbol: '👎',
    label: 'thumbs down',
  },
  {
    symbol: '🤞',
    label: 'crossed fingers',
  },
  {
    symbol: '👊',
    label: 'left-facing fist',
  },
  {
    symbol: '✨',
    label: 'sparkles',
  },
  {
    symbol: '🎉',
    label: 'party popper',
  },
  {
    symbol: '🎊',
    label: 'confetti ball',
  },
  {
    symbol: '🏅',
    label: 'medal',
  },
  {
    symbol: '🏆',
    label: 'trophy',
  },
  {
    symbol: '🐷',
    label: 'pig face',
  },
  {
    symbol: '🐽',
    label: 'pig nose',
  },
  {
    symbol: '🔥',
    label: 'fire',
  },
  {
    symbol: '📷',
    label: 'camera',
  },
  {
    symbol: '🔞',
    label: 'no one under eighteen',
  },
  {
    symbol: '👄',
    label: 'mouth',
  },
  {
    symbol: '👅',
    label: 'tongue',
  },
  {
    symbol: '💧',
    label: 'droplet',
  },
  {
    symbol: '❓',
    label: 'red question mark',
  },
  {
    symbol: '❗',
    label: 'red exclamation mark',
  },
  {
    symbol: '🤦',
    label: 'person facepalming',
  },
  {
    symbol: '🤷‍♂️',
    label: 'man shrugging',
  },
  {
    symbol: '🤷‍♀️',
    label: 'woman shrugging',
  },
  {
    symbol: '🙅‍♂️',
    label: 'man gesturing NO',
  },
  {
    symbol: '🙅‍♀️',
    label: 'woman gesturing NO',
  },
];

// export const emojis = [
//   '🙂',
//   '😆',
//   '🤣',
//   '😅',
//   '😁',
//   '😊',
//   '😳',
//   '🤭',
//   '😚',
//   '🤗',
//   '😘',
//   '🥰',
//   '😍',
//   '🤩',
//   '😇',
//   '🤫',
//   '🥲',
//   '😉',
//   '😝',
//   '🤪',
//   '🤤',
//   '😎',
//   '😲',
//   '🤯',
//   '🥳',
//   '🤔',
//   '🤨',
//   '😐',
//   '😒',
//   '🙄',
//   '😔',
//   '😟',
//   '🤧',
//   '😷',
//   '🤮',
//   '😫',
//   '😭',
//   '😨',
//   '😱',
//   '😖',
//   '😠',
//   '😤',
//   '😡',
//   '🤬',
//   '😈',
//   '💖',
//   '💔',
//   '💕',
//   '💞',
//   '💓',
//   '💩',
//   '🤡',
//   '🍆',
//   '💤',
//   '💦',
//   '👉',
//   '👌',
//   '👍',
//   '🤝',
//   '🙏',
//   '✌',
//   '🤘',
//   '👎',
//   '🤞',
//   '👊',
//   '✨',
//   '🎉',
//   '🎊',
//   '🏅',
//   '🏆',
//   '🐷',
//   '🐽',
//   '🔥',
//   '📷',
//   '🔞',
//   '👄',
//   '👅',
//   '💧',
//   '❓',
//   '❗',
//   '🤦',
//   '🤷‍♂️',
//   '🤷‍♀️',
//   '🙅‍♂️',
//   '🙅‍♀️',
// ];
