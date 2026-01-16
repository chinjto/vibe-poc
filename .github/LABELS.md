# GitHub Labels

This document describes the label system used for organizing issues in the Vibe POC project.

## Categories

### Type Labels
- **bug** 🐛 - Something is broken
- **enhancement** ✨ - New feature or improvement
- **test** 🧪 - Test case or BDD scenario
- **docs** 📚 - Documentation updates
- **chore** 🔧 - Maintenance, dependencies, internal tasks

### Priority Labels
- **priority: critical** 🔴 - Blocks development, needs immediate attention
- **priority: high** 🟠 - Important, should be addressed soon
- **priority: medium** 🟡 - Standard work
- **priority: low** 🟢 - Nice to have

### Status Labels
- **status: backlog** 📋 - Not yet started
- **status: in-progress** 🔄 - Currently being worked on
- **status: blocked** 🚫 - Waiting for external dependency
- **status: review** 👀 - Ready for review
- **status: stale** ⏰ - Inactive for 30+ days

### Domain Labels
- **angular** - Angular framework specific
- **cypress** - Cypress testing related
- **styling** - CSS/SCSS styling
- **performance** - Performance optimization
- **accessibility** - A11y improvements

### Help Labels
- **good first issue** 👋 - Good for newcomers
- **help wanted** 🤝 - Community help appreciated
- **question** ❓ - Needs clarification

## Label Usage

### Creating Issues
1. Select the primary **type** label (bug, enhancement, test, docs, chore)
2. Add a **priority** label
3. Add relevant **domain** labels if applicable
4. Add **status** label (usually starts with `status: backlog`)

### Example Issue Labels
- Bug with high priority: `bug`, `priority: high`, `status: in-progress`
- Feature request: `enhancement`, `priority: medium`, `angular`, `status: backlog`
- New test case: `test`, `cypress`, `priority: medium`, `status: backlog`

## GitHub Actions

### Auto-labeling
Issues are automatically labeled based on content and templates used.

### Stale Issue Management
- Issues inactive for 30 days are marked as `stale`
- Issues marked stale for 7 more days are automatically closed
- Issues labeled `pinned` or `blocked` are exempt from stale automation
