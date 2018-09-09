/**
 * Dom
 */
export class Dom {

  /**
   * Get element by id
   *
   * @param {String} elementId id of element
   *
   * @returns {Object}
   */
  $(elementId) {

    return document.getElementById(elementId);
  }

  /**
   * Create new element
   *
   * @param {String} tagName Tag name of new element
   *
   * @returns {Object}
   */
  create(tagName) {

    return document.createElement(tagName);
  }

  /**
   * Assign html to element
   *
   * @param {Object} element Target element
   * @param {String} html HTML to assign to element
   *
   * @returns {String}
   */
  html(element, html) {

    if (html === undefined) {
      return element.innerHTML;
    }

    return element.innerHTML = html;
  }

  /**
   * Add styles to element
   *
   * @param {Object} element Target element
   * @param {Object} styles key: value pairs of styles
   *
   * @returns {String}
   */
  css(element, styles) {

    Object.assign(element.style, styles);
  }
}
