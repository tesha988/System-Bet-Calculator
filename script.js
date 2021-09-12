const calculateButton = document.querySelector("#btn");
const checkboxes = document.querySelectorAll(".choice");
const odds = document.querySelectorAll(".odds");
const total = document.querySelector(".total");

calculateButton.addEventListener("click", 
function checkTotal() {
  total.value = "";
  let sum = 1;
  for (i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      let correctOdds = parseFloat(odds[i].value);
      sum = sum * correctOdds;
    }
  }
  total.value = sum;
})