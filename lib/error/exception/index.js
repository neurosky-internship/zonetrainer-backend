module.exports = {
  BadRequestException: require('./BadRequestException'),
  ConflictException: require('./ConflictException'),
  ForbiddenException: require('./ForbiddenException'),
  InternalServerErrorException: require('./InternalServerErrorException'),
  NotFoundException: require('./NotFoundException'),
  ServiceUnavailableException: require('./ServiceUnavailableException'),
  UnauthorizedException: require('./UnauthorizedException'),
  ServiceException: require('./ServiceException'),
  Messages: require('../code/messages.json')
}