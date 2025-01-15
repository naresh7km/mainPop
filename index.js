const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

const officeList1 = [];
const officeList2 = ["hdjavforyou", "javhdaffiliates"];
const officeList3 = [];
const officeList4 = [];
const officeList5 = [];

const dmcList1 = ["seishinyoga"];
const dmcList2 = ["komorebiyoga"];
const dmcList3 = ["tanenespa"];
const dmcList4 = [];
const dmcList5 = [];

const aomineList1 = ["expressmealdelivery", "yogalhealing", "gourmethub", "nursefood.netlify.app", "newomnifoodss", "nursecares"];
const aomineList2 = [];
const aomineList3 = [];
const aomineList4 = [];
const aomineList5 = [];

const wayneList1 = [];
const wayneList2 = ["oceanrestaurant.netlify.app", "delightful-smakager-b5ed06.netlify.app", "imaginative-flan-4a888f.netlify.app", "incomparable-sable-0950e5.netlify.app", "matsucafe.onrender.com"];
const wayneList3 = [];
const wayneList4 = [];
const wayneList5 = [];





// Base domains for allowed origins and referrers
const baseDomains = [
  "tanenespa.onrender.com",
  "komorebiyoga.onrender.com",
  "javhdaffiliates.site",
  "seishinyoga.com",
  "hdjavforyou.online",
  "yumimasseuse.shop",
  "expressmealdelivery.shop",
  "hanasakuniwa.shop",
  "newomnifoodss.shop",
  "gourmethubeats.shop",
  "yogahealing.netlify.app",
  "nursecares.netlify.app",
  "gourmethub.netlify.app",
  "oceanrestaurant.netlify.app",
  "imaginative-flan-4a888f.netlify.app",
  "delightful-smakager-b5ed06.netlify.app",
  "incomparable-sable-0950e5.netlify.app",
  "matsucafe.onrender.com",
  "nursefood.netlify.app",
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
  } else if (officeList2.some(item => fullUrl.includes(item))) {
    res.sendFile(path.join(__dirname, "officeList2.html"));
  } else if (officeList3.some(item => fullUrl.includes(item))) {
    res.sendFile(path.join(__dirname, "officeList3.html"));
  } else if (officeList4.some(item => fullUrl.includes(item))) {
    res.sendFile(path.join(__dirname, "officeList4.html"));
  } else if (officeList5.some(item => fullUrl.includes(item))) {
    res.sendFile(path.join(__dirname, "officeList5.html"));
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
