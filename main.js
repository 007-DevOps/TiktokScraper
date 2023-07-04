import { Actor } from "apify";
import { TTScraper  } from "tiktok-scraper-ts";
import { getUserRegion } from './src/tiktok-scrapper-region.js';

const TikTokScraper = new TTScraper();

(async () => {
  await Actor.init();
  const { user } = await Actor.getInput();

  const fetchUser = await TikTokScraper.user(user);
  

  try {
    const region = await getUserRegion(user);
    if (region) {
      fetchUser.region = region;
    } else {
      return `Failed to get user region ${user}`;
    }
  } catch (error) {
    console.error('Error getting region:', error);
  }

  const userWithRegion = { ...fetchUser }; 
  userWithRegion.region = fetchUser.region; 

  console.log(userWithRegion);
  await Actor.pushData({ fetchUser });
  await Actor.exit();
})();
