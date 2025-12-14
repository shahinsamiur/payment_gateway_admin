import {
  AccountBalanceWallet,
  AddBusiness,
  AddComment,
  AddPhotoAlternate,
  Campaign,
  Category,
  ConfirmationNumber,
  Dashboard,
  Description,
  Feed,
  Flag,
  History,
  ManageAccounts,
  Newspaper,
  Pages,
  Paid,
  Pending,
  People,
  Receipt,
  Settings,
  SupportAgent,
  Tune,
  VerifiedUser,
  VoiceOverOff,
  Work,
} from "@mui/icons-material";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import PaymentsIcon from "@mui/icons-material/Payments";
const menuItems = [
  // {
  //   title: "General",
  //   children: [
  //     {
  //       title: "Dashboard",
  //       icon: Dashboard,
  //       path: "/",
  //     },
  //   ],
  // },
  {
    title: "Management",
    children: [
      // {
      //   title: "User Management",
      //   icon: People,
      //   path: "/user-management/all-users",
      //   // children: [
      //   //   // {
      //   //   //   title: "All Users",
      //   //   //   icon: People,
      //   //   //   path: "/user-management/all-users",
      //   //   // },
      //   //   // {
      //   //   //   title: "Pending Verifications",
      //   //   //   icon: VerifiedUser,
      //   //   //   path: "/user-management/pending-verifications",
      //   //   // },
      //   //   // {
      //   //   //   title: "User Deactivations",
      //   //   //   icon: VoiceOverOff,
      //   //   //   path: "/user-management/pending-deactivations",
      //   //   // },
      //   //   // {
      //   //   //   title: "Managers",
      //   //   //   icon: ManageAccounts,
      //   //   //   path: "/user-management/managers",
      //   //   // },
      //   // ],
      // },
      // {
      //   title: "Job Management",
      //   icon: Work,
      //   path: "/job-management/all-jobs",
      //   children: [
      //     {
      //       title: "Categories",
      //       icon: Category,
      //       path: "/job-management/categories",
      //     },
      //     {
      //       title: "Countries",
      //       icon: Description,
      //       path: "/job-management/countries",
      //     },
      //     {
      //       title: "All Jobs",
      //       icon: Work,
      //       path: "/job-management/all-jobs",
      //     },
      //     {
      //       title: "Pending Jobs",
      //       icon: Pending,
      //       path: "/job-management/pending-jobs",
      //     },
      //     {
      //       title: "Reports",
      //       icon: Flag,
      //       path: "/job-management/reports",
      //     },
      //   ],
      // },
      // {
      //   title: "Content Management",
      //   icon: Newspaper,
      //   path: "/content/blogs",
      //   children: [
      //     {
      //       title: "Blogs",
      //       icon: Feed,
      //       path: "/content/blogs",
      //     },
      //     {
      //       title: "Add blog",
      //       icon: AddComment,
      //       path: "/content/blogs/add",
      //     },
      //   ],
      // },
      {
        title: "Financials",
        icon: Paid,
        path: "/financials/deposits",
        children: [
          {
            title: "Payment Getway",
            icon: PaymentsIcon,
            path: "/financials/payment-getway",
          },
          {
            title: "Transaction History",
            icon: History,
            path: "/financials/transaction-history",
          },
          {
            title: "Deposit History",
            icon: AccountBalanceWallet,
            path: "/financials/deposits",
          },
          {
            title: "Withdrawal History",
            icon: Receipt,
            path: "/financials/withdrawals",
          },
          // {
          //   title: "Advertisements",
          //   icon: AddPhotoAlternate,
          //   path: "/financials/advertisement/all",
          // },
          // {
          //   title: "Premium Features",
          //   icon: VerifiedUser,
          //   path: "/financials/premium-features",
          // },
        ],
      },
      // {
      //   title: "Pages",
      //   icon: Pages,
      //   path: "/pages/privacy_policy",
      //   children: [
      //     {
      //       title: "Privacy Policy",
      //       icon: Pages,
      //       path: "/pages/privacy_policy",
      //     },
      //     {
      //       title: "Terms & Conditions",
      //       icon: Pages,
      //       path: "/pages/terms_conditions",
      //     },
      //     {
      //       title: "Cancelation Policy",
      //       icon: Pages,
      //       path: "/pages/cancelation_policy",
      //     },
      //     {
      //       title: "Refund Policy",
      //       icon: Pages,
      //       path: "/pages/refund_policy",
      //     },
      //     {
      //       title: "FAQ",
      //       icon: Pages,
      //       path: "/pages/faq",
      //     },
      //   ],
      // },

      // {
      //   title: "Ticket Draw System",
      //   icon: ConfirmationNumber,
      //   path: "/ticket-draw-system/ticket-history",
      //   children: [
      //     {
      //       title: "Ticket History",
      //       icon: History,
      //       path: "/ticket-draw-system/ticket-history",
      //     },
      //     {
      //       title: "Draws Settings",
      //       icon: Settings,
      //       path: "/ticket-draw-system/settings",
      //     },
      //   ],
      // },
    ],
  },
  // currency
  // {
  //   title: "Configuration",
  //   children: [
  //     {
  //       title: "Settings",
  //       icon: Settings,
  //       path: "/settings/general",
  //       children: [
  //         {
  //           title: "Announcements",
  //           icon: Campaign,
  //           path: "/settings/announcements",
  //         },
  //         {
  //           title: "General",
  //           icon: Tune,
  //           path: "/settings/general",
  //         },
  //         {
  //           title: "Services",
  //           icon: AddBusiness,
  //           path: "/settings/services",
  //         },
  //         {
  //           title: "Currency",
  //           icon: CurrencyExchangeIcon,
  //           path: "/settings/currency",
  //         },
  //         {
  //           title: "Cost",
  //           icon: Paid,
  //           path: "/settings/cost",
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   title: "Support",
  //   children: [
  //     {
  //       title: "Support",
  //       icon: SupportAgent,
  //       path: "/support",
  //     },
  //   ],
  // },
];

export const extractLastLevelMenus = () => {
  const result = [];
  menuItems.forEach((item) => {
    if (item.children) {
      item.children.forEach((child) => {
        if (child.children) {
          child.children.forEach((grandchild) => {
            result.push(grandchild);
          });
        } else {
          result.push(child);
        }
      });
    } else {
      result.push(item);
    }
  });

  return result;
};

export default menuItems;
