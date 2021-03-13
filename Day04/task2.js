const num = [
    "không",
    "một",
    "hai",
    "ba",
    "bốn",
    "năm",
    "sáu",
    "bảy",
    "tám",
    "chín",
  ];
  let a = prompt("Nhập số n:");
  
  function hangchuc(n) {
    let result = "";
    let sohangchuc = Math.floor(n / 10);
    let donvi = n % 10;
  
    if (sohangchuc > 1) {
      result = num[sohangchuc] + " mươi ";
      if (donvi == 1) {
        result += "mốt";
      } else if (donvi == 4) {
        result += "tư";
      } else if (donvi == 5) {
        result += "lăm";
      }else{
        result += num[donvi];
      }
      
    } else if (sohangchuc == 1) {
      result = "mười "
      if (donvi == 5) {
        result += "lăm";
      } else {
        result += num[donvi];
      }
    }
    return result;
  }

  function hangtram(n){
    let result = "";
    let sohangtram = Math.floor(n / 100);
    let donvi = n % 100;
    result = num[sohangtram]+" trăm "+ hangchuc(donvi);
    if(sohangtram==1){

    }
    

    return result;
  }

  function hangngan(n){
    let result = "";
    let sohangngan = Math.floor(n / 1000);
    let donvi = n % 1000;

    result = num[sohangngan]+" ngàn "+ hangtram(donvi);


    return result;
  }

  function chucngan(n){
    let result = "";
    let chucngan = Math.floor(n / 10000);
    let donvi = n % 10000;
//chua xong
    result = num[chucngan]+" ngàn "+ hangngan(donvi);


    return result;
  }
  
  alert(chucngan(a));