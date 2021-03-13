import { Todo } from './todo-model';

export class Note {id: any;
    shareFrom:string;
    shareTo:string;
    num?:Number;
    title?: string;
    description?: string;
    pin?: boolean;
    notes?:boolean;
    labels?: string[];
    date?: Date;
    time?: string;
    selectedColor?: number;
    color?: string;
    imagePreview?: string;
    todoList?: Todo[];
    showTodo?: boolean;
    arhieved?: boolean;
    trash?: boolean;
}
