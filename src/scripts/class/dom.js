export class Dom {

  $(elementId) {

    return document.getElementById(elementId);
  }

  create(tagName) {

    return document.createElement(tagName);
  }

  html(element, html) {

    if (html === undefined) {
      return element.innerHTML;
    }

    return element.innerHTML = html;
  }

  css(element, styles) {

    Object.assign(element.style, styles);
  }
}
