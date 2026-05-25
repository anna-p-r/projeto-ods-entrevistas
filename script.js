const conteudosModal = {
  autoconhecimento: {
    titulo: "Autoconhecimento profissional",
    html: `
      <p>Autoconhecimento profissional é entender quem você é no mercado de trabalho: suas qualidades, dificuldades, experiências, interesses e objetivos.</p>
      <p>Antes de uma entrevista, isso ajuda o candidato a responder com mais segurança perguntas como “fale sobre você”, “quais são seus pontos fortes?” e “qual é seu ponto de melhoria?”.</p>

      <h3>O que a pessoa pode refletir?</h3>
      <ul>
        <li>Quais atividades eu faço bem?</li>
        <li>Quais habilidades eu já desenvolvi na escola, faculdade, cursos, trabalho ou vida pessoal?</li>
        <li>Quais pontos eu preciso melhorar?</li>
        <li>Que tipo de vaga combina com meu perfil?</li>
        <li>Qual objetivo profissional eu quero alcançar?</li>
      </ul>

      <h3>Exemplo de resposta</h3>
      <p>“Sou uma pessoa organizada, comunicativa e tenho facilidade para aprender. Busco minha primeira oportunidade na área administrativa para desenvolver minhas habilidades e contribuir com responsabilidade para a empresa.”</p>
    `
  },

  curriculo: {
    titulo: "Currículo e apresentação pessoal",
    html: `
      <p>O currículo é o primeiro contato entre o candidato e a empresa. Ele deve ser claro, organizado e adaptado para a vaga desejada.</p>
      <p>Na entrevista, o candidato precisa saber explicar as informações do próprio currículo de forma simples e objetiva.</p>

      <div class="exemplo-curriculo">
        <h3>Exemplo de currículo simples</h3>
        <p><strong>Nome:</strong> Ana Souza</p>
        <p><strong>Objetivo:</strong> Atuar como auxiliar administrativo.</p>
        <p><strong>Formação:</strong> Ensino Médio completo | Curso de Informática Básica</p>
        <p><strong>Experiências:</strong> Atendimento ao público em projeto escolar e organização de documentos em atividade voluntária.</p>
        <p><strong>Habilidades:</strong> Comunicação, organização, pontualidade, pacote Office básico e trabalho em equipe.</p>
        <p><strong>Contato:</strong> telefone, e-mail e cidade.</p>
      </div>

      <h3>Dicas importantes</h3>
      <ul>
        <li>Evitar textos muito longos.</li>
        <li>Não colocar informações falsas.</li>
        <li>Destacar cursos, experiências e habilidades relacionadas à vaga.</li>
        <li>Revisar erros de português antes de enviar.</li>
      </ul>
    `
  },

  empresa: {
    titulo: "Pesquisa sobre a empresa",
    html: `
      <p>Pesquisar sobre a empresa mostra interesse, preparo e profissionalismo. Isso ajuda o candidato a entender melhor a vaga e responder por que deseja trabalhar naquele local.</p>

      <h3>O que pesquisar antes da entrevista?</h3>
      <ul>
        <li>Nome da empresa e área de atuação.</li>
        <li>Produtos ou serviços oferecidos.</li>
        <li>Missão, visão e valores.</li>
        <li>Cultura organizacional e forma de atendimento ao público.</li>
        <li>Requisitos da vaga anunciada.</li>
        <li>Local de trabalho, horário e tipo de contratação.</li>
        <li>Redes sociais, site oficial e notícias recentes.</li>
      </ul>

      <h3>Exemplo de resposta</h3>
      <p>“Tenho interesse nessa vaga porque pesquisei sobre a empresa e vi que ela valoriza atendimento de qualidade e trabalho em equipe. Acredito que minhas habilidades de comunicação podem contribuir com esse objetivo.”</p>
    `
  },

  comunicacao: {
    titulo: "Comunicação e comportamento",
    html: `
      <p>Comunicação e comportamento envolvem a forma como o candidato fala, escuta, se apresenta e age durante a entrevista.</p>
      <p>O recrutador observa não apenas as respostas, mas também postura, clareza, educação, pontualidade e interesse pela vaga.</p>

      <h3>Boas práticas</h3>
      <ul>
        <li>Chegar no horário combinado.</li>
        <li>Usar uma linguagem clara e respeitosa.</li>
        <li>Evitar gírias em excesso.</li>
        <li>Ouvir a pergunta até o final antes de responder.</li>
        <li>Manter postura adequada e contato visual natural.</li>
        <li>Usar roupa compatível com o ambiente da empresa.</li>
        <li>Demonstrar interesse pela vaga e pela organização.</li>
      </ul>

      <h3>Exemplo prático</h3>
      <p>Em vez de responder apenas “sim” ou “não”, o candidato pode explicar brevemente sua resposta e trazer um exemplo real de experiência, estudo ou situação vivida.</p>
    `
  },

  simulacao: {
    titulo: "Simulação de entrevista",
    html: `
      <p>A simulação de entrevista é um treino para que o candidato pratique respostas, controle o nervosismo e melhore sua comunicação antes do processo seletivo real.</p>

      <h3>O que o entrevistador busca?</h3>
      <ul>
        <li>Entender se o candidato possui perfil compatível com a vaga.</li>
        <li>Verificar habilidades técnicas e comportamentais.</li>
        <li>Avaliar comunicação, postura e maturidade profissional.</li>
        <li>Perceber se a pessoa pesquisou sobre a empresa.</li>
        <li>Identificar interesse, responsabilidade e vontade de aprender.</li>
        <li>Confirmar se as informações do currículo fazem sentido.</li>
      </ul>

      <h3>Perguntas para treinar</h3>
      <ul>
        <li>Fale sobre você.</li>
        <li>Por que você quer trabalhar nesta empresa?</li>
        <li>Quais são seus pontos fortes?</li>
        <li>Qual ponto você precisa desenvolver?</li>
        <li>Conte uma situação em que você precisou resolver um problema.</li>
      </ul>
    `
  }
};

const modal = document.getElementById("modalTrilha");
const modalTitulo = document.getElementById("modalTitulo");
const modalConteudo = document.getElementById("modalConteudo");
const botaoFechar = document.querySelector(".modal-fechar");
const botoesTrilha = document.querySelectorAll("[data-modal]");

function abrirModal(chave) {
  const conteudo = conteudosModal[chave];

  if (!conteudo) return;

  modalTitulo.textContent = conteudo.titulo;
  modalConteudo.innerHTML = conteudo.html;
  modal.classList.add("ativo");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-aberto");
  botaoFechar.focus();
}

function fecharModal() {
  modal.classList.remove("ativo");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-aberto");
}

botoesTrilha.forEach((botao) => {
  botao.addEventListener("click", () => {
    abrirModal(botao.dataset.modal);
  });
});

botaoFechar.addEventListener("click", fecharModal);

modal.addEventListener("click", (evento) => {
  if (evento.target === modal) {
    fecharModal();
  }
});

document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape" && modal.classList.contains("ativo")) {
    fecharModal();
  }
});
