var ObjectElement = require('object-element');

/**
 * Shortcut to .element.style
 */
ObjectElement.prototype.defineProperty('style', {
  get: function () {
    return this.element.style;
  }
});

/**
 * Get element's visibility state
 */
ObjectElement.prototype.defineProperty('hidden', {
  get: function () {
    return this.element.style.display === 'none' ? true : false;
  }
});

/**
 * Get or set element's opacity
 */
ObjectElement.prototype.defineProperty('opacity', {
  get: function () {
    return parseInt(this.element.style.opacity, 10);
  },

  set: function (value) {
    this.element.style.opacity = value;
  }
});

/**
 * Get or set element's width
 */
ObjectElement.prototype.defineProperty('width', {
  get: function () {
    return this.element.offsetWidth;
  },

  set: function (value) {
    this.style.width = value + 'px';
  }
});

/**
 * Get or set element's height
 */
ObjectElement.prototype.defineProperty('height', {
  get: function () {
    return this.element.offsetHeight;
  },

  set: function (value) {
    this.style.height = value + 'px';
  }
});

/**
 * Display element in DOM
 */
ObjectElement.prototype.show = function () {
  if (this.element.style.display === 'none') {
    this.element.style.display = '';
  }
}

/**
 * Hide element in DOM
 */
ObjectElement.prototype.hide = function () {
  this.element.style.display = 'none';
}

/**
 * Get or set element's tyle
 * @param  [String name]
 * @param  [String value]
 * @return {[type]}
 */
ObjectElement.prototype.css = function (name, value) {
  if (arguments.length === 0) {
    return this.element.style;
  }

  if (arguments.length === 1) {
    return this.element.style[name];
  }

  if (arguments.length === 2) {
    this.style[name] = value;
  }
}

ObjectElement.prototype.hasClass = function (name) {
  return this.element.classList.contains(name);
}

ObjectElement.prototype.addClass = function (name) {
  this.triggerSync('add-class', name);
  this.element.classList.add(name);
  this.trigger('added-class', name);
}

ObjectElement.prototype.removeClass = function (name) {
  this.triggerSync('remove-class', name);
  this.element.classList.remove(name);
  this.trigger('removed-class', name);
}

ObjectElement.prototype.toggleClass = function (name) {
  this.triggerSync('toggle-class', name);

  if (this.hasClass(name)) {
    this.removeClass(name);
  } else {
    this.addClass(name);
  }

  this.trigger('toggled-class', name);
}
