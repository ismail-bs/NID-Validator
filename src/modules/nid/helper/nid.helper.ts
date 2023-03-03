import { HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigurationThreshold, NIDValidatorErrorMessages } from 'src/entity';
import { APIException } from 'src/internal/exception/api.exception';

@Injectable()
export class NIDHelper {
  // Check string similarity
  static compareTwoStrings(first: string, second: string): number {
    first = first.toLowerCase();
    second = second.toLowerCase();
    if (first === second) return 100; // identical or empty
    first = first.replace(/\s+/g, '');
    second = second.replace(/\s+/g, '');

    if (first.length < 2 || second.length < 2) return 0; // if either is a 0-letter or 1-letter string

    const firstMap = new Map();
    for (let i = 0; i < first.length - 1; i++) {
      const big = first.substring(i, i + 2);
      const count = firstMap.has(big) ? firstMap.get(big) + 1 : 1;
      firstMap.set(big, count);
    }

    let intersectionSize = 0;
    for (let i = 0; i < second.length - 1; i++) {
      const big = second.substring(i, i + 2);
      const count = firstMap.has(big) ? firstMap.get(big) : 0;

      if (count > 0) {
        firstMap.set(big, count - 1);
        intersectionSize++;
      }
    }
    return (
      ((2.0 * intersectionSize) / (first.length + second.length - 2)) * 100
    );
  }

  static compareNIDResponse(first: any, second: any): ConfigurationThreshold {
    const matchingObj: ConfigurationThreshold = {
      name: this.compareTwoStrings(first.name, second.name),
      nameBn: this.compareTwoStrings(first.nameBengali, second.nameBn),
      dob: this.compareTwoStrings(first.dob, second.dob),
      nid: this.compareTwoStrings(first.nid, second.nid),
      fatherBn: this.compareTwoStrings(
        first.fatherNameBengali,
        second.fatherBn,
      ),
      motherBn: this.compareTwoStrings(
        first.motherNameBengali,
        second.motherBn,
      ),
    };
    return matchingObj;
  }

  static compareConfigurationThresholdValues(
    matchingResponseObj: ConfigurationThreshold,
    configurationThreshold: ConfigurationThreshold,
  ): void {
    for (const key in matchingResponseObj) {
      if (matchingResponseObj[key] < configurationThreshold[key]) {
        this.showErrorMessage(key);
      }
    }
  }

  static async getOCRResponseAndConfigurationThreshold(
    requestBody: {
      data: {
        front: string;
        back: string;
      };
    },
    configurationRepo: any,
  ): Promise<{
    ocrResponse: any;
    configurationThreshold: ConfigurationThreshold;
  }> {
    try {
      const [ocrResponse, configurationThreshold] = await Promise.all([
        // convert images to text format using the Python ML model
        await axios.post('http://127.0.0.1:5000/ocr', requestBody),

        //get the configuration threshold
        await configurationRepo.getConfigurationThreshold(),
      ]);
      return { ocrResponse: ocrResponse.data, configurationThreshold };
    } catch (error) {
      console.log(error.message);
      throw new APIException(
        NIDValidatorErrorMessages.CANNOT_VERIFY_NID,
        'CANNOT_VERIFY_NID',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  static showErrorMessage(key: string): void {
    switch (key) {
      case 'name':
        throw new APIException(
          NIDValidatorErrorMessages.NAME_DOES_NOT_MATCH,
          'NAME_DOES_NOT_MATCH',
          HttpStatus.BAD_REQUEST,
        );
      case 'nameBn':
        throw new APIException(
          NIDValidatorErrorMessages.BENGALI_NAME_DOES_NOT_MATCH,
          'BENGALI_NAME_DOES_NOT_MATCH',
          HttpStatus.BAD_REQUEST,
        );
      case 'dob':
        throw new APIException(
          NIDValidatorErrorMessages.DATE_OF_BIRTH_DOES_NOT_MATCH,
          'DATE_OF_BIRTH_DOES_NOT_MATCH',
          HttpStatus.BAD_REQUEST,
        );
      case 'nid':
        throw new APIException(
          NIDValidatorErrorMessages.NID_NUMBER_DOES_NOT_MATCH,
          'NID_NUMBER_DOES_NOT_MATCH',
          HttpStatus.BAD_REQUEST,
        );
      case 'fatherBn':
        throw new APIException(
          NIDValidatorErrorMessages.FATHER_NAME_DOES_NOT_MATCH,
          'FATHER_NAME_DOES_NOT_MATCH',
          HttpStatus.BAD_REQUEST,
        );
      case 'motherBn':
        throw new APIException(
          NIDValidatorErrorMessages.MOTHER_NAME_DOES_NOT_MATCH,
          'MOTHER_NAME_DOES_NOT_MATCH',
          HttpStatus.BAD_REQUEST,
        );
      default:
        throw new APIException(
          NIDValidatorErrorMessages.CANNOT_VERIFY_NID,
          'CANNOT_VERIFY_NID',
          HttpStatus.BAD_REQUEST,
        );
    }
  }
}
