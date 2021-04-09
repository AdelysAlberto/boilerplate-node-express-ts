import { Router } from 'express';
import health from './health';
import { notFound, errorHandler, authRestrict } from '../middleware';

const router: Router = Router();

router.use('/health', health);
//router.use('/home', [token2Context, authRestrict], cardHome);

router.use(errorHandler);
router.get('*', notFound);

export = router;
