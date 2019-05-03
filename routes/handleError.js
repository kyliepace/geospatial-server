
module.exports = function handleError(err, res){
  console.log('error: ', err);
  return res.send(err)
}