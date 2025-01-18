import React from 'react';
import StyledLeagueTable from '../sub-components/StyledLeagueTable';

const Home = () => {
  return (
    <div className="min-h-screen flex items-center px-2 sm:px-4 md:px-8">
      <div className="container mx-auto flex flex-col items-center gap-6 sm:gap-8 md:gap-12 mt-12 sm:mt-16 md:mt-24">
        {/* Text Content */}
        <div className="w-full space-y-8 sm:space-y-12 md:space-y-16 pl-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight text-left pt-8 sm:pt-12 md:pt-20 mt-4 sm:mt-8 md:mt-12 pl-0">
            Dive into the ultimate gaming hub where passion meets precision!
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-white text-center mx-auto max-w-[90%] sm:max-w-xl md:max-w-2xl">
            <span className="font-bold animate-rainbow-text">E.V.A</span> is your one-stop destination for everything esports. Whether you're a casual gamer, a competitive pro, or someone who just loves staying updated, we've got you covered.
          </p>
        </div>

        <StyledLeagueTable/>
      </div>
    </div>
  );
};

export default Home;