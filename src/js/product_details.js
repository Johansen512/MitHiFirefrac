document.addEventListener("DOMContentLoaded", () => {

    let current_URL = window.location.search;
    let search_params = new URLSearchParams(current_URL);
    let params_id = search_params.get ("sku");
/*console.log (params_id);*/
    /*fetch("/assets/data/product_data_dummy.json")*/

    fetch(`https://hifi-corner.herokuapp.com/api/v1/products/${params_id}`, {
  "method": "GET"
})
        .then(response => response.json())
        .then(data => {
/*console.log (data);*/
            
            let product_box = document.querySelector(".product-box");
            let product_preview = document.createElement("article");
            let product_description = document.createElement("article");
            let product_cart = document.createElement("article");
            let product_info = document.createElement("article");
            let product_details = document.createElement("article");
            let product_call = document.createElement("article");
            let h4 = document.createElement("h4");

            h4.className = "product-breadcrumbs"
            h4.innerHTML = `<a href="/kategoriliste" class="breadcrumbs__home_active">Home</a> / 
                            <a href="/shop_kategorier?category=${data.category}" class="breadcrumbs__home_active">${data.category}</a> 
                            / ${data.make}/${data.model}`;

            product_box.appendChild(h4);

            product_preview.className = "product-preview";
            product_preview.innerHTML = `
                <div class="preview-box">
                
                    <div class="preview__image-box">
                        <img class="image-box__image" src="${data.images}">
                    </div>

                    <h2 class="heading__preview-text">more views</h2>

                    <ul class="thumb-list preview-box__thumb-list">
                        <li class="thumb"><img class="thumb__image" src="${data.images}"></li>
                        <li class="thumb"><img class="thumb__image" src="/assets/img/category_list/amplifyer.jpg"></li>
                        <li class="thumb"><img class="thumb__image" src="/assets/img/category_list/cat_cd_players.jpg"></li>
                        <li class="thumb"><img class="thumb__image" src="/assets/img/category_list/cat_vinyl.jpg"></li>
                    </ul>
                </div>
            `;

            product_box.appendChild(product_preview);

            product_description.className = "product-description";
            product_description.innerHTML = `
                <h2 class="heading__product-name">${data.make}/${data.model}</h2>
                <h4 class="link link__brand-link">See other ${data.make} products</h4>
                <div class="price-box">
                <h3 class="heading__product-price"> £ ${data.price}</h3>
                              
                </div>
                <p class="text__product-description">${data.description}</p>

                <ul class="button-list product__button-list">
                    <li class="button-list__item"><a class="button button_brown-button">ask a question</a></li>
                    <li class="button-list__item"><a class="button button_brown-button">part exchange</a></li>
                    <li class="button-list__item"><a class="button button_brown-button">pay by finance</a></li>
                    <li class="button-list__item"><a class="button button_brown-button">seen a better price?</a></li>
                </ul>
            `;

            product_box.appendChild(product_description);

            product_cart.className = "product-cart";
            product_cart.innerHTML = `
                <form class="product-form">

                    <fieldset class="product-form__variant">

                        <h3 class="product-variant__title">Finish <span class="star">*</span></h3>
                        
                        <div class="fetch-variant"></div>

                    </fieldset>

                    <fieldset class="product-form__quantity">

                        <div class="product-form__quantity-box">
                            <label class="product-quantity__label">Qty:</label>
                            <input class="product-quantity__input" type="number" oninput="this.value=this.value.slice(0,this.maxLength)" onkeypress="return isNumberKey(event)" maxlength="2" min="1" max="99" name="quantity" value="1">
                            <button class="button product-form__submit button_brown-button" type="submit">add to cart</button>
                            <p class="or">-or-</p>
                            <div class="paypal-button" id="paypal-button"></div>
                        </div>

                    </fieldset>

                </form>
            `;

            product_box.appendChild(product_cart);

            /*data.arrays.finish.forEach(finish => {
                let product_variant = document.querySelector(".fetch-variant")
                let variant_box = document.createElement("div");

                variant_box.className = "product-variant__variant-box"
                variant_box.innerHTML = `
                    <input class="product-variant__input" type="radio" name="variant" value="${finish.text}">
                    <label class="product-varaint__label" for="black">${finish.text}</label>
                `;
//VARAINT? REALLY?
                product_variant.appendChild(variant_box);

            });*/

            product_info.className = "product-info";
            product_info.innerHTML = `
                <h2 class="heading__product-info">additional information</h2>

                <table class="info-table product-info__info-table"></table>
            `;

            product_box.appendChild(product_info);

            data.arrays.info.forEach(info => {
                let info_table = document.querySelector(".product-info__info-table");
                let table_row = document.createElement("tr");

                table_row.className = "info-table__table-row";
                table_row.innerHTML = `
                    <td class="info-table__data-title">${info.text}</td>
                    <td class="info-table__data-value">${info.value}</td>
                `;

                info_table.appendChild(table_row);
            });

            product_details.className = "product-details"
            product_details.innerHTML = `
                <h2 class="heading__product-details">description</h2>

                <table class="table product-detail__detail-table"></table>
            `;

            product_box.appendChild(product_details);

            data.arrays.detail.forEach(detail => {
                let detail_table = document.querySelector(".product-detail__detail-table");
                let table_row = document.createElement("tr");

                table_row.className = "detail-table__row";
                table_row.innerHTML = `
                    <td class="detail-table__data-title">${detail.text}</td>
                    <td class="detail-table__data-value">${detail.value}</td>
                `;

                detail_table.appendChild(table_row);
            });

            product_call.className = "product-call";
            product_call.innerHTML = `
                <article class="product-call">
                    <button class="product-call__button" href="tel:888-888"><i class="fas fa-phone-alt"></i> CALL US ABOUT THIS PRODUCT</button>
                </article>
            `;

            product_box.appendChild(product_call);
        })
        .then(() => {

            let preview = document.querySelector(".image-box__image");
            var imgs = Array.from(document.querySelectorAll(".thumb"));
            
            imgs.forEach(thumb => {
        
                let thumbSrc = thumb.firstChild.getAttribute("src");
                
                thumb.addEventListener("click", () => {
        
                    preview.setAttribute("src", thumbSrc);
                })
            });
        })
        .then(() => {
            paypal.Button.render({
                // Configure environment
                env: 'sandbox',
                client: {
                  sandbox: 'demo_sandbox_client_id',
                  production: 'demo_production_client_id'
                },
                // Customize button (optional)
                locale: 'en_US',
                style: {
                  size: 'small',
                  color: 'gold',
                  shape: 'pill',
                },
            
                // Enable Pay Now checkout flow (optional)
                commit: true,
            
                // Set up a payment
                payment: function(data, actions) {
                  return actions.payment.create({
                    transactions: [{
                      amount: {
                        total: '0.01',
                        currency: 'USD'
                      }
                    }]
                  });
                },
                // Execute the payment
                onAuthorize: function(data, actions) {
                  return actions.payment.execute().then(function() {
                    // Show a confirmation message to the buyer
                    window.alert('Thank you for your purchase!');
                  });
                }
              }, '#paypal-button');
        })
});