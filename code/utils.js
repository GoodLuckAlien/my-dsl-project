

function parseQueryString(path){
   const [ originPath , queryUrl ] = path.split('?')
   const queryArr = queryUrl ? queryUrl.split('&') : []
   const query = {}
   queryArr.forEach(item => {
       const [ key,value ]  = item.split('=')
       if(key && value){
          query[key] = value
       }
   })
   return [ originPath, query ]
}



module.exports = {
    parseQueryString
}