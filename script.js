const addProductionBtn = document.querySelector('#addProductBtn');
const productlist = document.querySelector('#productList');
const productName = document.querySelector('#itemName');
const productPrice = document.querySelector('#itemPrice');
const productQuantity = document.querySelector('#itemQuantity');
const productPhoto = document.querySelector('#itemPhoto');

const product= {
    id: '',
    name: '',
    price: '',
    quantity:'',
    photo:'',
    reset :function(){
        this.id ='';
        this.name ='';
        this.price ='';
        this.quantity ='';
        this.photo = '';
        }   
   }


   productPhoto.addEventListener('change',(e) => {
            const file = e.target.files[0];
            product.photo = "./img/products/"+file.name;
   })

    var allProducts = JSON.parse(localStorage.getItem('products')) || [];

   addProductionBtn.addEventListener('click',() => {
            product.name = productName.value;
            product.price = productPrice.value;
            product.quantity = productQuantity.value;
            product.id = allProducts.length + 1;
            allProducts.push(product);
            localStorage.setItem('products', JSON.stringify(allProducts));

            printAllProducts();
            product.reset();
            resetInputs();
   })

     function printAllProducts(){
        productlist.innerHTML = '';
        allProducts.forEach(product => {
            const newItem = createCard(product);
            productlist.innerHTML += newItem;
            })
}
  
 function createCard(product){
     return ` <div class="product-card">
     <div class="product-image">
       <img
         src="${product.photo}"
         alt=""
       />
     </div>
     <div class="product-info">
       <h3> ${product.name}</h3>
       <p>${product.price}</p>
       <p class="text-muted">${product.quantity} in stock</p>
       <span>
           <button type="button" class="btn btn-success" >
             <i class="fas fa-pen"></i>
           </button>
             <button type="button" class="btn btn-danger" onclick = "deleteItem(${product.id})">
                 <i class="fas fa-trash"></i>
             </button>
       </span>
     </div>
   </div>`


 }

 printAllProducts();

 function resetInputs(){
     productName.value = '';
     productPrice.value = '';
     productQuantity.value = '';
     productPhoto.value = '';
 }

 function deleteItem(id){
     allProducts = allProducts.filter(product => product.id !== id);
     localStorage.setItem('products',JSON.stringify(allProducts));
     printAllProducts();
 }
