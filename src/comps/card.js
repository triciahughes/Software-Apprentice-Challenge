import React from "react";
import { randFloat } from "three/src/math/MathUtils";

const Card = ({ data }) => {
  /// Random Image if no image is provided ///
  data.forEach((ad) => {
    if (!ad.imageSrc) {
      ad.imageSrc = `https://picsum.photos/600/400?random=${randFloat(
        0,
        1000
      )}`;
    }
  });

  /// Render Cards ///
  const renderCards = data?.map((ad, index) => {
    return (
      <div
        className='my-1 px-1 w-full max-h-50 md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3'
        key={randFloat(0, 1000)}
      >
        <article className='overflow-hidden rounded-lg shadow-lg'>
          <a href='#'>
            <img
              alt='Placeholder for campaign image if applicable'
              className='block h-auto w-full'
              src={ad.imageSrc}
            />
          </a>
          <header className='flex items-center  md:p-4'>
            <h1 className='text-lg text-primary'>{ad.campaign}</h1>
          </header>
          <div className='flex items-center justify-between leading-tight p-4 md:p-4'>
            <div>
              <p className='text-sm text-secondary font-bold'>{ad.adset}</p>
              <p className='text-sm italic'>{ad.creative}</p>
              <p className='text-sm text-green-700'>
                Google Analytics Results: {ad.results}
              </p>
            </div>
            <div>
              <p className='text-sm text-blue-400'>Clicks: {ad.clicks}</p>
              <p className='text-sm text-blue-800'>Imp: {ad.impressions}</p>
              <p className='text-sm text-orange-500'>Spend: {ad.spend}</p>
            </div>
          </div>
        </article>
      </div>
    );
  });
  return <>{renderCards}</>;
};

export default Card;
