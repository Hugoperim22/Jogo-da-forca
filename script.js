onload = init;
var guesses = [];
var nPalavras = 3;
var erros = 0;
var acertos = 0;
var m;
//Função chamada ao carregar o HTML;
function init() {
	m = getWord();
	drawLetters(m, guesses);
	document.body.addEventListener("keypress", listener);	
	console.log(m);
}

function listener(value){
	if(erros != 6 && acertos != m.length - 1){
		console.log(value.key);
		guesses.push(value.key);
		var verify = verifica(m, value.key);
		drawLetters(m, guesses);

		if(!verify){
			switch(erros){
				case 1:
					drawHead();
					break;
				case 2:
					drawBody();
					break;
				case 3:
					drawArm1();
					break;
				case 4:
					drawArm2();
					break;
				case 5:
					drawLeg1();
					break;
				case 6:
					drawLeg2();
					youLose();
					break;

				//Draw the letter on the screen
				document.getElementById("wrongs").innerHTML += value.key
			}
		}
		else if(acertos == m.length - 1){
			document.getElementById("message").innerHTML = "You win!";
		}
	}
}
//Function to show the user has lost
function youLose(){
	var loseDiv = document.getElementById("message");
	loseDiv.innerHTML = "YOU HAVE LOST!"
}

//Função que retorna uma palavra aleatória do vetor de palavras;
function getWord() {
	var words = ["hungria","italia","alemanha","brasil","frança","japao","china","canada","uruguai","chile","guatemala","tailandia",
	"zimbabue","angola","india","peru","paraguai","equador"];
	return words[Math.trunc(Math.random()*nPalavras)]; 
}

//Função que "desenha" letras escondidas e descobertas
function drawLetters(w,g){
	var write = document.getElementById("word");
	write.innerHTML = ""
	for (var i = 0; i < w.length; i++){
		if(descoberto(w[i],g)){
			write.innerHTML += w[i];
		}else{
			write.innerHTML += " _ ";
		}
	}
}

//Função que verifica se C é igual a algum dos valores no vetor G;
function descoberto(c,g) {
	for (var i = 0; i < g.length; i++){
		if(c == g[i]){
			return true;
		}
	}
	return false;
}

//Função que pontua o chute do usuário, caso correto, e adiciona um erro caso contrário;
function verifica(m,c) {
	var acertou = false;
	for (var i = 0; i < m.length; i++){
		if(m[i] == c){
			acertos++;
			acertou = true;
			return true;
		}
	}
	if(!acertou){
		erros++;
		return false;
	}
}

//função que exibe as letras já chutadas;
function desenhaChutes() {
	// body...
}

//Funções de desenho do corpo
function drawHead() {
	document.getElementById("head").innerHTML = " o";
}
function drawBody() {
	document.getElementById("body").innerHTML = "|";
}
function drawArm1() {
	document.getElementById("arm1").innerHTML = "-";
}
function drawArm2() {
	document.getElementById("arm2").innerHTML = "-";
}
function drawLeg1() {
	document.getElementById("leg1").innerHTML = "/ ";
}
function drawLeg2() {
	document.getElementById("leg2").innerHTML = "\\";
}