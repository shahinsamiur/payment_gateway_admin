export const config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  dataLimit: process.env.NEXT_PUBLIC_DATA_LIMIT || 10,
  fileBaseUrl:
    process.env.NEXT_PUBLIC_FILE_BASE_URL ||
    "https://backend.workdear.com/public/storage/",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  liveSupportApiBaseUrl: process.env.NEXT_PUBLIC_LIVE_SUPPORT_API_BASE_URL,
  socketUrl: process.env.NEXT_PUBLIC_SOCKET_URL,
  liveSupportServerUrl: process.env.NEXT_PUBLIC_LIVE_SUPPORT_SERVER_URL,
  authSecret: process.env.NEXTAUTH_SECRET,
};
