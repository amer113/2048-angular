import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  UP_ARROW = 38,
  DOWN_ARROW = 40,
}

export enum COLORS {}
@Component({
  selector: 'app-game-window',
  templateUrl: './game-window.component.html',
  styleUrls: ['./game-window.component.css'],
})
export class GameWindowComponent implements OnInit, AfterViewInit {
  boxData: any = [
    {
      value: 0,
    },
    {
      value: 0,
    },
    {
      value: 0,
    },
    {
      value: 0,
    },
    {
      value: 0,
    },
    {
      value: 0,
    },
    {
      value: 0,
    },
    {
      value: 0,
    },
    {
      value: 0,
    },
    {
      value: 0,
    },
    {
      value: 0,
    },
    {
      value: 0,
    },
    {
      value: 0,
    },
    {
      value: 0,
    },
    {
      value: 0,
    },
    {
      value: 0,
    },
  ];
  constructor() {}

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    switch (event.keyCode) {
      case KEY_CODE.DOWN_ARROW:
        this.calculateData('down');
        this.getRandomNum(1);
        break;
      case KEY_CODE.UP_ARROW:
        this.calculateData('up');
        this.getRandomNum(1);
        break;
      case KEY_CODE.LEFT_ARROW:
        this.calculateData('left');
        this.getRandomNum(1);
        break;
      case KEY_CODE.RIGHT_ARROW:
        this.calculateData('right');
        this.getRandomNum(1);
        break;
    }
  }
  ngOnInit() {
    this.getRandomNum(2);
  }
  ngAfterViewInit(): void {
    document.getElementById('tile0')?.classList.add('abc');
    setTimeout(() => {
      document.getElementById('tile0')?.classList.add('def');
    }, 1000);
  }

  calculateData(keyAction: string) {
    if (keyAction == 'down') {
      for (let i = 0; i < 4; i++) {
        for (let j = i + 4; j < 16; j += 4) {
          if (
            this.boxData[i].value != 0 &&
            this.boxData[j].value != 0 &&
            this.boxData[i].value != this.boxData[j].value
          )
            break;
          this.boxData[i].value !== 0 &&
            this.boxData[i].value == this.boxData[j].value &&
            this.insertData(i, j);
        }
      }
      for (let i = 4; i < 8; i++) {
        for (let j = i + 4; j < 16; j += 4) {
          if (
            this.boxData[i].value != 0 &&
            this.boxData[j].value != 0 &&
            this.boxData[i].value != this.boxData[j].value
          )
            break;
          this.boxData[i].value !== 0 &&
            this.boxData[i].value == this.boxData[j].value &&
            this.insertData(i, j);
        }
      }
      for (let i = 8; i < 12; i++) {
        for (let j = i + 4; j < 16; j += 4) {
          if (
            this.boxData[i].value != 0 &&
            this.boxData[j].value != 0 &&
            this.boxData[i].value != this.boxData[j].value
          )
            break;
          this.boxData[i].value !== 0 &&
            this.boxData[i].value == this.boxData[j].value &&
            this.insertData(i, j);
        }
      }
      this.shiftTiles(keyAction);
    } else if (keyAction == 'up') {
      for (let i = 15; i > 11; i--) {
        for (let j = i - 4; j >= 0; j -= 4) {
          if (
            this.boxData[i].value != 0 &&
            this.boxData[j].value != 0 &&
            this.boxData[i].value != this.boxData[j].value
          )
            break;
          this.boxData[i].value !== 0 &&
            this.boxData[i].value == this.boxData[j].value &&
            this.insertData(i, j);
        }
      }
      for (let i = 11; i > 7; i--) {
        for (let j = i - 4; j >= 0; j -= 4) {
          if (
            this.boxData[i].value != 0 &&
            this.boxData[j].value != 0 &&
            this.boxData[i].value != this.boxData[j].value
          )
            break;
          this.boxData[i].value !== 0 &&
            this.boxData[i].value == this.boxData[j].value &&
            this.insertData(i, j);
        }
      }
      for (let i = 7; i > 3; i--) {
        for (let j = i - 4; j >= 0; j -= 4) {
          if (
            this.boxData[i].value != 0 &&
            this.boxData[j].value != 0 &&
            this.boxData[i].value != this.boxData[j].value
          )
            break;
          this.boxData[i].value !== 0 &&
            this.boxData[i].value == this.boxData[j].value &&
            this.insertData(i, j);
        }
      }
      this.shiftTiles(keyAction);
    } else if (keyAction == 'right') {
    }
  }

  insertData(sourceIndex: number, destinationIndex: number) {
    this.boxData[destinationIndex].value = this.boxData[sourceIndex].value * 2;
    this.boxData[sourceIndex].value = 0;
    document.getElementById(`tile${destinationIndex}`)?.classList.add('abc');
    setTimeout(() => {
      document.getElementById(`tile${destinationIndex}`)?.classList.add('def');
    }, 100);
  }

  getRandomNum(count: number) {
    //check if all feilds are filled
    Array.from(Array(count)).forEach((x: any) => {
      const a = this.boxData.find((data: any) => data.value == 0);
      if (a !== undefined) {
        let newNumber = 0;
        let isEmpty = true;
        const number = Math.floor(Math.random() * 11);

        if (number >= 0 && number <= 8) {
          newNumber = 2;
        } else if (number > 8 && number <= 10) {
          newNumber = 4;
        }

        while (isEmpty) {
          //add a random gen number at empty location
          const randLoc = Math.floor(Math.random() * this.boxData.length);
          if (this.boxData[randLoc].value == 0) {
            this.boxData[randLoc].value = newNumber;
            isEmpty = false;
          }
        }
      }
    });
  }

  getTileBG(data: any) {
    switch (data) {
      case 2:
        return '#EEE4DA';
      case 4:
        return '#1e90ff';
      case 8:
        return '#e3bc08';
      default:
        return;
    }
  }

  shiftTiles(keyAcion: string) {
    if (keyAcion == 'down') {
      for (let i = 0; i < 4; i++) {
        if (this.boxData[i].value !== 0) {
          let emptyIndex = -1;
          for (let j = i + 4; j < 16; j += 4) {
            if (this.boxData[j].value != 0) {
              break;
            }
            this.boxData[j].value == 0 && (emptyIndex = j);
          }
          emptyIndex >= 0 && this.swap(i, emptyIndex);
        }
      }
      for (let i = 4; i < 8; i++) {
        if (this.boxData[i].value !== 0) {
          let emptyIndex = -1;
          for (let j = i + 4; j < 16; j += 4) {
            if (this.boxData[j].value != 0) {
              emptyIndex = -1;
              break;
            }
            this.boxData[j].value == 0 && (emptyIndex = j);
          }
          emptyIndex >= 0 && this.swap(i, emptyIndex);
        }
      }
      for (let i = 8; i < 12; i++) {
        if (this.boxData[i].value !== 0) {
          let emptyIndex = -1;
          for (let j = i + 4; j < 16; j += 4) {
            if (this.boxData[j].value != 0) {
              emptyIndex = -1;
              break;
            }
            this.boxData[j].value == 0 && (emptyIndex = j);
          }
          emptyIndex >= 0 && this.swap(i, emptyIndex);
        }
      }
    } else if (keyAcion == 'up') {
      for (let i = 15; i > 11; i--) {
        if (this.boxData[i].value !== 0) {
          let emptyIndex = -1;
          for (let j = i - 4; j >= 0; j -= 4) {
            if (this.boxData[j].value != 0) {
              break;
            }
            this.boxData[j].value == 0 && (emptyIndex = j);
          }
          emptyIndex >= 0 && this.swap(i, emptyIndex);
        }
      }
      for (let i = 11; i > 7; i--) {
        if (this.boxData[i].value !== 0) {
          let emptyIndex = -1;
          for (let j = i - 4; j >= 0; j -= 4) {
            if (this.boxData[j].value != 0) {
              break;
            }
            this.boxData[j].value == 0 && (emptyIndex = j);
          }
          emptyIndex >= 0 && this.swap(i, emptyIndex);
        }
      }
      for (let i = 7; i > 3; i--) {
        if (this.boxData[i].value !== 0) {
          let emptyIndex = -1;
          for (let j = i - 4; j >= 0; j -= 4) {
            if (this.boxData[j].value != 0) {
              break;
            }
            this.boxData[j].value == 0 && (emptyIndex = j);
          }
          emptyIndex >= 0 && this.swap(i, emptyIndex);
        }
      }
    }
  }

  swap(a: number, b: number) {
    this.boxData[a].value = this.boxData[a].value + this.boxData[b].value;
    this.boxData[b].value = this.boxData[a].value - this.boxData[b].value;
    this.boxData[a].value = this.boxData[a].value - this.boxData[b].value;
  }
}
