import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import PublitioAPI from 'publitio_js_sdk';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../config';
import { FileUploadConfig } from '../types';
import { error } from '../utils/responses';

type FileType = {
  originalName: string;
  tempFilePath: string;
  mimetype: string;
  url?: string;
  name?: string;
};

/**
 * This Interceptor is a file uploader. It uploads the file to publit.io
 * and then appends the file to the controller function, which can then access the file
 * via req.files[fieldname]
 * This interceptor supports array of files with singular name
 */

@Injectable()
export class PublitFileUploadInterceptor implements NestInterceptor {
  private arrayOfFields: Array<FileUploadConfig>;
  private storage: PublitioAPI;

  constructor(array: Array<FileUploadConfig>) {
    this.arrayOfFields = array;
    this.storage = new PublitioAPI(
      config.publit.apiKey,
      config.publit.secretKey,
    );
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
          if (Array.isArray(req.files[field.name])) {
            const temp = [];
            for await (const file of req.files[field.name]) {
              const newFile = await this.uploadSingleFile(file);
              temp.push(newFile);
            }
            req.files[field.name] = temp;
          } else {
            const newFile = await this.uploadSingleFile(req.files[field.name]);
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

  async uploadSingleFile(file: FileType): Promise<FileType> {
    const file2 = {
      originalName: file.name,
      tempFilePath: file.tempFilePath,
      mimetype: file.mimetype,
    };

    if (file.mimetype.startsWith('image')) {
      try {
        file.name = `${uuidv4()}-${file2.originalName}`;

        const newName = path.dirname(file2.tempFilePath) + '/' + file.name;

        fs.renameSync(file2.tempFilePath, newName);
        file2.tempFilePath = newName;
      } catch (err) {
        Logger.log(err);
      }
    }

    const newFile = await this.uploadFile(file2);
    return newFile;
  }

  async uploadFile(file: FileType): Promise<FileType> {
    try {
      const fileToUpload = fs.readFileSync(file.tempFilePath);

      const fileUpload = await this.storage.uploadFile(fileToUpload, 'file', {
        folder: config.publit.folder,
      });

      Logger.log(`${file.name} uploaded to Publit.`);

      fs.unlinkSync(file.tempFilePath); // file clean up
      file.url = fileUpload.url_short;
      return file;
    } catch (error) {
      Logger.log(error, '---error');
    }
  }
}
