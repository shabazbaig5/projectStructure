console.log("Locked and loaded");



let searchBtn = document.querySelector('#searchBtn');

searchBtn.addEventListener("click", () => {
  // fetchDetails();
});



fetchDetails = () => {

  console.log("Displaying the details");
  let searchByValue = document.querySelector('#searchField').value;

  if (searchByValue == "") {
    alert("please enter the value");

  } else {
    console.log(searchByValue);

    fetch(`/getName/${searchByValue}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((result) => {
      return result.json();
    }).then((result) => {
      console.log(result);

      displayDetails(result[0]);

    });
  }
}



displayDetails = (userDetails) => {

  console.log("searched details are");
  console.log(userDetails);

  let displaySection = document.querySelector('.display');

  let data = `id :${userDetails.id} and name : ${userDetails.name}`;
  let p = document.createElement('p');


  p.append(data);

  displaySection.append(p);

}



// function filterFunction(that, event) {
//   let container, input, filter, li, input_val;
//   container = $(that).closest(".searchable");
//   input_val = container.find("input").val().toUpperCase();

//   if (["ArrowDown", "ArrowUp", "Enter"].indexOf(event.key) != -1) {
//       keyControl(event, container)
//   } else {
//       li = container.find("ul li");
//       li.each(function (i, obj) {
//           if ($(this).text().toUpperCase().indexOf(input_val) > -1) {
//               $(this).show();
//           } else {
//               $(this).hide();
//           }
//       });

//       container.find("ul li").removeClass("selected");
//       setTimeout(function () {
//           container.find("ul li:visible").first().addClass("selected");
//       }, 100)
//   }
// }



// function keyControl(e, container) {
//   if (e.key == "ArrowDown") {

//       if (container.find("ul li").hasClass("selected")) {
//           if (container.find("ul li:visible").index(container.find("ul li.selected")) + 1 < container.find("ul li:visible").length) {
//               container.find("ul li.selected").removeClass("selected").nextAll().not('[style*="display: none"]').first().addClass("selected");
//           }

//       } else {
//           container.find("ul li:first-child").addClass("selected");
//       }

//   } else if (e.key == "ArrowUp") {

//       if (container.find("ul li:visible").index(container.find("ul li.selected")) > 0) {
//           container.find("ul li.selected").removeClass("selected").prevAll().not('[style*="display: none"]').first().addClass("selected");
//       }
//   } else if (e.key == "Enter") {
//       container.find("input").val(container.find("ul li.selected").text()).blur();
//       onSelect(container.find("ul li.selected").text())
//   }

//   container.find("ul li.selected")[0].scrollIntoView({
//       behavior: "smooth",
//   });
// }


let arrayOfName = ['ethan', 'hunt', 'shabaz', 'baig', 'test', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7', 'ethanHunt', 'wellerDummy', 'huntWeller', 'testhunt', 'testethan', 'dummy', 'something', 'dummy2', 'test2', 'weller', 'patterson', 'tasha'];

let nameList = document.querySelector('#names');




/*nameList.addEventListener('keyup', (e) => {

  let exist = [];
  console.log(nameList.value);
  let inputValue = nameList.value;

  // console.log(document.querySelectorAll('#nameList option'));

  document.querySelectorAll('#nameList option').forEach((option) => {
    option.remove();
  });

  arrayOfName.forEach((name) => {

    if(name.substring(0,inputValue.length) == inputValue){

      exist.push(name);

    }

  });

  // console.log(exist);

  // for(let i =0;i<exist.length; i++){
  //   for(let j = 0; j<exist.length; j++){

  //     if(exist[i] == exist[j]){
  //       exist.pop[j];
  //     }
  //   }

  // }
  exist.forEach((name) => {

    let option = document.createElement('option');

      option.value = name;
      document.querySelector('#nameList').appendChild(option);
      
  });



  document.querySelector('dataList').style.height = "2vh";

  

});
*/


let detailButton = document.querySelector('#detailbutton');


detailButton.addEventListener('click', () => {

  fetchAndPopulate();
  console.log("The button is clicked");

});


let nameField = document.querySelector('#name');

nameField.addEventListener('focusout', (e) => {
  console.log(e.target.value);
  fetchAndPopulate(e.target.value);
})



fetchAndPopulate = (name) => {

  // let nameDetails = {

  //   name : document.querySelector('#name').value,
  //   lastName : document.querySelector('#last').value,
  //   role : document.querySelector('#role').value

  // }

  console.log(name);

  // nameDetails = JSON.stringify(nameDetails);
  // console.log(nameDetails);
  fetch(`/getNameDetails/${name}`, {

    method: 'POST',

    headers: {

      'Content-Type': 'application/json'

    }

  }).then((result) => {

    console.log(result);
    return result.json();

  }).then((result) => {

    console.log(result);
    let userDetails = result.data[0];

    console.log(userDetails);
    document.querySelector('#last').value = userDetails.lastname;
    document.querySelector('#role').value = userDetails.job;

  });

}


fetch('/getForm', {

  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
}).then((result) => {

  return result.json();

}).then((result) => {

  console.log(result);

  changeTheObject(result);

});



changeTheObject = (data) => {

  let tempArray = [];

  console.log(data);
  data.forEach(obj => {
    let objPropArr = [];
    for (prop in obj) {

      objPropArr.push(obj[`${prop}`]);

    }

    tempArray.push(objPropArr);



  });

  console.log(tempArray);

  
  $('#example').DataTable({

    data: tempArray,
    columns: [{
        title: "Name"
      },
      {
        title: "Last Name"
      },
      {
        title: "Role"
      }
    ]
    
  });
}