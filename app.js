// begin screener code
const returnValues = [
  "Hakuna",
  "Matata",
  "It means",
  "No worries",
  "For the rest of your days"
].sort(() => (Math.random() > 0.5 ? 1 : -1));//randomly sorts array
console.log("returnValues: " + returnValues);

const createService = (retVal, index) => () =>
  new Promise(resolve =>
    setTimeout(() => {
      console.log(`${index}. ${retVal}`);
      resolve(retVal);
    }, Math.random() * 10000)
  );
const services = returnValues.map(createService);//array of promises, has same order as returnValues
// end screener code

// Your task is to create a program that:
// calls each service at initial load time, thereby starting the race
// renders a live updating "status" UI that indicates for each service which has resolved and which is still pending
// renders a live updating "results" UI that
// indicates for each service
// if it has resolved, what its value is
// if it has not resolved, some indication that it is still pending
// ranks the services in the order of their resolution

console.log(services)
// console.log("services: "+ services)




// renders a live updating "status" UI that indicates for each service which has resolved and which is still pending
// renders a live updating "results" UI that
// indicates for each service
// if it has resolved, what its value is
// if it has not resolved, some indication that it is still pending
// ranks the services in the order of their resolution

/*
    // i think i can create object or maybe a map
    i need to track each service, its status
    it is not resolved just set it to pending
    if it is resolved set that to the value

    looks like the key is the index


    as the services resolve i can push this to a completed array

*/

// const createObject=()=>{
//   let obj={};
//   for(let i=0; i<returnValues.length; i++){
//     obj[i]=returnValues[i];
//   }
//   return obj;
// }

// let obj=createObject();
// console.log(obj);


/*
let a=[];
  // calls each service at initial load time, thereby starting the race
  const loadServices = (services) => {
    let toExec=[];
    for(let i=0; i<services.length; i++){
      toExec.push(services[i]());
      a.push(services[i]());
    } 
    return toExec;
  }

  let servicesToBeExecuted=loadServices(services);

  let obj={};
  console.log(obj);

console.log(servicesToBeExecuted);
// debugger;
let returnedValues=[];

// Promise.all(servicesToBeExecuted).then(function(result) {
//   console.log(result);
//   returnValues.push(result);
//   // let index=result.split(".")[0];
//   // obj[index]=result.split(".")[1];
//   // obj[result]=result;
//   // console.log(obj);
// });
// console.log(returnValues);


*/




var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope) {
  $scope.message = "hello world";
  $scope.services = [];
  $scope.resolvedPromises = [];

  $scope.$watch('resolvedPromises', function() {
    // some value in the array has changed 
  }, true); // watching properties


  $scope.createServicesArray = function () {
    for (let i = 0; i < returnValues.length; i++) {
      let obj = { status: "Pending" };
      $scope.services.push(obj);
    }
  }


  async function f2(pos) {
    let promise = services[pos]();

    let result = await promise; // wait till the promise resolves (*)
    let index=returnValues.indexOf(result);

    $scope.resolvedPromises.push("Service #"+index+" "+result);

    console.log(index);
    $scope.services[index].status="Resolved: "+result;

    // https://labs.magnet.me/nerds/2015/11/16/async-await-in-angularjs.html
    $scope.$apply();
    console.log("resolvedPromises: " + $scope.resolvedPromises);
    return result;
  }

  async function callServices(userIds) {
    const pArray = [];
    for (let i = 0; i < services.length; i++) {
      pArray.push(f2(i));
    }
    const users = await Promise.all(pArray);
    // ... do some stuff
    return users;
  }
  // https://medium.com/@antonioval/making-array-iteration-easy-when-using-async-await-6315c3225838

  let users = callServices();



  $scope.createServicesArray();




  //     let cartObj={};
  //     $scope.cartObj;
  //     // var myMap = new Map();
  //     $scope.cart="";
  //     $scope.totalCost;

  //     $scope.searchForProcedure=function(){
  //         let search=$scope.search;
  //         let url=`http://localhost:4000/procedures?name_like=^${search}.*`;
  //         $http.get(url).then(function(response) {
  //             $scope.policies = response.data;
  //         })
  //   }

  //   $scope.removeProcedure=function(key){
  //       if(cartObj.hasOwnProperty(key)){
  //           delete cartObj[key];
  //           $scope.getTotalCost();
  //       }
  //   }

  //   $scope.getTotalCost=function(){
  //       let total=0;
  //       for(let key in cartObj){
  //         total+=cartObj[key];
  //       }
  //       $scope.totalCost=total;
  //   }

  //   $scope.GetRowIndex = function (index) {      
  //       let key=$scope.policies[index]["name"];
  //       let value=$scope.policies[index]["insuredCost"];



  //       if(!cartObj.hasOwnProperty(key)){
  //         cartObj[key]=value;
  //           $scope.cartObj=cartObj;
  //           $scope.getTotalCost();
  //       }
  //     }


});
