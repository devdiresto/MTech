const ctaPrincipal = document.getElementById('cta-principal');
const seccaoContato = document.getElementById('contato');

ctaPrincipal.addEventListener('click', () => {
    seccaoContato.scrollIntoView({ behavior: 'smooth' });
});


const btnBuscarCep = document.getElementById('btn-buscar-cep');
const cepInput = document.getElementById('cep-input');
const resultadoCep = document.getElementById('resultado-cep');

const resCidade = document.getElementById('res-cidade');
const resBairro = document.getElementById('res-bairro');
const resRua = document.getElementById('res-rua');
const statusAtendimento = document.getElementById('status-atendimento');

btnBuscarCep.addEventListener('click', buscarEndereco);

function buscarEndereco() {
    const cep = cepInput.value.replace(/\D/g, '');

    if (cep.length !== 8) {
        alert('Por favor, insira um CEP válido com 8 números.');
        return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(dados => {
            if (dados.erro) {
                alert('CEP não encontrado. Verifique os números digitados.');
                resultadoCep.classList.add('hidden');
                return;
            }

            resultadoCep.classList.remove('hidden');
            resCidade.innerText = `${dados.localidade} - ${dados.uf}`;
            resBairro.innerText = dados.bairro || 'Não informado';
            resRua.innerText = dados.logradouro || 'Não informado';

            if (dados.uf === 'RS') {
                statusAtendimento.innerText = '✅ Região Atendida pelo nosso Delivery!';
                statusAtendimento.style.backgroundColor = '#e2f0d9';
                statusAtendimento.style.color = '#28a745';
            } else {
                statusAtendimento.innerText = '❌ No momento atendemos apenas no RS.';
                statusAtendimento.style.backgroundColor = '#fce4d6';
                statusAtendimento.style.color = '#c55a11';
            }
        })
        .catch(error => {
            console.error('Erro ao consultar a API:', error);
            alert('Ocorreu um erro ao buscar o CEP. Tente novamente mais tarde.');
        });
}


const formContato = document.getElementById('form-contato');

formContato.addEventListener('submit', (event) => {
    event.preventDefault();

    const nomeCliente = document.getElementById('nome').value;
    const emailCliente = document.getElementById('email').value;

    alert(`Obrigado pelo contato, ${nomeCliente}! \n\nSua solicitação foi enviada com sucesso. Enviamos uma confirmação para o e-mail: ${emailCliente}.`);
    
   
    formContato.reset();
    resultadoCep.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
});