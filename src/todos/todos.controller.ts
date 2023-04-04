import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe';
import { Todo } from './todo.entity';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private todossService: TodosService) {}

  @Get()
  findAll() {
    return this.todossService.getTodos();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id) {
    return this.todossService.findOne(id);
  }

  @Post() create(@Body() note: Todo) {
    return this.todossService.createTodo(note);
  }

  @Patch(':id')
  async editNote(@Body() note: Todo, @Param('id') id: number): Promise<Todo> {
    const noteEdited = await this.todossService.editTodo(id, note);
    return noteEdited;
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id) {
    this.todossService.remove(id);
  }
}
