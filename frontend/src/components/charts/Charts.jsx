import React from 'react'
import CoinDetails from './CoinDetails'
import ChartFilter from './ChartFilter'

import PriceChart from './PriceChart'
import { useCoinStore } from '../../stores/coin.store'

const Charts = () => {

  const { selectedCoin } = useCoinStore()

  return (
    <div className="relative flex min-h-[377px] h-full w-full flex-col items-center gap-10 xl:flex-row">

      {!selectedCoin && (
        <div className="grid w-full place-content-center">
          Please Select Coin To Render Charts
        </div>
      )}

      {selectedCoin && (
        <>
          <CoinDetails />
          <div className="relative mx-auto h-full w-[90%] grid place-content-center overflow-hidden pt-4">
            <ChartFilter />
            <PriceChart />
          </div>
        </>
      )}
    </div>
  )
}

export default Charts
