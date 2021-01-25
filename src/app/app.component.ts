import { Todo } from '../modulos/todo.model';
import { Validators, FormBuilder, FormGroup  } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // tslint:disable-next-line: comment-format
  //Declaração das Variaveis
  public modo = 'lista';
  public titulo: String = 'Minhas Tarefas';
  public todos: Todo[] = [];
  public form: FormGroup;

//Validando o Campo de Texto ou Titulo
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      titulo: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(100),
        Validators.required
      ])],
      execucao:['' Validators.compose([
        Validators.required,
        Validators.maxLength(25)
      ])]
    });
  this.load();
  }
  adicionar() {
    const execucao = this.form.controls['execucao'].value;
    const titulo = this.form.controls['titulo'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, titulo, false, execucao));
    this.salvar();
    this.limpar();
  }

  limpar() {
    this.form.reset();
  }

  remover(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
    this.salvar();
  }

  marcarConcluido(todo: Todo) {
    todo.estado = true;
    this.salvar();
  }

  marcarNaoConcluido(todo: Todo) {
    todo.estado = false;
    this.salvar();
  }

  salvar() {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
    this.modo = 'lista';
  }

  load() {
    const data = localStorage.getItem('todos');
    if (data) {
      this.todos = JSON.parse(data);
    } else {
      this.todos = [];
    }
  }

  changeModo(modo:string) {
    this.modo = modo;
  }
}
