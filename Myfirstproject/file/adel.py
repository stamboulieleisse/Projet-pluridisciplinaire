import pywhatkit as pwk
import pyautogui
import time

phone_number = "+213793214632"

# Send message (opens WhatsApp Web)

for i in range(0, 20):
    message = "hmar" + str(i)

    pwk.sendwhatmsg_instantly(phone_number, message)



# Wait a few seconds for WhatsApp to load
time.sleep(1)



# Simulate "Enter" key press to send the message
pyautogui.press("enter")
pyautogui.press("enter")


