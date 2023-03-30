import { Injectable } from '@nestjs/common';
import { DBService } from '@app/db';

@Injectable()
export class OauthService {
  constructor(private dbService: DBService) {}
}
