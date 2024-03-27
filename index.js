let coffeeStock ,isCoffeeMachineReady;

//handling error "import module"
  try {
    const stateModule= await import('./state.js');
    coffeeStock =stateModule.coffeeStock;
    isCoffeeMachineReady=stateModule.isCoffeeMachineReady;
  } catch (importError) {
    console.log("Error occurred while importing from state.js:", importError);
  }

//Pembuka
console.log("selamat datang admin kedai kopi :)");


//handling error "mencetak variable import"
//timeout Asynchronous
 setTimeout(() => {
     try {
     console.log("stok: ",coffeeStock);
     console.log("Mesin kopi siap: ", isCoffeeMachineReady);
   } catch (error) {
     if (error instanceof ReferenceError) {
     console.log("Error undefined variable used:", error);
   } else {
     console.log("Error occurred:",error);
   }
 }
},3000)
