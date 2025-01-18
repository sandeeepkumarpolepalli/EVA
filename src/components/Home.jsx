import React from 'react';
import StyledLeagueTable from '../sub-components/StyledLeagueTable';

const Home = () => {
  return (
    <div className="min-h-screen flex items-center px-8">
      <div className="container mx-auto flex flex-col items-center gap-12 mt-24">
        {/* Text Content */}
        <div className="w-full space-y-16 pl-0">
          <h1 className="text-6xl font-bold text-white leading-tight text-left pt-20 mt-12 pl-0">
            Dive into the ultimate gaming hub where passion meets precision!
          </h1>
          
          <p className="text-xl text-center mx-auto max-w-2xl">
            <span className="font-bold animate-rainbow-text">E.V.A</span> is your one-stop destination for everything esports. Whether you're a casual gamer, a competitive pro, or someone who just loves staying updated, we've got you covered.
          </p>
        </div>

        <StyledLeagueTable/>
      </div>
    </div>
  );
};

export default Home;