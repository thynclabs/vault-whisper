import { DefaultAzureCredential } from '@azure/identity';
import { SecretClient } from '@azure/keyvault-secrets';
import { snakeCase } from 'lodash';
import * as dotenv from "dotenv";

dotenv.config();

/**
 * Whisper secrets from Azure Key Vault to the environment
 * @param vaultName - The name of the Azure Key Vault
 * @param secrets - The names of the secrets to whisper
 */
export async function whisperSecrets(vaultName: string, secrets: string[]): Promise<void> {
  const credential = new DefaultAzureCredential();
  const url = `https://${vaultName}.vault.azure.net`;

  const client = new SecretClient(url, credential);

  for (const secretName of secrets) {
    try {
      const secret = await client.getSecret(secretName);
      if (secret && secret.value) {
        process.env[snakeCase(secretName).toUpperCase()] = secret.value;
      } else {
        console.error(`Secret ${secretName} not found`);
      }
    } catch (error: any) {
      console.error(`Failed to whisper secret ${secretName}: ${error.message}`);
    }
  }
}



