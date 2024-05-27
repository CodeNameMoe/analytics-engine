import express from 'express';
import { getByType } from '../routeHandlers/eventHandlers/byType.js';
import { getByLocation } from '../routeHandlers/eventHandlers/byLocation.js';
import { getByPrice } from '../routeHandlers/eventHandlers/byPrice.js';

const router = express.Router();

router.get('/by-type', getByType);
router.get('/by-location', getByLocation);
router.get('/by-price', getByPrice);

export default router;
