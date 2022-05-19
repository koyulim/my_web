const express = require('express');
const app = express();
const sequelize = require('./models').sequelize;
const bodyParser = require('body-parser');
const cron = require('node-cron');
const cors = require('cors');
const cheerio = require('cheerio');
const axios = require('axios');
const Iconv = require('iconv-lite');

app.use(cors());

sequelize.sync();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const getHtml = (url) => {
  return axios.get(url, { responseType: 'arraybuffer', responseEncoding: 'binary' });
};

// const getBookInfo = (target) => {
//   const $ = cheerio.load(Iconv.decode(target.data, "EUC-KR"));
//   let parentTag = $('tr');
//   // 크롤링할 태그 찾기

//   let resultArr = [];
//   var n = 0;
//   parentTag.each(function (i, elem) {

//     let itemObj = {
//       url: $(this).find('a').eq(0).toString().substring(35, 43),
//       area: $(this).find('td.area').toString().substring(206, 212),
//       jobname: $(this).find('p.cName').text(),
//     };

//     n++;
//     if (n > 2) resultArr.push(itemObj);

//   });

//   resultArr.forEach((elem) => {
//     console.log(`${elem.area} | ${elem.jobname} | ${elem.url}`);

//     Eatinfo.create({
//       url: elem.url,
//       area: elem.area,
//       jobname: elem.jobname
//     })

//   });
//   return resultArr;
// }

cron.schedule('* * * * *', function () {
  console.log("getBookInfo");
});

app.get('/Eat', async (req, res) => {

  try {
    const answer = await getHtml('https://www.albamon.com/list/gi/mon_part_list.asp?ps=20&ob=6&sExcChk=y&lvtype=1&rpcd=,1000,&partExc=&paycd=A000&paycd_a=&rWDate=1&Empmnt_Type=,1');
    // const preProcessingResult = getBookInfo(answer);
    // res.send(preProcessingResult);

    //const getBookInfo = (target) => {
      const $ = cheerio.load(Iconv.decode(answer.data, "EUC-KR"));
      let parentTag = $('tr');
      // 크롤링할 태그 찾기
    
      let resultArr = [];
      var n = 0;
      parentTag.each(function (i, elem) {
    
        let itemObj = {
          url: $(this).find('a').eq(0).toString().substring(35, 43),
          area: $(this).find('td.area').toString().substring(206, 212),
          jobname: $(this).find('p.cName').text(),
        };
    
        n++;
        if (n > 2) resultArr.push(itemObj);
    
      });
    
      resultArr.forEach((elem) => {
        console.log(`${elem.area} | ${elem.jobname} | ${elem.url}`);
    
        Eatinfo.create({
          url: elem.url,
          area: elem.area,
          jobname: elem.jobname
        })
        
      });
      res.send(resultArr);
      //return resultArr;
    //}

  } catch (error) {
    res.send(error);
  }
});

app.get('/Management', async (req, res) => {

  // try {
  //   const answer = await getHtml('https://www.albamon.com/list/gi/mon_part_list.asp?ps=20&ob=6&sExcChk=y&lvtype=1&rpcd=,2000,&partExc=&paycd=A000&paycd_a=&rWDate=1&Empmnt_Type=,1');
  //   const preProcessingResult = getBookInfo(answer);
  //   res.send(preProcessingResult);
  // } catch (error) {
  //   res.send(error);
  // }
  try {
    const answer = await getHtml('https://www.albamon.com/list/gi/mon_part_list.asp?ps=20&ob=6&sExcChk=y&lvtype=1&rpcd=,2000,&partExc=&paycd=A000&paycd_a=&rWDate=1&Empmnt_Type=,1');
    // const preProcessingResult = getBookInfo(answer);
    // res.send(preProcessingResult);

    //const getBookInfo = (target) => {
      const $ = cheerio.load(Iconv.decode(answer.data, "EUC-KR"));
      let parentTag = $('tr');
      // 크롤링할 태그 찾기
    
      let resultArr = [];
      var n = 0;
      parentTag.each(function (i, elem) {
    
        let itemObj = {
          url: $(this).find('a').eq(0).toString().substring(35, 43),
          area: $(this).find('td.area').toString().substring(206, 212),
          jobname: $(this).find('p.cName').text(),
        };
    
        n++;
        if (n > 2) resultArr.push(itemObj);
    
      });
    
      resultArr.forEach((elem) => {
        console.log(`${elem.area} | ${elem.jobname} | ${elem.url}`);
    
        Manageinfo.create({
          url: elem.url,
          area: elem.area,
          jobname: elem.jobname
        })
      });
      res.send(resultArr);
      //return resultArr;
    //}
    

  } catch (error) {
    res.send(error);
  }

  
});

app.get('/Service', async (req, res) => {

  // try {
  //   const answer = await getHtml('https://www.albamon.com/list/gi/mon_part_list.asp?ps=20&ob=6&sExcChk=y&lvtype=1&rpcd=,4000&partExc=&paycd=A000&paycd_a=&rWDate=1&Empmnt_Type=,1');
  //   const preProcessingResult = getBookInfo(answer);
  //   res.send(preProcessingResult);
  // } catch (error) {
  //   res.send(error);
  // }

  try {
    const answer = await getHtml('https://www.albamon.com/list/gi/mon_part_list.asp?ps=20&ob=6&sExcChk=y&lvtype=1&rpcd=,4000,&partExc=&paycd=A000&paycd_a=&rWDate=1&Empmnt_Type=,1');
    // const preProcessingResult = getBookInfo(answer);
    // res.send(preProcessingResult);

    //const getBookInfo = (target) => {
      const $ = cheerio.load(Iconv.decode(answer.data, "EUC-KR"));
      let parentTag = $('tr');
      // 크롤링할 태그 찾기
    
      let resultArr = [];
      var n = 0;
      parentTag.each(function (i, elem) {
    
        let itemObj = {
          url: $(this).find('a').eq(0).toString().substring(35, 43),
          area: $(this).find('td.area').toString().substring(206, 212),
          jobname: $(this).find('p.cName').text(),
        };
    
        n++;
        if (n > 2) resultArr.push(itemObj);
    
      });
    
      resultArr.forEach((elem) => {
        console.log(`${elem.area} | ${elem.jobname} | ${elem.url}`);
    
        Serviceinfo.create({
          url: elem.url,
          area: elem.area,
          jobname: elem.jobname
        })
      });
      res.send(resultArr);
      //return resultArr;
    //}

  } catch (error) {
    res.send(error);
  }

});

const {
  Signup,
  Eatinfo,
  Manageinfo,
  Serviceinfo,
  Sequelize: { Op }
} = require('./models');
const { text } = require('body-parser');
sequelize.query('SET NAMES utf8;');

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
