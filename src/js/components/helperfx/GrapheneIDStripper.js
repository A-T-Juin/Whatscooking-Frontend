export const idStrip = (grapheneID) => {
  // Graphene automatically makes the ID of each node base 64
  const decoded = atob(grapheneID)
  // Here, we just decode the 64 encoding
  const splitArray = decoded.split(":");
  // Split into an array of Nodal Type with index 0 and ID with index 1
  return splitArray[1]
}
