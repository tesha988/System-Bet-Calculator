const calculateButton = document.querySelector("#btn");
const checkboxes = document.querySelectorAll(".choice");
const odds = document.querySelectorAll(".odds");
const total = document.querySelector(".total");
const systemList = document.querySelector("#system");
const stake = document.querySelector("#stake");
let systemNum = systemList.options[systemList.selectedIndex].innerText;
let systemCombinations = [];
const array = [];
const result = [];
const winning = [];

calculateButton.addEventListener("click", function checkTotal() {
  total.value = "";
  let sum = 1;
  for (i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      let correctOdds = parseFloat(odds[i].value);
      array.push(correctOdds);
      // sum = sum * correctOdds;
      // stakePerCombination = (stake.value / systemList.value) * sum;
      // total.value = stakePerCombination;

      result.length = parseInt(
        systemList.options[systemList.selectedIndex].innerText.charAt(0)
      );
      console.log(result.length);
      function combine(input, len, start) {
        if (len === 0) {
          systemCombinations.push(result.reduce((a, b) => a * b, 1));
          systemCombinations.slice(0, result.length + 1);
          console.log(
            (systemCombinations[systemCombinations.length - 1] *
              parseFloat(stake.value)) /
              parseFloat(systemList.value)
          );
          winning.push(
            (systemCombinations[systemCombinations.length - 1] *
              parseFloat(stake.value)) /
              parseFloat(systemList.value)
          );
          let totalWinning = 0;
          winning.forEach((element) => {
            totalWinning = totalWinning + element;
            total.value = totalWinning;
            return totalWinning;
          });

          console.log(result);
          return;
        }
        for (let i = start; i <= input.length - len; i++) {
          result[result.length - len] = input[i];
          combine(input, len - 1, i + 1);
        }
        // console.log(result);
      }

      // let row = 0;
      // function multiply(a) {
      //   row = row + a;
      //   return row;
      // }
    }
  }
  combine(array, result.length, 0);
});
