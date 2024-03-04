//your JS code here. If required.
// Function to generate a random time between min and max seconds
function randomTime(min, max) {
  return Math.random() * (max - min) + min;
}

// Function to create a Promise that resolves after a random time
function createRandomPromise() {
  return new Promise((resolve) => {
    const time = randomTime(1, 3);
    setTimeout(() => {
      resolve(time);
    }, time * 1000);
  });
}

// Array to store all the Promises
const promises = [
  createRandomPromise(),
  createRandomPromise(),
  createRandomPromise()
];

// Display loading text
document.getElementById("output").innerHTML = '<tr><td colspan="2">Loading...</td></tr>';

// Wait for all Promises to resolve
Promise.all(promises)
  .then((results) => {
    // Remove loading text
    document.getElementById("output").innerHTML = '';
    
    // Iterate over the results and update the table
    results.forEach((time, index) => {
      const row = document.createElement("tr");
      const promiseCell = document.createElement("td");
      promiseCell.textContent = `Promise ${index + 1}`;
      const timeCell = document.createElement("td");
      timeCell.textContent = time.toFixed(3); // Display time with 3 decimal places
      row.appendChild(promiseCell);
      row.appendChild(timeCell);
      document.getElementById("output").appendChild(row);
    });
    
    // Calculate and display total time taken
    const totalTime = results.reduce((total, time) => total + time, 0);
    const totalRow = document.createElement("tr");
    const totalPromiseCell = document.createElement("td");
    totalPromiseCell.textContent = "Total";
    const totalTimeCell = document.createElement("td");
    totalTimeCell.textContent = totalTime.toFixed(3); // Display total time with 3 decimal places
    totalRow.appendChild(totalPromiseCell);
    totalRow.appendChild(totalTimeCell);
    document.getElementById("output").appendChild(totalRow);
  })
  .catch((error) => {
    console.error("Error occurred:", error);
  });
