import promptSync from 'prompt-sync';
import {displayMenu} from "./menu.js";
const prompt = promptSync();

export const riceCooker = {
  ricePresent: false,         // 1
  riceCooked: false,          // 1
  steamingInProgress: false,  // 1
  heatingInProgress: false,   // 1

  addRice() {
    if (!this.ricePresent) {              // 2
      this.ricePresent = true;            // 1
      console.log('Rice has been added.');
    } else {
      console.log('There\'s already rice in the rice cooker.');
    }
  },                                      // Total: 3

  cookRice() {
    if (this.ricePresent && !this.riceCooked) {     // 4
      console.log('Cooking rice...');
      this.delaySync(1500);                         // 1
      this.riceCooked = true;                       // 1
      console.log('The rice has been cooked!');
    } else if (!this.ricePresent) {
      console.log('Cannot cook. The rice cooker is empty.');
    } else {
      console.log('The rice is already cooked.');
    }
  },                                                // Total: 6

  steam() {
    if (this.ricePresent && !this.steamingInProgress) {   // 4
      console.log('Steaming in progress...');
      this.steamingInProgress = true;                     // 1
      this.delaySync(1500);                               // 1
      this.steamingInProgress = false;                    // 1
      console.log('Steaming completed!');
    } else if (!this.ricePresent) {
      console.log('Cannot steam. The rice cooker is empty.');
    } else {
      console.log('Steaming is already in progress.');
    }
  },                                                      // Total: 7

  keepWarm() {
    if (this.ricePresent && this.riceCooked && !this.heatingInProgress) {   // 6
      console.log('The rice is now being kept warm.');
      this.heatingInProgress = true;                                        // 1
    } else if (!this.ricePresent) {
      console.log('Cannot keep warm. The rice cooker is empty.');
    } else if (!this.riceCooked) {
      console.log('Cannot keep warm. The rice is not cooked.');
    } else {
      console.log('Keeping warm is already in progress.');
    }
  },                                                                        // Total: 7

  removeRice() {
    if (this.ricePresent && (this.riceCooked || this.heatingInProgress)) {  // 6
      this.ricePresent = false;                                             // 1
      this.riceCooked = false;                                              // 1
      this.steamingInProgress = false;                                      // 1
      this.heatingInProgress = false;                                       // 1
      console.log('The rice has been removed from the rice cooker.');
    } else {
      console.log('There\'s no rice to remove or it is not cooked yet.');
    }
  },                                                                        //Total: 10

  delaySync(ms) {
    const start = Date.now();           // 1
    while (Date.now() - start < ms) {
    }
  },
};


export function simulateRiceCooker() {
  let input;                                  // 1
  const condition = true;                     // 1

  while (condition) {                         // 1
    displayMenu();
    input = prompt('Enter your choice: ');    // 1

    if (input) {                              // 2
      const choice = parseInt(input);         // 2

      if (!isNaN(choice)) {                   // 2
        if (choice === 1) {
          riceCooker.addRice();
        } else if (choice === 2) {
          riceCooker.cookRice();
        } else if (choice === 3) {
          riceCooker.steam();
        } else if (choice === 4) {
          riceCooker.keepWarm();
        } else if (choice === 5) {
          riceCooker.removeRice();
        } else if (choice === 6) {
          console.log('Thank you for using the Rice Cooker Simulator. Goodbye!');
          break;
        } else {
          console.log('Invalid choice. Please select a valid option.');
        }
      } else {
        console.log('Invalid input. Please enter a valid number.');
      }
    } else {
      console.log('No input provided.');
    }
  }
}

simulateRiceCooker();
