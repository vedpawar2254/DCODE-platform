import fetch from 'node-fetch';
import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import { encrypt } from '../utils/crypto.js';
import { signSession, sendJwtCookie, clearJwtCookie } from '../utils/jwt.js';

const GH_OAUTH_URL = 'https://github.com/login/oauth';

export const githubStart = (req, res) => {
  const state = crypto.randomUUID(); // optional: store in session/redis to validate CSRF
  const scope = encodeURIComponent(process.env.GITHUB_SCOPES || 'read:user');
  const redirect = `${GH_OAUTH_URL}/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.GITHUB_REDIRECT_URI)}&scope=${scope}&state=${state}`;
  res.redirect(redirect);
};

export const githubCallback = async (req, res, next) => {
  try {
    const { code /*, state*/ } = req.query;

    const tokenResp = await fetch(`${GH_OAUTH_URL}/access_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: process.env.GITHUB_REDIRECT_URI
      })
    });
    const tokenData = await tokenResp.json();
    if (!tokenData.access_token) {
      return res
        .status(400)
        .json({ message: 'GitHub OAuth failed', detail: tokenData });
    }

    const ghToken = tokenData.access_token;

    // Fetch GitHub profile
    const meResp = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `token ${ghToken}`,
        'User-Agent': 'dcode-dev'
      }
    });
    const me = await meResp.json();
    if (!me || !me.login) {
      return res.status(400).json({ message: 'Failed to fetch GitHub user' });
    }

    // Upsert user
    let user =
      (await User.findOne({ email: me.email })) ||
      (await User.findOne({ github_username: me.login }));
    if (!user) {
      user = new User({
        name: me.name || me.login,
        email: me.email || `${me.id}@users.noreply.github.com`,
        github_username: me.login
      });
    } else {
      user.github_username = me.login;
      if (!user.name) user.name = me.name || me.login;
      if (!user.email)
        user.email = me.email || `${me.id}@users.noreply.github.com`;
    }

    const sealed = encrypt(ghToken);
    user.github_token = sealed.enc;
    user.github_token_iv = sealed.iv;
    user.github_token_tag = sealed.tag;

    user.tokenChanged = new Date(Date.now() - 1000);
    await user.save();

    const jwtPayload = {
      sub: user._id.toString(),
      ver: user.tokenChanged ? user.tokenChanged.getTime() : Date.now()
    };
    const sessionJwt = signSession(jwtPayload);
    sendJwtCookie(res, sessionJwt);

    const redirectTo = `${process.env.FRONTEND_URL}/onboarding/auth`;
    return res.redirect(redirectTo);
  } catch (err) {
    next(err);
  }
};

export const logout = (req, res) => {
  clearJwtCookie(res);
  res.status(200).json({ message: 'Logged out' });
};
