const calculateButton = document.querySelector("#btn");
const total = document.querySelector(".total");
const systemList = document.querySelector("#system");
const stake = document.querySelector("#stake");
let bankerBets = document.querySelector("#banker-bets");
let bankerBetsOdds;
let bankerBetsLabel;
let systemCombinations = [];

const checkedOdds = [];
const oddsCombinations = [];
const winning = [];

function addOddsInput() {
  let oddsCount = systemList.options[systemList.selectedIndex].innerText.slice(
    0,
    2
  );
  let systemCount = systemList.options[
    systemList.selectedIndex
  ].innerText.slice(
    systemList.options[systemList.selectedIndex].innerText.length - 2
  );
  let placeholderIndex = 0;
  if (parseInt(systemCount) > 6) {
    for (let i = 0; i < parseInt(systemCount) - 6; i++) {
      let restOddsInput = document.createElement("input");
      restOddsInput.type = "number";
      restOddsInput.step = "any";
      restOddsInput.placeholder = `Odds ${placeholderIndex + (i + 7)}`;
      restOddsInput.setAttribute("class", "odds");
      restOddsInput.style.margin = "0rem 0.4rem 0 0";
      let labelsCreate = document.createElement("label");
      labelsCreate.innerText = "Correct";
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add("choice");
      let brakes = document.createElement("br");

      document.querySelector("#form").appendChild(restOddsInput);
      document.querySelector("#form").appendChild(labelsCreate);
      labelsCreate.appendChild(checkbox);
      document.querySelector("#form").appendChild(brakes);
    }
  }
}

addOddsInput();

// Creating banker bets input field on user select

function createBankerBets() {
  let bankerBetsCount = parseFloat(
    bankerBets.options[bankerBets.selectedIndex].innerText
  );

  for (let i = 0; i < bankerBetsCount; i++) {
    if (bankerBets.value != 0) {
      bankerBetsOdds = document.createElement("input");
      bankerBetsOdds.classList.add("banker");
      bankerBetsOdds.placeholder = `Banker Bets ${i + 1}...`;
      document.querySelector("#banker").appendChild(bankerBetsOdds);
    }
  }
}
createBankerBets();

// below work with odds combinations and calculating final winnings

calculateButton.addEventListener("click", function checkTotal() {
  total.innerText = "";

  for (i = 0; i < document.querySelectorAll(".choice").length; i++) {
    if (document.querySelectorAll(".choice")[i].checked) {
      let correctOdds = parseFloat(document.querySelectorAll(".odds")[i].value);
      checkedOdds.push(correctOdds);

      let bankerSum = 1;
      document.querySelectorAll(".banker").forEach((e) => {
        bankerSum = bankerSum * parseFloat(e.value);
      });

      oddsCombinations.length = parseInt(
        systemList.options[systemList.selectedIndex].innerText.slice(0, 2)
      );

      function combine(input, len, start) {
        if (len === 0) {
          systemCombinations.push(oddsCombinations.reduce((a, b) => a * b, 1));
          systemCombinations.slice(0, oddsCombinations.length + 1);

          if (bankerBets.value == 0) {
            winning.push(
              (systemCombinations[systemCombinations.length - 1] *
                parseFloat(stake.value)) /
                parseFloat(systemList.value)
            );
          } else {
            winning.push(
              systemCombinations[systemCombinations.length - 1] * bankerSum
            );
          }

          let sum = 0;
          winning.forEach((element) => {
            if (bankerBets.value == 0) {
              sum = sum + element;
            } else {
              sum =
                sum +
                (element * parseFloat(stake.value)) /
                  parseFloat(systemList.value);
            }
            var sue = sum.toFixed(2);
            total.innerText = sue;
          });

          return;
        }
        for (let i = start; i <= input.length - len; i++) {
          oddsCombinations[oddsCombinations.length - len] = input[i];
          combine(input, len - 1, i + 1);
        }
      }
    }
  }
  combine(checkedOdds, oddsCombinations.length, 0);
});
