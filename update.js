const coins = require('./schema');

const formula = (builds, coins) => {
    let exit = coins + (coins * builds / 100);
    return exit;
}
async function update(){
    try {
        const allUsers = await coins.find({}).lean();

        const updatePromises = allUsers.map((user) => {
          const newCoins = formula(user.buildingsCount, user.coinsCount);

          return coins.findOneAndUpdate(
            { _id: user._id },
            {
              _id: user._id,
              username: user.username,
              coinsCount: newCoins,
              buildingsCount: 1
            },
            { new: true }
          );
        });
        
        const updatedUsers = await Promise.all(updatePromises);
        
        updatedUsers.forEach((updatedUser) => {
          const newCoins = updatedUser.coinsCount;
          console.log(updatedUser.username + " " + newCoins);
        });
        
      } catch (error) {
        console.error('Error while iterating over elements:', error);
      }
}
update();
setInterval(update, 60000);
