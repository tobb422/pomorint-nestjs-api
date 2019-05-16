export function logger(req, res, next) {
  console.log('Request')
  console.log(req.method + ': ' + req.path)

  console.log('Response')
  console.log(res.statusCode + ': ' + res.body)

  next()
}
