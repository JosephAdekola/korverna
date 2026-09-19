import * as React from "react";

interface MagicLinkEmailProps {
    url: string;
}

export function MagicLinkEmail({
    url,
}: MagicLinkEmailProps) {
    return (
        <div
            style={{
                fontFamily: "Arial, Helvetica, sans-serif",
                maxWidth: "600px",
                margin: "0 auto",
                padding: "24px",
                color: "#1f2937",
                lineHeight: 1.6,
            }}
        >
            <h2
                style={{
                    marginBottom: "1rem",
                    color: "#0e0e0e",
                }}
            >
                Sign in to Korverna
            </h2>

            <p>
                Use the button below to securely sign in to your
                Korverna admin account.
            </p>

            <div
                style={{
                    margin: "32px 0",
                    textAlign: "center",
                }}
            >
                <a
                    href={url}
                    style={{
                        display: "inline-block",
                        backgroundColor: "#D4A017",
                        color: "#ffffff",
                        textDecoration: "none",
                        padding: "12px 24px",
                        borderRadius: "6px",
                        fontWeight: "bold",
                    }}
                >
                    Sign in to Korverna
                </a>
            </div>

            <p
                style={{
                    fontSize: "14px",
                    color: "#4b5563",
                }}
            >
                If you did not request this sign-in link, you can safely
                ignore this email.
            </p>

            <p
                style={{
                    fontSize: "13px",
                    color: "#6b7280",
                    marginTop: "24px",
                }}
            >
                For security, this link should only be used by you and
                should not be shared with anyone.
            </p>

            <hr
                style={{
                    margin: "24px 0",
                    border: "none",
                    borderTop: "1px solid #e5e7eb",
                }}
            />

            <p
                style={{
                    fontSize: "12px",
                    color: "#6b7280",
                }}
            >
                This email was sent automatically by Korverna.
            </p>
        </div>
    );
}