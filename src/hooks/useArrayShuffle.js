const fisherYatesShuffle = (arr, num) => {
    let newArr=[];
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * i)
        let k = arr[i]
        arr[i] = arr[j]
        arr[j] = k
    }
    for(let m=0; m < num; m++) {
        if(arr[m] !== undefined) {
            newArr.push(arr[m])
        }
    }
}

const generateNumbersWithLeadingZeros = (num) => {
  const numbers = [];
  for (let i = 0; i < num; i++) {
    numbers.push(i.toString().padStart(2, '0'));
  }
  return numbers;
}

const checkSpamWords = (input, forbiddenWords) => {
    // Convert the input text to lowercase for case-insensitive checking.
    const lowerCaseInput = input.toLowerCase();

    // Iterate through the list of forbidden words.
    for (const word of forbiddenWords) {
      // Check if the lowercase input text includes the lowercase forbidden word.
      if (lowerCaseInput.includes(word.toLowerCase())) {
        return false; // Validation fails.
      }
    }

    // If the loop completes without finding any forbidden words, validation passes.
    return true;
};

const shuffleArray = {
    fisherYatesShuffle,
    generateNumbersWithLeadingZeros,
    checkSpamWords
}

export default shuffleArray