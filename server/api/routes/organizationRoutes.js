import express from 'express';
import { getByIndustry } from '../routeHandlers/byIndustry.js';
import { getByIndustryLocation } from '../routeHandlers/byIndustryLocation.js';
import { getByCity } from '../routeHandlers/byCity.js';
import { getByLocation } from '../routeHandlers/byLocation.js';




const router = express.Router();

router.get('/by-industry', getByIndustry);
router.get('/by-industry-location', getByIndustryLocation);
router.get('/by-city', getByCity);
router.get('/by-location', getByLocation);




export default router;
