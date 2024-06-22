const {addSecret} = require("../dist");

addSecret('my-keyvault', 'test-secret-1', '987654321')
  .then(() => {
    console.log(`Secret added`);
  })
  .catch(err => {
    console.error('Error adding secret:', err);
  });