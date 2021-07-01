import Jimp = require('jimp');
import * as path from 'path';

const LOGO = path.join(__dirname, '../../watermark/watermark.png');
const JIMP_QUALITY = 70;
const RESIZE_WIDTH = 600; // px

export async function compressAndWatermarkImage(filePath, destPath) {
  const [image, logo] = await Promise.all([
    Jimp.read(filePath),
    Jimp.read(LOGO),
  ]);

  logo.resize(image.bitmap.width - 20, Jimp.AUTO).rotate(45);

  // const xMargin = 10;
  // const yMargin = 10;

  // const xMargin = (image.bitmap.width * 5) / 100;
  // const yMargin = (image.bitmap.width * 5) / 100;

  // const X = image.bitmap.width - logo.bitmap.width - xMargin;
  // const Y = image.bitmap.height - logo.bitmap.height - yMargin;

  // image
  // .composite(logo, 0, 0, {
  //   mode: Jimp.BLEND_SCREEN,
  //   opacitySource: 0.3,
  //   opacityDest: 1,
  // })
  image
    .resize(RESIZE_WIDTH, Jimp.AUTO)
    .quality(JIMP_QUALITY)
    .writeAsync(destPath);
}
