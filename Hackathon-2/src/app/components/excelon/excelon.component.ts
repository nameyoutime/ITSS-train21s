import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { CalcService } from 'src/app/services/calc.service';

@Component({
  selector: 'app-excelon',
  templateUrl: './excelon.component.html',
  styleUrls: ['./excelon.component.scss']
})
export class ExcelonComponent implements OnInit {
  constructor(public calc:CalcService) { } 
  public arr=[
    '', '', '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '', '', '',
    '', '', '', ''
  ]
  
  ngOnInit(): void {
  }
  public dapan: string="";
  public catch(event:any){
    let a= /^\s*([-+]?)(\d+)(?:\s*([-+*\/])\s*((?:\s[-+])?\d+)\s*)+$/;
    if(a.test(event)){
      let a=this.infixToPostFix1(event);
      return a;
    }else
    {
      let b=event;
      this.dapan=b;
      return b;
      }

  }
  public infixToPostFix1(TestString: any) {
    
    this.dapan = this.readInput(TestString);
    
    TestString= this.dapan;
  

    return  TestString;
  }

   public readInput(input){
    let stack = [];
    let answer = [];
    
    for (let i = 0; i < input.length; i++) {
      if(input[i] == ' '){
        continue;
      }
      if (/\d+/.test(input[i])) {
        answer.push(input[i])
        while(/\d+/.test(input[i+1])){
          let temp = answer.pop() + input[i+1];
          answer.push(temp);
          i++;
        }
      }else if(input[i] == ")"){
        while (stack[stack.length-1] != '(') {
          answer.push(stack.pop());
        }
        stack.pop();
      }else { 
      this.calc.operatorCheck(stack,input[i],answer)
    }
    }
    while(stack.length!=0){
      answer.push(stack.pop());
    }
  
    return this.calc.executePostfix(answer);

  }
  
}
