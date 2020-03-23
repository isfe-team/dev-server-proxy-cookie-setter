module.exports = function generateProxyCokieSetter (label, filePath) {
  return function setUAPProxyCookie (proxyReq) {
  try {
    fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8')
      .split('\n')
      .map((x) => x.trim())
      .filter(x => !!x)
      .reduce((acc, x) => {
        const [l, ...kv] = x.split(',')
        if (l === label) {
          acc.push(kv)
        }
        return acc
      }, [])
      .forEach(([k, v]) => proxyReq.setHeader('cookie', `${k}=${v}`))
    } catch (err) {
      throw err
    }
  }
}
