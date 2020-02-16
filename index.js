const options = {
  attrExceptions: ["role"]
};

const addKidToBody = kid => document.body.appendChild(kid);

const addKid = (el, kid) => el.appendChild(kid);

const addText = (el, text) => {
  const tNode = document.createTextNode(text);
  el.append(tNode);
};

const addKids = (el, kids) => {
  kids.forEach(kid => {
    if (Array.isArray(kid)) {
      addKids(el, kid);
    } else if (kid instanceof window.Element) {
      addKid(el, kid);
    } else if (typeof kid === "string") {
      addText(el, kid);
    }
  });
};

addStyles = (el, styles) => {
  if (!styles) {
    el.removeAttribute("styles");
    return;
  }

  for (let style in styles) {
    if (styles[style] in el.style) {
      el.style[style] = styles[style];
    } else {
      console.warn(`${style} not valid for <${el.tagName.toLowerCase()}>`);
    }
  }
};

const setEl = (type, stuff, ...stepKids) => {
  const el = document.createElement(type);
  console.log(stuff);
  if (!stuff) return el;

  if (Array.isArray(stuff)) {
    addKids(el, stuff);
  } else if (stuff instanceof window.Element) {
    addKid(el, stuff);
  } else if (typeof stuff === "string") {
    addText(el, stuff);
  } else if (typeof stuff === "object") {
    for (prop in stuff) {
      const val = stuff[prop];
      if (prop === "style") {
        addStyles(el, val);
      } else if (val) {
        el[prop] = val;
      }
    }
  } else {
    console.warn(`${prop} is not valid for <${type}>`);
  }

  if (stepKids) addKids(el, stepKids);
  return el;
};

const a = (...args) => setEl("a", ...args);
const button = (...args) => setEl("button", ...args);
const div = (...args) => setEl("div", ...args);
const h1 = (...args) => setEl("h1", ...args);
const header = (...args) => setEl("header", ...args);
const p = (...args) => setEl("p", ...args);
const span = (...args) => setEl("span", ...args);
const em = () => setEl("em");

addKidToBody(
  header(
    h1(
      {
        id: "header"
      },
      "The Stuff I Want To Do Next"
    )
  )
);

addKidToBody(
  div(
    { id: "desc-section" },
    p(
      { className: "desc" },
      "Although time is definitely a factor, I wrote this page to compile the multitude of tangents, budding interests, and mild obsessions I hope to explore; hopefully it will inspire me to actually explore them!"
    )
  )
);
