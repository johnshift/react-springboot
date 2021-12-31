import LandingHeroSkeleton from 'components/Hero/LandingHeroSkeleton'
import LoginFormSkeleton from './LoginFormSkeleton'

const LoginPageSkeleton = () => {
  return (
    <main
      slot="body"
      className="flex flex-col md:flex-row justify-center items-center md:px-10 lg:px-56 hd:px-96 h-screen"
    >
      <article className="flex md:flex-row md:justify-end md:w-1/2 h-40 md:h-1/2">
        <div className="flex md:flex-col flex-wrap md:justify-center items-center md:items-start p-5 h-full">
          <LandingHeroSkeleton />
        </div>
      </article>

      <section className="flex justify-center md:justify-start items-center py-5 w-full md:w-1/2 md:h-1/2">
        <LoginFormSkeleton />
      </section>
    </main>
  )
}

export default LoginPageSkeleton
