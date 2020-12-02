const EdgeArrayQuery = (edgeArray, queryItem) => {
  if (edgeArray.length < 1) {
    return false
  };
  for (var i = 0; i < edgeArray.length; i++){
    if (Object.entries(queryItem)[0][0] in edgeArray[i]['node']){
      if (Object.entries(queryItem)[0][1] == edgeArray[i]['node'][Object.entries(queryItem)[0][0]]){
        return true
      }
    }
  }
  return false
}

export default EdgeArrayQuery
