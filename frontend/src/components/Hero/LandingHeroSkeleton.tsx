const LandingHeroSkeleton = () => {
  return (
    <>
      <div className="mt-5 mr-5 mb-5 md:mb-10 bg-gray-300 rounded-lg animate-shimmer">
        <div className="w-40 h-12"></div>
      </div>

      <div className="order-3 md:order-2 pl-3 mb-5 md:mb-10 text-xl lg:text-2xl hd:text-3xl font-medium text-transparent bg-gray-300 rounded-lg animate-shimmer">
        <h2>Share your secrets anonymously</h2>
      </div>

      <div className="order-2 md:order-3 bg-gray-300 rounded-lg animate-shimmer">
        <div className="w-20 md:w-24 h-10" />
      </div>
    </>
  )
}

export default LandingHeroSkeleton
