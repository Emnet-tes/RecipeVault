# Software Configuration Management Plan (SCMP)
## 1. Introduction
### Purpose
This document outlines the Software Configuration Management (SCM) activities for the RecipeVault project, a simple recipe management application. It ensures controlled development, versioning, and release of project artifacts, applying core SCM principles to maintain integrity and traceability.
### Scope
The SCMP covers all configuration items (CIs) including source code (HTML, CSS, JS files), documentation, UI mockups, a simple JSON database file, and related artifacts. It manages changes from initial setup to final releases, focusing on a login page, dashboard (menu/list of recipes), one core action , and basic data storage.
## 2. Roles & Responsibilities
- **Configuration Manager (CM):** Member 1 (Repository owner). Responsible for merging pull requests, approving changes, tagging baselines and releases, conducting audits, and maintaining the CI register and change log.
- **Documentation Lead:** Member 2. Handles creation and updates of SCMP, CI register, baseline records, audit reports, and release notes.
- **Developers:** Members 3-5. Responsible for coding features, testing, submitting change requests (CRs), and committing to feature branches.
- **Testers/Auditors:** Members 6-7. Perform functional testing, assist in configuration audits, and verify CR implementations.
- **All Team Members:** Must follow branching and change control processes, report issues, and participate in reviews.
## 3. Configuration Identification
### CI Identification
Configuration Items (CIs) are identified and tracked in a CI Register (separate document: docs/CI_Register.md). The register includes:
- CI Name
- Version
- Owner
- Category
- Status
Simple CIs for this project include:
- Requirements document (docs/Requirements.md)
- UI mockups (docs/UI_Mockups.png or similar)
- HTML/CSS/JS files (src/login.html, src/dashboard.html, src/add_recipe.js, etc.)
- Simple database file (src/recipes.json)
- Readme (README.md)
- SCMP document (docs/SCMP_Plan.md)
- Change Log (docs/Change_Log.md)
- Baseline Records (docs/Baseline1_Record.md, docs/Baseline2_Record.md)
- Audit Report (docs/Audit_Report.md)
### Naming Conventions
- Files: Use descriptive, lowercase names with underscores .
- Versions: Semantic versioning .
- Branches: Prefix with type such as feature/login, bugfix/dashboard.
- Overall: Project_Module_Version .
## 4. Version Control
### Tools Used
- **Version Control System:** Git (local) and GitHub (remote repository).
- **Collaboration:** GitHub Issues for tracking CRs, Pull Requests for reviews.
- **Documentation:** Markdown files for all docs; optional Word exports for submissions.
### Versioning Rules
- Start with version 0.1.0 for initial commits.
- Increment Patch for minor changes (e.g., bug fixes: 1.0.1).
- Increment Minor for feature additions or CR implementations (e.g., 1.1.0).
- Increment Major for baselines or releases (e.g., 2.0.0 if needed, but not expected here).
- All versions are tagged in Git (e.g., git tag v1.0.0).
### Branching Model
We use a Feature Branch Workflow:
- **Main Branch:** Stable code only; direct commits forbidden.
- **Feature Branches:** Created from main for new features .
- **Process:**
  1. Create branch: `git checkout -b feature/[name]`.
  2. Develop and commit locally.
  3. Push to remote: `git push origin feature/[name]`.
  4. Open Pull Request (PR) on GitHub for review.
  5. CM reviews and merges to main.
- At least 3 branches required: main + 2 features
- Merge conflicts resolved by the branch owner.
## 5. Change Control
### Change Control Process
1. **Initiate Change:** Any team member identifies a need (e.g., bug fix, feature addition) and prepares a Change Request (CR) Form (template in docs/CR_Template.md). Include: CR ID, Description, Impact, Proposed Changes.
2. **Submit CR:** Log in GitHub Issues or docs/Change_Log.md; submit 3 CRs total during the project.
3. **Review & Approve:** CM reviews CR for feasibility; approves or rejects.
4. **Implement:** Approved CRs are implemented on a feature branch.
5. **Verify:** Tester reviews via PR; includes testing (manual or simple scripts in /tests).
6. **Merge & Log:** CM merges PR; update Change Log with CR details, date, and status.
All changes must go through PRs; no direct pushes to main. Maintain a Change Log (docs/Change_Log.md) tracking all CRs.
## 6. Baseline Management
Baselines represent controlled snapshots of the project:
- **Baseline 1 (BL1):** Repository setup + initial documents (SCMP, CI Register, README) + empty src structure. Tagged as BL1.
- **Baseline 2 (BL2):** Working prototype (login, dashboard, core action, JSON data) + CR fixes. Tagged as BL2.
- Baselines are immutable; changes require new CRs and branches.
## 7. Release Management
Releases build on baselines:
- **Release v1.0:** From BL1 – Initial working system . Include release notes : Changes, known issues.
- **Release v1.1:** From BL2 – After CR implementations . Include release notes (docs/Release_v1.1.md).
- **Process:** Upload to GitHub Releases with tags , zipped artifacts, and notes.
## 8. Configuration Audit
Audits ensure compliance (detailed in Deliverable 6):
- **Physical Configuration Audit (PCA):** Verify docs match repo, CIs named correctly, versions consistent.
- **Functional Configuration Audit (FCA):** Confirm CRs implemented, features match requirements.
This SCMP will be reviewed and updated as needed via CR process.