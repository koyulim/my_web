const axios = require("axios");
const Iconv = require('iconv-lite');
const cheerio = require('cheerio');
const { Manageinfo } = require("./models");
const express = require("express");
const date = require("date-utils");

async function getHtml() {
  try {
    return await axios.get('https://www.albamon.com/recruit/area?ps=20&ob=6&sExcChk=y&lvtype=1&rArea=,B000&rpcd=,2000&partExc=0&paycd=A000&paycd_a=&rWDate=1&Empmnt_Type=,1', { responseType: 'arraybuffer', responseEncoding: 'binary' });
  } catch (error) {
    console.error(error);
  }
}

async function manageInfo() {
  const html = await getHtml();

  const $ = cheerio.load(Iconv.decode(html.data, "UTF-8"));
  let parentTag = $('tr');
  // 크롤링할 태그 찾기

  let resultArr = [];
  var n = 0;
  parentTag.each(function (i, elem) {
    const url = $(this).find('td.area').toString().substring(131,139);
    const area = $(this).find('td.area').toString().substring(323,330);
    const jobname = $(this).find('p.cName').find('a').text();
    const newDate = new Date();
    const time = newDate.toFormat('YYYY-MM-DD');  //YYYY-MM-DD HH24:MI:SS
    
    let itemObj = {
      url: url,
      area: area,
      jobname: jobname,
      time : time,
    };

    n++;
    if (n > 2) resultArr.push(itemObj);

  });

  resultArr.forEach((elem) => {
    console.log(`${elem.url} | ${elem.area} | ${elem.jobname} | ${elem.time}`);
    
    Manageinfo.create({
      url: elem.url,
      area: elem.area,
      jobname: elem.jobname,
      date : elem.time,
    })
    
  });
  return resultArr;
}

module.exports = { manageInfo };