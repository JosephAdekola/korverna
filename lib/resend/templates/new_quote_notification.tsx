import * as React from "react";
import { Quote } from "@/generated/prisma/client";

interface NewQuoteAdminNotificationProps {
  quote: Quote;
}

export function NewQuoteAdminNotification({
  quote,
}: NewQuoteAdminNotificationProps) {
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
        📩 New Quote Request
      </h2>

      <p>
        A new quote request has been submitted through the Korverna website.
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
              Name
            </td>
            <td>{quote.name}</td>
          </tr>

          <tr>
            <td
              style={{
                fontWeight: "bold",
                padding: "8px 0",
              }}
            >
              Company
            </td>
            <td>{quote.company || "Not provided"}</td>
          </tr>

          <tr>
            <td
              style={{
                fontWeight: "bold",
                padding: "8px 0",
              }}
            >
              Phone
            </td>
            <td>{quote.phone}</td>
          </tr>

          <tr>
            <td
              style={{
                fontWeight: "bold",
                padding: "8px 0",
              }}
            >
              Email
            </td>
            <td>{quote.email}</td>
          </tr>

          <tr>
            <td
              style={{
                fontWeight: "bold",
                padding: "8px 0",
              }}
            >
              Location
            </td>
            <td>{quote.location}</td>
          </tr>

          <tr>
            <td
              style={{
                fontWeight: "bold",
                padding: "8px 0",
              }}
            >
              Start Date
            </td>
            <td>{quote.start ? quote.start.toLocaleDateString() : ""}</td>
          </tr>

          <tr>
            <td
              style={{
                fontWeight: "bold",
                padding: "8px 0",
              }}
            >
              End Date
            </td>
            <td>{quote.end ? quote.end.toLocaleDateString() : ""}</td>
          </tr>
        </tbody>
      </table>

      <div
        style={{
          marginTop: "20px",
          padding: "16px",
          backgroundColor: "#f9fafb",
          borderRadius: "6px",
        }}
      >
        <strong>Description</strong>

        <p
          style={{
            marginTop: "8px",
            marginBottom: 0,
            whiteSpace: "pre-wrap",
          }}
        >
          {quote.description || "No description provided."}
        </p>
      </div>

      <hr style={{ margin: "24px 0" }} />

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <tbody>
          <tr>
            <td
              style={{
                fontWeight: "bold",
                padding: "4px 0",
                width: "160px",
              }}
            >
              Submitted
            </td>
            <td>
              {now.toLocaleDateString()} at {now.toLocaleTimeString()}
            </td>
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
        <strong>Korverna Infrastructure</strong> website.
      </p>
    </div>
  );
}