const express = require('express');
const app = express();
const sequelize = require('./models').sequelize;
const bodyParser = require('body-parser');
const cron = require('node-cron');
const cors = require('cors');
const cheerio = require('cheerio');
const axios = require('axios');
const Iconv = require('iconv-lite');
const { eatInfo } = require("./eatcrawl");
const { manageInfo } = require("./managecrawl");
const { serviceInfo } = require("./servicecrawl");

app.use(cors());
sequelize.sync();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// //크롤링
// async function handleAsync() {
//   const eatInfos = await eatInfo();
//   const manageInfos = await manageInfo();
//   const serviceInfos = await serviceInfo();
//   return eatInfos,manageInfos,serviceInfos;
// }

// cron.schedule("* * * * *", async () => {
//   console.log("running a schedule");
//   await handleAsync();
// });

const {
  Signup,
  Eatinfo,
  Manageinfo,
  Serviceinfo,
  Eatpost,
  Sequelize: { Op }
} = require('./models');
sequelize.query('SET NAMES utf8;');

app.post('/add/eatpost', (req, res) => {
  console.log(req.body);

  Eatpost.create({
    area: req.body.area,
    jobname: req.body.jobname,
    nickname: req.body.nickname,
    title: req.body.title,
    content: req.body.content,
    date: req.body.date
  })
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      console.log(err)
      throw err;
    })
})

app.post('/add/eatdata', (req, res) => {
  console.log(req.body);

  Signup.create({
    email: req.body.email,
    nickname: req.body.nickname,
    password: req.body.password
  })
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      console.log(err)
      throw err;
    })
})

app.post('/get/keywordData', (req, res) => {
  Signup.findAll({
    where: { nickname: req.body.nickname }
  })
    .then(result => { res.send(result) })
    .catch(err => { throw err })
})

app.post('/get/emailData', (req, res) => {
  Signup.findAll({
    where: { email: req.body.email }
  })
    .then(result => { res.send(result) })
    .catch(err => { throw err })
})

app.post('/add/data', (req, res) => {
  console.log(req.body);

  Signup.create({
    email: req.body.email,
    nickname: req.body.nickname,
    password: req.body.password
  })
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      console.log(err)
      throw err;
    })
})

app.post('/get/keywordEatpostData', (req, res) => {
  Eatpost.findAll({
    where: [{ area : req.body.area }, { jobname : req.body.jobname }] 
  })
    .then(result => { res.send(result) })
    .catch(err => { throw err })
})

app.post('/get/keywordEatpostinfoData', (req, res) => {
  Eatpost.findAll({
    where: [{ title : req.body.title },  { area : req.body.area }, { jobname : req.body.jobname }, { nickname : req.body.nickname }] 
  })
    .then(result => { res.send(result) })
    .catch(err => { throw err })
})

app.post('/delete/data', (req, res) => {
  Eatpost.destroy({
      where : { id : req.body.delete.id }
  })
  .then( res.sendStatus(200) )
  .catch( err => { throw err })
})

app.post('/get/keywordEatData', (req, res) => {
  Eatinfo.findAll({
    where: { [Op.or]: [{ id : req.body.id }, { area : req.body.area }, { jobname : req.body.jobname }] }
  })
    .then(result => { res.send(result) })
    .catch(err => { throw err })
})
app.post('/get/keywordserviceData', (req, res) => {
  Serviceinfo.findAll({
    where: { [Op.or]: [{ area : req.body.area }, { jobname : req.body.jobname }] }
  })
    .then(result => { res.send(result) })
    .catch(err => { throw err })
})
app.post('/get/keywordmanageData', (req, res) => {
  Manageinfo.findAll({
    where: { [Op.or]: [{ area : req.body.area }, { jobname : req.body.jobname }] }
  })
    .then(result => { res.send(result) })
    .catch(err => { throw err })
})

app.get('/get/eatdata', (req, res) => {
  Eatinfo.findAll()
   .then( result => { res.send(result) })
   .catch( err => { throw err })
})


app.get('/get/managedata', (req, res) => {
  Manageinfo.findAll()
   .then( result => { res.send(result) })
   .catch( err => { throw err })
})

app.get('/get/servicedata', (req, res) => {
  Serviceinfo.findAll()
   .then( result => { res.send(result) })
   .catch( err => { throw err })
})


app.post('/get/multiKeywordData', (req, res) => {
  Signup.findAll({
    where: [{ nickname: req.body.nickname },
    { password: req.body.password }]
  })
    .then(result => { res.send(result) })
    .catch(err => { throw err })
})

app.post('/get/emailnicknameData', (req, res) => {
  Signup.findAll({
    where: [{ email: req.body.email },
    { nickname: req.body.nickname }]
  })
    .then(result => { res.send(result) })
    .catch(err => { throw err })
})


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server On : http://localhost:${PORT}/`);
})