function calcularMudanca() {
  const checkboxes = document.querySelectorAll('input[name="item"]:checked');
  let itensSelecionados = [];
  let volumeTotal = 0;

  checkboxes.forEach(item => {
    const nome = item.value;
    const volume = parseFloat(item.getAttribute("data-volume"));
    itensSelecionados.push(nome);
    volumeTotal += volume;
  });

  const resultado = document.getElementById("resultado");

  if (itensSelecionados.length === 0) {
    resultado.innerHTML = "<p style='color:red;'>Por favor, selecione ao menos um item.</p>";
    return;
  }

  resultado.innerHTML = `
    <h3>Itens Selecionados:</h3>
    <ul>${itensSelecionados.map(item => `<li>${item}</li>`).join('')}</ul>
    <p><strong>Volume estimado:</strong> ${volumeTotal.toFixed(2)} m³</p>
  `;
}

function enviarWhatsApp() {
  const nome = document.getElementById("nomeCliente").value.trim();
  const data = document.getElementById("dataMudanca").value;
  const origem = document.getElementById("bairroOrigem").value.trim();
  const destino = document.getElementById("bairroDestino").value.trim();
  const orcamento = document.getElementById("orcamento").value;
  const whatsCliente = document.getElementById("whatsCliente").value.replace(/\D/g, '');

  const checkboxes = document.querySelectorAll('input[name="item"]:checked');
  let itensSelecionados = [];
  let volumeTotal = 0;

  checkboxes.forEach(item => {
    const nomeItem = item.value;
    const volume = parseFloat(item.getAttribute("data-volume"));
    itensSelecionados.push(nomeItem);
    volumeTotal += volume;
  });

  if (!nome || !data || !origem || !destino || !orcamento || !whatsCliente || itensSelecionados.length === 0) {
    alert("Por favor, preencha todos os campos e selecione ao menos um item.");
    return;
  }

  const mensagem = `Olá ${nome}, aqui está o orçamento da sua mudança:\n\n📦 *Itens selecionados:*\n${itensSelecionados.map(i => "- " + i).join('\n')}\n\n📐 *Volume estimado:* ${volumeTotal.toFixed(2)} m³\n📅 *Data da mudança:* ${data}\n🏠 *Origem:* ${origem}\n🏡 *Destino:* ${destino}\n💰 *Orçamento estimado:* R$ ${parseFloat(orcamento).toFixed(2)}`;

  // Enviar para o WhatsApp do cliente
  const link = `https://wa.me/55${whatsCliente}?text=${encodeURIComponent(mensagem)}`;
  window.open(link, '_blank');
}
