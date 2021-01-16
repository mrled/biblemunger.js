/* Favorite searches
 * Useful to suggest things to unimaginitive users
 */

import { IMungePair, IMungePairVerse } from "./MungePair";

/* Favorite whole-Bible munges
 */
export const FavoriteSearches: IMungePair[] = [
  { search: "hearts", replace: "feels" },
  { search: "stronger", replace: "swoler" },
  { search: "smote", replace: "yeeted" },
  { search: "wine", replace: "whiteclaws" },
  { search: "horse", replace: "harley" },
  { search: "commandments", replace: "EULA" },
  { search: "messenger", replace: "mailer daemon" },
  { search: "Pharisees", replace: "Hipsters and Nerds" },
  { search: "thy salvation", replace: "dat ass" },
  { search: "thy salvation", replace: "a good dicking down" },
  { search: "nay", replace: "ok boomer" },
  { search: "glory", replace: "meme magic" },
  { search: "staff", replace: "dick" },
  { search: "LORD", replace: "KickStarter backer" },
  { search: "tithe", replace: "ass, grass, or cash" },
  { search: "!", replace: " D:" },
  { search: "Behold", replace: "Oh shit" },
  { search: "Behold", replace: "Look, buddy" },
  { search: "father", replace: "daddi" },
  { search: "shoes", replace: "fly kicks" },
  { search: "Aaron", replace: "Shrek" },
];

/* Favorite single-verse munges
 * Possibly these will be nice examples to explain to users how it works
 */
export const FavoriteMungedVerses: IMungePairVerse[] = [
  {
    search: "messengers",
    replace: "mailer daemons",
    verseId: { bookNum: 20, chapterNum: 16, verseNum: 14 },
  }, // Proverbs 16:14
];
