let cart = [{name : "Sầu riêng",gia:"30.000vnd/kg"},
{name :"Sơ ri",gia:"20.000vnd/kg"},
{name : "sầu riêng",gia:"30.000vnd/kg"},
{name : "Sung",gia:"30.000vnd/kg"},
{name : "Táo",gia:"30.000vnd/kg"},
{name : "Thanh long",gia:"30.000vnd/kg"},
{name : "Quýt",gia:"30.000vnd/kg"},
{name : "Ổi",gia:"30.000vnd/kg"},
{name : "Cam",gia:"30.000vnd/kg"},
{name : "Anh đào",gia:"30.000vnd/kg"},
{name : "Bòn bon",gia:"30.000vnd/kg"}

];

//Sung Táo Tắc Thanh long Quýt Ổi
let cartBorder = document.getElementById("cartBorder");



for(let i of cart){
    let item= document.createElement("li");
    let name = document.createElement("p");


    let price = document.createElement("p");
    let btnAdd= document.createElement("button");
    

    name.innerHTML= i.name;
    price.innerHTML= i.gia;
    btnAdd.innerHTML= "Mua"; 

    cartBorder.appendChild(item);
    item.appendChild(name);
    item.appendChild(price);
    item.appendChild(btnAdd);

    // li.style.backgroundColor = "red";
    item.className = "cartList";
    
}

