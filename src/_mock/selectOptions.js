export const selectOptions = {
  job_status: [
    {
      id: 1,
      label: "All",
      value: "",
    },
    {
      id: 2,
      label: "DRAFT",
      value: "DRAFT",
    },
    {
      id: 3,
      label: "PENDING",
      value: "PENDING",
    },
    {
      id: 4,
      label: "APPROVED",
      value: "APPROVED",
    },
    {
      id: 5,
      label: "REJECTED",
      value: "REJECTED",
    },
    {
      id: 6,
      label: "COMPLETED",
      value: "COMPLETED",
    },
    {
      id: 7,
      label: "CLOSED",
      value: "CLOSED",
    },
    {
      id: 8,
      label: "EXPIRED",
      value: "EXPIRED",
    },
  ],
  withdrawal_status: [
    {
      id: 1,
      label: "All",
      value: "",
    },
    {
      id: 2,
      label: "Pending",
      value: "pending",
    },
    {
      id: 3,
      label: "Accepted",
      value: "accepted",
    },
    {
      id: 4,
      label: "Rejected",
      value: "rejected",
    },
    {
      id: 5,
      label: "Success",
      value: "success",
    },
    {
      id: 6,
      label: "Failed",
      value: "failed",
    },
    {
      id: 7,
      label: "Completed",
      value: "completed",
    },
    {
      id: 8,
      label: "Hold",
      value: "hold",
    },
    {
      id: 9,
      label: "Refund",
      value: "refund",
    },
  ],
  payment_methods: [
    {
      id: 1,
      label: "All",
      value: "",
    },
    {
      id: 2,
      label: "Stripe",
      value: "stripe",
    },
    {
      id: 3,
      label: "Paypal",
      value: "paypal",
    },
    {
      id: 4,
      label: "Bank Transfer",
      value: "bank_transfer",
    },
    {
      id: 5,
      label: "Internal",
      value: "internal",
    },
    {
      id: 6,
      label: "Bkash",
      value: "bkash",
    },
    {
      id: 7,
      label: "Nagad",
      value: "nagad",
    },
    {
      id: 8,
      label: "Rocket Manual",
      value: "rocket_manual",
    },
    {
      id: 9,
      label: "Bkash Manual",
      value: "bkash_manual",
    },
  ],
  transaction_types: [
    { id: 1, label: "All", value: "" },

    // Payment
    { id: 2, label: "Deposit", value: "deposit" },
    { id: 3, label: "Withdrawal", value: "withdrawal" },
    {
      id: 4,
      label: "Instant Verification Fee",
      value: "instant_verification_fee",
    },

    // Withdrawal Fee
    { id: 5, label: "Withdrawal Fee Manual", value: "withdrawal_fee_manual" },
    { id: 6, label: "Withdrawal Fee Gateway", value: "withdrawal_fee_gateway" },

    // Deposit Fee
    { id: 7, label: "Deposit Fee Manual", value: "deposit_fee_manual" },
    { id: 8, label: "Deposit Fee Gateway", value: "deposit_fee_gateway" },

    // Job
    { id: 9, label: "Job Complete Payment", value: "job_complete_payment" },
    { id: 10, label: "Job Rejection Penalty", value: "job_rejection_penalty" },
    {
      id: 11,
      label: "Job Hold Balance Refund",
      value: "job_hold_balance_refund",
    },
    {
      id: 12,
      label: "Job Create Hold Balance",
      value: "job_create_hold_balance",
    },

    // Skipped: job_worker_extension (marked as not needed)

    { id: 13, label: "Job Promotion", value: "job_promotion" },
    { id: 14, label: "Job Tips Provider", value: "job_tips_provider" },
    { id: 15, label: "Job Tips Receiver", value: "job_tips_receiver" },

    // Advertisement
    { id: 16, label: "Advertisement Payment", value: "advertisement_payment" },

    // Ticket
    { id: 17, label: "Ticket Purchase", value: "ticket_purchase" },
    { id: 18, label: "Ticket Draw Winner", value: "ticket_draw_winner" },

    // Referral
    { id: 19, label: "Referral Bonus", value: "referral_bonus" },
    {
      id: 20,
      label: "Referral Deposit Commission",
      value: "referral_deposit_commission",
    },
    {
      id: 21,
      label: "Referral Task Commission",
      value: "referral_task_commission",
    },

    // Play and Earn
    { id: 22, label: "Play and Earn", value: "play_and_earn" },

    // Premium Subscription
    { id: 23, label: "Premium Subscription", value: "premium_subscription" },
  ],
  advertisement_status: [
    {
      id: 1,
      label: "All",
      value: "",
    },
    {
      id: 2,
      label: "Pending",
      value: "PENDING",
    },
    {
      id: 3,
      label: "Approved",
      value: "APPROVED",
    },
    {
      id: 4,
      label: "Rejected",
      value: "REJECTED",
    },
    {
      id: 5,
      label: "Active",
      value: "ACTIVE",
    },
    {
      id: 6,
      label: "Expired",
      value: "EXPIRED",
    },
  ],
};
