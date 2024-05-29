document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('form-adicionar');
    const listaPedidos = document.getElementById('lista-pedidos');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const cliente = document.getElementById('cliente').value;
        const produtoSelecionado = document.getElementById('produto').value;
        const quantidade = document.getElementById('quantidade').value;

        const preco = calcularPreco(produtoSelecionado, quantidade);
        const dataHora = new Date().toLocaleString();

        adicionarPedido(cliente, produtoSelecionado, quantidade, preco, dataHora);
        form.reset();
    });

    function calcularPreco(produto, quantidade) {
        let precoUnitario = 0;

        switch (produto) {
            case 'produto1':
                precoUnitario = 10.00;
                break;
            case 'produto2':
                precoUnitario = 20.00;
                break;
        }

        return precoUnitario * quantidade;
    }

    function adicionarPedido(cliente, produto, quantidade, preco, dataHora) {
        const novaLinha = document.createElement('tr');
        novaLinha.innerHTML = `
            <td>${cliente}</td>
            <td>${produto}</td>
            <td>${quantidade}</td>
            <td>R$ ${preco.toFixed(2)}</td>
            <td>${dataHora}</td>
            <td>
                <button class="action-btn delete-btn" onclick="excluirPedido(this)">Excluir</button>
                <button class="action-btn print-btn" onclick="imprimirPedido(this)">Imprimir</button>
            </td>
        `;
        listaPedidos.appendChild(novaLinha);
    }

    window.excluirPedido = function (botao) {
        const linha = botao.parentNode.parentNode;
        linha.remove();
    };

    window.imprimirPedido = function (botao) {
        const linha = botao.parentNode.parentNode;
        const cliente = linha.children[0].textContent;
        const produto = linha.children[1].textContent;
        const quantidade = linha.children[2].textContent;
        const preco = linha.children[3].textContent;
        const dataHora = linha.children[4].textContent;

        const pedido = `
            <div>
                <h2>Pedido</h2>
                <p><strong>Cliente:</strong> ${cliente}</p>
                <p><strong>Produto:</strong> ${produto}</p>
                <p><strong>Quantidade:</strong> ${quantidade}</p>
                <p><strong>Preço:</strong> ${preco}</p>
                <p><strong>Data e Hora:</strong> ${dataHora}</p>
            </div>
        `;

        const printWindow = window.open('', '', 'width=600,height=400');
        printWindow.document.write('<html><head><title>Imprimir Pedido</title></head><body>');
        printWindow.document.write(pedido);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    };

    const quantidadeInput = document.getElementById('quantidade');
    quantidadeInput.addEventListener('change', function () {
        const produtoSelecionado = document.getElementById('produto').value;
        const quantidade = quantidadeInput.value;

        const preco = calcularPreco(produtoSelecionado, quantidade);
        const precoElement = document.getElementById('preco');
        precoElement.value = preco.toFixed(2);
    });

    const produtoSelect = document.getElementById('produto');
    produtoSelect.addEventListener('change', function () {
        const produtoSelecionado = produtoSelect.value;
        const quantidade = quantidadeInput.value;

        const preco = calcularPreco(produtoSelecionado, quantidade);
        const precoElement = document.getElementById('preco');
        precoElement.value = preco.toFixed(2);
    });
});

