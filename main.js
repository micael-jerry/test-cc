import promptSync from 'prompt-sync';
import { displayMenu } from "./menu.js";
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

  async steam() {
    if (this.ricePresent && !this.steamingInProgress) {   // 4
      console.log('Steaming in progress...');
      this.steamingInProgress = true;                     // 1
      await this.delaySync(1500);                         // 1
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
  },

  delaySync(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
};

export function simulateRiceCooker() {
  while (true) {
    displayMenu();                                // 1
    let input = +prompt('Enter your choice: ');   // 2
    switch (input) {
      case 1:
        riceCooker.addRice();
        break;
      case 2:
        riceCooker.cookRice();
        break;
      case 3:
        riceCooker.steam();
        break;
      case 4:
        riceCooker.keepWarm();
        break;
      case 5:
        riceCooker.removeRice();
        break;
      case 6:
        console.log('Thank you for using the Rice Cooker Simulator. Goodbye!');
        return;
      default:
        console.log('Invalid input. Please enter a valid number.');
        break;
    }
  }
}

simulateRiceCooker();