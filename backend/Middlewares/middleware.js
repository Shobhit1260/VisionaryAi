import { clerkClient, getAuth } from "@clerk/express";

// Custom authenticated middleware — ensure parameters are (req, res, next)
const authenticated = async (req, res, next) => {
    try {
        const { userId, has } = await getAuth(req);
        if (!userId) {
            // No authenticated user on the request
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        const user = await clerkClient.users.getUser(userId);
        req.user = user;
        const haspremium = has({plan:'premium'});
        if(!haspremium && user.privateMetadata.free_usage){
           req.free_usage=user.privateMetadata.free_usage;  
        }
        else{
            await clerkClient.users.updateUser(userId, {
                privateMetadata: { free_usage: 0 }
            });
            req.free_usage=0;
        }
        req.plan=haspremium?'premium':'free';
        next();
    } catch (error) {
        console.error('error in middleware', error);
        return res.status(500).json({ success: false, message: 'Auth middleware error', error: error.message });
    }
}

export default authenticated;