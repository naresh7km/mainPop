const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

const officeList1 = ["hdjavforyou", "javhdaffiliates"];

// For LUPIN
const dmcList1 = ["seishinyoga"];


// For OFFICE 
const dmcList3 = [];


const dmcList2 = ["kansaigourmet", "sunblue.yoga", "yogayaka.com"];
const dmcList4 = [];
const dmcList5 = [];
const aomineList2 = [];
const aomineList3 = [];
const aomineList4 = [];
const aomineList5 = [];

// for Turnig Off - list 1 (M)
const aomineList1 = ["newomnifoodss"];
// for Turning On  - list 2 (O)
const wayneList2 = ["conversationseattle.shop"];

// redundant lists for now - DON'T USE !!!
const wayneList1 = ["kevinsfoodhut.store"];
const wayneList3 = ["127.0.0.1:5500"];
const wayneList4 = [];
const wayneList5 = [];

// Base domains for allowed origins and referrers
const baseDomains = [
  "kansaigourmet.shop",
  "seishinyoga.com",
  "yogayaka.com",
  "sunblue.yoga",
 "kevinsfoodhut.store",
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
  if (officeList1.some(item => fullUrl.includes(item))) {
    res.sendFile(path.join(__dirname, "officeList1.html"));
  } else if (dmcList1.some(item => fullUrl.includes(item))) {
    res.sendFile(path.join(__dirname, "dmcList1.html"));
  } else if (dmcList2.some(item => fullUrl.includes(item))) {
    res.sendFile(path.join(__dirname, "dmcList2.html"));
  } else if (dmcList3.some(item => fullUrl.includes(item))) {
    res.sendFile(path.join(__dirname, "dmcList3.html"));
  } else if (dmcList4.some(item => fullUrl.includes(item))) {
    res.sendFile(path.join(__dirname, "dmcList4.html"));
  } else if (dmcList5.some(item => fullUrl.includes(item))) {
    res.sendFile(path.join(__dirname, "dmcList5.html"));
  } else if (aomineList1.some(item => fullUrl.includes(item))) {
    res.sendFile(path.join(__dirname, "aomineList1.html"));
  } else if (aomineList2.some(item => fullUrl.includes(item))) {
    res.sendFile(path.join(__dirname, "aomineList2.html"));
  } else if (aomineList3.some(item => fullUrl.includes(item))) {
    res.sendFile(path.join(__dirname, "aomineList3.html"));
  } else if (aomineList4.some(item => fullUrl.includes(item))) {
    res.sendFile(path.join(__dirname, "aomineList4.html"));
  } else if (aomineList5.some(item => fullUrl.includes(item))) {
    res.sendFile(path.join(__dirname, "aomineList5.html"));
  } else if (wayneList1.some(item => fullUrl.includes(item))) {
    res.sendFile(path.join(__dirname, "wayneList1.html"));
  } else if (wayneList2.some(item => fullUrl.includes(item))) {
    res.sendFile(path.join(__dirname, "wayneList2.html"));
  } else if (wayneList3.some(item => fullUrl.includes(item))) {
    res.sendFile(path.join(__dirname, "wayneList3.html"));
  } else if (wayneList4.some(item => fullUrl.includes(item))) {
    res.sendFile(path.join(__dirname, "wayneList4.html"));
  } else if (wayneList5.some(item => fullUrl.includes(item))) {
    res.sendFile(path.join(__dirname, "wayneList5.html"));
  }
};

app.get("/", checkReferrer, handleRequest);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
