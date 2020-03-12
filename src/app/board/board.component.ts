import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  public countToWin: number = 4;

  // Player1 = red, Player2 = yellow
  public playerTurn: number;
  public boardData: any;

  public winner: number[] = [];

  constructor() { }

  /**
   * On init
   */
  ngOnInit(): void {
    this.resetBoard();
  }

  /**
   * Resets Board
   */
  public resetBoard(): void {
    this.boardData = [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ];

    this.playerTurn = Math.round(Math.random()) + 1;
  }

  /**
   * Adds item to Board
   * @param col column index
   */
  public addToBoard(col: number): void {
    const row: number = this.boardData[col].lastIndexOf(0);

    if (row < 0 || this.winner.length) {
      return;
    }

    this.boardData[col][row] = this.playerTurn;
    this.detectWinner(col, row);

    if (this.winner.length) {
      return;
    }

    this.playerTurn = this.playerTurn === 1 ? 2 : 1;
  }

  /**
   * Checks if someone won
   * @param col column index
   * @param row    row index
   */
  public detectWinner(col: number, row: number): any {
    this.checkColumn(col);
    this.checkRow(row);
    this.checkDiagonalIncline(col, row);
    this.checkDiagonalDecline(col, row);
  }

  /**
   * Checks diagonal for win condition
   * @param col   column index
   * @param row   row index
   */
  public checkDiagonalDecline(col: number, row: number): void {
    let lastElement: number = 0;
    let counter: number = 0;

    let currentRow = (5 - row) + col;

    return this.boardData.some(column => {
      if (currentRow >= 0 && currentRow < 6) {
        const currentElement = column[5 - currentRow];

        if (currentElement === lastElement && currentElement !== 0) {
          counter++;
          currentRow--;

          if (counter === this.countToWin) {
            this.winner.push(currentElement);
          }
        } else {
          counter = 1;
          lastElement = currentElement;
          currentRow--;
        }
      } else {
        currentRow--;
      }
    });
  }

  /**
   * Checks diagonal incline for win condition
   * @param col   column index
   * @param row   row index
   */
  public checkDiagonalIncline(col: number, row: number): void {
    let lastElement: number = 0;
    let counter: number = 0;

    let currentRow = (5 - row) - col;

    return this.boardData.some(column => {
      if (currentRow >= 0 && currentRow < 6) {
        const currentElement = column[5 - currentRow];

        if (currentElement === lastElement && currentElement !== 0) {
          counter++;
          currentRow++;

          if (counter === this.countToWin) {
            this.winner.push(currentElement);
          }
        } else {
          counter = 1;
          lastElement = currentElement;
          currentRow++;
        }
      } else {
        currentRow++;
      }
    });
  }

  /**
   * Checks column for win condition
   * @param col   column index
   */
  public checkColumn(col: number): void {
    let lastElement: number = 1;
    let counter: number = 0;

    return this.boardData[col].some(currentElement => {
      if (currentElement === lastElement && currentElement !== 0) {
        counter++;

        if (counter === this.countToWin) {
          this.winner.push(currentElement);
        }
      } else {
        counter = 1;
        lastElement = currentElement;
      }
    });
  }

  /**
   * Checks row for win condition
   * @param row   row index
   */
  public checkRow(row: number): void {
    let lastElement: number = 1;
    let counter: number = 0;

    return this.boardData.some(column => {
      const currentElement = column[row];

      if (currentElement === lastElement && currentElement !== 0) {
        counter++;

        if (counter === this.countToWin) {
          this.winner.push(currentElement);
        }
      } else {
        counter = 1;
        lastElement = currentElement;
      }
    });
  }

  /**
   * Removes element
   * @param col   column index
   * @param row   row index
   */
  public removeElement(col: number, row: number): void {
    let counter = 5;

    this.boardData[col] = [0, ...this.boardData[col]];
    this.boardData[col].pop();

    while (counter >= 0) {
      this.detectWinner(col, counter);
      counter--;
    }

    if (this.winner.length) {
      return;
    }

    this.playerTurn = this.playerTurn === 1 ? 2 : 1;
  }
}
