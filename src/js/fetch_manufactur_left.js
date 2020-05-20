document.addEventListener("DOMContentLoaded", function () {

    let manufacturers = [];

    fetch("/assets/data/product_data_dummy.json")
        .then(response => response.json())
        .then(data => {

            let manuAsideLeft = document.querySelector('.shopkategorier__aside_left-2');

            data.products.forEach(products => {
                if (manufacturers.indexOf(products.brand) != -1) { return; }
                manufacturers.push(products.brand);
                
                let sectionLeft = document.createElement('ul');
                sectionLeft.setAttribute('data-brand', products.brand);
                sectionLeft.innerHTML = `  
                <li class="shopkategorier__links_manufacturer"><a class="shopkategorier__links_sorterurl" href="shop_kategorier.html?brand=${products.brand}">${products.brand}</a></li>
                `;

                manuAsideLeft.appendChild(sectionLeft);
            });
        })
})