import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export  const createListing = async (req, res,next) => {
    try {
        const listing = await Listing.create(req.body);
        res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
};

export const deleteListing = async (req, res,next) => {
 const listing=Listing.findById(req.params.id);    
    if (!listing) {
        return  next(errorHandler("Listing not found", 404) );

    }
   if (req.user._id !==Listing.userRef){
         return next(errorHandler("You can omly delete your own  listings", 401));
}
   try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Listing deleted successfully" });
    
   } catch (error) {
    next(error);
   }
}