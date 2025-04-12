import { Club } from "../models/clubModel.js";

export const getAllClubs = async (req, res)=>{
    try{
        const clubs= await Club.find({}, "clubName");
        res.status(200).json(clubs);
    } catch(error) {

        res.status(500).json({message: "Internal Server Error"});
    }
}

export const getClubDetails = async (req, res) => {
    try {
      const { clubID } = req.params;
      const club = await Club.findOne({ clubID });
  
      if (!club) {
        return res.status(404).json({ message: "Club not found" });
      }
  
      res.status(200).json(club);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  export const addClub = async (req, res) => {
    try {
      const { clubID, clubName, clubInfo, clubCouncil, clubNews } = req.body;
      
      const newClub = new Club({
        clubID,
        clubName,
        clubInfo,
        clubCouncil,
        clubNews,
      });
  
      await newClub.save();
      res.status(201).json({ message: "Club added successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  export const updateClub = async (req, res) => {
    try {
      const { clubID } = req.params;
      const updatedData = req.body;
  
      const updatedClub = await Club.findOneAndUpdate({ clubID }, updatedData, { new: true });
  
      if (!updatedClub) {
        return res.status(404).json({ message: "Club not found" });
      }
  
      res.status(200).json({ message: "Club updated successfully", updatedClub });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };