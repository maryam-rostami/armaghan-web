export const copyStringToClipboard = (str) => {
  // Create new element
  var el = document.createElement('textarea');
  // Set value (string to be copied)
  el.value = str;
  // Set non-editable to avoid focus and move outside of view
  el.setAttribute('readonly', '');
  el.style = {position: 'absolute', left: '-9999px'};
  document.body.appendChild(el);
  // Select text inside element
  el.select();
  // Copy text to clipboard
  document.execCommand('copy');
  // Remove temporary element
  document.body.removeChild(el);
}

export const copyElement = (element) => {
  element.disabled = false;
  //Select the text field
  element.select();
  element.setSelectionRange(0, 99999); // For mobile devices

  document.execCommand("copy");
  element.disabled = true;
}

export const getOrientation = () => {
  var orientation = window.innerWidth > window.innerHeight ? "landscape" : "portrait";
  return orientation;
}

export const checkIfImageExists = (url, callback) => {
  const img = new Image();

  img.src = url;
  
  if (img.complete) {
    callback(true);
  } else {
    img.onload = () => {
      callback(true);
    };
    img.onerror = () => {
      callback(false);
    };
  }
}