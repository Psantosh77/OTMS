import api from './apiconfig';

/**
 * Common function to make POST API calls
 * @param {object} params - { url, payload, config }
 * @returns {Promise<any>}
 */
export const postApi = async ({ url, payload = {}, config = {} }) => {
  try {
    const response = await api.post(url, payload, config);
    return config.label
      ? { label: config.label, data: response.data }
      : response.data;
  } catch (error) {
    if (config.label) {
      throw { label: config.label, error: error.response?.data || error };
    }
    throw error.response?.data || error;
  }
};

// Example usage:
// const { data, error } = await postApi({ url: '/user/login', payload: { email, password } });
