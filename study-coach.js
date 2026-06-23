const studyInput = document.getElementById("study-input");
const parseBtn = document.getElementById("parse-btn");
const studyError = document.getElementById("study-error");
const studyOutput = document.getElementById("study-output");

const STUDY_KEY = "study-plan";

/* 1. Parse + validate JSON */
function parseStudyPlan(raw) {
  try {
    const data = JSON.parse(raw);

    if (!data.planTitle || !Array.isArray(data.topics)) {
      throw new Error("Invalid study plan format");
    }

    return data;
  } catch {
    throw new Error("Invalid JSON");
  }
}

/* 2. Render UI */
function renderStudyPlan(plan) {
  studyOutput.innerHTML = `
    <h3>${plan.planTitle}</h3>
    <ul>
      ${plan.topics
        .map(
          (t) => `
        <li>
          <b>${t.title}</b> (${t.durationHours}h)
        </li>
      `
        )
        .join("")}
    </ul>
  `;
}

/* 3. Button click */
parseBtn.addEventListener("click", () => {
  try {
    const plan = parseStudyPlan(studyInput.value);
const studyInput = document.getElementById("study-input");
const parseBtn = document.getElementById("parse-btn");
const studyError = document.getElementById("study-error");
const studyOutput = document.getElementById("study-output");

const STUDY_KEY = "study-plan";

/* ---------------------------
   1. HTML escape (security)
----------------------------*/
function escapeHtml(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* ---------------------------
   2. Parse + VALIDATE JSON
----------------------------*/
function parseStudyPlan(raw) {
  if (!raw || raw.trim() === "") {
    throw new Error("Please paste JSON first.");
  }

  let data;

  try {
    data = JSON.parse(raw);
  } catch {
    throw new Error("Invalid JSON format.");
  }

  // Top-level validation
  if (
    typeof data.planTitle !== "string" ||
    !Array.isArray(data.topics) ||
    data.topics.length === 0
  ) {
    throw new Error("Plan must have title and topics array.");
  }

  // Validate each topic
  data.topics.forEach((topic, i) => {
    if (
      typeof topic.title !== "string" ||
      typeof topic.durationHours !== "number"
    ) {
      throw new Error(`Topic ${i + 1} is invalid.`);
    }
  });

  return data;
}

/* ---------------------------
   3. Render UI safely
----------------------------*/
function renderStudyPlan(plan) {
  studyOutput.innerHTML = `
    <div class="plan-card">
      <h3>${escapeHtml(plan.planTitle)}</h3>

      <p>Total Topics: ${plan.topics.length}</p>

      <ul>
        ${plan.topics
          .map(
            (t) => `
          <li>
            <strong>${escapeHtml(t.title)}</strong>
            - ${t.durationHours} hours
          </li>
        `
          )
          .join("")}
      </ul>
    </div>
  `;
}

/* ---------------------------
   4. Save to localStorage
----------------------------*/
function saveStudyPlan(plan) {
  localStorage.setItem(STUDY_KEY, JSON.stringify(plan));
}

/* ---------------------------
   5. Load from localStorage
----------------------------*/
function loadStudyPlan() {
  const saved = localStorage.getItem(STUDY_KEY);
  if (!saved) return;

  try {
    const plan = JSON.parse(saved);
    renderStudyPlan(plan);
  } catch {
    localStorage.removeItem(STUDY_KEY);
  }
}

/* ---------------------------
   6. Button click
----------------------------*/
parseBtn.addEventListener("click", () => {
  try {
    const plan = parseStudyPlan(studyInput.value);

    saveStudyPlan(plan);
    renderStudyPlan(plan);

    studyError.textContent = "";
  } catch (err) {
    studyError.textContent = err.message;
    studyOutput.innerHTML = "";
  }
});

/* ---------------------------
   7. Auto load on refresh
----------------------------*/
document.addEventListener("DOMContentLoaded", loadStudyPlan);
    localStorage.setItem(STUDY_KEY, JSON.stringify(plan));

    renderStudyPlan(plan);

    studyError.textContent = "";
  } catch (err) {
    studyError.textContent = err.message;
  }
});

/* 4. Load saved data on page refresh */
document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem(STUDY_KEY);

  if (saved) {
    renderStudyPlan(JSON.parse(saved));
  }
});