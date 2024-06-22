const { whisperSecrets } = require('../dist/index');

whisperSecrets('my-keyvault', ['test-secret'])
  .then(() => {
    console.log(process.env);
  })
  .catch((error) => console.error(`Failed to whisper secrets: ${error.message}`));
