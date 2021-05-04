const snacks = [
  { name: 'Coffee', price: 1, quantity:2 },
  { name: 'GreenTea', price: 2.50, quantity:2 },
  { name: 'Milk', price: 2, quantity:2 },
  { name: 'AppleJuice', price: 3.50, quantity:2 }
];

function vendingMachine(snack, cash) {
    const i = snacks.findIndex(item => item.name === snack);
    if (i >= 0) {
      if (snacks[i].quantity != 0) {
        if (snacks[i].price === cash) {
            snacks[i].quantity = snacks[i].quantity-1
            return `Your ${snack} have been served.`;
        }
        else {
          if (snacks[i].price > cash) {
              return `Insufficient funds. Please insert more cash.`;
          }
          else {
            snacks[i].quantity = snacks[i].quantity-1
            return `Your ${snack} have been served. Here is your $${cash - snacks[i].price} change.`;
          }
        }
      }
      else {
        // snacks[i].amount is 0
        return `${snack} is sold out. Please try later.`
      }
    }
    else {
      // snacks[i] is undefined
      return `${snack} does not exist. Please try again.`
    }
};

console.log(vendingMachine('Coffee', 12));
console.log(vendingMachine('Coffee', 1));
console.log(vendingMachine('Coffee', 0));
