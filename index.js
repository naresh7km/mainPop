const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

const firstList = ["yuuyuuyoga", "sakurasuhiandramenbar"];
const secondList = ["hdjavforyou", "javhdaffiliates"];
const thirdList = ["seishinyoga", "yuyado-onsen", "spadelightjapan", "hotelroyaltonjp", "foodhutjapan"];
const fourthList = ["hanasakuniwa"];
const fifthList = ["ruijiacoaching", "calmyogaandmeditation"];
const sixthList = ["fitzonefitness", "ryuzakifitness", "omnifoodss", "nogamilearnings", "fitclubcommunity", "expressmealdelivery", "momomania", "gourmethubeats"];

// Base domains for allowed origins and referrers
const baseDomains = [
  "sakurasuhiandramenbar.com",
  "foodhutjapan.netlify.app",
  "foodhutjapan.com",
  "yuyado-onsen.com",
  "hotelroyaltonjp.com",
  "spadelightjapan.fit",
  "javhdaffiliates.site",
  "seishinyoga.com",
  "massagesayami.com",
  "yuuyuuyoga.fit",
  "hdjavforyou.online",
  "sakuracoffee.shop",
  "yumimasseuse.shop",
  "hanasakuniwa.shop",
  "fitzonefitness.live",
  "nogamilearnings.shop",
  "fitclubcommunity.shop",
  "expressmealdelivery.shop",
  "hanasakuniwa.shop",
  "omnifoodss.shop",
  "gourmethubeats.shop",
  "ryuzakifitnesss.shop",
  "momomania.shop",
  "ruijiacoaching.us",
  "calmyogaandmeditation.online",
];

const generateAllowedUrls = (domains) => {
  const protocols = ["https://", "http://"];
  const www = ["", "www."];
  const trailingSlash = ["", "/"];
  const urls = [];
  domains.forEach(domain => {
    protocols.forEach(protocol => {
      www.forEach(prefix => {
        trailingSlash.forEach(suffix => {
          urls.push(`${protocol}${prefix}${domain}${suffix}`);
        });
      });
    });
  });
  return urls;
};

const allowedUrls = generateAllowedUrls(baseDomains);

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedUrls.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

const checkReferrer = (req, res, next) => {
  const referer = req.headers.referer;
  if (referer && allowedUrls.some((url) => referer.startsWith(url))) {
    next();
  } else {
    res.status(403).send("Access forbidden");
  }
};

const handleRequest = (req, res) => {
  const fullUrl = req.headers.referer || req.headers.referrer;
  if (firstList.some(item => fullUrl.includes(item))) {
    res.sendFile(path.join(__dirname, "index.html"));
  } else if (secondList.some(item => fullUrl.includes(item))) {
    res.sendFile(path.join(__dirname, "secondNumber.html"));
  } else if (thirdList.some(item => fullUrl.includes(item))) {
    res.sendFile(path.join(__dirname, "thirdNumber.html"));
  } else if (fourthList.some(item => fullUrl.includes(item))) {
    res.sendFile(path.join(__dirname, "fourthNumber.html"));
  } else if (fifthList.some(item => fullUrl.includes(item))) {
    res.sendFile(path.join(__dirname, "fifthNumber.html"));
  } else {
    res.sendFile(path.join(__dirname, "sixthNumber.html"));
  }
};

app.get("/", checkReferrer, handleRequest);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
