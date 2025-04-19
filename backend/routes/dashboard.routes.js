import express from 'express';
import { getCoinById, getCoinMarkets, getMarketChart, getTopMovers } from '../controllers/dashboard.controllers.js';
import cacheMiddleware from '../middlewares/cache.middleware.js';


const router = express.Router();

router.post('/:id/chartData', cacheMiddleware, getMarketChart);
router.get('/fetchCoins', cacheMiddleware,getCoinMarkets);
router.get('/topMovers', cacheMiddleware,getTopMovers);
router.get('/:id', cacheMiddleware, getCoinById);

export default router;