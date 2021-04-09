/**
 * Check if the status code is in the error range.
 * @param {string} http status code.
 * @returns {boolean}
 */
const isHttpError = (status: string): boolean => new RegExp(/^5\d{2}$|^4\d{2}$/).test(status);

export = isHttpError;
