function getCharacterCount( text ){
    if (typeof text === 'string' || text === null || text === undefined ){
        if (text == undefined || text == null || text == '' ){
            return 0;
        }
        else {
            return text.length;
        }
    }
    else {
        return (new InputTypeError("The input is not a string."));
    }
    
}
function InputTypeError(message) {
  this.message = message;
  //this.stack = (new Error()).stack;
}
//InputTypeError.prototype = Object.create(Error.prototype);
InputTypeError.prototype.name = "InputTypeError";


//console.log(getCharacterCount("!W-o r-t?"));
//console.log(getCharacterCount(""));
//console.log(getCharacterCount(null));
//console.log(getCharacterCount(undefined));
//console.log(getCharacterCount(9));



function getWords( text ){
    if (typeof text === 'string' || text === null || text === undefined ){
        if (text == '' || text == null || text == undefined){
            return [];
        }
        else {
            var arr = [];
            var len = text.length;
            
            
            //var i = 0;
            for (var i = 0 ; i<len ; i ++ ){
                var first = -2;
                var last = -2;
                var str = '';
                while (len > i && (
                        text[i] >= 'a' && text[i] <= 'z' ||
                        text[i] >= 'A' && text[i] <= 'Z' ||
                        text[i] >= '0' && text[i] <= '9' ||
                        text[i] == '_' ||
                        text[i] == '€')){
                    if (first == -2){
                        first = i;
                    }
                    i++;
                }
                last = i-1;
                for (var j = first ; j<=last ; j++ ){
                    str = str + text[j];
                }
                arr.push (str);
            }
            return arr;
        }
    }
    else {
        return (new InputTypeError("The input is not a string."));
    }
}
//console.log(getWords("Hallo 123 hallo_123 _ € 10€ 10.32€"));
//console.log(getWords(undefined));
//console.log(getWords(''));
//console.log(getWords(null));
//console.log(getWords(9));

function getLongestWords(text) {
    if (typeof text === 'string' || text === null || text === undefined ){
        if (text == '' || text == null || text == undefined){
            return [];
        }
        else {
            var x = text.match(/\w+(€*)(\w+)*/g);
            //console.log(x);
            var y = x.map(function (t) {return t.length});
            //console.log(y);
            //return((x[y.indexOf(Math.max.apply(Math,y))])); //returns only one max
            var max = -1;
            var tab = [];
            for (var w = 0 ; w < y.length ; w++){ //find the longest word
                if (y[w] > max){
                    max = y[w];
                }
            }
            for (w = 0 ; w<y.length ; w++){ //loop and add to array all longest words
                if (y[w] == max){
                    tab.push (x[w]);
                }
            }
            return tab;
        }
    }
    else {
         return (new InputTypeError("The input is not a string."));
    }
}

//console.log(getLongestWords("Hi 123 _ 10€ 3.33"));
//console.log(getLongestWords(null));
//console.log(getLongestWords(undefined));
//console.log(getLongestWords(""));
//console.log(getLongestWords(9));