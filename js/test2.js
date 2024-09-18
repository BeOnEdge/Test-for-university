// Test
//=================

// Создание основного блока
const stbl_main = `
<form class="test_form-name">
  Фамилия: <input type="text" id="famil" value="">
</form>
<div id="tbl_main">
  <div class="question-block">
    <div class="question-block__item">Очки: <span id="res">0</span></div>
    <div class="question-block__item">Ответы: <span id="anss"></span></div>
    <div class="question-block__item"><span id="time"></span></div>
  </div>
  <form>
    <div class="task-block">
      <div id="cond" class="task-block__question"></div>
      <div class="question-block__item">Выберете вариант ответа:</div>
      <div class="task-block__answers">
        ${Array.from(
          { length: 10 },
          (_, i) =>
            `<button type="button" onClick="test(${i})" id="ans${i}">Answ ${i}</button>`
        ).join("\n")}
      </div>
    </div>
  </form>
</div>
<div id="tbl_res" style="display: none;">
  Результаты работы:
  <div class="result-block">
    <div class="result-block__item">Вопросов: <span id="nquest1">0</span></div>
    <div class="result-block__item">Очков: <span id="res1">0</span></div>
    <div class="result-block__item">Верных ответов: <span id="corr1"></span></div>
    <div class="result-block__item">Ошибочных ответов: <span id="wrong"></span></div>
    <div class="result-block__item">Затрачено времени: <span id="time1"></span></div>
  </div>
  <div id="picture" align="left"></div>
</div>`;

let maxAns = 10;
let all_tsk = [];
let gand = -1;
let na = -1;

const TST_TIME = 120;
const Ftime = new Date();
const time0 = Math.floor(Date.now() / 1000);
let res = 0;
let nq = 0;
let nv = 0;
let last_res = " ";
let last_q = "";
let last_a = "";

//=================
const rnd = (k) => Math.floor(Math.random() * k);

const add_tsk = (...args) => all_tsk.push(args);

const add_tsr = (...args) => {
  const shuffled = [args[0], ...args.slice(1).sort(() => 0.5 - Math.random())];
  all_tsk.push(shuffled);
};

const random_task = () => quest(all_tsk[rnd(all_tsk.length)]);

//=================
function quest(tsk) {
  document.getElementById("last_qw").style.display = "none";
  if (nq > 0) document.getElementById("famil").disabled = true;

  document.getElementById("last_q").innerHTML = last_q;
  document.getElementById("last_a").innerHTML = last_a;

  nq++;
  document.getElementById("nquest").textContent = ` ${nq} / ${MAX_nq}`;

  document.getElementById("anss").innerHTML =
    last_res === "+"
      ? '<font color="#0052A5" size="5"><b>+</b></font>'
      : '<font color="red" size="5"><b>-</b></font>';
  document.getElementById("res").textContent = ` ${res}`;
  const sec_rm = TST_TIME - (Math.floor(Date.now() / 1000) - time0);
  document.getElementById(
    "time"
  ).textContent = ` Всего задач: ${all_tsk.length}`;
  document.getElementById("cond").innerHTML = `Задача: ${tsk[0]}`;
  last_q = tsk[0];
  na = tsk.length;

  for (let i = 1; i < na; i++) {
    let s = tsk[i];
    if (s.startsWith("!")) {
      s = s.slice(1);
      gand = i - 1;
      last_a = s;
    }
    document.getElementById(`ans${i - 1}`).textContent = s;
  }

  // Очищение остальных кнопок!!!
  for (let i = na; i <= maxAns; i++) {
    document.getElementById(`ans${i - 1}`).style.display = "none";
  }

  //   MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
}

//=================
function result() {
  document.getElementById("tbl_main").style.display = "none";
  document.getElementById("tbl_res").style.display = "block";

  document.getElementById("nquest1").textContent = MAX_nq;
  document.getElementById("res1").textContent = ` ${res}`;
  document.getElementById("corr1").textContent = nv;
  document.getElementById("wrong").textContent = MAX_nq - nv;

  const sec_rm = Math.floor(Date.now() / 1000) - time0;
  document.getElementById(
    "time1"
  ).textContent = ` ${sec_rm} сек., начало ${Ftime.getHours()}:${Ftime.getMinutes()}`;

  const minOk = MAX_nq * 2 - 11;
  document.getElementById("picture").innerHTML =
    res > minOk
    ? '<div style="color:#239704; font-size: 20px; margin-top: 30px">Вы прошли тест!</div>'
    : '<div style="color:#FF0000; font-size: 20px; margin-top: 30px">Вы не прошли тест!</div>';

  res = 0;
  nq = 0;
  nv = 0;
  last_res = " ";
  last_q = "";
  last_a = "";
}

//=================
function test(k) {
  if (k + 1 >= na) return;

  if (k === gand) {
    nv++;
    res += 2;
    last_res = "+";
  } else {
    res = Math.max(0, res - 3);
    last_res = "-";
  }

  if (nq < MAX_nq) random_task();
  else result();
}

//=================
function displ(ddd) {
  const elem = document.getElementById(ddd);
  elem.style.display = elem.style.display === "none" ? "block" : "none";
}

//-----------------------------
const rnd_1pos = () => {
  const positions = [
    "0.2",
    "0.7",
    "1.7",
    "1.9",
    "2.4",
    "3.3",
    "3.7",
    "4.0",
    "5.2",
    "6.3",
  ];
  return positions[rnd(positions.length)];
};
