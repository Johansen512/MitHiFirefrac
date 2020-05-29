document.addEventListener("DOMContentLoaded", function (){

    let manufacturersR = [];
    let current_URL = window.location.search;
    let search_params = new URLSearchParams(current_URL);
    let params_categoryR = search_params.get("make");
    let current_dataR;
    /*fetch("/assets/data/product_data_dummy.json")*/

    fetch("https://hifi-corner.herokuapp.com/api/v1/products?make=", {
        "method": "GET"
      })

    .then(response => response.json())
    .then(data => {
        console.log (params_categoryR)
        let manuAside = document.querySelector('.manufacturer__aside_right');
        
        data.forEach(products => {
            if (manufacturersR.indexOf(products.make) != -1) { return; }
            
            manufacturersR.push(products.make);

            let section = document.createElement('ul');
            section.setAttribute('data-brand', products.make);
            
            section.innerHTML = `  
            <li class="manufacturer__links"><a class="manufacturer__links_url" href="/shop_kategorier?make=${products.make}">${products.make}</a></li> 
            `;
            
            manuAside.appendChild(section);
        });

        
    




//HER FRA
current_dataR = data.filter(products => products.make == params_categoryR);
current_dataR.forEach(products => {

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
