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
export const getListings = async (req, res, next)=>{
    try {
        const limit = parseInt(req.query.limit)|| 9;
        const startIndex = parseInt(req.query.startIndex)||0;
        let offer=req.query.offer;
   if  (offer===undefined || offer==='false'){
            offer={$in: [false,true]};
        }
        let furnished=req.query.furnished;
   if(furnished===undefined || furnished==='false'){
         furnished={$in:[false,true]};
   }
   let parking=req.query.parking;
   if(parking===undefined || parking==='false'){
         parking={$in:[false,true]};
   }
   let type = req.query.type;
   if (type === undefined || type === 'all') {
       type = {$in: ['rent', 'sale']};
   }   
 const searching=req.query.searchTerm||'';
 const sort=req.query.sort||'createdAt';
 const order=req.query.order||'desc';
 const listings=await Listing.find({
     name:{$regex:searching,$options:'i'},
     offer,
     type,
     furnished,
     parking,
    }).sort({[sort]:order}).limit(limit).skip(startIndex);
    res.status(200).json(listings);
    } catch (error) {
        
    }
}