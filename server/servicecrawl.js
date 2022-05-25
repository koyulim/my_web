const axios = require("axios");
const Iconv = require('iconv-lite');
const cheerio = require('cheerio');
const { Serviceinfo } = require("./models");
const express = require("express");

async function getHtml() {
  try {
    return await axios.get('https://www.albamon.com/list/gi/mon_part_list.asp?ps=20&ob=6&sExcChk=y&lvtype=1&rpcd=,4000,&partExc=&paycd=A000&paycd_a=&rWDate=1&Empmnt_Type=,1', { responseType: 'arraybuffer', responseEncoding: 'binary' });
  } catch (error) {
    console.error(error);
  }
}

async function serviceInfo() {
  const html = await getHtml();

  const $ = cheerio.load(Iconv.decode(html.data, "EUC-KR"));
  let parentTag = $('tr');
  // 크롤링할 태그 찾기

  let resultArr = [];
  var n = 0;
  parentTag.each(function (i, elem) {
    const url = $(this).find('a').eq(0).toString().substring(35, 43);
    const area = $(this).find('td.area').toString().substring(206, 212);
    const jobname = $(this).find('p.cName').text();
    let itemObj = {
      url: url,
      area: area,
      jobname: jobname,
    };

    n++;
    if (n > 2) resultArr.push(itemObj);

  });

  resultArr.forEach((elem) => {
    console.log(`${elem.area} | ${elem.jobname} | ${elem.url}`);

    // Serviceinfo.create({
    //   url: elem.url,
    //   area: elem.area,
    //   jobname: elem.jobname
    // })
    
  });
  return resultArr;
}

module.exports = { serviceInfo };