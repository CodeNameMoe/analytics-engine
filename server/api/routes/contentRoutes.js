import express from 'express';
import { getByType } from '../routeHandlers/contentHandlers/byType.js';
import { getByCreator } from '../routeHandlers/contentHandlers/ByCreator.js';
import { getByPublicationDate } from '../routeHandlers/contentHandlers/ByPublicationDate.js';
import { getByOrganisation } from '../routeHandlers/contentHandlers/ByOrganisation.js';

const router = express.Router();

router.get('/by-type', getByType);
router.get('/by-creator', getByCreator);
router.get('/by-publication-date', getByPublicationDate);
router.get('/by-organisation', getByOrganisation);

export default router;
