let oldProduct;
let storedArr=[];
// OnLoad Event in Body to get the added items 
/*******************/
function loadClient(){
    oldProduct=localStorage.getItem('item');
    if(oldProduct){
        oldProduct=JSON.parse(oldProduct);
        console.log(oldProduct);
        for(let i=0;i<oldProduct.length;i++){
            let cartItem=document.createElement('div');
            cartItem.setAttribute('class','cartItem');
            cartItem.innerHTML=`<p class='name'>${oldProduct[i].itemName}</p><p class='price'>${oldProduct[i].itemPrice}L.E.</p><input type="button" class="delete" value="x" onclick="deleteCart(this)">`;
            document.getElementById('cart').children[1].appendChild(cartItem);
        }
    }
    let product=localStorage.getItem('product');
    let arrProduct=JSON.parse(product);
    let arrLi=[];
    for(let i=0;i<arrProduct.length;i++){
        let li=document.createElement('div');
        li.innerHTML=
        `<p id="pName">${arrProduct[i].proName}</p>
        <div id="pPrice">${arrProduct[i].price}</div>
        <span id="sNumber">${arrProduct[i].stock} left in stock.</span>`;
        li.setAttribute('class','product');
        li.style.backgroundImage=`url(${arrProduct[i].img})`;
        li.style.backgroundRepeat="no-repeat";
        li.draggable="true";
        li.setAttribute('id','p'+i);
        li.ondragstart=(event)=>{
            event.dataTransfer.setData("text",event.target.id);
        };
        li.ondragover=(event)=>{
            event.stopPropagation();
        };

        arrLi.push(li);
    }
    document.getElementById('inner').innerHTML="";
    for(let i=0;i<arrLi.length;i++){
        document.getElementById('inner').appendChild(arrLi[i]);
    }
}
// Allowing the drop action into the cart
/*******************/
function allowDrop(event){
    event.preventDefault();
}

function drop(event){
    let id= event.dataTransfer.getData('text');
    let item = document.getElementById(id).cloneNode(true);
    let name=item.children[0].innerText;
    let price=item.children[1].innerText;
    let storedObj={
        'itemName':name,
        'itemPrice':price
    }
    oldProduct = localStorage.getItem('item');
    if (oldProduct != null) {
        oldProduct = JSON.parse(oldProduct);
        oldProduct.forEach(element => {
            storedArr.push(element);
        });
    }
    storedArr.push(storedObj);
    localStorage.setItem('item',JSON.stringify(storedArr));
    let restoredArr=localStorage.getItem('item');
    restoredArr=JSON.parse(restoredArr);
    let cartItem=document.createElement('div');
    cartItem.setAttribute('class','cartItem');
    cartItem.innerHTML=`<p class='name'>${name}</p><p class='price'>${price}L.E.</p><input type="button" class="delete" value="x" onclick="deleteCart(this)">`;
    document.getElementById(event.target.id).children[1].appendChild(cartItem);
}
// Deleting an item from the cart 
/*******************/
function deleteCart(btn){
    btn.parentNode.remove();
}
