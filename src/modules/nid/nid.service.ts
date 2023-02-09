import { HttpStatus, Injectable } from '@nestjs/common';
import { NIDValidatorErrorMessages } from 'src/entity';
import {
  APIResponse,
  IResponse,
} from 'src/internal/api-response/api-response.service';
import { APIException } from 'src/internal/exception/api.exception';

@Injectable()
export class NIDService {
  constructor(private readonly response: APIResponse) {}

  async uploadAndVerifyNID(
    file: Express.Multer.File,
    req: any,
  ): Promise<IResponse<any>> {
    if (req.fileExtensionValidationError || !file)
      throw new APIException(
        NIDValidatorErrorMessages.UNSUPPORTED_FILE,
        'UNSUPPORTED_FILE',
        HttpStatus.BAD_REQUEST,
      );

    //TODO: NID matching
    return this.response.success({ message: 'success' });
  }
}
