import { Injectable } from '@nestjs/common';

@Injectable()
export class OpenRoutesService {
  register() {
    return { message: 'We hope see you again' };
  }

  // login() {
  //   return `Here it will be login`;
  // } apenas no auth

  findAll() {
    return `This action returns all openRoutes`;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} openRoute`;
  // } apenas para encontrar para editar 
  // (ficando o filter no front do getall)
}
