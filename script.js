const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

// Tema
const themeToggle = $('#themeToggle');
const savedTheme = localStorage.getItem('ecobem-theme');
if (savedTheme) document.documentElement.dataset.theme = savedTheme;

themeToggle.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('ecobem-theme', next);
  showToast(next === 'dark' ? 'Modo escuro ativado' : 'Modo claro ativado');
});

// Menu móvel
const menuToggle = $('.menu-toggle');
const mainNav = $('#menu-principal');
menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
$$('.main-nav a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

// Animação de entrada
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
$$('.reveal').forEach(el => revealObserver.observe(el));

// Conteúdos dos modais de orientação
const tips = {
  ergonomia: {
    title: 'Ergonomia: ajuste o que estiver ao seu alcance',
    content: `
      <ul>
        <li>Apoie os pés no chão ou em uma superfície firme.</li>
        <li>Posicione a tela de modo que não seja necessário curvar o pescoço por longos períodos.</li>
        <li>Mantenha teclado, mouse e materiais próximos para evitar alcances repetitivos.</li>
        <li>Alterne postura e posição. Nenhuma posição deve ser mantida por tempo excessivo.</li>
        <li>Se houver dor persistente, procure avaliação profissional.</li>
      </ul>`
  },
  movimento: {
    title: 'Pausas e movimento: interrompa o tempo sentado',
    content: `
      <ul>
        <li>Inclua pequenas mudanças de posição entre blocos de estudo ou trabalho.</li>
        <li>Levante-se, caminhe um pouco ou faça movimentos confortáveis.</li>
        <li>Use alarmes apenas como apoio; adapte a frequência à sua atividade e condição.</li>
        <li>Evite movimentos que provoquem dor, tontura ou desconforto intenso.</li>
      </ul>`
  },
  energia: {
    title: 'Sono, hidratação e energia',
    content: `
      <ul>
        <li>Deixe água acessível e inclua a hidratação na sua rotina.</li>
        <li>Defina um horário realista para encerrar atividades quando possível.</li>
        <li>Evite compensar continuamente o cansaço com excesso de cafeína.</li>
        <li>Observe se a falta de sono está afetando humor, memória ou funcionamento diário.</li>
      </ul>`
  },
  mental: {
    title: 'Saúde mental: atenção aos sinais de sobrecarga',
    content: `
      <ul>
        <li>Divida tarefas grandes em passos menores e priorize o que é essencial.</li>
        <li>Converse com pessoas de confiança quando a pressão estiver aumentando.</li>
        <li>Procure os serviços de apoio da instituição ou um profissional qualificado.</li>
        <li>Este site é educativo e não substitui avaliação ou tratamento profissional.</li>
      </ul>`
  }
};

const tipModal = $('#tipModal');
$$('[data-tip]').forEach(button => button.addEventListener('click', () => {
  const tip = tips[button.dataset.tip];
  $('#tipTitle').textContent = tip.title;
  $('#tipContent').innerHTML = tip.content;
  tipModal.showModal();
}));

// Abertura e fechamento genérico dos modais
$$('[data-open-modal]').forEach(button => button.addEventListener('click', () => {
  const modal = document.getElementById(button.dataset.openModal);
  if (modal) modal.showModal();
}));
$$('.modal-close').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
$$('dialog').forEach(dialog => dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
  if (outside) dialog.close();
}));

// Cronômetro de pausa
const timerDisplay = $('#timerDisplay');
const timerBar = $('#timerBar');
const timerMessage = $('#timerMessage');
const startTimer = $('#startTimer');
const resetTimer = $('#resetTimer');
const totalSeconds = 120;
let secondsLeft = totalSeconds;
let timerId = null;

function updateTimer() {
  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const seconds = String(secondsLeft % 60).padStart(2, '0');
  timerDisplay.textContent = `${minutes}:${seconds}`;
  const progress = ((totalSeconds - secondsLeft) / totalSeconds) * 100;
  timerBar.style.width = `${progress}%`;
}

function finishTimer() {
  clearInterval(timerId);
  timerId = null;
  startTimer.textContent = 'Iniciar novamente';
  timerMessage.textContent = 'Pausa concluída. Perceba como seu corpo está agora.';
  showToast('Pausa concluída ✓');
}

startTimer.addEventListener('click', () => {
  if (secondsLeft === 0) {
    secondsLeft = totalSeconds;
    updateTimer();
  }
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
    startTimer.textContent = 'Continuar';
    timerMessage.textContent = 'Pausa temporariamente interrompida.';
    return;
  }
  startTimer.textContent = 'Pausar';
  timerMessage.textContent = 'Respire devagar, relaxe os ombros e mude de posição.';
  timerId = setInterval(() => {
    secondsLeft -= 1;
    updateTimer();
    if (secondsLeft <= 0) finishTimer();
  }, 1000);
});

resetTimer.addEventListener('click', () => {
  clearInterval(timerId);
  timerId = null;
  secondsLeft = totalSeconds;
  updateTimer();
  startTimer.textContent = 'Iniciar';
  timerMessage.textContent = 'Quando estiver pronto, inicie a pausa.';
});
updateTimer();

// Checklist persistente
const habitInputs = $$('[data-habit]');
const progressValue = $('#progressValue');
const completedCount = $('#completedCount');
const progressCircle = $('#progressCircle');
const savedHabits = JSON.parse(localStorage.getItem('ecobem-habits') || '{}');
habitInputs.forEach(input => {
  input.checked = Boolean(savedHabits[input.dataset.habit]);
  input.addEventListener('change', updateChecklist);
});

function updateChecklist() {
  const state = {};
  habitInputs.forEach(input => state[input.dataset.habit] = input.checked);
  localStorage.setItem('ecobem-habits', JSON.stringify(state));
  const completed = habitInputs.filter(input => input.checked).length;
  const percent = Math.round((completed / habitInputs.length) * 100);
  progressValue.textContent = `${percent}%`;
  completedCount.textContent = `${completed} de ${habitInputs.length}`;
  progressCircle.style.setProperty('--progress', `${percent * 3.6}deg`);
  if (completed === habitInputs.length) showToast('Checklist concluído. Muito bem!');
}
updateChecklist();

$('#clearChecklist').addEventListener('click', () => {
  habitInputs.forEach(input => input.checked = false);
  updateChecklist();
  showToast('Checklist limpo');
});

// Check-in
$('#checkinForm').addEventListener('submit', event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const score = ['q1', 'q2', 'q3', 'q4'].reduce((sum, key) => sum + Number(form.get(key)), 0);
  const result = $('#checkinResult');
  let title;
  let message;
  if (score <= 1) {
    title = 'Sua rotina parece estável neste momento.';
    message = 'Mantenha as pausas, a hidratação e a atenção aos sinais do corpo.';
  } else if (score <= 4) {
    title = 'Vale fazer uma pausa agora.';
    message = 'Mude de posição, hidrate-se e reduza a próxima tarefa a um passo simples.';
  } else {
    title = 'Há sinais de sobrecarga.';
    message = 'Interrompa a atividade se for seguro, procure apoio e considere conversar com um profissional ou serviço de saúde.';
  }
  result.innerHTML = `<strong>${title}</strong><p>${message}</p><small>Resultado educativo, sem finalidade diagnóstica.</small>`;
  result.hidden = false;
  result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// Plano semanal
const planInputs = $$('#planForm input[name="plan"]');
planInputs.forEach(input => input.addEventListener('change', () => {
  const selected = planInputs.filter(item => item.checked);
  if (selected.length > 3) {
    input.checked = false;
    showToast('Escolha no máximo três compromissos');
  }
}));

$('#planForm').addEventListener('submit', event => {
  event.preventDefault();
  const selected = planInputs.filter(item => item.checked).map(item => item.value);
  const result = $('#planResult');
  if (selected.length === 0) {
    showToast('Escolha pelo menos um compromisso');
    return;
  }
  localStorage.setItem('ecobem-plan', JSON.stringify(selected));
  result.innerHTML = `<strong>Seu plano foi salvo neste dispositivo:</strong><ul>${selected.map(item => `<li>${item}</li>`).join('')}</ul>`;
  result.hidden = false;
  showToast('Plano semanal salvo');
});

const savedPlan = JSON.parse(localStorage.getItem('ecobem-plan') || '[]');
planInputs.forEach(input => input.checked = savedPlan.includes(input.value));

// Toast
let toastTimeout;
function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 2400);
}
