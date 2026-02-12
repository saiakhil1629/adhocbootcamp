// 1) Paste your Apps Script Web App URL here:
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwI2L4eMilM2TOp2h3eN9yw_8D0seRSebHWR_o7XCor-LwdVLBToGCLIwzlBD7KOM2G/exec";

// 2) Your problem statements (UNCHANGED)
const PROBLEM_STATEMENTS = [
  "Student Performance Analysis: Analyze student grades to find correlations between study hours and final scores.",
  "Sales Data Dashboard: Use a sample retail dataset to identify best-selling products and peak sales months.",
  "Movie Rating Analysis: Analyze IMDB/Netflix datasets to find highest-rated genres over the last decade.",
  "Weather Trends Analysis: Visualize temperature changes in your city over the past 5 years using historical data.",
  "E-commerce Product Review Sentiment: Basic text analysis to label reviews as Positive/Negative/Neutral.",
  "IPL Cricket Statistics: Analyze player performance and team win rates across IPL seasons.",
  "COVID-19 Vaccination Progress: Track vaccination rates and visualize trends.",
  "Hospitality Industry Analysis: Analyze hotel booking data for cancellation patterns and seasonal demand.",
  "Stock Market Performance: Use historical stock data and calculate moving averages.",
  "Zomato Restaurant Analysis: Find popular cuisines and average costs in specific urban areas.",
  "HR Analytics: Analyze employee turnover data and factors affecting attrition.",
  "Azure Cloud Usage Analysis: Analyze cloud usage logs and suggest cost-saving measures.",
  "Customer Segmentation: Use K-Means to group customers based on spending habits.",
  "Credit Card Fraud Detection: Analyze transactions to identify fraud patterns.",
  "Real Estate Price Prediction: Study how location, size, and age affect property prices.",
  "Attendance Tracker Insights: Analyze attendance data to find low-attendance days and patterns by subject.",
  "Library Book Issue Analysis: Identify most issued books, peak borrowing months, and student borrowing trends.",
  "Canteen Sales Analysis: Find top-selling items, busiest hours, and weekly trends from billing data.",
  "Campus Event Feedback Analysis: Analyze survey ratings/comments to summarize satisfaction and key issues.",
  "Bus/Transport Route Analysis: Analyze pickup/drop timings to find delays and optimize routes.",
  "YouTube/Instagram Engagement Analysis: Compare likes/comments/views across posts and find best posting time.",
  "Electricity Usage Analysis: Analyze hostel/classroom electricity usage and identify peak consumption time.",
  "Water Consumption Monitoring: Track daily water usage and detect abnormal spikes.",
  "Exam Timetable Clash Checker: Detect overlapping exams using a timetable dataset and generate a clean schedule.",
  "Placement Tracker Dashboard: Analyze placement data (company, package, skills) to find top skills and outcomes.",
  "Mobile App Ratings Analysis: Analyze Play Store dataset to find factors affecting ratings (category, size, reviews).",
  "Simple Loan Eligibility EDA: Explore loan datasets to find patterns in approval vs income/credit history.",
  "Traffic Accident EDA: Analyze accident dataset to find hotspots, time-of-day risk, and common causes."
];

// ===== Members fields (Member 2..6) NOW include Gmail + Phone =====
const membersWrap = document.getElementById("membersWrap");
for (let i = 2; i <= 6; i++) {
  const div = document.createElement("div");
  div.className = "memberCard";
  div.innerHTML = `
    <h3>Member ${i}</h3>
    <div class="memberGrid">
      <div class="field">
        <label for="m${i}Name">Name</label>
        <input id="m${i}Name" type="text" required />
      </div>
      <div class="field">
        <label for="m${i}Roll">Roll No</label>
        <input id="m${i}Roll" type="text" required />
      </div>
      <div class="field">
        <label for="m${i}Gmail">Gmail</label>
        <input id="m${i}Gmail" type="email" placeholder="name@gmail.com" required />
      </div>
      <div class="field">
        <label for="m${i}Phone">Phone</label>
        <input id="m${i}Phone" type="tel" placeholder="10-digit number" required />
      </div>
    </div>
  `;
  membersWrap.appendChild(div);
}

// ===== Populate problem statement dropdown =====
const ps = document.getElementById("problemStatement");
ps.innerHTML = `<option value="" selected disabled>Select a problem statement</option>`;
PROBLEM_STATEMENTS.forEach((p) => {
  const opt = document.createElement("option");
  opt.value = p;
  opt.textContent = p;
  ps.appendChild(opt);
});

// Always keep Other as last option
const otherOpt = document.createElement("option");
otherOpt.value = "__OTHER__";
otherOpt.textContent = "Other (Write your own at the bottom)";
ps.appendChild(otherOpt);

const otherWrap = document.getElementById("otherProblemWrap");
const otherTxt = document.getElementById("otherProblem");

ps.addEventListener("change", () => {
  const isOther = ps.value === "__OTHER__";
  otherWrap.classList.toggle("hidden", !isOther);
  otherTxt.required = isOther;
  if (!isOther) otherTxt.value = "";
});

function setStatus(msg, type = "info") {
  const el = document.getElementById("status");
  el.textContent = msg;
  el.style.color =
    type === "ok" ? "var(--ok)" :
    type === "error" ? "var(--danger)" :
    "var(--muted)";
}

function isValidPhone(phone) {
  return /^[0-9]{10}$/.test(phone.trim());
}

function isValidGmail(email) {
  const e = (email || "").trim().toLowerCase();
  // If you want ANY email, replace this with a normal email regex.
  return /^[a-z0-9._%+-]+@gmail\.com$/.test(e);
}

document.getElementById("teamForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes("PASTE_")) {
    setStatus("Error: Apps Script URL is not set in script.js", "error");
    return;
  }

  const collegeName = document.getElementById("collegeName").value.trim();
  const branchName = document.getElementById("branchName").value.trim();
  const section = document.getElementById("section").value.trim();
  const teamName = document.getElementById("teamName").value.trim();

  const lead = {
    name: document.getElementById("leadName").value.trim(),
    roll: document.getElementById("leadRoll").value.trim(),
    gmail: document.getElementById("leadGmail").value.trim(),
    phone: document.getElementById("leadPhone").value.trim()
  };

  if (!isValidGmail(lead.gmail)) {
    setStatus("Please enter a valid Gmail address (example@gmail.com).", "error");
    return;
  }
  if (!isValidPhone(lead.phone)) {
    setStatus("Please enter a valid 10-digit phone number.", "error");
    return;
  }

  const members = [];
  for (let i = 2; i <= 6; i++) {
    const m = {
      name: document.getElementById(`m${i}Name`).value.trim(),
      roll: document.getElementById(`m${i}Roll`).value.trim(),
      gmail: document.getElementById(`m${i}Gmail`).value.trim(),
      phone: document.getElementById(`m${i}Phone`).value.trim()
    };

    if (!isValidGmail(m.gmail)) {
      setStatus(`Member ${i}: Please enter a valid Gmail address.`, "error");
      return;
    }
    if (!isValidPhone(m.phone)) {
      setStatus(`Member ${i}: Please enter a valid 10-digit phone number.`, "error");
      return;
    }

    members.push(m);
  }

  const problemStatement = ps.value;
  const otherProblem = (problemStatement === "__OTHER__") ? otherTxt.value.trim() : "";

  if (problemStatement === "__OTHER__" && !otherProblem) {
    setStatus("Please write your custom problem statement in the Other box.", "error");
    return;
  }

  // Prevent duplicate roll numbers inside team
  const rolls = [lead.roll, ...members.map(m => m.roll)].map(r => r.toLowerCase());
  const unique = new Set(rolls);
  if (unique.size !== rolls.length) {
    setStatus("Duplicate roll numbers found. Please ensure all roll numbers are unique.", "error");
    return;
  }

  const payload = {
    collegeName,
    branchName,
    section,
    teamName,
    problemStatement: (problemStatement === "__OTHER__") ? "Other" : problemStatement,
    otherProblem,
    lead,
    members
  };

  const submitBtn = document.getElementById("submitBtn");
  submitBtn.disabled = true;
  setStatus("Submitting... Please wait.", "info");

  try {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });

    const data = await res.json().catch(() => ({}));
    if (data.ok) {
      setStatus("Submitted successfully. Thank you!", "ok");
      e.target.reset();
      otherWrap.classList.add("hidden");
    } else {
      setStatus(data.message || "Submit failed. Please try again or contact coordinator.", "error");
      console.error(data);
    }
  } catch (err) {
    console.error(err);
    setStatus("Network error while submitting. Try again.", "error");
  } finally {
    submitBtn.disabled = false;
  }
});

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  const MIN_LOADING_TIME = 5000;
  setTimeout(() => preloader.classList.add("hide"), MIN_LOADING_TIME);
});
