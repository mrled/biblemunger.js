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
  {
    search: "smite",
    replace: "fuck over",
    verseId: { bookNum: 2, chapterNum: 12, verseNum: 23 },
  }, // Exodus 12:23
  {
    search: "thy salvation",
    replace: "a good dicking down",
    verseId: { bookNum: 19, chapterNum: 21, verseNum: 1 },
  }, // Psalm 21:1
  {
    search: "smote",
    replace: "yeeted",
    verseId: { bookNum: 2, chapterNum: 8, verseNum: 17 },
  }, // Exodus 8:17
  {
    search: "wine",
    replace: "whiteclaws",
    verseId: { bookNum: 49, chapterNum: 5, verseNum: 18 },
  }, // Ephesians 5:18
  {
    search: "glory",
    replace: "meme magic",
    verseId: { bookNum: 42, chapterNum: 2, verseNum: 9 },
  }, // Luke 2:9
  {
    search: "staff",
    replace: "dick",
    verseId: { bookNum: 19, chapterNum: 23, verseNum: 4 },
  }, // Psalm 23:4
  {
    search: "Nay",
    replace: "Ok boomer",
    verseId: { bookNum: 9, chapterNum: 8, verseNum: 19 },
  }, // 1 Samuel 8:19
  {
    search: "tithes",
    replace: "ass, grass, or cash",
    verseId: { bookNum: 42, chapterNum: 18, verseNum: 12 },
  }, // Luke 18:12
  {
    search: "Behold,",
    replace: "Oh shit!",
    verseId: { bookNum: 38, chapterNum: 14, verseNum: 1 },
  },
  {
    search: "behold",
    replace: "look buddy",
    verseId: { bookNum: 1, chapterNum: 17, verseNum: 4 },
  }, // Genesis 17:4
];
