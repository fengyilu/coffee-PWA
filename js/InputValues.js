var output = [];
var allOutputs = [];
function getVal(){

    values = ["beschreibung", "date", "kategorie", "wert"];
    values.forEach(element => {
        var val = document.getElementById(element).value;
        if(element == "wert"){
            val = parseInt(val);
        }
        output.push(val);
    })
    createElement()
}

function createElement(){
    var betrag = 0;
    var row = "";
    var abstand = "--------------- ";
    var balance = addtionSubstration(betrag);
    output.forEach(element => {
        allOutputs.push(element);
        row += element + abstand;
    })
    row = row + abstand + balance;
    var newRow = document.createElement('LI');
    var textnode = document.createTextNode(row);
    newRow.appendChild(textnode);
    document.getElementById("myList").appendChild(newRow);
    output = [];
 }

 function addtionSubstration(betrag){
     allOutputs.forEach(element => {
        if(Number.isInteger(element)){
         betrag += element;
        }
     })
     return betrag;
 }