let productArr=[];
load();
// Adding new item from the admin panel
/*******************/
function showData(){

    let oldProduct=localStorage.getItem('product');
    if(oldProduct){
        productArr=JSON.parse(oldProduct);
    }
    let name=document.getElementById('name').value;
    if(name==''){
        return 0;
    }
    let price=document.getElementById('price').value;
    let stock=document.getElementById('stock').value;
    let img=document.getElementById('img').value;
    
    let productObj={
        'proName':name,
        'price':price,
        'stock':stock,
        'img':img
    }

    productArr.push(productObj);
    let productStr=JSON.stringify(productArr);
    localStorage.setItem('product',productStr);
    document.getElementById('name').value='';
    document.getElementById('price').value='';
    document.getElementById('stock').value='';
    document.getElementById('img').value='';

    load();
}

// Showing the added items on the same page
/*******************/
function load(){
    let product=localStorage.getItem('product');
    let arrProduct=JSON.parse(product);
    let arrLi=[];
    for(let i=0;i<arrProduct.length;i++){
        let li="<li> ProductName is : "+arrProduct[i].proName+"</li>";
        arrLi.push(li);
    }
    document.getElementById('productList').innerHTML="";
    for(let i=0;i<arrLi.length;i++){
        document.getElementById('productList').innerHTML+=arrLi[i];
    }
}

//Clearing
function deleteItems() {
    localStorage.clear();
    document.getElementById('productList').innerHTML="";
}



