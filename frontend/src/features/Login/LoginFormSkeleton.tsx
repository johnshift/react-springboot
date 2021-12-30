const LoginFormSkeleton = () => {
  return (
    <div className="p-10 py-9 w-11/12 lg:w-9/12 hd:w-8/12 rounded-lg border border-gray-200 shadow-sm">
      <div className="pb-1" id="login-skeleton">
        <div className="mb-10 w-full h-12 bg-gray-300 rounded-lg animate-shimmer" />
        <div className="mb-10 w-full h-12 bg-gray-300 rounded-lg animate-shimmer" />
        <div className="flex justify-between items-center">
          <div className="w-6/12 h-10 bg-gray-300 rounded-lg animate-shimmer" />
          <div className="px-4 w-24 h-10 bg-gray-300 rounded-lg animate-shimmer" />
        </div>
      </div>
    </div>
  )
}

export default LoginFormSkeleton
