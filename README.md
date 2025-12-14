# Workdear Microjob Site Admin Panel

This is the admin panel for the Workdear Microjob Site, a comprehensive dashboard for managing all aspects of the platform. It is built with Next.js, MUI, Recharts, Framer Motion, Redux, and RTK Query.

## Features

### 1. Dashboard

- **Description:** The central hub of the admin panel, providing a quick overview of the platform's key metrics.
- **Components:**
  - **StatCard:** Displays statistics like total users, total jobs, etc.
  - **SessionsChart & DownloadsBarChart:** Visual charts for user engagement and other metrics.
  - **TransactionRecords:** A feed of recent transactions.

### 2. User Management

- **Description:** Allows administrators to manage all aspects of user accounts.
- **Sub-features:**
  - **All Users:** View a list of all registered users, with options to edit, suspend, or delete accounts.
  - **Pending Verifications:** Review and approve or reject user identity verification submissions.
  - **Pending Deactivations:** Manage user requests to deactivate their accounts.
  - **User Profile:** A detailed view of a single user, including their personal information, transaction history, and activity.

### 3. Job Management

- **Description:** Tools for managing job postings on the platform.
- **Sub-features:**
  - **All Jobs:** A complete list of all jobs posted, with filtering and management options.
  - **Pending Jobs:** A queue of jobs submitted by users that require admin approval.
  - **Job Details:** A comprehensive view of a single job posting.
  - **Categories & Countries:** Admins can create, edit, and delete job categories, subcategories, continents, and countries to organize job listings.

### 4. Financials

- **Description:** A suite of tools for managing the financial aspects of the platform.
- **Sub-features:**
  - **Deposits:** Track and manage user deposits made via various methods (Bank, Crypto, Mobile).
  - **Withdrawals:** Process and manage user requests to withdraw funds.
  - **Transaction History:** A complete log of all financial transactions on the platform.
  - **Payment Gateway:** Configure and manage the payment gateways used for deposits and withdrawals.

### 5. Content Management

- **Description:** Enables administrators to manage the content on the main website.
- **Sub-features:**
  - **Blogs:** Create, edit, and publish blog posts.
  - **Pages:** Manage the content of static pages like "About Us," "FAQ," "Privacy Policy," "Terms & Conditions," etc.

### 6. Advertisement

- **Description:** Manage advertisements displayed on the platform.
- **Sub-features:**
  - **All Advertisements:** View and manage all active and inactive ad campaigns.

### 7. Ticket Draw System

- **Description:** A feature for running lottery or prize draw events.
- **Sub-features:**
  - **Draws:** Create and manage new prize draws.
  - **Ticket History:** View the history of tickets purchased by users.
  - **Settings:** Configure the settings for the ticket draw system.

### 8. Support

- **Description:** A system for providing real-time customer support to users.
- **Features:**
  - **Live Chat:** A real-time chat interface for communicating with users.
  - **Text, Image, and Voice Messaging:** Admins can send and receive text messages, images, and voice recordings.
  - **Conversation Management:** Admins can view and manage support conversations, filter them by status (waiting, active, closed), and close them.

### 9. Settings

- **Description:** Configure the overall settings of the admin panel and the main website.
- **Sub-features:**
  - **General Settings:** Basic site settings.
  - **Cost Settings:** Set fees and commissions for various actions on the platform.
  - **Premium Features:** Manage premium membership packages and their features.

## Technologies Used

- **Framework:** Next.js (App Router)
- **State Management:** Redux Toolkit & RTK Query
- **UI Library:** Material-UI (MUI)
- **Charting Library:** Recharts
- **Animation Library:** Framer Motion
- **Real-time Communication:** WebSockets
