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
const services = returnValues.map(createService);//array of promises, has same order as returnValues because of map
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

var app = angular.module('myApp', []);

app.controller('myCtrl', function ($scope) {
  $scope.services = [];
  $scope.resolvedPromises = [];

  $scope.createServicesArray = function () {
    for (let i = 0; i < returnValues.length; i++) {
      let obj = { status: "Pending" };
      $scope.services.push(obj);
    }
  }

  async function callServices() {
    const promiseArray = [];
    for (let i = 0; i < services.length; i++) {
      promiseArray.push(addPromise(i));
    }
    const users = await Promise.all(promiseArray);
    return users;
  }

  // https://javascript.info/async-await
  // https://medium.com/@antonioval/making-array-iteration-easy-when-using-async-await-6315c3225838
  async function addPromise(pos) {
    let promise = services[pos]();
    let result = await promise; // wait till the promise resolves (*)
    let index = returnValues.indexOf(result);
    console.log(index);

    $scope.resolvedPromises.push("Service #" + index + " " + result);
    $scope.services[index].status = "Resolved: " + result;
    console.log("resolvedPromises: " + $scope.resolvedPromises);
    
    // https://labs.magnet.me/nerds/2015/11/16/async-await-in-angularjs.html
    $scope.$apply();

    return result;
  }

  callServices();
  $scope.createServicesArray();
});
