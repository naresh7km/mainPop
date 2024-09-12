const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

const firstList = ["yuuyuuyoga", "yumikoresorts", "sakurasuhiandramenbar", "hanasakuniwa"];
const secondList = ["komorebiyoga", "yogametic"];
const thirdList = ["spa-delightjp", "seishinyogajp", "tatsumionsen"];
const fourthList = ["hdjavforyou", "javhdaffiliates"];
const fifthList = ["hanamionsen", "wash-o-kuan", "yogalex", "shinkansen", "sakuracoffee", "hikokimagic", "yumimasseuse", "fitzonefitness", "osakastreetbites", "shoppiejapanclothes"];


// Base domains for allowed origins and referrers
const baseDomains = [
  "sakurasuhiandramenbar.com",
  "yogametic.fit",
  "komorebiyoga.online",
  "spa-delightjp.online",
  "yumikoresorts.life",
  "tatsumionsen.site",
  "javhdaffiliates.site",
  "seishinyogajp.fit",
  "hisashieats.com",
  "yogalex.site",
  "massagesayami.com",
  "adventourjp.com",
  "yuuyuuyoga.fit",
  "hdjavforyou.online",
  "hanamionsen.site",
  "osakastreetbites.life",
  "sakuracoffee.shop",
  "yumimasseuse.shop",
  "wash-o-kuan.site",
  "hanasakuniwa.shop",
  "shoppiejapanclothes.store",
  "fitzonefitness.shop",
  "shinkansen.info",
  "hikokimagic.shop",
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
  } else {
    res.sendFile(path.join(__dirname, "fifthNumber.html"));
  }
};

app.get("/", checkReferrer, handleRequest);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
