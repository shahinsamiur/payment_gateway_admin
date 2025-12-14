import NextAuthProvider from "@/components/providers/NextAuthProvider";
import NotificationProvider from "@/components/providers/NotificationProvider";
import { ReduxProvider } from "@/components/providers/ReduxProvider";
import ThemeProvider from "@/components/providers/ThemeProvider";
import { config } from "@/config/config";
import { ToastContainer } from "react-toastify";
import "./globals.css";

export async function generateMetadata() {
  try {
    const res = await fetch(config.apiBaseUrl + "/site-data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return {
        title: "Workdear - Admin dashboard",
        description: "Admin dashboard",
      };
    }

    const data = await res.json();

    return {
      title: `${data.site_name} - Admin dashboard`,
      description: data.site_description,
      icons: {
        icon: config.fileBaseUrl + data.site_favicon,
      },
      openGraph: {
        type: "website",
        url: config.siteUrl,
        title: data.site_name,
        description: data.site_description,
        siteName: data.site_name,
        images: [
          {
            url: config.fileBaseUrl + data.site_logo_light,
            width: 1200,
            height: 630,
            alt: data.site_name,
          },
        ],
      },
    };
  } catch (error) {
    return {
      title: "Workdear - Admin dashboard",
      description: "Admin dashboard",
    };
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <ThemeProvider>
            <NotificationProvider>
              <NextAuthProvider>{children}</NextAuthProvider>
            </NotificationProvider>
            <ToastContainer />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
