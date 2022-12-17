import express from 'express';
const router = express.Router();

import  { createJob , deleteJob , getAllJobs, updateJob,showStats } from '../controllers/jobsConroller.js';

router.route('/').post(createJob).get(getAllJobs)

 
router.route('/stats').get(showStats)
//remember about :id
router.route('/:id').delete(deleteJob).patch(updateJob)


export default router