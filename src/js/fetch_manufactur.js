document.addEventListener("DOMContentLoaded", function (){

    let manufacturers = [];

    /*fetch("/assets/data/product_data_dummy.json")*/

    fetch("https://hifi-corner.herokuapp.com/api/v1/brands", {
  "method": "GET"
})
    .then(response => response.json())
    .then(data => {

        let manuAside = document.querySelector('.manufacturer__aside_right');
        
        data.forEach(products => {
            if (manufacturers.indexOf(products.name) != -1) { return; }
            manufacturers.push(products.name);

            let section = document.createElement('ul');
            section.setAttribute('data-brand', products.name);
            section.innerHTML = `  
            <li class="manufacturer__links"><a class="manufacturer__links_url" href="/shop_kategorier?brand=${products.name}">${products.name}</a></li> 
            `;
            
            manuAside.appendChild(section);
        });
    })
})