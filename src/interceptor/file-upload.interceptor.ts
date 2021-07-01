import { GetSignedUrlConfig, Storage } from '@google-cloud/storage';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../config';
import { FileUploadConfig } from '../types';
// import { compressAndWatermarkImage } from '../utils/image-compression';
import { error } from '../utils/responses';

type FileType = {
  originalName: string;
  tempFilePath: string;
  mimetype: string;
  url?: string;
  name?: string;
  public?: boolean;
  whatsApp?: boolean;
};

const BooleanValue = (value) =>
  value.toString().toLowerCase().trim() === 'true' ? true : false;

/**
 * This Interceptor is a file uploader. It uploads the file to google cloud storage
 * and then appends the file to the controller function, which can then access the file
 * via req.files[fieldname]
 * This interceptor supports array of files with singular name
 */

@Injectable()
export class FileUploadInterceptor implements NestInterceptor {
  private arrayOfFields: Array<FileUploadConfig>;
  private storage: Storage;

  constructor(array: Array<FileUploadConfig>) {
    this.arrayOfFields = array;
    this.storage = new Storage({
      keyFilename: path.join(
        __dirname,
        '..',
        config.googleBucket.serviceKeyPath,
      ),
    });
  }

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    if (req.files) {
      for await (const field of this.arrayOfFields) {
        try {
          field.whatsApp = BooleanValue(req.body.whatsApp || 'false');
          if (Array.isArray(req.files[field.name])) {
            field.public = req.body.public
              ? BooleanValue(req.body.public)
              : true;
            const temp = [];
            for await (const file of req.files[field.name]) {
              const newFile = await this.uploadSingleFile(field, file);
              temp.push(newFile);
            }
            req.files[field.name] = temp;
          } else {
            field.public = req.body.public
              ? BooleanValue(req.body.public)
              : true;
            const newFile = await this.uploadSingleFile(
              field,
              req.files[field.name],
            );
            req.files[field.name] = newFile;
          }
        } catch (err) {
          Logger.error('Failed to upload file ', err);
          return error(res, 400, err.name, err.message);
        }
      }
    }

    return next.handle();
  }

  async uploadSingleFile(
    field: FileUploadConfig,
    file: FileType,
  ): Promise<FileType> {
    const file2 = {
      originalName: file.name,
      tempFilePath: file.tempFilePath,
      mimetype: file.mimetype,
      public: !!field.public,
      whatsApp: field.whatsApp,
    };

    // if (file.mimetype.startsWith('image')) {
    //   try {
    //     await compressAndWatermarkImage(file2.tempFilePath, file2.tempFilePath);
    //   } catch (err) {
    //     Logger.log(err);
    //   }
    // }

    const newFile = await this.uploadFile(file2);
    return newFile;
  }

  async uploadFile(file: FileType): Promise<FileType> {
    const bucket = file.public
      ? config.googleBucket.publicBucket
      : config.googleBucket.privateBucket;

    file.name = `${uuidv4()}-${file.originalName}`;
    file.url = `https://storage.googleapis.com/${bucket}/${encodeURIComponent(
      file.name,
    )}`;
    const newName = path.dirname(file.tempFilePath) + '/' + file.name;

    fs.renameSync(file.tempFilePath, newName);
    file.tempFilePath = newName;

    await this.storage.bucket(bucket).upload(file.tempFilePath, {
      gzip: !file.whatsApp,
      metadata: {
        cacheControl: 'public, max-age=31536000',
      },
    });

    Logger.log(`${file.name} uploaded to ${bucket}.`);

    fs.unlinkSync(file.tempFilePath); // file clean up

    return file;
  }

  /**
   * Get signed Url of filename from private storage.
   * This funtion returnes a signed url that will expire in one hour
   * @param filename
   */
  async generateSignedUrl(filename: string): Promise<string> {
    // These options will allow temporary read access to the file
    const options: GetSignedUrlConfig = {
      version: 'v2', // defaults to 'v2' if missing.
      action: 'read',
      expires: Date.now() + 1000 * 60 * 60, // one hour
    };

    // Get a v2 signed URL for the file
    const [url] = await this.storage
      .bucket(config.googleBucket.privateBucket)
      .file(filename)
      .getSignedUrl(options);

    return url;
  }
}
