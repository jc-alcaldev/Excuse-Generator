
let who = ["My father", "Joan", "Mary"];
let action = [" did"," played"," ate"];
let what = [" dinner"," the paella","  whith the ball"];
let when = [" monday."," today."," yesterday."];
let options = [who, action, what, when];

let srt ="";
for (let index = 0; index < options.length; index++) {
    srt = srt.concat("",options[index][Rounded(options[index])]);
    
}

document.body.innerHTML = "<h1>OMG! You will not believe me but..." + srt + "</h1>"

function Rounded(list){
    return Math.round(ramdonSearch(list));
}

function ramdonSearch(list) {
    return (Math.random() * (list.length-1));
}

