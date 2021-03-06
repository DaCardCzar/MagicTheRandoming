//Card image slices
var topSlice = document.getElementById("topSlice");
var cardArt = document.getElementById("cardArt");
var typeBar = document.getElementById("typeBar");
var textBox = document.getElementById("textContainer");
var bottomSlice = document.getElementById("bottomSlice");
//Text locations in slices
var cardName = document.querySelector("#topSlice > p");
var typeLine = document.querySelector("#typeBar > p");
var cost = document.querySelector(".cost");
var pT = document.querySelector("#bottomSlice > p");
//Settings
var raritiesSelected = document.getElementsByClassName("raritiesSelected");
var setsContainer = document.getElementById("sets");
var allSets = document.getElementsByName("setsUsed");
var setsDom = document.getElementsByClassName("set");
var labelsDom = document.getElementsByClassName("setLabel");
var chosenCard = document.getElementById("cardSelect");
var search1 = document.getElementById("autoFill1");
var search2 = document.getElementById("autoFill2");
var search3 = document.getElementById("autoFill3");
var autoFillSelections = document.getElementsByClassName("autoFillOption");
var setSearch = document.getElementById("setSearch");
//Buttons
var randomCard = document.getElementById("randomCard");
var chooseCard = document.getElementById("chooseCard");
var buttonDelay = false;
//Keywords + Abilities
var numInput = document.getElementById("numInput");
var randNumAbility = document.getElementById("randNumAbility");
var normalNumAbility = document.getElementById("normalNum");

// add functionality so that when a rarity or set button is clicked to re obtain the card names.

var cards = {};
var cardNames = [];
var autoComplete = [];

tempData = [];

var keywords = ["Reach", "Flying", "Vigilance", "Trample", "First Strike", "Lifelink", "Changeling", "Flash", "Haste"];
var rarities = [];
var abilities = [];
var tempSet = "";
var tempBlock = "";
var tempCard = "";
var tempPowers = [];
var tempPower;
var tempToughnesses = [];
var tempToughness;
var tempAbilities = [];
var tempKeywords = [];
var numOfAbilities = 0;
var tempConverted = 0;
var tempRarity = "Common";
var randKeyword = 0;
var testAbilities = []
var modeChoose = false;

// function toggleSets(){
// 	if (setsContainer.style.display === "none"){
// 		setsContainer.style.display = 'grid';
// 		// randomCard.style.display = 'none';
// 	} else {
// 		setsContainer.style.display = 'none';
// 		// randomCard.style.display = 'block';
// 	}
// }

function selectCard(){
	selectRarities();
	selectSets();
	selectKeywords();
	getCardNames();
	if(!modeChoose){
		//Random number for card
		var rand =  Math.floor(Math.random() * (Object.keys(cards).length));

		//Make sure the selected card is actually a card, and not just data. (Ex.keywordsRarity).
		while(!cards[Object.keys(cards)[rand]].hasOwnProperty("name")){
			var rand =  Math.floor(Math.random() * (Object.keys(cards).length));
		}
		// console.log(cards["Koma, Cosmos Serpent"].abilitiesText);
		//Get card values.
		tempCard = Object.keys(cards)[rand];
		// console.log(Object.keys(cards));
	} else {
		if(cards[chosenCard.value] == undefined){
			alert("Please choose a valid card!");
			return
		}
		tempCard = cards[chosenCard.value].name;
		// console.log(tempCard);
	}
	var tempName = cards[tempCard].name;
	var tempType = cards[tempCard].type;
	var tempRarity = cards[tempCard].rarity;
	var tempCost = cards[tempCard].cost;
	numOfAbilities = cards[tempCard].abilities;
	tempConverted = cards[tempCard].converted
	cardName.textContent = tempName;
	typeLine.textContent = cards[tempCard].type;
	cost.textContent = tempCost;
	setColor();
	getAbilities();
	setAbilities(tempName, tempCard, tempRarity, numOfAbilities);
	// getPowTou();
	// setPowTou();
	tempPower = cards[tempCard].power;
	tempToughness = cards[tempCard].toughness;
	pT.textContent = tempPower + " " + tempToughness;
}

function selectSets(){
	cards = {};
	for(i=0; i<rarities.length; i++){
		for(j=0; j<setsDom.length; j++){
			if(setsDom[j].checked){
				// console.log(window[(setsDom[j].value).toLowerCase() + rarities[i]])
				cards = $.extend(cards, (window[(setsDom[j].value).toLowerCase() + rarities[i]]));
			}
		}
	}

}

// Object keywords, contains (Common; Uncommon; Rare; Mythic): [List of keywords at the chosen rarities]


function selectKeywords(){
	keywords = [];
	for(i=0; i<setsDom.length; i++){
		if(setsDom[i].checked){
			for(j=0;j<rarities.length;j++){
				// console.log(cards, rarities[j])
				tempData = cards["keywords"+rarities[j]].abilitiesText;
				for(k=0;k<tempData.length; k++){
					keywords.push(tempData[k]);
				}
			}
		}
	}
}

function selectRarities(){
	for(i=0; i<raritiesSelected.length; i++){
		if (raritiesSelected[i].checked && !rarities.includes(raritiesSelected[i].value)){
			rarities.push(raritiesSelected[i].value);
		} else if (!raritiesSelected[i].checked && rarities.includes(raritiesSelected[i].value)) {
			rarities.splice(rarities.indexOf(raritiesSelected[i].value) , rarities.indexOf(raritiesSelected[i].value)+1);
		}
	}
}

function getToughness(tempCard, cost, index){
	if(cards[Object.keys(cards)[index]].converted === cost){
		tempToughnesses.push(cards[Object.keys(cards)[index]].toughness);
	}
}

function getPower(tempCard, cost, index){
	if(cards[Object.keys(cards)[index]].converted === cost){
		tempPowers.push(cards[Object.keys(cards)[index]].power);
	}
}

function getAbilities(){
	abilities = [];
	for(i=0; i<Object.keys(cards).length; i++){
		if(rarities.includes(cards[Object.keys(cards)[i]].rarity)){
			tempAbilitiesText = cards[Object.keys(cards)[i]].abilitiesText;
			for(j=0; j<tempAbilitiesText.length; j++){
				abilities.push(tempAbilitiesText[j]);
			}
		}
	}
}

function setAbilities(name, card, rarity, num){
	// console.log(name, rarity, num);
	tempKeywords.length = 0;
	tempAbilities.length = 0;
	// console.log(tempAbilities);
	// num = 5;
	// console.log(randNumAbility.checked);
	if(!numInput.value.length == 0 && randNumAbility.checked === false){
		num = numInput.value;
	} else if (randNumAbility.checked){
		num = Math.floor(Math.random()*10);
	} else if (normalNumAbility.checked){
	}

	numKeyword = Math.floor(Math.random()*num);
	numAbility = num - numKeyword;
	if(true){
		for(i=0; i<num; i++){
			randKeyword = Math.floor(Math.random() * (keywords.length));
			randAbility = Math.floor(Math.random() * (abilities.length));
			//make sure ability is not blank.
			while (abilities[randAbility] == ""){
				randAbility = Math.floor(Math.random() * (abilities.length));
			}
			if(numKeyword > 0 && !tempKeywords.includes(keywords[randKeyword])){
				//If still can add keywords and not already selected.
				tempKeywords.push(keywords[randKeyword]);
				numKeyword--;
			} else if (numKeyword === 0){
				//If selected all keywords add to card.
				var ability = document.createElement("p");
				for(j=0; j<tempKeywords.length; j++){
					if(j===(tempKeywords.length - 1)){
						//adjust for last keyword not having a ,
						ability.innerHTML += tempKeywords[j];
					} else {
						ability.innerHTML += tempKeywords[j] + ", ";
					}
				}
				textBox.appendChild(ability);
				numKeyword--;
				i--;
			} else if (numKeyword > 0){
				//Adjust for if keyword is already selected.
				i--;
			} else if (numAbility > 0 && !tempAbilities.includes(abilities[randAbility])){
				//Add ability.
				var ability = document.createElement("p");
				ability.innerHTML = abilities[randAbility];
				textBox.appendChild(ability);
	 			tempAbilities.push(abilities[randAbility]);
				numAbility--;
			} else if (tempAbilities.includes(abilities[randAbility])){
				//Adjust for if ability is alread selected.
				i--;
			}
		}
	}



	// if(rarity === "Common"){
	// 	for(i=0; i<num; i++){
	// 		rand =  Math.floor(Math.random() * (abilities.length));
	// 		if(!tempAbilities.includes(abilities[rand])){
	// 			var ability = document.createElement("p");
	// 			// ability.appendChild(document.createTextNode(abilities[rand]));
	// 			ability.innerHTML = abilities[rand];
	// 			textBox.appendChild(ability);
	// 			tempAbilities.push(abilities[rand]);

	// 		}else{
	// 			i--;
	// 		}
	// 	}
	// }
}

function getPowTou(){
	for(i=0; i<Object.keys(cards).length; i++){
		getToughness(tempCard, tempConverted, i);
		getPower(tempCard, tempConverted, i);
	}
}

function setPowTou(){
	rand = Math.floor(Math.random() * (tempPowers.length));
	tempPower = tempPowers[rand];
	rand = Math.floor(Math.random() * (tempToughnesses.length));
	tempToughness = tempToughnesses[rand];
}

function setColor(){
	// console.log(cards[tempCard].color);
	if("color3" in cards[tempCard]){
		console.log("Add support for third color pls.");
	} else if ("color2" in cards[tempCard]){
		console.log("Add support for second color pls.");
	} else {
		//need to add support for other card frames. Legendary, artifact, vehicle, ect.
		//if card only has one or less colors.
		topSlice.style.backgroundImage = 'url("BlankCardAssets/'+ cards[tempCard].color +'/' + cards[tempCard].color +'-1.png")';
		cardArt.style.backgroundImage = 'url("BlankCardAssets/'+ cards[tempCard].color +'/' + cards[tempCard].color +'-2.png")';
		typeBar.style.backgroundImage = 'url("BlankCardAssets/'+ cards[tempCard].color +'/' + cards[tempCard].color +'-3.png")';
		textBox.style.backgroundImage = 'url("BlankCardAssets/'+ cards[tempCard].color +'/' + cards[tempCard].color +'-4.png")';
		bottomSlice.style.backgroundImage = 'url("BlankCardAssets/'+ cards[tempCard].color +'/' + cards[tempCard].color +'-5.png")';
	}
}

function updateSets(e){
	for(i=0; i<labelsDom.length; i++){
		// Set Sets to lowercase
		tempSet = labelsDom[i].textContent;
		tempSet = tempSet.toLowerCase();

		// Get block data ie. Zendikar for Rise of the eldrazi.
		tempBlock = labelsDom[i].classList[1];
		if (tempBlock === undefined){
			tempBlock = "Not Valid";
		}
		tempBlock = tempBlock.toLowerCase();

		// Show/ hide checkboxes for sets. TempSet for set name, TempBlock for groupings
		if(tempSet.includes((e.target.value).toLowerCase()) || tempBlock.includes((e.target.value).toLowerCase())){
			setsDom[i].style.display = "";
			labelsDom[i].style.display= "";
		} else {
			setsDom[i].style.display = "none";
			labelsDom[i].style.display= "none";
		}
	}
}

function updateCardSearch(e){
	autoComplete = [];
	for(i=0; i<3; i++){
		for(j=0; j<cardNames.length; j++){
			if (cardNames[j].toLowerCase().includes((e.target.value).toLowerCase()) & !autoComplete.includes(cardNames[j])){
				window["search" + (i+1).toString()].style.display = "block";
				window["search" + (i+1).toString()].innerHTML = cardNames[j];
				autoComplete.push(cardNames[j]);
				break
			}
		}
		if(!window["search" + (i+1).toString()].innerHTML.toLowerCase().includes((e.target.value).toLowerCase()) || window["search" + (i+1).toString()].innerHTML == search1.innerHTML & ! i == 0){
			window["search" + (i+1).toString()].style.display = "none";
		}
	}
	if(e.target.value == ""){
		clearAutoComplete();
	}
}

function clearAutoComplete(){
	search1.style.display = "none";
	search2.style.display = "none";
	search3.style.display = "none";
}

function getCardNames(){
	selectRarities();
	selectSets();
	selectKeywords();
	cardNames = [];
	for(i=0; i<Object.keys(cards).length; i++){
		if("name" in cards[Object.keys(cards)[i]]){
			cardNames.push(cards[Object.keys(cards)[i]].name);
		}
		// console.log(cards[Object.keys(cards)[i]].name);
		
	}
	// console.log(cards);
}

function fillSearchBar(e){
	chosenCard.value = (e.target.innerHTML);
	clearAutoComplete();
}

function tabWorkaround(e){
	if(e.keyCode == 9){
		chosenCard.value = autoFillSelections[0].innerHTML;
		clearAutoComplete();
	}
	if(e.keyCode == 13){
		//reset Textbox and set card info
		resetTextBox();
	}
}

function resetTextBox(){
// reset textBox, removing all children <p> tags.

		while(textBox.firstChild){
			textBox.removeChild(textBox.lastChild);
		}

		modeChoose = true;
		selectCard();
}

randomCard.addEventListener("click", function(){
	// reset textBox, removing all children <p> tags.

		while(textBox.firstChild){
			textBox.removeChild(textBox.lastChild);
		}
		modeChoose = false;
		selectCard();
})


chooseCard.addEventListener("click", resetTextBox)

for(i=0; i<autoFillSelections.length; i++){
	autoFillSelections[i].addEventListener('click', fillSearchBar);
}

// functionality for autoComplete Sets and Rarities.
for(i=0; i<setsDom.length; i++){
	setsDom[i].addEventListener("change", getCardNames);
}

for(i=0; i<raritiesSelected.length; i++){
	raritiesSelected[i].addEventListener("change", getCardNames);
}

setSearch.addEventListener("input", updateSets);
chosenCard.addEventListener("input", updateCardSearch);
chosenCard.addEventListener('keydown', tabWorkaround);

// selectCard();
selectCard();



//Todo: add flavor text if card is short.

//Can use window[variable name] to reference variable variables.