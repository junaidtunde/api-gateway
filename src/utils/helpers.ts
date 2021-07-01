import { Logger } from '@nestjs/common';
import { Metadata } from 'grpc';
import * as ip2loc from 'ip2location-nodejs';
import { join } from 'path';
import * as puppeteer from 'puppeteer-core';
import { config } from '../config';

// ip2loc.IP2Location_init(join(__dirname, '../../IP2LOCATION-LITE-DB1.BIN'));
ip2loc.IP2Location_init(join(__dirname, '../../IP2LOCATION-LITE-DB9.BIN'));

export const toJSON = (object) => {
  if (object === null) return {};
  const json = {};
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      json[key] = object[key];
    }
  }

  return JSON.parse(JSON.stringify(json));
};

export const getMetadata = (headers: any) => {
  if (typeof headers !== 'object' || headers === null) {
    throw new Error('headers must be an object');
  }
  const metadata = new Metadata();

  for (const key in headers) {
    if (headers.hasOwnProperty(key)) {
      metadata.add(key, headers[key]);
    }
  }
  return metadata;
};

export const getCountryCode = (ip: string): string => {
  const result = ip2loc.IP2Location_get_all(ip);
  return result.country_short;
};

export const getCountryCity = (ip: string): any => {
  const result = ip2loc.IP2Location_get_all(ip);
  return {
    countryCode: result.country_short,
    countryName: result.country_long,
    region: result.region,
    city: result.city,
    ip: result.ip,
  };
};

export const mapFileName = (req, fileNames: any) => {
  req.body.file = {};

  if (req.files) {
    fileNames.forEach((fileName) => {
      req.body.file[fileName] = req.files[fileName];
    });
  }
  return req.body;
};

const isTrueSet = (myValue) => myValue.toString().toLowerCase() === 'true';

export const tranformBoolean = (object) => {
  try {
    if (object === null) return {};
    const json = {};
    for (const key in object) {
      if (
        object.hasOwnProperty(key) &&
        typeof object[key] !== 'object' &&
        object[key] !== undefined
      ) {
        if (
          object[key].toString().toLowerCase() === 'true' ||
          object[key].toString().toLowerCase() === 'false'
        ) {
          json[key] = isTrueSet(object[key]);
        } else {
          json[key] = object[key];
        }
      } else if (
        object.hasOwnProperty(key) &&
        typeof object[key] === 'object' &&
        object[key] !== null
      ) {
        json[key] = Array.isArray(object[key])
          ? object[key]
          : tranformBoolean(object[key]);
      } else {
        json[key] = object[key];
      }
    }

    return JSON.parse(JSON.stringify(json));
  } catch (err) {
    Logger.error('Transform Error', err);
    throw new Error(err.message);
  }
};

export const generatePdf = async (url: string): Promise<any> => {
  let webBrowser: any;
  const chromePath = config.headlessChromeUrl;
  if (chromePath) {
    webBrowser = await puppeteer.connect({
      browserWSEndpoint: `ws://${chromePath}`,
    });
  } else {
    webBrowser = await puppeteer.launch();
  }
  const imagesHaveLoaded = () =>
    Array.from(document.images).every((i) => i.complete);
  const page = await webBrowser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });
  await page.waitForSelector('#divToPrint', { timeout: 0 });
  await page.waitForFunction(imagesHaveLoaded, {
    timeout: 0,
    polling: 'mutation',
  });
  const pdf = await page.pdf({
    format: 'A4',
    width: '1024px',
    height: '768px',
  });
  await webBrowser.close();
  return pdf;
};
