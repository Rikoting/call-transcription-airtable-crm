// code1_final.js
// Final enriched and cleaned transcription processor (v1.1)
const parsed = $json.output || $json;
const now = new Date();
const raw = $node["Transcribe a recording *whisper*"].json.text || "";

// Timestamp (PH format)
const timestamp = now.toLocaleString("en-PH", {
  timeZone: "Asia/Manila",
  year: "numeric",
  month: "short",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit"
});

// Email correction
let email = parsed.email?.trim() || "";
if (!email.includes("@")) {
  const rawMatch = raw.match(/\b[\w.-]+(?:@|\s+at\s+)?[\w.-]+\.\w+\b/i);
  if (rawMatch) {
    email = rawMatch[0].replace(/\s+at\s+/i, "@").replace(/\s+/g, "");
    if (!email.includes("@") && email.includes(".")) {
      const parts = email.split(".");
      if (parts.length >= 2) {
        email = parts[0] + "@" + parts.slice(1).join(".");
      }
    }
  }
}
const emailValid = /^[^@]+@[^@]+\.[^@]+$/.test(email);

// Phone
let phone = parsed.phone || "";
phone = phone.replace(/\D+/g, "");

// Role title
let roleTitle = parsed.roleTitle?.trim() || "Unknown";

// Project fallback
let project = parsed.project?.trim();
if (!project) {
  const sourceText = `${parsed.actionrequest || ""} ${parsed.inquiry || ""} ${parsed.summary || ""}`;
  const match = sourceText.match(/(contract review|urban design|studio|model build|critique|site plan|client approval)/i);
  project = match ? match[0].replace(/\b[a-z]/, c => c.toUpperCase()) : "General Request";
}

// Deadline
let deadlineDate = null;
let deadline = "";
if (parsed.deadline) {
  const parsedDate = new Date(Date.parse(parsed.deadline));
  if (!isNaN(parsedDate)) {
    deadlineDate = parsedDate.toISOString().slice(0, 10);
    deadline = deadlineDate;
  }
}

// Urgency Analysis fallback
let urgencyAnalysis = parsed.urgencyAnalysis?.trim();
if (!urgencyAnalysis) {
  const urgency = parsed.urgency?.toLowerCase();
  const action = `${parsed.actionrequest || ""}`.toLowerCase();
  const inquiry = `${parsed.inquiry || ""}`.toLowerCase();
  if (parsed.deadline) {
    urgencyAnalysis = "Deadline mentioned by caller";
  } else if (urgency === "urgent") {
    urgencyAnalysis = "Caller described request as urgent";
  } else if (action.includes("asap") || action.includes("immediately") || action.includes("soon")) {
    urgencyAnalysis = "Immediate attention requested by caller";
  } else if (
    action.includes("follow up") || action.includes("check in") ||
    action.includes("update") || inquiry.includes("follow up") ||
    inquiry.includes("progress") || inquiry.includes("waiting")
  ) {
    urgencyAnalysis = "Caller is seeking an update or follow-up";
  } else if (urgency === "low") {
    urgencyAnalysis = "No urgency or pressure stated";
  } else {
    urgencyAnalysis = "Unclear urgency level";
  }
}

// Return object
return {
  ...parsed,
  email,
  emailValid,
  phone,
  roleTitle,
  project,
  urgencyAnalysis,
  deadline,
  deadlineDate,
  timestamp,
  rawTranscript: raw,
  raw: JSON.stringify(parsed, null, 2)
};
