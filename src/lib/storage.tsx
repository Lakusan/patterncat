import AsyncStorage from "@react-native-async-storage/async-storage";
import * as aesjs from "aes-js";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import "react-native-get-random-values";

type StorageAdapter = {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
};

/**
 * NATIVE: LargeSecureStore
 * - AES-256 encrypts value
 * - Encryption key stored in SecureStore (small)
 * - Encrypted payload stored in AsyncStorage (no size limit)
 */
class LargeSecureStore implements StorageAdapter {
  private async encrypt(key: string, value: string): Promise<string> {
    const encryptionKey = crypto.getRandomValues(new Uint8Array(256 / 8));

    const cipher = new aesjs.ModeOfOperation.ctr(
      encryptionKey,
      new aesjs.Counter(1)
    );
    const encryptedBytes = cipher.encrypt(aesjs.utils.utf8.toBytes(value));

    await SecureStore.setItemAsync(
      key,
      aesjs.utils.hex.fromBytes(encryptionKey)
    );

    return aesjs.utils.hex.fromBytes(encryptedBytes);
  }

  private async decrypt(key: string, encryptedHex: string): Promise<string | null> {
    const encryptionKeyHex = await SecureStore.getItemAsync(key);
    if (!encryptionKeyHex) return null;

    const cipher = new aesjs.ModeOfOperation.ctr(
      aesjs.utils.hex.toBytes(encryptionKeyHex),
      new aesjs.Counter(1)
    );
    const decryptedBytes = cipher.decrypt(aesjs.utils.hex.toBytes(encryptedHex));

    return aesjs.utils.utf8.fromBytes(decryptedBytes);
  }

  async getItem(key: string) {
    const encrypted = await AsyncStorage.getItem(key);
    if (!encrypted) return encrypted;
    return this.decrypt(key, encrypted);
  }

  async setItem(key: string, value: string) {
    const encrypted = await this.encrypt(key, value);
    await AsyncStorage.setItem(key, encrypted);
  }

  async removeItem(key: string) {
    await AsyncStorage.removeItem(key);
    await SecureStore.deleteItemAsync(key);
  }
}

/**
 * WEB: localStorage (optionally add crypto here)
 * - Persistent across reloads
 * - Can add WebCrypto encryption if you want
 */
const webStorage: StorageAdapter = {
  async getItem(key: string) {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(key);
  },
  async setItem(key: string, value: string) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(key, value);
  },
  async removeItem(key: string) {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(key);
  },
};

// Unified export
export const unifiedSecureStorage: StorageAdapter =
  Platform.OS === "web" ? webStorage : new LargeSecureStore();
