import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const COOKIE_NAME = process.env.COOKIE_NAME || 'sid';

export async function requireAuth(req, res, next) {
  try {
    const token = req.cookies?.[COOKIE_NAME];
    if (!token) return res.status(401).json({ message: 'Not authenticated' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.sub);
    if (!user) return res.status(401).json({ message: 'User not found' });

    const ver = decoded.ver || 0;
    const cur = user.tokenChanged ? user.tokenChanged.getTime() : 0;
    if (ver < cur) {
      return res
        .status(401)
        .json({ message: 'Session expired. Please login again.' });
    }

    req.user = user;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid/expired session' });
  }
}
