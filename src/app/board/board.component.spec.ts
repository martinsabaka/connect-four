import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test column win', () => {
    component.boardData = [
      [0, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 2],
      [0, 0, 0, 0, 0, 2],
      [0, 0, 0, 0, 0, 2],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ];

    component.checkColumn(0);
    expect(component.winner.length).toBeFalsy();

    component.boardData[0][2] = 1;
    component.checkColumn(0);
    expect(component.winner.length).toBeTruthy();
  });

  it('should test row win', () => {
    component.boardData = [
      [0, 0, 0, 2, 1, 1],
      [0, 0, 0, 1, 2, 2],
      [0, 0, 0, 1, 2, 2],
      [0, 0, 0, 1, 1, 2],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ];

    component.checkRow(3);
    expect(component.winner.length).toBeFalsy();

    component.boardData[4][3] = 1;
    component.checkRow(3);
    expect(component.winner.length).toBeTruthy();
  });

  it('should test diagonal win', () => {
    component.boardData = [
      [0, 0, 2, 2, 1, 1],
      [0, 0, 0, 2, 2, 2],
      [0, 0, 0, 1, 2, 2],
      [0, 0, 0, 1, 1, 2],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ];

    component.checkDiagonalIncline(1, 3);
    expect(component.winner.length).toBeFalsy();

    component.checkDiagonalDecline(1, 3);
    expect(component.winner.length).toBeTruthy();

    component.boardData = [
      [0, 0, 2, 2, 1, 1],
      [0, 0, 0, 1, 2, 2],
      [0, 0, 1, 1, 2, 2],
      [0, 1, 2, 1, 1, 2],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ];

    component.winner = [];
    component.checkDiagonalDecline(3, 1);
    expect(component.winner.length).toBeFalsy();

    component.checkDiagonalIncline(3, 1);
    expect(component.winner.length).toBeTruthy();
  });

  it('should check winning condition on player move', () => {
    spyOn(component, 'detectWinner');

    component.addToBoard(3);
    expect(component.detectWinner).toHaveBeenCalled();
  });

  it('should not check winning condition if player already won', () => {
    component.boardData = [
      [0, 0, 2, 2, 1, 1],
      [0, 0, 0, 1, 2, 2],
      [0, 0, 1, 1, 2, 2],
      [0, 1, 2, 1, 1, 2],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ];
    component.winner = [1];

    spyOn(component, 'detectWinner');

    component.addToBoard(3);
    expect(component.detectWinner).not.toHaveBeenCalled();
  });
});
