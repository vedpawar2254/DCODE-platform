import { decrypt } from '../utils/crypto.js';

export function attachGithubToken(req, res, next) {
  const u = req.user;
  if (!u?.github_token_enc)
    return res.status(400).json({ message: 'GitHub token not linked' });

  try {
    const token = decrypt({
      enc: u.github_token_enc,
      iv: u.github_token_iv,
      tag: u.github_token_tag
    });
    req.githubToken = token;
    next();
  } catch (e) {
    return res.status(400).json({ message: 'Failed to decrypt token' });
  }
}
