const inputEl = document.getElementById("input-txt");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const resultDiv = document.getElementById("result");
const positiveAnswerStub = "is a palindrome";
const negativeAnswerStub = "is not a palindrome";

resultDiv.style.display = "none";

const checkForPalindrome = ()=>{
  if(isInputValid()){
    const inputText = inputEl.value.trim();

    if (isPalindrome(inputText)) {
      toggleIsPalindromeResultDisplay(true, inputText);
    } else {
      toggleIsPalindromeResultDisplay(false, inputText);
    }
  }
};
checkBtn.addEventListener("click", checkForPalindrome);

const onKeyDown = (event)=>{
  switch(event.keyCode){
    case 13: // Key code for the Enter key
      checkForPalindrome();
      break;
    case 8: // Key code for the Backspace key
      if (inputEl.value === "") {
        clear();
        event.preventDefault();
      }
      break;
    default:
      break;
  }
};
inputEl.addEventListener("keydown", onKeyDown);

const isPalindrome = (inputText)=>{
  if(inputText.length === 1){
    return true;
  }
  const cleanedInput = cleanInput(inputText);
  return cleanedInput === cleanedInput.split("").reverse().join("");
};

const cleanInput = (inputText)=>{
  // Regex = Match anything not alphanumeric, either case, globally in str
  const matchPattern = /[^A-Za-z0-9]/g;
  let cleanStr = inputText.toLowerCase()
                          .replace(" ", "")
                          .replace(matchPattern, "");
  //Was the str nothing but punctuation and special characters?
  if(cleanStr.length === 0){
    cleanStr = inputText.toLowerCase().replace(" ", "");
  }
  return cleanStr;
};

const isInputValid = ()=>{
  if (inputEl.value === ""){
    alert("Please input a value");
    return false;
  }
  return true;
};

const toggleIsPalindromeResultDisplay = (toggleIsPalindrome, inputText)=>{
  if(toggleIsPalindrome){
    resultDiv.setAttribute("aria-text", `${inputText} ${positiveAnswerStub}`);
    resultDiv.innerText = `${inputText} ${positiveAnswerStub}`;
    resultDiv.style.display = "block";
  } else {
    resultDiv.setAttribute("aria-text", `${inputText} ${negativeAnswerStub}`);
    resultDiv.innerText = `${inputText} ${negativeAnswerStub}`;
    resultDiv.style.display = "block";
  }
};

const clear = ()=>{
  inputEl.value = "";
  inputEl.innerText = "";
  resultDiv.innerText = "";
  resultDiv.style.display = "none";
};
clearBtn.addEventListener("click", clear);
