import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  HttpStatus,
} from '@nestjs/common';
import { multerConfig } from 'config/multer';
import { FilesValidatorErrorMessages } from 'src/entity';
import { APIException } from 'src/internal/exception/api.exception';

@Injectable()
export class ParseFile implements PipeTransform {
  transform(files: any, _metadata: ArgumentMetadata): Express.Multer.File[] {
    if (
      files === undefined ||
      files === null ||
      (Array.isArray(files) && files.length === 0) ||
      !files?.back ||
      !files.back[0] ||
      !multerConfig.mimeTypes.includes(files.back[0].mimetype) ||
      !files?.front ||
      !files.front[0] ||
      !multerConfig.mimeTypes.includes(files.front[0].mimetype)
    ) {
      throw new APIException(
        FilesValidatorErrorMessages.UNSUPPORTED_FILE,
        'UNSUPPORTED_FILE',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      files.back[0]?.size > +multerConfig.maxFileSize ||
      files.front[0]?.size > +multerConfig.maxFileSize
    ) {
      throw new APIException(
        FilesValidatorErrorMessages.FILE_SIZE_EXTEND,
        'FILE_SIZE_EXTEND',
        HttpStatus.BAD_REQUEST,
      );
    }

    return files;
  }
}
