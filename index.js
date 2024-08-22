const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

const firstList = ["yuuyuuyoga", "yumikoresorts", "sweetsafarijapanicecream", "sakurasuhiandramenbar", "osakastreetbites", "sakuracoffee", "yumimasseuse", "wash-o-kuan", "hanasakuniwa"];
const secondList = ["hanamionsen", "yuugenochiru",  "komorebiyoga", "seishinyogajp", "shoppiejapanclothes"];
const thirdList = ["adventourjp", "spa-delightjp", "tatsumionsen", "yogametic"];
const fourthList = ["hdjavforyou", "javhdaffiliates"];

// Base domains for allowed origins and referrers
const baseDomains = [
  "sakurasuhiandramenbar.com",
  "yogametic.com",
  "komorebiyoga.online",
  "spa-delightjp.com",
  "yumikoresorts.life",
  "tatsumionsen.site",
  "javhdaffiliates.site",
  "seishinyogajp.fitness",
  "hisashieats.com",
  "sweetsafarijapanicecream.shop",
  "yuugenochiru.com",
  "massagesayami.com",
  "adventourjp.com",
  "yuuyuuyoga.fit",
  "hdjavforyou.online",
  "hanamionsen.site",
  "osakastreetbites.store",
  "sakuracoffee.shop",
  "yumimasseuse.shop",
  "wash-o-kuan.site",
  "hanasakuniwa.shop",
  "shoppiejapanclothes.store",
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
  } else {
    res.sendFile(path.join(__dirname, "fourthNumber.html"));
  }
};

app.get("/", checkReferrer, handleRequest);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
