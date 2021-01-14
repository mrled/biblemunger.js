var fs = require("fs");
var convert = require("xml-js");
var kjvxml = fs.readFileSync("kjv.xml");

// Convert to a JSON file
//var kjvjson = convert.xml2json(kjvxml, { compact: true, spaces: 2 });
//fs.writeFileSync("kjv.xml.json", kjvjson);

const rawkjv = convert.xml2js(kjvxml);
let kjvVerses = [];
//console.log(JSON.stringify(rawkjv, undefined, 2));
const xmlbible = rawkjv.elements.filter((elem) => elem.name === "XMLBIBLE")[0];
//console.log(JSON.stringify(xmlbible, undefined, 2));
const biblebook = xmlbible.elements.filter((elem) => elem.name === "BIBLEBOOK");
//console.log(JSON.stringify(biblebook, undefined, 2));
biblebook.forEach((bookElem) => {
  const bookName = bookElem.attributes.bname;
  const bookNum = bookElem.attributes.bnumber;
  const bookShortName = bookElem.attributes.bsname;

  const chapters = bookElem.elements.filter(
    (subElem) => subElem.name === "CHAPTER"
  );
  chapters.forEach((chapElem) => {
    const chapterNum = chapElem.attributes.cnumber;

    const verses = chapElem.elements.filter(
      (subElem) => subElem.name === "VERS"
    );
    verses.forEach((versElem) => {
      const verseNum = versElem.attributes.vnumber;
      const verseText = versElem.elements.filter(
        (subElem) => subElem.type === "text"
      )[0].text;

      // console.log(`${bookName} ${chapterNum}:${verseNum} -- ${verseText}`);

      kjvVerses.push({
        bookName,
        bookNum,
        bookShortName,
        chapterNum,
        verseNum,
        verseText,
      });
    });
  });
});

// console.log(JSON.stringify(kjvVerses, undefined, 2));

fs.writeFileSync("kjvVerses.json", JSON.stringify(kjvVerses, undefined, 2));
