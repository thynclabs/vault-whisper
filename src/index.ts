import { DefaultAzureCredential } from '@azure/identity';
import { SecretClient } from '@azure/keyvault-secrets';
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Converts a string to snake_case format.
 *
 * This function replaces all hyphens (`-`) with underscores (`_`)
 * and converts all letters to uppercase.
 *
 * @param {string} str - The input string to convert.
 * @returns {string} The converted string in snake_case format.
 */
function snakeUpperCase(str: string): string {
  return str.replace(/-/g, '_').toUpperCase();
}

/**
 * Generates the URL for the specified Azure Key Vault.
 *
 * @param {string} vaultName - The name of the Azure Key Vault.
 * @returns {string} The URL of the Azure Key Vault.
 */
function vaultUrl(vaultName: string): string {
  return `https://${vaultName}.vault.azure.net`;
}

/**
 * Fetches secrets from Azure Key Vault and sets them as environment variables.
 *
 * This function reads secrets from the specified Azure Key Vault and sets them
 * as environment variables. The names of the environment variables are transformed
 * to snake_case and uppercase format.
 *
 * @param {string} vaultName - The name of the Azure Key Vault.
 * @param {string[]} secrets - An array of secret names to fetch from the Key Vault.
 * @returns {Promise<void>} A promise that resolves when all secrets have been fetched and set.
 *
 * @example
 * whisperSecrets('my-vault', ['secret-name-1', 'secret-name-2'])
 *   .then(() => {
 *     console.log(process.env.SECRET_NAME_1); // Access your secret like this
 *   })
 *   .catch(err => {
 *     console.error('Error fetching secrets:', err);
 *   });
 */
export async function whisperSecrets(vaultName: string, secrets: string[]): Promise<void> {
  const credential = new DefaultAzureCredential();
  const url = vaultUrl(vaultName);

  console.log(`Fetching secrets from ${url}...`);

  const client = new SecretClient(url, credential);

  for (const secretName of secrets) {
    try {
      const secret = await client.getSecret(secretName);
      if (secret && secret.value) {
        process.env[snakeUpperCase(secretName)] = secret.value;
      } else {
        console.error(`Secret ${secretName} not found`);
      }
    } catch (error: any) {
      console.error(`Failed to whisper secret ${secretName}: ${error.message}`);
    }
  }
}

/**
 * Adds a new secret to Azure Key Vault.
 *
 * This function adds a new secret to the specified Azure Key Vault with the given name and value.
 *
 * @param {string} vaultName - The name of the Azure Key Vault.
 * @param {string} secretName - The name of the secret to add.
 * @param {string} secretValue - The value of the secret to add.
 * @returns {Promise<void>} A promise that resolves when the secret has been added.
 *
 * @example
 * addSecret('my-vault', 'new-secret-name', 'your-secret-value')
 *   .then(() => {
 *     console.log('Secret added successfully');
 *   })
 *   .catch(err => {
 *     console.error('Error adding secret:', err);
 *   });
 */
export async function addSecret(vaultName: string, secretName: string, secretValue: string): Promise<void> {
  try {
    const credential = new DefaultAzureCredential();
    const url = vaultUrl(vaultName);
    const client = new SecretClient(url, credential);

    await client.setSecret(secretName, secretValue);
    process.env[snakeUpperCase(secretName)] = secretValue;
  } catch (error: any) {
    console.error(`Failed to add secret ${secretName}: ${error.message}`);
  }
}
