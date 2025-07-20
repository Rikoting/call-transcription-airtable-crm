# 📞 Call Transcription to Airtable CRM

Transcribe monologue-style audio into structured CRM records using n8n, OpenAI (GPT-3.5/4o), and Airtable. This hybrid-code automation extracts caller intent, urgency, deadlines, and follow-up actions into clean, ready-to-use fields.

---

## 🔧 Features

- 🎙️ Whisper-based audio transcription
- 🧠 GPT-powered LLM field extraction
- ⏳ Deadline & urgency detection
- 🧹 Fallback logic (for missing fields)
- 📤 Airtable CRM integration
- 📝 Summary generation for transcripts

---

## 🗂️ Project History

| Version | Description |
|---------|-------------|
| v0.1 | Regex-only transcription → Google Sheets |
| v0.2 | Hugging Face model added |
| v0.3 | Switched to OpenAI API (GPT-3.5) |
| v1.0 | Airtable CRM version with fallback logic, deadline/date extraction, and GPT-4o compatibility |

---

## 🧪 Sample Output (JSON)
See [`/sample-output`](./sample-output) for actual JSONs from Camille, Marcus, and Samantha test cases.

---

## 📊 Airtable CRM Demo Sheet

👉 [View Airtable CRM Demo Sheet](https://airtable.com/invite/l?inviteId=invY4eNyGZ8tjSxHS&inviteToken=b736d6c373ccc125326e2f5de5bcdc672b951274fca7d93db1d205e28ebc94c0)

```html
<iframe class="airtable-embed" src="https://airtable.com/embed/appXpNiN4xZXPi7kr/shr4M3RUqg7cJ4Asc?viewControls=on" frameborder="0" onmousewheel="" width="100%" height="533" style="background: transparent; border: 1px solid #ccc;"></iframe>
```

---

## 🚀 Getting Started

1. Import the `transcription_workflow_airtable_crm_v1.json` into your n8n instance
2. Link your OpenAI, Airtable, and Telegram (optional) credentials
3. Feed audio via URL or manual trigger
4. Review outputs directly in Airtable

---

## 📄 License

MIT License — see `LICENSE` for full terms.
