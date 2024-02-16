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
export const updateListing = async (req, res,next) => {
    const listing=Listing.findById(req.params.id);  
    if (!listing) {
        return  next(errorHandler(404,"Listing not found") );
    }
    if (req.user._id !== listing.userRef) {
        return next(errorHandler(401,"You can only update your own listings"));
    }
    try {
      const updatedListing= await Listing.findByIdAndUpdate(  
             req.params.id,
              req.body,
             {new:true}
             
             );
             res.status(200).json(updatedListing);
      } 
        
      catch (error) {
        next(error);
      }

}

export const getListing = async (req, res,next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return next(errorHandler(404,"Listing not found"));
        }
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
}
;