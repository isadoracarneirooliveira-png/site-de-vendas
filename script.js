document.addEventListener('DOMContentLoaded', () => {
    const botoesComprar = document.querySelectorAll('.btn-comprar');
    const listaCarrinho = document.getElementById('lista-carrinho');
    const totalCarrinhoSpan = document.getElementById('total-carrinho');
    const finalizarCompraBtn = document.getElementById('finalizar-compra');

    // Array para armazenar os itens do carrinho
    let carrinho = [];

    // Função para atualizar a visualização do carrinho
    function atualizarCarrinho() {
        listaCarrinho.innerHTML = ''; // Limpa a lista
        let total = 0;

        if (carrinho.length === 0) {
            listaCarrinho.innerHTML = '<li>Carrinho Vazio</li>';
        } else {
            carrinho.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.nome} (R$ ${item.preco.toFixed(2)})`;
                listaCarrinho.appendChild(li);
                total += item.preco;
            });
        }

        totalCarrinhoSpan.textContent = `R$ ${total.toFixed(2)}`;
    }

    // Adiciona o evento de clique aos botões de compra
    botoesComprar.forEach(botao => {
        botao.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            const nome = e.target.dataset.nome;
            // Busca o preço no elemento pai (de forma simplificada)
            const precoTexto = e.target.closest('.produto-card').querySelector('.preco').textContent;
            const preco = parseFloat(precoTexto.replace('R$', '').replace(',', '.').trim());

            const novoItem = {
                id: id,
                nome: nome,
                preco: preco
            };

            carrinho.push(novoItem);
            atualizarCarrinho();
            alert(`${nome} adicionado ao carrinho!`);
        });
    });

    // Adiciona o evento de clique ao botão de finalizar compra
    finalizarCompraBtn.addEventListener('click', () => {
        if (carrinho.length > 0) {
            alert(`Compra finalizada! Total de ${totalCarrinhoSpan.textContent}. Obrigado por comprar na Mega Brinquedos!`);
            // Limpa o carrinho após a compra
            carrinho = [];
            atualizarCarrinho();
        } else {
            alert('Seu carrinho está vazio. Adicione um produto antes de finalizar a compra.');
        }
    });

    // Inicializa o carrinho
    atualizarCarrinho();
});