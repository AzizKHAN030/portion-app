import React from 'react';

import Footer from './components/footer';
import Heading from './components/heading';
import Heroes from './components/heroes';

const MarketingPage = () => {
  return (
    <div className="h-full flex flex-col ">
      <div className="flex flex-col items-center justify-center md:justify-center-start text-center gap-y-8 flex-1 px-6 pb-10 dark:bg-[#1F1F1F]">
        <Heading />
        <Heroes />
      </div>
      <Footer />
    </div>
  );
};

export default MarketingPage;
