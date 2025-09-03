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

    for (let i = 0; i < basket.length; i++) {
        basketContentRef.innerHTML += getBasketTemplate(i);
    }

    basketFullPrice();
}

function getBasketTemplate(i) {
    let fullPrice = basket[i].price * basket[i].count;

    return `
    <div>
            <strong>${basket[i].name}</strong>
        <div class="basket_style">
            <div class="basket_center">
                <button onclick="decreaseDish(${i})" class="basket_button_style">-</button>${basket[i].count}x <button onclick="increaseDish(${i})" class="basket_button_style">+</button>
            </div>
            <div class="basket_center">
                ${fullPrice.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                <button class="material-icons" onclick="deleteDish(${i})">&#xe872;</button>
            </div>
        </div>
    
    </div>

    `;
}

function basketFullPrice() {
    let basketFullPriceContentRef = document.getElementById('basket_total_price');
    basketFullPriceContentRef.innerHTML = "";

    let total = basket.reduce((sum, item) => sum + item.price * item.count, 0);

    basketFullPriceContentRef.innerHTML += 'Gesamt:' + ' ' + total.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
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