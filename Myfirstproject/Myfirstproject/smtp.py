import smtplib
import time
import pyautogui

# Email credentials (Use App Passwords for security)
EMAIL_ADDRESS = "rayanemouzali3230@gmail.com"
EMAIL_PASSWORD = "rayan-555"

# Recipient and message
TO_EMAIL = "wassimmouhouche00@gmail.com"
SUBJECT = "Hello from Python"
MESSAGE = "This is a test email sent using Python."

# Format email message
email_content = f"Subject: {SUBJECT}\n\n{MESSAGE}"

try:
    # Connect to Gmail SMTP server
    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()  # Secure connection
    server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)  # Login

    # Send email
    server.sendmail(EMAIL_ADDRESS, TO_EMAIL, email_content)
    print("✅ Email sent successfully!")

    # Close server connection
    server.quit()

except Exception as e:
    print(f"❌ Error sending email: {e}")

# Optional: Simulate clicking "Send" in a GUI (if needed)
time.sleep(2)
pyautogui.press("enter")
