import * as React from "react";
import { Newsletter } from "@/generated/prisma/client";

interface NewSubscriberAdminNotificationProps {
  email: string;
  landingPage: Newsletter["landingPage"];
}

const landingPageLabels: Record<Newsletter["landingPage"], string> = {
  LIMITED: "Korverna Limited",
  INFRASTRUCTURE: "Korverna Infrastructure",
};

export function NewSubscriberAdminNotification({
  email,
  landingPage,
}: NewSubscriberAdminNotificationProps) {
  const now = new Date();

  return (
    <div
      style={{
        fontFamily: "Arial, Helvetica, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        color: "#1f2937",
        lineHeight: 1.6,
      }}
    >
      <h2 style={{ marginBottom: "1rem" }}>
        📩 New Newsletter Subscription
      </h2>

      <p>
        A new user has subscribed to your newsletter.
      </p>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "1rem",
        }}
      >
        <tbody>
          <tr>
            <td
              style={{
                fontWeight: "bold",
                padding: "8px 0",
                width: "160px",
              }}
            >
              Email
            </td>
            <td>{email}</td>
          </tr>

          <tr>
            <td
              style={{
                fontWeight: "bold",
                padding: "8px 0",
              }}
            >
              Landing Page
            </td>
            <td>{landingPageLabels[landingPage]}</td>
          </tr>

          <tr>
            <td
              style={{
                fontWeight: "bold",
                padding: "8px 0",
              }}
            >
              Date
            </td>
            <td>{now.toLocaleDateString()}</td>
          </tr>

          <tr>
            <td
              style={{
                fontWeight: "bold",
                padding: "8px 0",
              }}
            >
              Time
            </td>
            <td>{now.toLocaleTimeString()}</td>
          </tr>
        </tbody>
      </table>

      <hr style={{ margin: "24px 0" }} />

      <p
        style={{
          fontSize: "12px",
          color: "#6b7280",
        }}
      >
        This notification was generated automatically by the{" "}
        <strong>{landingPageLabels[landingPage]}</strong> website.
      </p>
    </div>
  );
}