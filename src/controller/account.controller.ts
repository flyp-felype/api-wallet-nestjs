import { Controller, Post, Body, Res, HttpStatus, Param, Get } from '@nestjs/common';
import { CreateAccountDTO  } from '../dto/create-account.dto';
import {  AccountService } from '../services/account.services';
import { Response } from 'express';
import { GetAccountDTO } from '../dto/get-account.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Account")
@Controller('/account')
export class AccountController {
  constructor(private readonly accountService: AccountService) { }

  @Get('/:document')
  async get(@Param() params: GetAccountDTO,  @Res() res: Response) {
    try {
      const { document } = params
      if (!document) return res.status(HttpStatus.BAD_REQUEST).json({ success: false, mensagem: 'Favor enviar o documento' })
    
      const account = await this.accountService.get(document)
      if(!account) return res.status(HttpStatus.NOT_FOUND).json({ success: false, mensagem: 'Usuário não encontrado'})

      return res.status(HttpStatus.OK).json(account)
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ success: false, mensagem: error.toString() })
    }
  }
 

  @Post()
  async save(@Body() accountBody: CreateAccountDTO, @Res() res: Response) {
    try {
      const { name, document } = accountBody 
    
      const account = await this.accountService.save({ name, document });
      return res.status(HttpStatus.OK).json(account)
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ success: false, mensagem: error.toString() })
    }

  }
}
