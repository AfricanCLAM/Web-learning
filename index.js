let coffeeStock ,isCoffeeMachineReady;

  try {
    const stateModule= await import('./state.js');
    coffeeStock =stateModule.coffeeStock;
    isCoffeeMachineReady=stateModule.isCoffeeMachineReady;
  } catch (importError) {
    console.log("Error occurred while importing from state.js:", importError);
  }

  try {
    console.log(coffeeStock);
    console.log(isCoffeeMachineReady);
  } catch (error) {
    if (error instanceof ReferenceError) {
    console.log("Error undefined variable used:", error);
  } else {
    console.log("Error occurred:",error);
  }
}

