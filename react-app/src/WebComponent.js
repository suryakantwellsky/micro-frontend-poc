/** src/index.jsx */

import React from "react";
import ReactDOM from "react-dom";

// Name of our class doesn't matter.
class EvilPlanElement extends HTMLElement {
  _ransom = "one million dollars!";

  get ransom() {
    return this._ransom;
  }

  // every time this JS property is changed on a DOM element like this `document.querySelector('...').ransom = 'blah';`
  set ransom(value) {
    this._plan = value;
    this.render();
  }

  // only changes to these HTML attributes will trigger `attributeChangedCallback` method
  static get observedAttributes() {
    return ["ransom"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // when someone changes HTML or does element.setAttribute('ransom', '1 million dollars')
    switch (name) {
      case "ransom":
        // it doesn't have to match JS property name on the element
        // newValue is always a string
        this._ransom = newValue;
        return;
      default:
        // do nothing
        return;
    }
  }

  render() {
    // renders your App within this element
    ReactDOM.render(<App ransom={this.ransom}></App>, this);
  }

  // Happens every time an instance of this element is mounted
  // (can be called again when moved from one container element to another)

  connectedCallback() {
    // every property assigned to the element before your component was defined, is available now
    this.render();
  }
}

const tagName = "evil-plan";

if (!window.customElements.get(tagName)) {
  // prevent rerunning on hot module reloads
  // register to be rendered in place of every <evil-plan> tag
  window.customElements.define(tagName, EvilPlanElement);
}
