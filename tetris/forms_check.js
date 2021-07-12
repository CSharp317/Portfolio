const numbers = /[0-9]/;

// deixar todas as letras do campo em maiusculas
function up(text) {
    var x = text;
    x.value = x.value.toUpperCase();
}

// deixar todas as letras do campo em minusculas
function lower(text) {
    var x = text;
    x.value = x.value.toLowerCase();
}

function check_text(text) {
    t = text.value;
    if( t != "" ){
    // verifica se existe letras no input
        var existLeters = (n) => !isNaN(parseFloat(n)) && isFinite(n);
        if( existLeters(t) == false ){
            alert("Insira apenas número no campo ");
        }
    }
}
function check_number(text){
    t = text.value;
    if( t != "" ){
        // verifica se existe números no input nome
        if ( numbers.test(t) == true ){
            alert("Insira apenas letras no campo!");
        }
    }
}

function check_tam(text){
    t = text.value;
    if( t != "" ){
        // verifica o tamanho da variável
        if ( t.length < 11 ){
            alert("Quantidade de números insuficiente");            
        }
    }
}
