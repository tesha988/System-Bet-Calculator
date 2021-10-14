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
  if (
    parseInt(
      systemList.options[systemList.selectedIndex].innerText.slice(
        systemList.options[systemList.selectedIndex].innerText.length - 2
      )
    ) > document.querySelectorAll(".ods").length
  ) {
    let oddsCount = systemList.options[
      systemList.selectedIndex
    ].innerText.slice(0, 2);
    let systemCount = systemList.options[
      systemList.selectedIndex
    ].innerText.slice(
      systemList.options[systemList.selectedIndex].innerText.length - 2
    );
    let placeholderIndex = 0;

    for (
      let i = document.querySelectorAll(".ods").length;
      i < parseInt(systemCount);
      i++
    ) {
      let odsDiv = document.createElement("div");
      odsDiv.setAttribute("class", "ods");
      let restOddsInput = document.createElement("input");
      restOddsInput.type = "number";
      restOddsInput.step = "any";
      restOddsInput.placeholder = `Odds ${placeholderIndex + i + 1}`;
      restOddsInput.setAttribute("class", "odds");
      restOddsInput.style.margin = "0rem 0.4rem 0 0";
      let labelsCreate = document.createElement("label");
      labelsCreate.innerText = "Correct";
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add("choice");
      let brakes = document.createElement("br");

      document.querySelector("#ods").appendChild(odsDiv);
      document.querySelectorAll(".ods")[i].appendChild(restOddsInput);
      document.querySelectorAll(".ods")[i].appendChild(labelsCreate);
      labelsCreate.appendChild(checkbox);
      document.querySelectorAll(".ods")[i].appendChild(brakes);
    }

    addOddsInput();
  } else if (
    parseInt(
      systemList.options[systemList.selectedIndex].innerText.slice(
        systemList.options[systemList.selectedIndex].innerText.length - 2
      )
    ) < document.querySelectorAll(".ods").length
  ) {
    function removeOddsInput() {
      for (
        let i = parseInt(
          systemList.options[systemList.selectedIndex].innerText.slice(
            systemList.options[systemList.selectedIndex].innerText.length - 2
          )
        );
        i < document.querySelectorAll(".ods").length;
        i++
      ) {
        while (document.querySelectorAll(".ods")[i].firstChild) {
          document
            .querySelectorAll(".ods")
            [i].removeChild(document.querySelectorAll(".ods")[i].firstChild);
        }
      }
    }
    removeOddsInput();
  }
}

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
