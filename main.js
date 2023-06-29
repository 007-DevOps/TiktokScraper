import { Actor } from "apify";
import { TTScraper  } from "tiktok-scraper-ts";

const TikTokScraper = new TTScraper();


(async () => {
  await Actor.init();
  const { user } = await Actor.getInput();

  const fetchUser = await TikTokScraper.user(user);
  console.log(fetchUser);
  await Actor.pushData({ fetchUser });

  await Actor.exit();
})();
