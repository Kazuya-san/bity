export function knn(newUser: any, users: any) {
  let distances: { [key: string]: number } = {};

  // console.log("hey", newUser.likedCategories, users);

  newUser.likedCategories.forEach((likedCategory: string) => {
    users.forEach((user: any) => {
      if (newUser.id !== user.id) {
        if (user.likedCategories.includes(likedCategory)) {
          if (distances[user.id]) {
            distances[user.id] += 1;
          } else {
            distances[user.id] = 1;
          }
        }
      }
    });
  });

  let profilesToRecommend = Object.keys(distances)
    .map((key, i) => {
      // if (i < 5) {
      return users.filter((user: any) => user.id === key);
      // } else {
      //   return [];
      // }
    })
    .flat();

  return profilesToRecommend;
}
