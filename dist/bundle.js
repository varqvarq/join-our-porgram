(()=>{"use strict";function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,o(r.key),r)}}function r(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}function o(t){var n=function(t,n){if("object"!=e(t)||!t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var o=r.call(t,n||"default");if("object"!=e(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===n?String:Number)(t)}(t,"string");return"symbol"==e(n)?n:String(n)}var i=function(){function e(n,r){t(this,e),this.title=n||"Join Our Program",this.buttonText=r||"subscribe",this.section=null}return r(e,[{key:"createSection",value:function(){var e=document.createElement("section"),t=document.createElement("h2"),n=document.createElement("h3"),r=document.createElement("form"),o=document.createElement("input"),i=document.createElement("button");return e.className="app-section app-section--join-our-program",t.className="app-title",t.textContent=this.title,n.className="app-subtitle",n.innerHTML="Sed do eiusmod tempor incididunt<br>ut labore et dolore magna aliqua.",r.className="app-section__form",o.className="app-section__form-input",o.setAttribute("placeholder","Email"),o.setAttribute("required",!0),o.setAttribute("type","email"),i.className="app-section__button app-section__button--join-op",i.textContent=this.buttonText,r.append(o,i),r.addEventListener("submit",(function(e){e.preventDefault();var t=o.value;console.log(t)})),e.append(t,n,r),this.section=e,e}},{key:"remove",value:function(){this.section&&this.section.remove()}}]),e}(),a=["gmail.com","outlook.com","yandex.ru"],u=(new(function(){function e(){t(this,e)}return r(e,[{key:"create",value:function(e){switch(e){case"standard":return(new i).createSection();case"advanced":return new i("Join Our Advanced Program","Subscribe to Advanced Program").createSection();default:throw new Error("Invalid section type")}}}]),e}())).create("standard");document.querySelector(".app-footer").before(u),document.querySelector(".app-section__form").addEventListener("submit",(function(e){e.preventDefault();var t=document.querySelector(".app-section__form-input"),n=function(e){var t=e.split("@")[1];return a.includes(t)}(t.value);n?(alert("You subscribed!"),t.value=""):alert("Enter a correct email")}))})();