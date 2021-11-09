import Profile from '../models/timerProfile.js';

export const getProfiles = async (req, res) => {
    try {
        const timerProfiles = await Profile.find();
        console.log(timerProfiles);
        res.status(200).json(timerProfiles);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createProfiles = async (req, res) => {
    const profile = req.body;
    const newProfile = new Profile(profile)
    try {
        console.log(profile);
        await newProfile.save();
        res.status(201).json(newProfile);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}