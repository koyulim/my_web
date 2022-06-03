const axios = require("axios");
const Iconv = require('iconv-lite');
const cheerio = require('cheerio');
const { Eatinfo } = require("./models");
const express = require("express");
const moment = require('moment');

async function getHtml() {
  try {
    return await axios.get('https://www.albamon.com/recruit/area?rArea=%2cB000&rpcd=%2c1000&partExc=0&paycd=A000&paycd_a=&rWDate=1&Empmnt_Type=%2c1&sExcChk=y', { responseType: 'arraybuffer', responseEncoding: 'binary' });
  } catch (error) {
    console.error(error);
  }
}

async function eatInfo() {
  const html = await getHtml();

  const $ = cheerio.load(Iconv.decode(html.data, "UTF-8"));
  let parentTag = $('tr');
  // 크롤링할 태그 찾기

  let resultArr = [];
  var n = 0;
  parentTag.each(function (i, elem) {
    const url = $(this).find('td.area').toString().substring(131, 139);
    const area = $(this).find('td.area').toString().substring(323, 330);
    const jobname = $(this).find('p.cName').find('a').text();
    //const newDate = new Date();
    const time = moment().format('YYYY-MM-DD hh:mm:ss');  //YYYY-MM-DD HH24:MI:SS
    const deletetime = moment().subtract(1,'days')
    console.log ("test :" + time);
    console.log ("test2 :" + deletetime);


    let itemObj = {
      url: url,
      area: area,
      jobname: jobname,
      time: time,
    };

    n++;
    if (n > 2) resultArr.push(itemObj);

  });


  resultArr.forEach((elem) => {
    console.log(`${elem.url} | ${elem.area} | ${elem.jobname} | ${elem.time}`);

    //기간이 오래되었을때 지우는것 

    // Eatinfo.findCreateFind({  //조회시 없으면 생성후 조회
    //   where: {
    //     url: elem.url,
    //     area: elem.area,
    //     jobname: elem.jobname,
    //   },
    //   defaults: {
    //     url: elem.url,
    //     area: elem.area,
    //     jobname: elem.jobname,
    //     date: elem.time,
    //   }
    // })
    
  });
  return resultArr;
}

module.exports = { eatInfo };