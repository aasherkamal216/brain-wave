import Feed from '@components/Feed';

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
           Discover & Share
           <br className="max-md" />
           <span className="blue_gradient text-center">
           Creative AI Prompts
           </span>
        </h1>
        <p className="desc text-center">
        BrainWave is a community-driven, open-source platform for creating,
        discovering, and sharing AI prompts.
        </p>
        <Feed />
    </section>
  )
}

export default Home