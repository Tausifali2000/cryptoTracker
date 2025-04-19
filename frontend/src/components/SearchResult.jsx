import React from 'react'
import { useCoinStore } from '../stores/coin.store';
import { useChartStore } from '../stores/chart.store';

const SearchResult = ({ coin, onSelect }) => {

  const {setSelectedCoin} = useCoinStore()
  const {fetchChartData} = useChartStore()
 
  const handleSelection = async (coin) => {
   
    await setSelectedCoin(coin);
    fetchChartData();
    onSelect(); 
  };
0


  return (
    <ul className="custom-scroll dark:bg-darkSecondary absolute top-20 right-0 flex max-h-[400px] w-full flex-col gap-2 overflow-x-hidden overflow-y-scroll rounded-xl bg-light py-4 px-4 dark:bg-dark">
      {coin?.map(({ id, name, image, market_cap_rank, ath, atl, current_price, high_24h, low_24,price_change_percentage_24h  }) => (
        <li
          key={id}
          onClick={() => handleSelection({ id, name, image, market_cap_rank, ath, atl, current_price, high_24h, low_24,price_change_percentage_24h  })}
          className="relative grid cursor-pointer grid-cols-[auto_1fr] items-center gap-4 py-4 px-10 text-lightPrimary duration-300 ease-in-out hover:bg-accent/70 hover:text-white dark:text-DarkPrimary"
        
        >
          <img src={image}  className="h-8 w-8" alt={name} />
          <p className="justify-self-end line-clamp-1">{name}</p>
          {market_cap_rank ? (
            <p className="absolute top-0 left-0 rounded-br-full bg-accent py-1 px-2 pr-4 text-xs text-white">
              {market_cap_rank}
            </p>
          ) : null}
        </li>
      ))}
    </ul>
  );
};


export default SearchResult