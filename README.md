# vault-whisper
`vault-whisper-ts` is a package that allows you to fetch secrets from Azure Key Vault and set them as environment variables.

## Installation
To install, use npm or yarn:
```shell
npm install @thynclabs/vault-whisper
# or
yarn add @thynclabs/vault-whisper
```

## Usage
```js
const { whisperSecrets } = require('@thynclabs/vault-whisper');

// Replace with your Azure Key Vault name and secret names
const keyVaultName = 'your-keyvault-name';
const secrets = ['secret-name-1', 'secret-name-2'];

whisperSecrets(keyVaultName, secrets)
    .then(() => {
        console.log('Secrets fetched and environment variables set successfully.');
    })
    .catch((err) => {
        console.error('Failed to fetch secrets:', err);
    });
```

#### NOTE:
The name of each environment variable will be converted to a snake_case uppercase format to ensure consistency and readability. This transformation involves replacing any hyphens (`-`) with underscores (`_`) and converting all letters to uppercase.

For instance, if the original secret name is `secret-name-1`, the corresponding environment variable that will be set is `SECRET_NAME_1`.

This convention helps maintain a standard naming format across environment variables, making them easily identifiable and manageable within your codebase.

##### Example Transformation:

-   Original Secret Name: `secret-name-1`
-   Transformed Environment Variable Name: `SECRET_NAME_1`

##### Steps Involved in the Transformation:

1.  **Replace Hyphens with Underscores**: Any hyphens (`-`) in the secret name are replaced with underscores (`_`).
2.  **Convert to Uppercase**: The entire string is then converted to uppercase letters.

By adhering to this transformation rule, you can ensure that all environment variables derived from secret names follow a consistent and clear naming pattern, facilitating better organization and access within your development and deployment environments.

## Environment Variables
Ensure your environment has the following variables set:

-   **AZURE_CLIENT_ID**: Client ID of your Azure AD application (service principal).
-   **AZURE_CLIENT_SECRET**: Client secret associated with your Azure AD application.
-   **AZURE_TENANT_ID**: Azure AD tenant ID, required in some environments.

## Configuration

Make sure your Azure AD application (service principal) has appropriate permissions to read secrets from the Azure Key Vault.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## Acknowledgments

-   This package uses [Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js) to interact with Azure Key Vault.

