/**
 * Utility functions for interacting with browser Local Storage.
 */

/**
 * Loads data from Local Storage for a given key.
 * @param key The key to retrieve data for.
 * @returns An array of type T, or an empty array if no data is found or parsing fails.
 */
export function loadData<T>(key: string): T[] {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) {
      return [];
    }
    return JSON.parse(serializedData) as T[];
  } catch (error) {
    console.error(`Error loading data from Local Storage for key "${key}":`, error);
    return [];
  }
}

/**
 * Saves data to Local Storage for a given key.
 * @param key The key to store data under.
 * @param data The array of data to store.
 */
export function saveData<T>(key: string, data: T[]): void {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error(`Error saving data to Local Storage for key "${key}":`, error);
  }
}