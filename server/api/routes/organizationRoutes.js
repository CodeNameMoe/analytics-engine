// organizationRoutes.js
import express from 'express';
import { getByIndustry } from '../routeHandlers/byIndustry.js';

const router = express.Router();

router.get('/by-industry', getByIndustry);

// Add more routes here, for example:
// import { getByDate } from './byDate.js';
// router.get('/by-date', getByDate);

export default router;
