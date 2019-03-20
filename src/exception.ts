import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestException extends HttpException {
  constructor() {
    super('BadRequest', HttpStatus.BAD_REQUEST)
  }
}

export class UnauthorizedException extends HttpException {
  constructor() {
    super('Unauthorized', HttpStatus.UNAUTHORIZED)
  }
}

export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}

export class NotFoundException extends HttpException {
  constructor() {
    super('NotFound', HttpStatus.NOT_FOUND);
  }
}
