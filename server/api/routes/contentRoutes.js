import express from 'express';
import { getByType } from '../routeHandlers/contentHandlers/byType.js';
import { getByCreator } from '../routeHandlers/contentHandlers/byCreator.js';
import { getByPublicationDate } from '../routeHandlers/contentHandlers/byPublicationDate.js';
import { getByOrganisation } from '../routeHandlers/contentHandlers/byOrganisation.js';

const router = express.Router();

router.get('/by-type', getByType);
router.get('/by-creator', getByCreator);
router.get('/by-publication-date', getByPublicationDate);
router.get('/by-organisation', getByOrganisation);

export default router;
