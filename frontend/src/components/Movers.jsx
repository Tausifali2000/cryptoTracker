import { useEffect } from "react";

import { useChartStore } from "../stores/chart.store";
import { useMoversStore } from "../stores/movers.store";
import { useCoinStore } from "../stores/coin.store";

const Movers = () => {
  const { topGainers, topLosers, fetchMovers, fetchingMovers } = useMoversStore();
  const { fetchChartData } = useChartStore();
  const { setSelectedCoin } = useCoinStore()



  const handleSelection = async (mover) => {
    await setSelectedCoin(mover);
    fetchChartData();

  };

  const renderCoinList = (movers) => (
    <ul className=" grid gap-2 overflow-x-hidden  px-4 py-4">
      
      {(movers || []).slice(0, 20).map((mover) => {
        const {
          name,
        
          symbol,
          image,
          id,
          price_change_percentage_24h,
          current_price,
        } = mover;

        return (
          <li
            key={id}
            onClick={() => handleSelection(mover)}
            className="flex cursor-pointer justify-between rounded-md px-4 py-4 duration-300 ease-in-out hover:bg-accent/40"
          >
            <div className="flex items-center gap-4">
              <img
                src={image}
                className="h-10 w-10 object-contain"
                alt={name}
              />
              <div>
                <div>
                  <span className="text-base font-bold text-lightPrimary dark:text-DarkPrimary">
                    {name}
                  </span>
                  <span className="pl-1 text-sm font-light uppercase text-lightSecondary dark:text-DarkSecondary">
                    ({symbol})
                  </span>
                </div>
                <span className="text-base text-lightSecondary dark:text-DarkSecondary">
                  ${current_price}
                </span>
                <span className="text-sm font-light capitalize text-lightSecondary dark:text-DarkSecondary">
                  USD
                </span>
              </div>
            </div>

            <div className="hidden flex-col md:flex">
              <div>
                
              </div>
              <div className="flex gap-4 self-end">
                {price_change_percentage_24h > 0 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    className="h-6 w-6 stroke-green stroke-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    className="h-6 w-6 stroke-red stroke-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181"
                    />
                  </svg>
                )}
                <span className="text-lightSecondary dark:text-DarkSecondary">
                  {price_change_percentage_24h?.toFixed(2)}%
                </span>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="mx-auto grid h-full w-full grid-rows-[auto_1fr] rounded-md">
      <h2 className="border-b-2 border-lightSecondary/20 px-4 py-4 text-end text-2xl font-semibold capitalize text-lightPrimary dark:border-DarkSecondary/20 dark:text-DarkPrimary">
        Top Gainers
      </h2>
      {fetchingMovers ? (
        <div className="grid place-content-center">
          <img src="/loading.svg" className="h-16 w-16" alt="Loading" />
        </div>
      ) : (
        renderCoinList(topGainers)
      )}

      <h2 className="border-b-2 border-lightSecondary/20 px-4 py-4 text-end text-2xl font-semibold capitalize text-lightPrimary dark:border-DarkSecondary/20 dark:text-DarkPrimary">
        Top Losers
      </h2>
      {fetchingMovers ? (
        <div className="grid place-content-center">
          <img src="/loading.svg" className="h-16 w-16" alt="Loading" />
        </div>
      ) : (
        renderCoinList(topLosers)
      )}
    </div>
  );
};

export default Movers;
