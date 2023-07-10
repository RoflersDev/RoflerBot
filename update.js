const coins = require('../scripts/mongodb/coins');
const buildsSchem = require('../scripts/mongodb/builds');

const formula = (builds, coins) => {
    // let exit = coins + (coins * builds / 100) + 1;
    let exit = coins + (build * 100);
    return exit;
}
async function update(){
    try {

			const dataBuilds = await buildsSchem.findOne({ build: build});

      const buildings = {
				subnway: coinsData.buildingsCount.subnway,
				doda: coinsData.buildingsCount.doda,
			};

      
    }
    catch (err) {
      console.log(err);
    }

    // try {
    //     const allUsers = await coins.find({}).lean();

    //     const updatePromises = allUsers.map((user) => {
    //       const newCoins = formula(user.buildingsCount, user.coinsCount);

    //       return coins.findOneAndUpdate(
    //         { _id: user._id },  
    //         {
    //           _id: user._id,
    //           username: user.username,
    //           coinsCount: newCoins,
    //         },
    //         { new: true }
    //       );
    //     });
        
    //     const updatedUsers = await Promise.all(updatePromises);
        
    //     updatedUsers.forEach((updatedUser) => {
    //       const newCoins = updatedUser.coinsCount;
    //       console.log(updatedUser.username + " " + newCoins);
    //     });
        
    //   } catch (error) {
    //     console.error('Error while iterating over elements:', error);
    //   }
}
update();
setInterval(update, 60000);
