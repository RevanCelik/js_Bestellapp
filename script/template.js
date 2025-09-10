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

function getOrderBasketTemplate() {
    return `
    <div>
        <div>
            <strong>Vielen Dank! Die Testbestellung wurde erfolgreich aufgegeben.</strong>
        </div><br>

        <div>
            Die geschätze Lieferungszeit beträgt 25 - 45 Minuten.
        </div>
    </div>
    `;
}