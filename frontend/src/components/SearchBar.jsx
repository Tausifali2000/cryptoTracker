import { useMemo, useState } from "react";
import { useCoinStore } from "../stores/coin.store";
import SearchResult from "./SearchResult";


const SearchBar = () => {

  const {coins, setSelectedCoin} = useCoinStore()
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filteredCoins = useMemo(() => {
    if (!query.trim()) return [];
    return coins.filter((coin) =>
      coin.id.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, coins]);
  


  return (
    <div className=" relative flex w-full max-w-[600px] rounded-[50px] bg-light  px-4  py-2 shadow-shadow1 dark:bg-dark dark:shadow-none">
   
      <input
       value={query}
        type="text"
        name="input"
        id="input"
        className="w-full bg-transparent px-4 py-2 text-lightPrimary placeholder:text-lightSecondary focus:outline-none dark:text-DarkPrimary placeholder:dark:text-DarkSecondary "
        placeholder="Search Crypto  "
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
      />

   {query && (
          <button className="pr-2" onClick={() => setQuery("")} title="Clear">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              className="h-6 w-6 stroke-accent"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            className="h-6 w-6 stroke-accent/70"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>

          {isOpen && filteredCoins.length > 0 && (
              <SearchResult
              coin={filteredCoins}
              onSelect={() => {
                setIsOpen(false);
                setQuery("");
              }}
            />
          )}
   

   
    </div>
  );
};

export default SearchBar;