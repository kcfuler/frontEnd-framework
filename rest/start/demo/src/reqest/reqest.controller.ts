import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReqestService } from './reqest.service';
import { CreateReqestDto } from './dto/create-reqest.dto';
import { UpdateReqestDto } from './dto/update-reqest.dto';

@Controller('reqest')
export class ReqestController {
  constructor(private readonly reqestService: ReqestService) {}

  @Post()
  create(@Body() createReqestDto: CreateReqestDto) {
    return this.reqestService.create(createReqestDto);
  }

  @Get()
  findAll() {
    return this.reqestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reqestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReqestDto: UpdateReqestDto) {
    return this.reqestService.update(+id, updateReqestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reqestService.remove(+id);
  }
}
