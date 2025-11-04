const { Octokit } = require('@octokit/rest');
const logger = require('../utils/logger');

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN || undefined,
  userAgent: 'github-file-tree-app'
});

async function getDefaultBranch(owner, repo) {
  const { data } = await octokit.repos.get({ owner, repo });
  return data.default_branch;
}

async function getRepoTree(owner, repo, branch) {
  const branchRes = await octokit.repos.getBranch({ owner, repo, branch });
  const sha = branchRes.data.commit.sha;

  const treeRes = await octokit.git.getTree({
    owner, repo, tree_sha: sha, recursive: '1'
  });
  return treeRes.data.tree;
}

module.exports = { getRepoTree, getDefaultBranch };
