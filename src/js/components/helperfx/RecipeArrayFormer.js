// This function pulls all the recipes for every followed user
// If they have at least 1 recipe. And puts it into an array.
// To-Do Add a sort function to the array that sorts by most recent date
export const recipeExtractor = (userArray) => {
  let recipeArray = []
  userArray.forEach((user) => {
    if(user.node.recipes.total > 0) {
      user.node.recipes.edges.forEach((recipe) => {
        recipeArray.push(recipe)
      })
    }
  })
  return recipeArray;
}
