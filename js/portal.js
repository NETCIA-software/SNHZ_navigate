'use strict';
// Update destinations on the anchors in html/index.html when services move.
const cards = [...document.querySelectorAll('.agent-card')];
const search = document.querySelector('#search');
const filters = [...document.querySelectorAll('[data-filter]')];
let category = 'all';
function filterCards() {
  const query = search.value.trim().toLocaleLowerCase();
  let count = 0;
  cards.forEach((card) => {
    card.hidden =
      !(category === 'all' || card.dataset.category === category) ||
      !card.textContent.toLocaleLowerCase().includes(query);
    if (!card.hidden) count++;
  });
  document.querySelector('#results').textContent = `共 ${count} 个智能体`;
  document.querySelector('#empty').hidden = count !== 0;
}
search.addEventListener('input', filterCards);
filters.forEach((button) =>
  button.addEventListener('click', () => {
    category = button.dataset.filter;
    filters.forEach((item) => {
      item.classList.toggle('selected', item === button);
      item.setAttribute('aria-pressed', String(item === button));
    });
    filterCards();
  }),
);
document.querySelector('#reset').addEventListener('click', () => {
  search.value = '';
  filters[0].click();
  search.focus();
});
const key = 'snhz.recent.v1';
const links = [...document.querySelectorAll('.agent-link')];
let history = [];
try {
  const saved = JSON.parse(localStorage.getItem(key) || '[]');
  if (Array.isArray(saved))
    history = saved
      .filter(
        (item) =>
          item &&
          links.some((link) => link.dataset.agent === item.id) &&
          Number.isFinite(item.at),
      )
      .slice(0, 3);
} catch {
  /* Storage may be unavailable. */
}
function renderHistory() {
  const list = document.querySelector('#recent-list');
  list.replaceChildren();
  document.querySelector('#clear-history').hidden = history.length === 0;
  if (!history.length) {
    const empty = document.createElement('p');
    empty.className = 'empty-copy';
    empty.textContent = '暂无访问记录。选择一个智能体，开始您的农业任务。';
    list.append(empty);
  }
  history.forEach((item) => {
    const original = links.find((link) => link.dataset.agent === item.id);
    const row = document.createElement('div');
    row.className = 'recent-row';
    const name = document.createElement('strong');
    name.textContent = original
      .closest('article')
      .querySelector('h3').textContent;
    const time = document.createElement('time');
    time.dateTime = new Date(item.at).toISOString();
    time.textContent = new Date(item.at).toLocaleString('zh-CN');
    const link = original.cloneNode(false);
    link.className = '';
    link.textContent = '再次进入 ↗';
    link.setAttribute('aria-label', `再次进入${name.textContent}（新窗口）`);
    link.addEventListener('click', () => visit(item.id));
    row.append(name, time, link);
    list.append(row);
  });
}
function saveHistory() {
  try {
    localStorage.setItem(key, JSON.stringify(history));
  } catch {
    /* Keep navigation usable without browser storage. */
  }
  renderHistory();
}
function visit(id) {
  history = [
    { id, at: Date.now() },
    ...history.filter((item) => item.id !== id),
  ].slice(0, 3);
  saveHistory();
}
links.forEach((link) =>
  link.addEventListener('click', () => visit(link.dataset.agent)),
);
document.querySelector('#clear-history').addEventListener('click', () => {
  history = [];
  saveHistory();
});
renderHistory();
