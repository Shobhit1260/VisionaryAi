import { clerkClient, getAuth } from "@clerk/express";

// Custom authenticated middleware — ensure parameters are (req, res, next)
/** @type {import('express').RequestHandler} */
const authenticated = async (req, res, next) => {
    try {
        const { userId, has } = await getAuth(req);
        
        if (!userId) {
            // No authenticated user on the request
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        const reqAny = /** @type {any} */ (req);
        const user = await clerkClient.users.getUser(userId);
        reqAny.user = user;
        const haspremium = has({plan:'premium'});
        const freeUsage = Number(user?.privateMetadata?.free_usage || 0);
        reqAny.free_usage = Number.isFinite(freeUsage) ? freeUsage : 0;
        reqAny.plan = haspremium ? 'premium' : 'free';
        next();
    } catch (error) {
        const errAny = /** @type {any} */ (error);
        console.error('error in middleware', error);
        return res.status(500).json({ success: false, message: 'Auth middleware error', error: errAny?.message || String(error) });
    }
}

export default authenticated;