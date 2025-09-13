function init() {
    renderDishes();
    basketDishes();
}

function renderDishes() {
    let contentRef = document.getElementById('content');
    contentRef.innerHTML = "";

    for (let i = 0; i < myDishes.length; i++) {
        let myDish = myDishes[i];
        contentRef.innerHTML += `
        <div onclick="moveDish(${i})" class="dialog_menu">
        <div class="name_button">
            <div class="content_menu"><strong>${myDish.name}</strong></div><div><button class="add_button">+</button></div>
        </div>
            <div class="content_menu">${myDish.description}</div>
            <div class="content_menu">${myDish.price.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</div>
        </div>
        `;
    }
}

function basketDishes() {
    let basketContentRef = document.getElementById('basket_dish');
    basketContentRef.innerHTML = "";

    if (basket.length == 0) {
        basketContentRef.innerHTML = "<div><strong>Es ist noch nichts im Warenkorb</strong></div><br>";
    
    } else {
        for (let i = 0; i < basket.length; i++) {
        basketContentRef.innerHTML += getBasketTemplate(i);
    }
    }
    basketFullPrice();
    deliveryFee();
    updateTotal();
}

function basketFullPrice() {
    let basketFullPriceContentRef = document.getElementById('basket_total_price');
    basketFullPriceContentRef.innerHTML = "";

    let total = basket.reduce((sum, item) => sum + item.price * item.count, 0);

    basketFullPriceContentRef.innerHTML += total.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
}

function moveDish(i) {
    let dish = myDishes[i];
    let found = basket.find(item => item.name === dish.name)
    if (found) {
        found.count++
    } else {
        newDish = {
            'name': dish.name,
            'price': dish.price,
            'count': 1
        }
        basket.push(newDish);
    }
    renderDishes();
    basketDishes();
}

function decreaseDish(i) {
    let dish = basket[i];

    if (dish.count > 1) {
        dish.count--
    } else {
        basket.splice(i, 1);
    }
    renderDishes();
    basketDishes();
}

function increaseDish(i) {
    let dish = basket[i];

    dish.count++;

    renderDishes();
    basketDishes();
}

function deleteDish(i) {
    basket.splice(i, 1);
    totalDishPrice.splice(i, 1);

    renderDishes();
    basketDishes();
}

function deliveryFee() {
    let deliveryContentRef = document.getElementById('basket_delivery_fee');
    deliveryContentRef.innerHTML = "";

    if (basket.length > 0) {
        deliveryContentRef.innerHTML = "5,00 €";
    } else {
        deliveryContentRef.innerHTML = "0,00 €";
    }
}

function order() {
    let orderBasketContentRef = document.getElementById('order_message');
    orderBasketContentRef.innerHTML ="";

    basket = [];

    basketDishes();
    orderBasketContentRef.innerHTML = getOrderBasketTemplate();
}

function toggleOverlaySection() {
    let overlayRefSection = document.getElementById('basket_overlay');

    overlayRefSection.classList.toggle('hidden');
}

function toggleOverlayDiv() {
    let overlayRefDiv = document.getElementById('basket_overlay_div');

    overlayRefDiv.classList.toggle('hidden');
}

function getDeliveryFeeNumber() {
    let text = document.getElementById("basket_delivery_fee").innerText;
    let number = parseFloat(text.replace("€", "").replace(" ", "").replace(",", "."));
    return number;
}

function updateTotal() {

let subtotalText = document.getElementById("basket_total_price").innerText;
let subtotal = parseFloat(subtotalText.replace("€", "").replace(" ", "").replace(",", ".")) || 0;

let delivery = getDeliveryFeeNumber();

let total = subtotal + delivery;

document.getElementById("basket_grand_total").innerText = total.toFixed(2).replace(".", ",") + " €";
}