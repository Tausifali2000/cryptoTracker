
import ChartFilter from './charts/ChartFilter'
import CoinDetails from './charts/CoinDetails'
import VolumeChart from './charts/VolumeChart'
import Market from './Market'


const Volume = () => {



  return (
    <div className="relative flex h-full w-full flex-col items-center gap-10  xl:flex-row">
      <>
         <Market />
        <div
          className="grid place-content-center overflow-hidden pt-4 relative mx-auto h-full w-full xl:w-[150%]"
        >
          <ChartFilter />
          <VolumeChart />
        </div>


      </>

    </div>
  )
}

export default Volume
