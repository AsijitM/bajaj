const express = require('express');

const app = express();

app.use(express.json());

//GET request
app.get('/bfhl', (req, res) => {
  // Create the response JSON object with the hardcoded structure
  const responseObject = {
    operation_code: 1,
  };

  // Send the response
  res.status(200).json(responseObject);
});


app.post('/bfhl', (req, res) => {
  try {
  const name = req.body.name;
  const dob = req.body.dofb; // Replace with the actual field name for date of birth
  // Format date of birth to ddmmyyyy
  const formattedName = name.toLowerCase().replace(' ', '_');
  const dobParts = dob.split('-'); // Assuming date format is yyyy-mm-dd
  const formattedDob = `${dobParts[2]}${dobParts[1]}${dobParts[0]}`;

  const userId = `${formattedName}_${formattedDob}`;

  const inputArray = req.body.inputArray;

  // Function to find the last alphabet

    function findLastAlphabet(arr) {
      let lastAlphabet = null;

      for (let i = 0; i < arr.length; i++) {
        const char = arr[i].toLowerCase();

        if (char >= 'a' && char <= 'z') {
          lastAlphabet = char;
        }
      }

      return lastAlphabet;
    }

    const numbersArray = [];
    const alphabetsArray = [];

    for (const item of inputArray) {
      const numberValue = parseFloat(item);

      if (!isNaN(numberValue)) {
        numbersArray.push(numberValue);
      } else if (typeof item === 'string' && item.match(/[a-zA-Z]/)) {
        alphabetsArray.push(item);
      }
    }
    // Find the last alphabet in the input array
    const highestAlphabet = findLastAlphabet(inputArray);

    const responseData = {
      is_success: true,
      name,
      userId: userId,
      numbers_array: numbersArray,
      alphabets_array: alphabetsArray,
      highestAlphabet: highestAlphabet,
    };
    res.json(responseData);
  } catch (error) {
    const responseErr = {
      is_success: false,
    };

    req.json(responseErr);
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
