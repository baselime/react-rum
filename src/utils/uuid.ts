
/**
 * Crypto does not work in insecure contexts so if it fails we just make a random string
 * @returns {string} UUID
 */
export function makeUUID() {
    try {
        return crypto.randomUUID();
    }catch(e) {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
}