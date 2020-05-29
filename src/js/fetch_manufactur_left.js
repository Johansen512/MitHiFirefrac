document.addEventListener("DOMContentLoaded", function () {

    let manufacturers = [];

    /*THIS IS TRYOUT
    let current_URL = window.location.search;
    let search_params = new URLSearchParams(current_URL);
    let params_category = search_params.get("category");*/

   
    

    fetch("https://hifi-corner.herokuapp.com/api/v1/products?make=", {
        "method": "GET"
      })

   /* fetch("https://hifi-corner.herokuapp.com/api/v1/brands", {
  "method": "GET"
})*/
        .then(response => response.json())
        .then(data => {
console.log (data);
            let manuAsideLeft = document.querySelector('.shopkategorier__aside_left-2');
            /*let current_data;*/
            
            data.forEach(products => {
            /*let current_data;*/
                
              if (manufacturers.indexOf(products.make) != -1) { return; }
                manufacturers.push(products.make);
                
                let sectionLeft = document.createElement('ul');
                sectionLeft.setAttribute('data-brand', products.make);
                sectionLeft.innerHTML = `  
                <li class="shopkategorier__links_manufacturer"><a class="shopkategorier__links_sorterurl" href="/shop_kategorier?make=${products.make}">${products.make}</a></li>
                `;

                manuAsideLeft.appendChild(sectionLeft);
            });
        })
})