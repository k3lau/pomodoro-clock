import express from 'express';
import { getProfiles, createProfiles } from '../controllers/timerProfiles.js'
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Hello World");
}
);
router.get('/list', getProfiles)
router.post('/create', createProfiles)

export default router;