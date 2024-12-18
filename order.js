// Order buly kiosk
const sellers = [
    { username: "admin", password: "password" },
  ];
  
  //  Menu 
  let menu = {
    Pizza: [
      { name: "Spinach Honeyglaze", price: 249 },
      { name: "Hawaian", price: 249 },
      { name: "Ham and cheese", price: 249 },
    ],
    Desserts: [
      { name: "Vanilla Icecream", price: 187 },
      { name: "Cheesecake", price:187 },
      { name: "Mango float", price: 187 },
    ],
    Drinks: [
      { name: "Coca-Cola", price: 27 },
      { name: "Orange Juice", price: 39 },
      { name: "Iced Tea", price: 39 },
    ],
  };
  
  // Function to authenticate seller
  function authenticateSeller(username, password) {
    return sellers.some(
      (seller) => seller.username === username && seller.password === password
    );
  }
  
  // Function to display menu
  function displayMenu() {
    for (const category in menu) {
      console.log(`\n--- ${category} ---`);
      menu[category].forEach((item, index) => {
        console.log(`${index + 1}. ${item.name} - $${item.price.toFixed(2)}`);
      });
    }
  }
  
  // Function for bubble sort (Example sorting algorithm)
  function bubbleSort(arr, key) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j][key] > arr[j + 1][key]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
  }
  
  
  // Main program loop
  while (true) {
    const userType = prompt("Are you a SELLER or CUSTOMER?");
  
    if (userType.toUpperCase() === "SELLER") {
      const username = prompt("Enter username:");
      const password = prompt("Enter password:");
  
      if (authenticateSeller(username, password)) {
        while (true) {
          const action = prompt("Choose action: LOGOUT, ADD, REMOVE");
  
          if (action.toUpperCase() === "LOGOUT") break;
  
          const category = prompt("Enter category to update:");
  
          if (action.toUpperCase() === "ADD") {
            while (true) {
              const itemName = prompt("Enter item name:");
              const itemPrice = parseFloat(prompt("Enter item price:"));
  
              if (!isNaN(itemPrice)) {
                menu[category].push({ name: itemName, price: itemPrice });
                if (prompt("Continue adding? (yes/no)") !== "yes") break;
              } else {
                console.log("Invalid price. Please enter a number.");
              }
            }
          } else if (action.toUpperCase() === "REMOVE") {
            while (true) {
              const itemName = prompt("Enter item name to remove:");
              menu[category] = menu[category].filter((item) => item.name !== itemName);
              if (prompt("Continue removing? (yes/no)") !== "yes") break;
            }
          }
        }
      } else {
        console.log("Invalid username or password.");
      }
    } else if (userType.toUpperCase() === "CUSTOMER") {
      let cart = [];
      while (true) {
        displayMenu();
        const action = prompt("Choose action: ORDER, CART, CANCEL");
  
        if (action.toUpperCase() === "CANCEL") break;
  
        if (action.toUpperCase() === "ORDER") {
          const category = prompt("Enter category:");
          const itemIndex = parseInt(prompt(`Enter item number from ${category}:`)) - 1;
          const quantity = parseInt(prompt("Enter quantity:"));
  
          if (
            !isNaN(itemIndex) &&
            itemIndex >= 0 &&
            itemIndex < menu[category].length &&
            !isNaN(quantity) &&
            quantity > 0
          ) {
            cart.push({
              ...menu[category][itemIndex],
              quantity,
            });
          } else {
            console.log("Invalid input.");
          }
        } else if (action.toUpperCase() === "CART") {
          while (true) {
            if (cart.length === 0) {
              console.log("Your cart is empty.");
              break;
            }
            console.table(cart);
            const cartAction = prompt("Choose action: PRINT, ADD, REMOVE, CANCEL");
  
            if (cartAction.toUpperCase() === "PRINT") {
              let total = 0;
              bubbleSort(cart, 'name'); //Example of using bubble sort
              console.table(cart.map(item => ({
                ItemName: item.name,
                ItemPrice: item.price,
                ItemAmount: item.quantity,
                TotalPrice: item.price * item.quantity
              })));
              for (const item of cart) {
                total += item.price * item.quantity;
              }
              console.log(`Total: $${total.toFixed(2)}`);
              break;
            } else if (cartAction.toUpperCase() === "ADD") break;
            else if (cartAction.toUpperCase() === "REMOVE") {
              const itemNameToRemove = prompt("Enter item name to remove from cart:");
              cart = cart.filter((item) => item.name !== itemNameToRemove);
            } else if (cartAction.toUpperCase() === "CANCEL") break;
          }
        }
      }
    } else {
      console.log("Invalid user type.");
    }
  }
  
      