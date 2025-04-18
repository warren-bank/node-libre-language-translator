const https = require('https')

const request = (options, postBody) => {
  return new Promise((resolve, reject) => {
    const is_post = !!postBody
    const _method = is_post ? https.request : https.get

    const req = _method(options, res => {
      let json_chunks = []

      res.setEncoding('utf8')

      res.on('data', chunk => {
        json_chunks.push(chunk)
      })

      res.on('end', () => {
        let data
        try {
          data = JSON.parse(json_chunks.join(''))
          resolve(data)
        }
        catch(e) {
          e.why = 2
          e.json = json_chunks.join('')
          reject(e)
        }
        finally {
          json_chunks = null
        }
      })
    })

    req.on('error', e => {
      e.why = 1
      reject(e)
    })

    if (is_post) {
      req.write(JSON.stringify(postBody))
      req.end()
    }
  })
}

module.exports = request
