'use strict'

// Fixed food tax
const tax_rate = 0.09;

// Tip percentage
const tip_percent = 0.20;

// Constructor for food item
class MenuItem {
    constructor(dish, cost) {
        this.dish = dish;
        this.cost = cost;
    }

};

// The food
let pizza = new MenuItem('Pizza Slice', 8.99);
let pasta = new MenuItem('Spaghetti', 11.99);
let salad = new MenuItem('Cobb Salad', 11.99);
let salmon = new MenuItem('Blackened Salmon', 14.99);
let soup = new MenuItem('Sausage and Lentil', 5.99);
let hamburger = new MenuItem('Hamburger', 7.99);
let vegetable_mix = new MenuItem('Mixed Vegetables', 3.99);
let bread = new MenuItem('Garlic Bread', 3.99);
let beer = new MenuItem('Guiness', 6.50);
let water = new MenuItem('Pellegrino Mineral Water', 2.99);
let tea = new MenuItem('Iced Tea', 2.75);
let milk = new MenuItem('Milk', 3.50);

// Constructor for diner objects
class Diner {
    constructor(name) {
        this.name = name;
        this.meal = [];
        this.mealSubtotal = 0;
        this.mealTax = 0;
        this.mealTip = 0;
        this.mealTotal = 0;
    }

    // Add items to the diner's meal
    addItem() {
        let item = Array.prototype.slice.call(arguments, 0);
        item.forEach((food, index, item) => {
            this.meal.push(food);
            this.mealSubtotal += food.cost;
        });
        return;
    }

};

// Constructor for the bill
class Bill {
    constructor() {
        this.diners = Array.prototype.slice.call(arguments, 0);
        this.subtotal = 0;
        this.tax = 0;
        this.tip = 0;
        this.total = 0;
    }

    // Calculate the total cost of all the food consumed by the diners.
    calcSubtotal() {
        let subtotal = 0;
        let listOfItems = (item, index, meal) => {
            logItems(item.dish, item.cost);
            subtotal += item.cost;
        };
        for (let i = 0; i < this.diners.length; i++) {
            let meal = this.diners[i].meal;
            meal.forEach(listOfItems);
        }
        logSubtotal(subtotal);
        return subtotal;
    }

    // Calculate the total tip
    totalTip(totalFood) {
        let tip = (Math.round((totalFood * tip_percent) * 100)) / 100;
        logTip(tip);
        return tip;
    };

    totalTax(totalFood) {
        let tax = (Math.round((totalFood * tax_rate) * 100)) / 100;
        logTax(tax);
        return tax;
    };

    // Method to calculate the bill for each diner
    itemizeBill() {

        // Get the subtotal for each diner
        let listOfDiners = (diner, index, diners) => {
            logDinerBill(diner.name);

            diner.meal.forEach(listOfItems);
            logSubtotal(diner.mealSubtotal);

            diner.mealTax = (Math.round((diner.mealSubtotal * tax_rate) *
                100)) / 100;
            logTax(diner.mealTax);

            diner.mealTip = (Math.round(this.tip * 100) / this.diners.length) /
                100;
            logTip(diner.mealTip);

            diner.mealTotal = diner.mealSubtotal + diner.mealTax +
                diner.mealTip;
            logTotal(diner.mealTotal);
        }
        let listOfItems = (item, index, meal) => {
            logItems(item.dish, item.cost);
        };
        this.diners.forEach(listOfDiners);
    };

};

// Print the item and cost to the console
function logItems(dish, cost) {
    console.log(dish + ': $' + cost.toFixed(2))
}

// Print the subtotal to the console
function logSubtotal(subtotal) {
    console.log('---------------\nSubtotal: $' + subtotal.toFixed(2));
}

// Print the tip amount to the console
function logTip(tip) {
    console.log('Tip: $' + tip.toFixed(2));
}

// Print the tax amount to the console
function logTax(tax) {
    console.log('Tax: $' + tax.toFixed(2));
}

// Print the total amount to the console
function logTotal(total) {
    console.log('--------------\nTotal: $' + total.toFixed(2));
}

// Print a header to separate the individual bills
function logDinerBill(name) {
    console.log('\n-----------The bill for ' + name + ': -----------\n');
}

// The diners
let david = new Diner('David');
let vincent = new Diner('Vincent');
let max = new Diner('Max');
let amy = new Diner('Amy');

// Start a new bill
let bill = new Bill(david, vincent, amy, max);

// Let's eat
david.addItem(pasta, soup, beer);
vincent.addItem(hamburger, salad, tea);
max.addItem(salmon, bread, milk);
amy.addItem(pizza, vegetable_mix, water);

// Print a header to show the start of the total bill
console.log('\n------------The total bill for all diner\'s: -----------\n');

// Calculate the total bill
bill.subtotal = bill.calcSubtotal(david, vincent, amy, max);
bill.tip = bill.totalTip(bill.subtotal);
bill.tax = bill.totalTax(bill.subtotal);
bill.total = bill.subtotal + bill.tip + bill.tax;
logTotal(bill.total);

// Print an individual bill for each diner
bill.itemizeBill();
