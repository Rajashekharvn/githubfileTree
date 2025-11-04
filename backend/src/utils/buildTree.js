function buildTree(flatList) {
  const root = { name: '/', path: '', type: 'dir', children: [] };

  for (const item of flatList) {
    const parts = item.path.split('/');
    let node = root;
    let curPath = '';

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      curPath = curPath ? `${curPath}/${part}` : part;
      let child = node.children.find(c => c.name === part);

      const isFile = i === parts.length - 1 && item.type === 'blob';
      if (!child) {
        child = { name: part, path: curPath, type: isFile ? 'file' : 'dir', children: [] };
        node.children.push(child);
      }
      node = child;
    }
  }

  return root;
}

module.exports = buildTree;
