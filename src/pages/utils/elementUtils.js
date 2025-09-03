const elementUtils = (function () {
  const render = ({ elementType, elementAttr, textContent }) => {
    const element = document.createElement(elementType);
    setMultipleAttr(element, elementAttr);
    setTextContent(element, textContent);
    return element;
  };

  const setMultipleAttr = (element, attribute) => {
    for (const attr in attribute) {
      element.setAttribute(attr, attribute[attr]);
    }
  };

  const setTextContent = (element, eleTextContent) => {
    if (eleTextContent) {
      element.textContent = eleTextContent;
    }
  };

  return { render };
})();

export default elementUtils;
