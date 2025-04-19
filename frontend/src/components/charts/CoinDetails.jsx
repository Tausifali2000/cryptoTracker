import { useCoinStore} from "../../stores/coin.store"


const CoinDetails = () => {
  const { selectedCoin } = useCoinStore();

  if (!selectedCoin) return null;

  return (
    <div className="relative grid h-fit w-full grid-cols-2 gap-2 rounded-xl bg-gradient1 p-4 font-medium text-DarkPrimary 
    shadow-exchangeCardShadow dark:shadow-none xl:h-full xl:max-w-xs xl:grid-cols-1 xl:grid-rows-2 xl:overflow-hidden">
      <img
        src={selectedCoin?.image}
        className="absolute top-[-5rem] right-[-5rem] hidden select-none opacity-50 xl:block"
        alt={selectedCoin?.name}
      />

      <div className="z-10 grid gap-2">
        <div className="flex items-center gap-2">
          <img
            src={selectedCoin?.image}
            className="w-10 select-none"
            alt={selectedCoin?.name}
          />
          <span className="flex items-center gap-2 text-lg font-bold uppercase sm:text-2xl">
            {selectedCoin?.name} <span className="text-sm font-bold">(Usd)</span>
          </span>
        </div>
        <div className="text-sm">
          <p className="flex items-center gap-2">
            ATH:{" "}
            <span className="text-base font-semibold">
              {selectedCoin?.ath?.toFixed(2)}
            </span>
          </p>
          <p className="flex items-center gap-2">
            ATL:{" "}
            <span className="text-base font-semibold">
              {selectedCoin?.atl?.toFixed(2)}
            </span>
          </p>
          <p className="flex items-center gap-2">
            Rank:{" "}
            <span className="text-2xl font-semibold">
              {selectedCoin?.market_cap_rank}
            </span>
          </p>
        </div>
      </div>

      <div className="z-3 flex w-full flex-col items-end justify-end gap-2 text-sm">
        <p className="flex items-center gap-2">
          C: {selectedCoin?.current_price?.toFixed(2)}
        </p>
        <p className="flex items-center gap-2">
          24H: {selectedCoin?.high_24h?.toFixed(2)}
        </p>
        <p className="flex items-center gap-2">
          24L: {selectedCoin?.low_24h?.toFixed(2)}
        </p>

        <p className="flex items-center gap-2 text-base">
          <span
            className={`rounded-full px-4 text-base font-semibold ${
              selectedCoin?.price_change_percentage_24h > 0
                ? "bg-green"
                : "bg-red"
            }`}
          >
            {selectedCoin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </p>

        <span className="absolute bottom-0 left-4">
          {selectedCoin?.price_change_percentage_24h> 0 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="invisible h-44 w-44 stroke-green opacity-80 xl:visible"
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
              className="invisible h-44 w-44 stroke-red opacity-80 xl:visible"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181"
              />
            </svg>
          )}
        </span>
      </div>
    </div>
  );
};

export default CoinDetails