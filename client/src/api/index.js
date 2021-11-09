import axios from 'axios';

const url = 'http://localhost:5000/timer/list';

export const fetchTimerProfiles = () => axios.get(url);