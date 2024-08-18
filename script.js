async function consultaBrasilAPI(url, elementId) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        document.getElementById(elementId).innerText = JSON.stringify(data, null, 2);
    } catch (error) {
        document.getElementById(elementId).innerText = 'Erro na consulta: ' + error.message;
    }
}

consultaBrasilAPI('https://brasilapi.com.br/api/ibge/uf/v1', 'consulta1');
consultaBrasilAPI('https://brasilapi.com.br/api/cnpj/v1/27865757000102', 'consulta2');

document.getElementById('form1').addEventListener('submit', async (event) => {
    event.preventDefault();
    const input = document.getElementById('input1').value;
    await consultaBrasilAPI(`https://brasilapi.com.br/api/cep/v1/${input}`, 'resultadoForm1');
});

document.getElementById('form2').addEventListener('submit', async (event) => {
    event.preventDefault();
    const input = document.getElementById('input2').value;
    await consultaBrasilAPI(`https://brasilapi.com.br/api/cnpj/v1/${input}`, 'resultadoForm2');
});

document.getElementById('btnRace').addEventListener('click', () => {
    const api1 = fetch('https://jsonplaceholder.typicode.com/posts/1');
    const api2 = fetch('https://jsonplaceholder.typicode.com/posts/2');
    const api3 = fetch('https://jsonplaceholder.typicode.com/posts/3');

    Promise.race([api1, api2, api3])
        .then(response => response.json())
        .then(data => {
            document.getElementById('resultadoRace').innerText = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            document.getElementById('resultadoRace').innerText = 'Erro: ' + error.message;
        });
});

document.getElementById('btnAll').addEventListener('click', () => {
    const api1 = fetch('https://jsonplaceholder.typicode.com/posts/1');
    const api2 = fetch('https://jsonplaceholder.typicode.com/posts/2');
    const api3 = fetch('https://jsonplaceholder.typicode.com/posts/3');

    Promise.all([api1, api2, api3])
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then(data => {
            document.getElementById('resultadoAll').innerText = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            document.getElementById('resultadoAll').innerText = 'Erro: ' + error.message;
        });
});
