import Feed from '@/components/Feed';
import Provider from '@/components/Provider';

const Home = () => {
  return (
    <div className="w-full flex-col flex-center">
      <h1 className="head_text text-center">
        Share & Connect
        <br />
        <span className="orange_gradient text-center">Teddy Quote</span>
      </h1>
      <p className="desc mt-20 text-center">
        TedQuote is a social-media for everyone to discover, create and share
        meaning quotes
      </p>

      <Feed />
    </div>
  );
};

export default Home;
