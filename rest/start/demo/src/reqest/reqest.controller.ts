import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Headers,
  Query,
} from '@nestjs/common';
import { ReqestService } from './reqest.service';
import { CreateReqestDto } from './dto/create-reqest.dto';
import { UpdateReqestDto } from './dto/update-reqest.dto';

@Controller('reqest')
export class ReqestController {
  constructor(private readonly reqestService: ReqestService) {}

  @Post()
  // @Body('key') 这样就可以直接获得key对应的值
  create(@Body() createReqestDto: CreateReqestDto) {
    console.log(createReqestDto);
    return this.reqestService.create(createReqestDto);
  }

  // @Get()
  // // 通过 Request 装饰器来获取请求参数
  // findAll(@Request() req) {
  //   console.log(req.query);
  //   return this.reqestService.findAll();
  // }
  @Get()
  // 通过 Query 装饰器来直接获取请求参数
  findAll(@Query() query) {
    console.log(query);
    return {
      code: 200,
      message: query,
    };
  }

  // 可以通过params动态路由的方式来直接读取到对应的参数
  @Get(':id')
  findOne(@Param('id') id: string, @Headers() headers) {
    console.log(headers);

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
