console.log("The script is loaded and is ready to be worked on!!!!!!! Lets Go");


// document.querySelector("#getPage").addEventListener("click", () => {

//   console.log("clicked");

//   fetch('/getPage').then((result) => {
//     console.log(result);
//   });

// })

// document.querySelectorAll('.add').forEach((button))


document.querySelectorAll(".add").forEach((button) => {

  button.addEventListener("click", () => {

  let operator = button.innerHTML;
  console.log(operator);

    let arrOfValues = [];
    document.querySelectorAll(".number").forEach((value) => { 
  
      arrOfValues.push(value.value);
  
    });
  
    console.log(arrOfValues);
  
    calculate(arrOfValues, operator);

  });

});



calculate = (arr,operator) => {

  let values = {
    numbers : arr,
    operator : operator

  }
  console.log(values);

  fetch('/calculate', {

    method : "POST",
    body : JSON.stringify(values),
    headers: {
      "Content-type" : "application/json"
    }

  }).then((result) => {

    return result.json();

  }).then(result => console.log(result));
  
  
}


// fetch("/calculate", {

//   method : "POST",
//   body: {a:10}
// }).then((result) => {

//   console.log(result);

// });

class Test{

  constructor(name, job){

    this.name = name;
    this.job = job;

  }


  display(){

    console.log(`${this.name} is a ${this.job}`);

  }

  static change(){

    console.log("This is a static method which cannot be accessed from the the Class instance");

  }

}





class TestAgain extends Test{

  constructor(name, job, last){

    super(name,job);
    this.last = last;

  }




}



let test1 = new Test('Ethan Hunt', 'Web Developer');

let test2 = new TestAgain('Shahabaz', 'Programmer', 'hunt');



test2.display();

console.log(test1);


console.log(test2);

test1.display();

Test.change();






// let rows = document.querySelector('.names tbody').rows;


// console.log(rows[0]);

// for(let i = 0; i<rows.length; i++){
//   // console.log(rows[i]);

//   // rows[i].querySelectorAll('td').forEach((row) => {

//   //   console.log(row);
//   // });
  
//   for(let j =0; j<rows[i].cells.length; j++){

//     console.log(rows[i].cells);

//   }

// }







haveFun = () => {

  console.log('IN have fun');
  fun();

}



fun = () => {

  console.log("Called in arrow");

}



haveFun();


console.log("***********************************************");

let okg = {
  num : 2
};


let addToThis = function(a){
  console.log(this.num + a);
}


addToThis.call(okg,4);


let demo2 = [1,2,3,4];

let demoArray = [1,2,3,4,5, ...demo2];


performAction = (arr) => {

  console.log(demoArray);

}


performAction(demoArray);

let clickCount = 0;

// document.querySelector('.color').addEventListener("click", () => {

  
//   console.log('Being clicked');
//   changeColor();

// });



// changeColor = () => {

//   let div = document.querySelector('.dummy');
//   console.log(div);
//   let colors = ['red','green','blue','yellow'];
//   console.log(clickCount);
//   console.log("Being called");
//   if(clickCount != colors.length-1){

//     div.style.backgroundColor = colors[clickCount];
//     clickCount = clickCount+1;

//   }else{

//     console.log(clickCount);

//     clickCount = 0;
//     div.style.backgroundColor = colors[clickCount];

//   }


// }



// let dummyObject = {

//   id : 1234,
//   name : 'ethan',
//   lastName : 'hunt',

//   giveName : function(){
//     console.log(this.name + ' '+ this.lastName);
//     return this;
//   }

// }

// let getName = dummyObject.giveName;

// let gettingName = getName.bind(dummyObject);
// gettingName();




function EmployeeDetails(id, name){

  this.id = id;
  this.name = name;
  console.log(this);

 
}


// new EmployeeDetails(123,'dummy');

function EmployeeChange(id, name, dept){
  
  EmployeeDetails.call(this,id, name);
  this.dept = dept;


}


let test = new EmployeeChange(123,'Ethan','Hunt');


fetch('/getName', {
  type : 'POST',

  headers:{"Content-Type" : "application/json"},
  

}).then((result) => {

  console.log(result);
  return result.json();
}).then((result) => {

  console.log(result);
  displayTable(result);

});



displayTable = (data) => {
  console.log(data);

  let table = document.createElement('table');

  let thead = document.createElement('thead');

  // let th = document.createElement('th');
  
  let headingRow = thead.insertRow();

  let id = headingRow.insertCell();
  let name = headingRow.insertCell();

  let idText = document.createTextNode("Id");

  id.appendChild(idText);
  let nameTest = document.createTextNode("Name");

  name.appendChild(nameTest);

  table.appendChild(thead);

  document.querySelector('.dummy').appendChild(table);

  console.log(table);

  let tbody = document.createElement('tbody');

  table.appendChild(tbody);
  data.forEach((item) => {

    let row = tbody.insertRow();

     console.log(item);
     for(let property in item){
       let cell = row.insertCell();

       let text = document.createTextNode(item[`${property}`]);

       cell.appendChild(text);

       row.appendChild(cell);
     }

  })
}




// let getName= test.bind(EmployeeDetails);


// console.log(test.name);




let dums = {
  id : 123,
  name : 'ethan',
  last:'hunt',
  test : 'pass'
};

function DumsFunt(id,name){

  this.id = id;
  this.name = name;

}


DumsFunt.prototype.funct = function(){

  console.log("added a function");

}

// console.log(dums);

console.log(new DumsFunt(1234, 'Hunt').funct());

let functObj = new DumsFunt(12345,'Ethan');
console.log(functObj);



