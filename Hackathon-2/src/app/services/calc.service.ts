import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalcService {

  constructor() { }
  public executePostfix(arr=[]) {
    let stack = [], operand1, operand2, tempOperand;
    let operators = ['+', '-', '*', '/'];
    for (let i = 0; i<arr.length;i++) {
      if (operators.indexOf(arr[i]) >= 0) {
        operand2 = stack.pop();
        operand1 = stack.pop();
        tempOperand = eval(operand1 + arr[i] + operand2);
        stack.push(tempOperand);
      } else {
        stack.push(arr[i]);
      }
    }
    return stack.pop();
  }
  public operands(x:string){
    if (x == "(") {
      return 3;
    }
    if (x == "*" || x == "/") {
      return 2;
    }else if (x == "+" || x == "-") {
      return 1;
    }
  }
  public operatorCheck(stack=[],x:string,answer=[]){
    if (stack.length == 0) {
      stack.push(x);
    }else if (this.operands(x) > this.operands(stack[stack.length-1])) {
      stack.push(x);   
    }else{
      while(this.operands(x) <= this.operands(stack[stack.length-1]) && stack.length!=0 && stack[stack.length-1]!='('){
        answer.push(stack.pop());
      }
      stack.push(x);
    }
  }
  

}
