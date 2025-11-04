function parseGithubURL(urlStr, branchOverride) {
  try {
    const url = new URL(urlStr);
    const parts = url.pathname.replace(/^\/|\/$/g, '').split('/');
    const owner = parts[0];
    const repo = parts[1];
    if (!owner || !repo) return null;

    if (branchOverride) return { owner, repo, branch: branchOverride };
    if (parts[2] === 'tree' || parts[2] === 'blob') return { owner, repo, branch: parts[3] };

    return { owner, repo, branch: undefined };
  } catch {
    return null;
  }
}

module.exports = parseGithubURL;
