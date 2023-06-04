let bill           = 0;
let tipAmmount     = 0;
let totalPerPerson = 0;
let numberOfPeople = 1;
let tipPercentage  = 0.05;

const isNumber          = new RegExp('\\d');
const isNumberOrDecimal = new RegExp('\\d|\\.');

const billInput        = document.querySelector("#bill");
const customInput      = document.querySelector(".custom");
const resetButton      = document.querySelector(".tip__button");
const percentButtons   = document.querySelector(".percent");
const numOfPeopleInput = document.querySelector("#people");

const ammount          = document.querySelector("#tip-ammount");
const finalTotal       = document.querySelector("#final-total");

//FUNCTIONS ------------------------------------------------------------------------
function addClassTo(element, klass) {
    element.classList.add(klass);
}

function removeClassFrom(element, klass) {
    element.classList.remove(klass);
}

function removeActiveClass() {
    const sortItems = document.querySelectorAll(".btn");
    sortItems.forEach(item => {
        removeClassFrom(item, "active")
    })
};

function checkForZero(input){
    if(input.value.startsWith("0")) {
        input.value = "0";
    }
}

function resetElements() {
    ammount.innerHTML    = `$0.00`;
    finalTotal.innerHTML = `$0.00`;
}

function calculateTotals() {
    tipAmmount = bill * tipPercentage / numberOfPeople;
    totalPerPerson = bill / numberOfPeople + tipAmmount;
    ammount.innerHTML    = `$${tipAmmount.toFixed(2)}`;
    finalTotal.innerHTML = `$${totalPerPerson.toFixed(2)}`;
}

function limitDecimalPlaces(event) {
    const t = event.value;
    event.value = (t.indexOf(".") >= 0) ? (t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 3)) : t;
}

function hasValidCharaters(input, reg) {
    const splitValue     = input.value.split('');
    const validCharaters = reg;
    const filteredSplitValue = splitValue.map(function(character) {
        if(!validCharaters.test(character)) {
            return '';
        }
        return character;
    });
    const match = input.value.match(/[-+]?\d*\.?\d*/);
    if (match || input.value === '') {
        last = match ? match[0] : '';
    }
    input.value = last;
}

function isEmpty()  {
    if(numOfPeopleInput.value === "" || numOfPeopleInput.value === "0") {
        numOfPeopleInput.style.border = "2px solid #E17457";
        numOfPeopleInput.previousElementSibling.classList.add("error");
        numOfPeopleInput.previousElementSibling.firstElementChild.style.display = "initial";
        numberOfPeople = 0;
        resetElements();
    } else {
        numOfPeopleInput.style.border = "none";
        numOfPeopleInput.previousElementSibling.classList.remove("error");
        numOfPeopleInput.previousElementSibling.firstElementChild.style.display = "none";
    }
}

//EVENT LISTENERS ------------------------------------------------------------------
billInput.addEventListener("input", function() {
    limitDecimalPlaces(billInput);
    hasValidCharaters(billInput, isNumberOrDecimal)
    bill = parseFloat(billInput.value);
    calculateTotals()
    if( billInput.value === "") {
        bill = 0;
        resetElements();
        resetButton.disabled = true;
    }
    if( billInput.value !== "") {
        resetButton.disabled = false;
    }
})

customInput.addEventListener("input",  function() {
    checkForZero(customInput);
    hasValidCharaters(customInput, isNumber);
    tipPercentage = parseInt(customInput.value);
    tipPercentage = tipPercentage / 100;
    calculateTotals();
    if( customInput.value === "") {
        tipPercentage = 0;
        resetElements();
    } 
});

numOfPeopleInput.addEventListener("input",  function() {
    checkForZero(numOfPeopleInput);
    hasValidCharaters(numOfPeopleInput, isNumber);
    numberOfPeople = parseFloat(numOfPeopleInput.value);
    calculateTotals()
    isEmpty();
});

percentButtons.addEventListener("click",  function(event) {
    removeActiveClass();
    if(event.target.tagName === "BUTTON") {
        addClassTo(event.target, "active");
        tipPercentage = parseInt( event.target.innerHTML.slice(0, -1) );
        tipPercentage = tipPercentage / 100;
        calculateTotals()
    }
});

resetButton.addEventListener("click",  function() {
    bill           = 0;
    tipPercentage  = 0.05;
    numberOfPeople = 1;
    resetButton.disabled = true;
    ammount.innerHTML    = `$0.00`;
    finalTotal.innerHTML = `$0.00`;
    billInput.value   = "";
    customInput.value = "";
    numOfPeopleInput.value = 1;
    isEmpty();
    removeActiveClass();
    addClassTo(percentButtons.firstElementChild, "active");
});
