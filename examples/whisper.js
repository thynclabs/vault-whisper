const { whisperSecrets } = require('../dist/index');

whisperSecrets('keyvault-name', ['test-secret'])
    .then(() => {
        console.log(process.env);
    })
    .catch((error) => console.error(`Failed to whisper secrets: ${error.message}`));
