import express from 'express';
import {getByIndustry} from "../routeHandlers/orginizationHandlers/byIndustry.js"
import { getByIndustryLocation } from "../routeHandlers/orginizationHandlers/byIndustryLocation.js";
import { getByCity } from "../routeHandlers/orginizationHandlers/byCity.js";
import { getByLocation } from "../routeHandlers/orginizationHandlers/byLocation.js";

const router = express.Router();

router.get('/by-industry', getByIndustry);
router.get('/by-industry-location', getByIndustryLocation);
router.get('/by-city', getByCity);
router.get('/by-location', getByLocation);

export default router;