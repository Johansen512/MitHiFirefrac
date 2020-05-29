document.addEventListener("DOMContentLoaded", function () {

    let manufacturers = [];

   
    let current_URL = window.location.search;
    let search_params = new URLSearchParams(current_URL);
    let params_category = search_params.get("make");
    let current_data;
   
    

    fetch("https://hifi-corner.herokuapp.com/api/v1/products?make=", {
        "method": "GET"
      })



        .then(response => response.json())
        .then(data => {
          console.log (params_category)

            let manuAsideLeft = document.querySelector('.shopkategorier__aside_left-2');
            
            

            data.forEach(products => {
              
              
          if (manufacturers.indexOf(products.make) != -1) { return; }
                manufacturers.push(products.make);
                
                let sectionLeft = document.createElement('ul');
                sectionLeft.setAttribute('data-brand', products.make);
                sectionLeft.innerHTML = `  
                <li class="shopkategorier__links_manufacturer"><a class="shopkategorier__links_sorterurl" href="/shop_kategorier?make=${products.make}">${products.make}</a></li>
                `;

                manuAsideLeft.appendChild(sectionLeft);
            })
//HER FRA
current_data = data.filter(products => products.make == params_category);
current_data.forEach(products => {

                let shop_box = document.querySelector(".shop__kategorier_nest");
                let shop_varer = document.createElement("div");
                shop_varer.className = "shopkategorier__varer";
                shop_varer.setAttribute(`data-id`, products.sku);
    
                shop_varer.innerHTML = `
                <div class="shop__kategorier_box">
                    <img class="shop__kategorier_varebillede" src="${products.images}" alt="varebillede">
                </div>
                    <p class="product__text">${products.make} ${products.model}</p>
                <div class="price-boxes">
                   
                    <p class="product__price">${products.price}</p>
                
                   </div>
                    <a class="putinbasket button_brown-button" href="/product?sku=${products.sku}">ADD TO CART</a>
                `;
    /*<p class="product__pricesale">${products.price}</p>   Hører til oppe ved price*/
    
                shop_box.appendChild(shop_varer);

                //HER TIL

                
            });


            
        })
})