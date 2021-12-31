// import { Suspense, lazy } from 'react'
// import toast from 'react-hot-toast'

// const ToasterEl = lazy(() =>
//   import('react-hot-toast').then((module) => {
//     return { default: module.Toaster }
//   })
// )

const LandingHero = () => {
  return (
    <>
      <div className="mr-5 mb-5 md:mb-10 text-7xl font-bold text-red-700">
        <h1>veils</h1>
      </div>

      <div className="order-3 md:order-2 pl-3 mb-5 md:mb-10 text-xl lg:text-2xl hd:text-3xl font-medium">
        <h2>Share your secrets anonymously</h2>
      </div>

      <div className="order-2 md:order-3">
        <button
          className="md:w-24 font-semibold hover:text-white bg-white hover:bg-red-700 border border-gray-300"
          onClick={() => {
            alert('Work in progress. Stay tuned!')
          }}
        >
          Demo
        </button>
      </div>
    </>
  )
}

export default LandingHero
