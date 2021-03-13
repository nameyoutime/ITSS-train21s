let  a = prompt("nhap a:");
let  b = prompt("nhap b:");

function sum(a,b){
let  lena = a.length;
let  lenb = b.length;  

if(lenb > lena){
    let temp = a;
    a = b;
    b = temp;
  
}

let nho = 0;
let sum ="";
let Ta,Tb;


let donvi;
let temp;
let tempS;

//  10111213141516171819201234567890
//  10111213141516171819201234567890
//  20222426283032343638402469135780
for (let i =0;i<lena;i++){
    Ta = parseInt(a.charAt(lena -1-i));
    Tb = parseInt(b.charAt(lenb -1-i));
    Tb = (Tb)?Tb:0;

    temp = (nho + Ta + Tb);
    tempS = temp.toString();
    if(temp > 9){
        nho = 1;
    }
    else{
        nho = 0;
    }
    donvi = tempS.charAt(tempS.length-1);
    sum = (i==lena-1)?temp+sum:+donvi+sum;
}
 return sum;
}

document.write(sum(a,b));