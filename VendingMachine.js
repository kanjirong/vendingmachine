const snacks = [
  { name: 'Coffee', price: 1, quantity: 2 },
  { name: 'GreenTea', price: 2.50, quantity: 2 },
  { name: 'Milk', price: 2, quantity: 2 },
  { name: 'AppleJuice', price: 3.50, quantity: 2 }
];
const coins = [
  { amount: 5, quantity: 0 },
  { amount: 1, quantity: 9 },
  { amount: 0.5, quantity: 2 },
];

function vendingMachine(snack, cash) {
    const i = snacks.findIndex(item => item.name === snack);
    if (i >= 0) {
      if (snacks[i].quantity != 0) {
        if (snacks[i].price === cash) {
            //set quantity
            snacks[i].quantity = snacks[i].quantity-1
            return `Your ${snack} have been served.`;
        } else if (snacks[i].price > cash) {
              return `Insufficient funds. Please insert more cash.`;
        } else {
          //set quantity
          snacks[i].quantity = snacks[i].quantity-1
          //set totalChange
          let totalChange = cash - snacks[i].price;
          //set coins for change
          let changes = [];
          if (setCoins(changes, totalChange) === 'emergency'){
             return 'Sorry. We dont have enough coins. please call the manager.';
          };
          console.log('changes/'+JSON.stringify(changes));
          return `Your ${snack} have been served. Here is your $${totalChange} change.`;
        }
      } else {
        // snacks[i].amount is 0
        return `${snack} is sold out. Please try later.`
      }
    } else {
      // snacks[i] is undefined
      return `${snack} does not exist. Please try again.`
    }
};

function setCoins(changes, totalChange) {
  let totalAmount = 0;
  coins.forEach(function(c) {
    totalAmount += c.quantity * c.amount
  });

  if (totalAmount >= totalChange) {
    let change = totalChange;
    coins.forEach(function(c) {
      const neededQuantity = parseInt(change / c.amount);
      if (c.quantity >= neededQuantity){
          changes.push( {amount: c.amount, quantity: neededQuantity} );
          change -= c.amount * neededQuantity;
          c.quantity -= neededQuantity;

      } else if (c.quantity > 0){
        changes.push( {amount: c.amount, quantity: c.quantity} );
        change -= c.amount * c.quantity;
        c.quantity = 0;
      }
    });
  } else {
    return 'emergency';
  }
};

console.log(vendingMachine('Milk', 12));
