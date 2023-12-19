import promptSync from 'prompt-sync';
import {displayMenu} from "./menu.js";
const prompt = promptSync();

export const riceCooker = {
  ricePresent: false,
  riceCooked: false,
  steamingInProgress: false,
  heatingInProgress: false,

  addRice() {
    if (!this.ricePresent) {
      this.ricePresent = true;
      console.log('Rice has been added.');
    } else {
      console.log('There\'s already rice in the rice cooker.');
    }
  },

  cookRice() {
    if (this.ricePresent && !this.riceCooked) {
      console.log('Cooking rice...');
      this.delaySync(1500);
      this.riceCooked = true;
      console.log('The rice has been cooked!');
    } else if (!this.ricePresent) {
      console.log('Cannot cook. The rice cooker is empty.');
    } else {
      console.log('The rice is already cooked.');
    }
  },

  steam() {
    if (this.ricePresent && !this.steamingInProgress) {
      console.log('Steaming in progress...');
      this.steamingInProgress = true;
      this.delaySync(1500);
      this.steamingInProgress = false;
      console.log('Steaming completed!');
    } else if (!this.ricePresent) {
      console.log('Cannot steam. The rice cooker is empty.');
    } else {
      console.log('Steaming is already in progress.');
    }
  },

  keepWarm() {
    if (this.ricePresent && this.riceCooked && !this.heatingInProgress) {
      console.log('The rice is now being kept warm.');
      this.heatingInProgress = true;
    } else if (!this.ricePresent) {
      console.log('Cannot keep warm. The rice cooker is empty.');
    } else if (!this.riceCooked) {
      console.log('Cannot keep warm. The rice is not cooked.');
    } else {
      console.log('Keeping warm is already in progress.');
    }
  },

  removeRice() {
    if (this.ricePresent && (this.riceCooked || this.heatingInProgress)) {
      this.ricePresent = false;
      this.riceCooked = false;
      this.steamingInProgress = false;
      this.heatingInProgress = false;
      console.log('The rice has been removed from the rice cooker.');
    } else {
      console.log('There\'s no rice to remove or it is not cooked yet.');
    }
  },

  delaySync(ms) {
    const start = Date.now();
    while (Date.now() - start < ms) {
    }
  },
};


export function simulateRiceCooker() {
  let input;
  const condition = true;

  while (condition) {
    displayMenu();
    input = prompt('Enter your choice: ');

    if (input) {
      const choice = parseInt(input);

      if (!isNaN(choice)) {
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
