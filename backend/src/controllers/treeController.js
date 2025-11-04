const githubService = require('../services/githubService');
const parseGithubURL = require('../utils/parseGithubURL');
const buildTree = require('../utils/buildTree');
const cacheService = require('../services/cacheService');
const logger = require('../utils/logger');

async function getTree(req, res) {
  try {
    const { url, branch: requestedBranch } = req.body;
    if (!url) return res.status(400).json({ ok: false, message: 'Missing URL' });

    const parsed = parseGithubURL(url, requestedBranch);
    if (!parsed) return res.status(400).json({ ok: false, message: 'Invalid GitHub URL' });

    let { owner, repo, branch } = parsed;
    if (!branch) branch = await githubService.getDefaultBranch(owner, repo);

    const cacheKey = `tree:${owner}:${repo}:${branch}`;
    const cached = cacheService.get(cacheKey);
    if (cached) return res.json({ ok: true, cached: true, owner, repo, branch, tree: cached });

    const flatTree = await githubService.getRepoTree(owner, repo, branch);
    const nested = buildTree(flatTree);

    cacheService.set(cacheKey, nested, 3600);
    res.json({ ok: true, owner, repo, branch, tree: nested });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ ok: false, message: err.message });
  }
}

module.exports = { getTree };
