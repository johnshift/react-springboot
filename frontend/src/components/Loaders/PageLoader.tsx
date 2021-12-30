import DelayedFallback from './DelayedFallback'

const PageLoader = () => (
  <DelayedFallback>
    <div className="flex justify-center items-center mx-auto h-screen">
      <div className=" flex justify-center items-center">
        <div className="w-32 h-32 rounded-full border-b-2 border-gray-900 animate-spin" />
      </div>
    </div>
  </DelayedFallback>
)

export default PageLoader
