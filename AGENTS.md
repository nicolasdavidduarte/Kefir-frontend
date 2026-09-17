# Execution Rules
- **Sequential Execution Only:** Execute tasks strictly one at a time.
- **No Subagents:** Do NOT spawn background or sub-agents for parallel sub-tasks.
- **Wait for Verification:** Complete the current step, wait for output verification, and then proceed to the next step.