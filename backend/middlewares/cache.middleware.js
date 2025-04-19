// middleware/cache.middleware.js
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 180 }); // TTL in seconds (adjust as needed)

const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl + JSON.stringify(req.body || {});
  const cachedData = cache.get(key);

  if (cachedData) {
    return res.status(200).json(cachedData);
  }

  // Intercept res.json to cache response
  res.sendJson = res.json;
  res.json = (body) => {
    cache.set(key, body);
    res.sendJson(body);
  };

  next();
};

export default cacheMiddleware;
