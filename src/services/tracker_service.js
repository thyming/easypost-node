import baseService from './base_service';

export default (easypostClient) =>
  /**
   * The TrackerService class provides methods for interacting with EasyPost {@link Tracker} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class TrackerService extends baseService(easypostClient) {
    static #name = 'Tracker';

    static #url = 'trackers';

    static #key = 'tracker';

    /**
     * Create a {@link Tracker tracker}.
     * See {@link https://www.easypost.com/docs/api/node#create-a-tracker EasyPost API Documentation} for more information.
     * @param {Object} params - The parameters to create a tracker with.
     * @returns {Tracker} - The created tracker.
     */
    static async create(params) {
      const url = this.#url;

      const wrappedParams = {};
      wrappedParams[this.#key] = params;

      return this._create(url, wrappedParams);
    }

    /**
     * Create multiple {@link Tracker trackers} in a single request.
     * See {@link https://www.easypost.com/docs/api/node#trackers EasyPost API Documentation} for more information.
     * @param {Object} [params] - The parameters to create trackers with.
     */
    static async createList(params = {}) {
      const newParams = { trackers: params };
      const url = 'trackers/create_list';
      await easypostClient._post(url, newParams);
    }

    /**
     * Retrieve all {@link Tracker trackers} associated with the current authenticated user.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-list-of-trackers EasyPost API Documentation} for more information.
     * @param {Object} [params] - The parameters to filter the trackers by.
     * @returns {Object} - An object containing the list of {@link Tracker trackers} and pagination information.
     */
    static async all(params = {}) {
      const url = this.#url;

      return this._all(url, params);
    }

    /**
     * Retrieve a {@link Tracker tracker} by its ID.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-tracker EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the tracker to retrieve.
     * @returns {Tracker} - The retrieved tracker.
     */
    static async retrieve(id) {
      const url = `${this.#url}/${id}`;

      return this._retrieve(url);
    }
  };