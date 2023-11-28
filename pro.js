function iniciarNovaLista() {
    
    window.location.href = 'itens.html';
  };

  function adicionarItem() {
    var produtoInput = document.getElementById("inputProduto");
    var valorInput = document.getElementById("inputValor");
  
    var produto = produtoInput.value.toUpperCase(); // Converter para maiúsculas
    var valor = valorInput.value.replace(/[^0-9,]/g, ''); // Remover caracteres não numéricos, exceto vírgula
  
    if (produto.trim() === "" || valor.trim() === "") {
      alert("Por favor, preencha todos os campos.");
      return;
    }
  
    var listItem = document.createElement("a");
    listItem.href = "#";
    listItem.className = "list-group-item list-group-item-action";
    listItem.innerHTML = produto + " - R$" + valor;
  
    listItem.onclick = function(event) {
      event.preventDefault();
  
      // Exibir mensagem de confirmação
      var confirmacao = window.confirm("Deseja remover este item?");
      if (confirmacao) {
        listItem.remove();
        atualizarTotal(); // Atualizar o total após remover um item
        atualizarEstadoBotao(); // Atualizar o estado do botão após remover um item
      }
    };
  
    document.getElementById("listaItens").appendChild(listItem);
    atualizarTotal(); // Atualizar o total após adicionar um item
    atualizarEstadoBotao(); // Atualizar o estado do botão após adicionar um item
  
    produtoInput.value = "";
    valorInput.value = "";
  }
  
  function atualizarEstadoBotao() {
    var btnDark = document.getElementById("btnFinalizaCompra");
    var listaItens = document.getElementById("listaItens");
  
    // Habilitar o botão se houver pelo menos um item na lista, caso contrário, desabilitar
    btnDark.disabled = listaItens.children.length === 0;
  }
  

  function atualizarTotal() {
    var itens = document.getElementsByClassName("list-group-item");
    var total = 0;

    for (var i = 0; i < itens.length; i++) {
      var textoItem = itens[i].innerText;
      var valorItem = parseFloat(textoItem.split(" - R$")[1].replace(",", "."));

      if (!isNaN(valorItem)) {
        total += valorItem;
      }
    }

    // Exibir o total abaixo da última lista de itens
    var totalContainer = document.getElementById("totalContainer");
    var totalElement = document.getElementById("total");
    totalElement.innerText = "R$ " + total.toFixed(2);
  }