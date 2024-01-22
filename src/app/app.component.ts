import { Component, OnInit } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public value: string[] = [];
  public joinedValue: (string | number) = 0;
  public appearedValues: string = "";
  public result: (string | number)[] = [];

  private _subject: BehaviorSubject<(string | number)[]>;

  constructor(){
    this._subject = new BehaviorSubject<(string | number)[]>([])
  }


  public ngOnInit(): void {

  }

  public changeValue(value: string): void{
    if(this.value.length < 9){
      this.value.push(value)
    }
    this.joinedValue = Number(this.value.join(""))
  }

  public add(): void{
    if(this.appearedValues.includes("=")){
      return
    }
    this._subject.subscribe(res=>{
      res.push(this.joinedValue)
      res.push("+")
    })
    this._subject.subscribe(res=>{

      this.appearedValues += res[res.length-2]+" "+res[res.length-1]+" "

    })
    this.clearNumber()
  }

  public substract(): void{
    if(this.appearedValues.includes("=")){
      return
    }
    this._subject.subscribe(res=>{
      res.push(this.joinedValue)
      res.push("-")
    })
    this._subject.subscribe(res=>{

      this.appearedValues += res[res.length-2]+" "+res[res.length-1]+" "

    })
    this.clearNumber()
  }

  public multiply(): void{
    if(this.appearedValues.includes("=")){
      return
    }
    this._subject.subscribe(res=>{
      res.push(this.joinedValue)
      res.push("x")
    })
    this._subject.subscribe(res=>{

      this.appearedValues += res[res.length-2]+" "+res[res.length-1]+" "

    })
    this.clearNumber()
  }

  public divide(): void{
    if(this.appearedValues.includes("=")){
      return
    }
    this._subject.subscribe(res=>{
      res.push(this.joinedValue)
      res.push("/")
    })
    this._subject.subscribe(res=>{

      this.appearedValues += res[res.length-2]+" "+res[res.length-1]+" "

    })
    this.clearNumber()
  }

  public equals():void{
    if(!this.appearedValues.includes("=")){
      this.appearedValues += this.joinedValue+" ="
    }
    
    this.result = this.appearedValues.split(" ");

    this.joinedValue = +this.result[0]

    for(let i = 0; i<this.result.length;i++){
      switch(this.result[i]){
        case "+":
          this.joinedValue = this.joinedValue + Number(this.result[i+1])
          break;
        case "-":
          this.joinedValue = this.joinedValue - Number(this.result[i+1])
          break;
        case "x":
          this.joinedValue = this.joinedValue * Number(this.result[i+1])
          break;
        case "/":
          this.joinedValue = this.joinedValue / Number(this.result[i+1])
          break;
      }
    }

    if(this.joinedValue.toString().length > 9){
      this.joinedValue = this.joinedValue.toExponential(2)
    }
    
  }

  public removeDigit():void{
    if(this.value.length >=0){
      this.value.pop()
    }
    this.joinedValue = Number(this.value.join(""))
  }

  public clearNumber(): void{
    this.value = []
    this.joinedValue = 0
  }

  public clearContent(): void{
    this.clearNumber()
    this.appearedValues = ""
  }

}
