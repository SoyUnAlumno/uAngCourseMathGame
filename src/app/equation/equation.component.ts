import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MathValidators } from '../math-validators';
import { delay, filter } from 'rxjs';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css'],
})
export class EquationComponent implements OnInit {
  secsPerSolution: number = 0; 
  mathForm = new FormGroup(
    {
      a: new FormControl(this.randomNumber()),
      b: new FormControl(this.randomNumber()),
      answer: new FormControl(''),
    },
    [MathValidators.addition('answer', 'a', 'b')]
  );

  constructor() {}

  ngOnInit(): void {
    const startTime: Date = new Date();
    let numberSolved: number = 0;

    this.mathForm.statusChanges.pipe(
      filter(value=> value ==='VALID'),delay(100)).subscribe(() => {
        numberSolved++;
    this.secsPerSolution = (
      new Date().getTime() - startTime.getTime()) / numberSolved / 1000;
        /* Removed param 'value' in subscribe and following code because of the use of filter from RxJs
        if (value === 'INVALID') {
        return;
      } */
    
      this.mathForm.patchValue({
        a: this.randomNumber(),
        b: this.randomNumber(),
        answer: ''
      })     
    });
  }

  randomNumber() {
    return Math.floor(Math.random() * 10);
  }

  get a() {
    return this.mathForm.value.a;
  }

  get b() {
    return this.mathForm.value.b;
  }
}
