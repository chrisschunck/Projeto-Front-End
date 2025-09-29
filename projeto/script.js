const container = document.getElementById("produtos");
const form = document.getElementById("form-filtro");

const produtos = [
  {id: 1, nome: "Sistema Integrado", preco: 500.00, categoria: "Software", disponibilidade: true, imagem: "https://cdn-icons-png.flaticon.com/512/1434/1434711.png"},
  {id: 2, nome: "Placa de Video", preco: 1100.00, categoria: "Hardware", disponibilidade: false, imagem: "https://cdn-icons-png.flaticon.com/512/2000/2000469.png"},
  {id: 3, nome: "Processador", preco: 900.00, categoria: "Hardware", disponibilidade: false, imagem: "https://cdn-icons-png.flaticon.com/512/483/483159.png"},
  {id: 4, nome: "Memoria RAM", preco: 400.00, categoria: "Hardware", disponibilidade: true, imagem: "https://cdn-icons-png.flaticon.com/512/5382/5382149.png"}
];

function criarElementoProduto(produto) {
  const card = document.createElement("div");
  card.className = "produto";
  card.innerHTML = `
    <img src="${produto.imagem}" alt="${produto.nome}" style="max-width:100px;max-height:100px;"/>
    <h3>${produto.nome}</h3>
    <p>Preço: R$ ${produto.preco}</p>
    <p>Categoria: ${produto.categoria}</p>
    <p>${produto.disponibilidade ? "Disponível" : "Indisponível"}</p>
  `;
  return card;
}

function listarProdutos(produtosParaListar) {
  const container = document.getElementById("produtos");
  container.innerHTML = "";
  produtosParaListar.forEach(produto => {
    container.appendChild(criarElementoProduto(produto));
  });
}

function filtrarProdutos(event) {
  event.preventDefault();
  const categoria = document.getElementById("categoria").value;
  const somenteDisponiveis = document.getElementById("disponiveis").checked;

  const filtrados = produtos.filter(produto => {
    const categoriaOk = categoria === "todas" || produto.categoria === categoria;
    const disponibilidadeOk = !somenteDisponiveis || produto.disponibilidade;
    return categoriaOk && disponibilidadeOk;
  });

  listarProdutos(filtrados);
}


document.getElementById("form-filtro").addEventListener("submit", filtrarProdutos); 
// Exibe os produtos ao carregar a página
listarProdutos(produtos);

document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById("themeToggle");
  const body = document.body;
  // Aplica tema salvo ou padrão do sistema
  const saved = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(saved);

  function applyTheme(theme) {
    if (theme === 'dark') {
      body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      if (themeToggleBtn) themeToggleBtn.innerHTML = '☀️';
    } else {
      body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      if (themeToggleBtn) themeToggleBtn.innerHTML = '🌙';
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const cur = body.classList.contains('dark') ? 'dark' : 'light';
      applyTheme(cur === 'dark' ? 'light' : 'dark');
    });
  }
});