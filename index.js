const express = require('express');
const session = require('express-session');
const fs = require('fs');
const bodyParser = require('body-parser');
const multiparty = require('multiparty');
const app = express();
// const readStream = fs.createReadStream(__dirname+'/test.txt');
const writeStream = fs.createWriteStream(__dirname+'/test2.txt');
const PassThrough = require('stream').PassThrough;
const connection = require('./db/dbConnection');
require('dotenv').config();


// console.log(process.env);

const PORT = process.env.PORT || 4001;
console.log(PORT);
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended : true  }));
app.use(bodyParser.json())


app.use(express.static(__dirname +'/views'));

app.use(express.static(__dirname +'/public'));

app.get('/', (req, res) => {

  console.log('Got the request');
  res.render('test');
 
});





// app.play('/play', (req,res) => {

// })
app.get('/test', (req, res) => {

  // readStream.pipe(res);
  let readStream = fs.createReadStream(__dirname + '/test.txt');
  let writeStream = fs.createWriteStream(__dirname +'/dummy');

  readStream.pipe(writeStream);
  // readStream.pipe(res);

  
  // fs.readFile(__dirname + '/test.txt','utf8', (err,data) => {

  //   console.log(data);
  //   fs.writeFile(__dirname + '/dummy.txt', data);
  // })

});


app.post('/getNameDetails/:id' , (req, res) => {
  console.log("getting the request");
  console.log(req.params.id);

  let getConnection = connection();

  getConnection.query('Select * from names where name= ?', [req.params.id], (err, rows, columns) => {

    if(err){
      console.log("there is some err" + err);

    }else{
      // res.send(rows);
      // rows = JSON.stringify(rows);
      console.log(rows);
      res.send(JSON.stringify({data : rows}));
    }
  })

  // let obj = JSON.stringify(req.params.obj);
  // console.log(obj);
  // res.send(req.params.obj);
  // console.log(req.params.obj.json());
});

app.get('/getPage', (req, res) => {

  console.log("requested a page");
  res.render("test");


  // res.send(req.body);
  // res.render('test',req.body);

});


app.post('/getForm', (req, res) => {

  let details = [
    {

      name : "Ethan",
      last : "Hunt",
      role : "special agent with FBI"

    }, 
    {

      name : "Kurt",
      last : "Weller",
      role : "Consultant"

    },
    {
      name : 'Jane',
      last : 'Doe',
      role : "special agent with FBI"
    },
    {
      name : 'Reade',
      last : 'Edgar',
      role : "agent"
    },
    {
      name : 'Tasha',
      last : "Zapata",
      role : "agent"
    }
  ]

  let temp = JSON.stringify(details)

  console.log("Unparsed");
  console.log(temp);

  console.log("parsed");
  console.log(JSON.parse(temp));

  res.send(JSON.stringify(details));
  // console.log(req.body);
  // res.render('test',req.body);
  // res.send(req.body);

});



app.post('/', (req, res) => {


  let form = new multiparty.Form();

  form.on('part', (data) => {
    data.pipe(writeStream)
  });

  form.on('close', () => {
    res.send("file uploaded");
  });
  // console.log(req);

  form.parse(req);
  // req.pipe(res);
  // req.pipe(res);

  // req.pipe(res);
  // req.pipe(writeStream);

});


app.post('/getName/:id', (req, res) => {

  console.log(req.params.id);
  let getConnection = connection();
  // console.log(getConnection);
  // res.send(getConnection);
  getConnection.query('Select * from empdetails where id = ?',[req.params.id], (err, rows, columns) => {
    // console.log(rows);
    if(err){
      console.log("there is some error " + err);
      // console.log(err);
    }else{
      console.log(rows);

      res.send(rows);
    }
  });


});


// readStream.on('data', (chunk) => {

  // console.log(chunk);

  // let result = writeStream.write(chunk);

  // if(!result){

  //   console.log('Back pressure');
  //   readStream.pause();

  // }
  

  // writeStream.write(chunk);




// }); 

// let result = new PassThrough();

// console.log(result);

// readStream.pipe(result);

// result.pipe(writeStream);
// readStream.pause();


// process.stdin.on('data', (chunk) => {

//   if(chunk.toString().trim() === 'end'){

//     readStream.resume();
    
//   }

//   readStream.read();

// });

// readStream.on('end', () => {

//   console.log('stream ended');

// });


app.get('/random', (req, res) => {

  let readStream = fs.createReadStream('./test.txt');
  console.log("REading");

  readStream.pipe(res);
})

// app.get('/random', (req, res) => {

  // process.stdin.on('data', (chunk) => {

  //   if(chunk.toString().trim() == 'exit'){
  //     console.log("exit typed");

  //     process.exit();
  //   }else{
  //     console.log(chunk.toString());

  //     writeStream.write(chunk);
  //   }
    
  // });

  // process.on('exit', () => {

  //   console.log("You watch each other's six");

  // })

// })


app.post("/calculate", (req, res) => {

  console.log("Request made for post")
  console.log(req.body);

  let numbers = req.body.numbers;
  let operator = req.body.operator;

  numbers.forEach(element => {

    numbers[numbers.indexOf(element)] = parseFloat(element);

  });

  console.log(numbers);

  if(operator == "+"){

    res.send({result : numbers[0] + numbers[1]});
  }else if(operator == '-'){
    
    if(numbers[0] > numbers[1]){

      res.send({result : numbers[0] - numbers[1]});

    }else{

      res.send({result : numbers[1] - numbers[0]});

    }

  }else if(operator == '*'){

    res.send({result : numbers[0] * numbers[1]});

  }else{

    res.send({result : numbers[0] / numbers[1]});

  }
  
});


// let num = 123;
// let div;
// let bin = [];
// while(num > 1){

//   div = parseInt(num/2);
  
//   if(num%2 == 0 || num%2==1){

//     bin.push(num%2);
//     // console.log(num%2);
//   }

//   num = div;

  


// }
// bin.push(1);
// console.log(bin.reverse());

app.listen(PORT, () => {

  console.log("Listening to the port 4001");

});





















// const http = require('http');
// const fs = require('fs');


// const server = http.createServer((req, res) => {

//   res.writeHead(200, {"Content-Type" : "text/html"});

//   if(req.url === '/'){

//     console.log(req.method);

//     console.log(req.url);
//     fs.readFile('./views/test.html', (err,data) => {

//       res.write(data);
//       res.end();
//     });
//     // res.sendFile("./views/home.ejs");
//     // res.send("<h2>This is a paragraph</h2>");

//   }else if(req.url ==='/test'){

//     res.end("<h3>This is requested by the test url</h3>");

//   }
  

// });



// server.listen(4001, '127.0.0.1', () => {

//   console.log("Listening to the blaa port 4001");

// });





// const http = require('http');

// const fs = require('fs');

// const server = http.createServer((req, res) => {

//   console.log("called");
//   console.log(req.url);

//   if(req.url == '/'){

//     res.writeHead(200, {'Content-Type' : "text/html"});
//     let readStream = fs.createReadStream(__dirname + '/views/test.html', 'utf8');
//     readStream.pipe(res);
//   // res.end();
//   }
  

//   // res.end("requested");

// });



// server.listen(4001,'127.0.0.1');

// console.log('listening to port');