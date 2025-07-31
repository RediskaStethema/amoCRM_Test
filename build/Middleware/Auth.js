import fs from 'node:fs';
export const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({ error: 'Authorization header missing' });
        }
        const [type, token] = authHeader.split(' ');
        if (type !== 'Bearer' || !token) {
            return res.status(401).json({ error: 'Invalid authorization format' });
        }
        if (!fs.existsSync('./tokens.json')) {
            return res.status(403).json({ error: 'No access token stored' });
        }
        const savedTokens = JSON.parse(fs.readFileSync('./tokens.json', 'utf-8'));
        if (token !== savedTokens.access_token) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        next();
    }
    catch (error) {
        console.error('authMiddleware error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
