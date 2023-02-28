import Utils from '../utils/util';
import EasyPostObject from './easypost_object';

/**
 * A {@link https://www.easypost.com/docs/api/node#pickups Pickup} represents a scheduled carrier pickup of packages from an {@link https://www.easypost.com/docs/api/node#addresses Address}.
 * @public
 * @extends EasyPostObject
 */
export default class Pickup extends EasyPostObject {
  /**
   * Get the lowest rate for this {@link Pickup}.
   * @public
   * @param {string[]} [carriers] - List of allowed carriers to filter by
   * @param {string[]} [services] - List of allowed services to filter by
   * @returns {Rate} - The lowest rate
   * @throws {FilteringError} - If no applicable rates are found
   */
  lowestRate(carriers, services) {
    const rates = this.pickup_rates || [];

    return Utils.getLowestRate(rates, carriers, services);
  }
}