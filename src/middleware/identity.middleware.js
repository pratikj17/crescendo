export const verifyIdentity=(req,res,next)=>{
    const role=req.cookies.Identity;
    if(role=="trainer") next();
    else res.json({"error":"only trainer has the right to upload"});
}