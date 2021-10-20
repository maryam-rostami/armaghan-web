var punctuation = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
export const removePunctuation = string => {    
    return string
    .split('')
    .filter(function(letter) {
      return punctuation.indexOf(letter) === -1;
    })
    .join('');
}

export const highlightKeywords = (text, keywords) =>{
  if(keywords == undefined)
    return text
  let highlightedText = text
  keywords.forEach(keyword => {
    highlightedText = highlightedText.split(" " + keyword + " ").join('<span style="color:#0000BB">'+" " + keyword + " " +'</span>')
  });
  return highlightedText
}

export const checkStringIsValidFloadNumber = (str) => {
  return !isNaN(str)
}
