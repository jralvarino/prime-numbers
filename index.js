var primalityCheck = function(number) {
  return new Promise(function(resolve, reject) {
    var delay = Math.floor(Math.random() * 1000);
    console.log("Start: " + number + " with delay " + delay + "ms");  
    setTimeout(function() {
      if (number <= 1) { 
        console.log("-" + number);
        reject(number);
        return;
      }

      var maxFactor = Math.floor(Math.sqrt(number));
      for (var factor = 2; factor <= maxFactor; factor++) {
        if (number % factor == 0) {
          reject(number);
          console.log("-" + number);
          return;
        }
      }

      console.log("+" + number);
      resolve(number);
    }, delay);
  });
};

function showPrimeNumbersSequentially(number){
  if(number < 0){
    console.log("Number must not be negative.")
    return;
  }

  const filledArray = Array.from(Array(number).keys())

  const result = filledArray.reduce((previous, current) => {
    return previous.then((primeNumbers) => {
         return primalityCheck(current).then((res) => 
         {
          return [...primeNumbers, res];
         }).catch(err => primeNumbers)
        })
  }, Promise.resolve([]));

  result.then((value) => {
    if(value.length == 0){
      console.log("No prime numbers found.");
      return;
    }
    console.log(`Prime numbers less than ${number}: ${value}`)
  });
}

async function showPrimeNumbersParallel(number){
  if(number < 0){
    console.log("Number must not be negative.")
    return;
  }

  const filledArray = Array.from(Array(number).keys())

  const promises = []

  filledArray.map((duration) => {
    promises.push(primalityCheck(duration)) 
  })

  let primeNumbers = [];
  await Promise.allSettled(promises).then((results) => {
    results.forEach((result) => {
      if(result.status == "fulfilled"){
        primeNumbers.push(result.value);
      }
    });
  });

  if(primeNumbers.length == 0){
    console.log("No prime numbers found.");
    return;
  }
  console.log(`Prime numbers less than ${number}: ${primeNumbers}`)
}

//showPrimeNumbersSequentially(100);
//showPrimeNumbersParallel(100);
