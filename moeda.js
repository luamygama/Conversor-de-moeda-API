const apiKey = 'e525988e1697fd6f84538bee'; //armaneza a chave da api do site exchangerate
const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`; //valido por um mes

//Função para buscar a taxa de cambio da API
async function getExchangeRate(moeda1,moeda2) {
    try{
        const response = await fetch(`${apiURL}${moeda1}`); //Trazendo o link da api 
        const data = await response.json(); 

        if(data.result === 'success'){
            return data.conversion_rates[moeda2]; // retorno do valor da moeda
        }else{
            throw new Error('Erro ao buscar a taxa de câmbio'); // mensagem de erro caso esteja a taxa incoreta

        }

    }catch(error){
        console.error("Error: ", error);
        return null;
    
    }
}
//escutador 
document.getElementById('currency-form').addEventListener('submit', async function(event) {
event.preventDefault();

    const valor = parseFloat(document.getElementById('valor').value);
    const moeda1 = document.getElementById('moeda1').value;
    const moeda2 = document.getElementById('moeda2').value;

    const ExchangeRate = await getExchangeRate(moeda1, moeda2);

    if(ExchangeRate){
        const convertedValue = valor * ExchangeRate; // recebe o valor que o suario coloca no campo e multiplica pelo valor da moeda da api e exibe o resultado
        const conversao = document.getElementById('conversao');
        conversao.textContent = `Resultado:
        ${convertedValue.toFixed(2)} ${moeda2}`;
    }else{
        alert('Erro ao buscar a cotaçaõ. Tente novamente');
    }
});
