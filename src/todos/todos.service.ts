import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private todosRepository: Repository<Todo>,
  ) {}
  async getTodos(): Promise<Todo[]> {
    return await this.todosRepository.find();
  }

  findOne(id: string): Promise<Todo> {
    return this.todosRepository.findOne(id);
  }

  async createTodo(note: Todo) {
    this.todosRepository.save(note);
  }

  async remove(id: string): Promise<void> {
    await this.todosRepository.delete(id);
  }

  async editTodo(id: number, todos: Todo): Promise<Todo> {
    const editedTodo = await this.todosRepository.findOne(id);
    if (!editedTodo) {
      throw new NotFoundException('Note is not found');
    }
    editedTodo.description = todos.description;
    editedTodo.todo = todos.todo;
    await editedTodo.save();
    return editedTodo;
  }
}
