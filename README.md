# Cloud Monitor Service Backend

Backend services for Cloud Monitor.

---

## What is this?
This backend drives the functionality of Cloud Monitor.

---

## What functionality does this provide?
### Liveness Check
- API requests made automatically given information from database
- URLs pinged automatically

### User Notification
- Notify users when target API is not responding
    - Currently supports Email
    - Support underway for Discord and SMS

---

## Requirements
### Node.js
Node.js can be [downloaded](https://nodejs.org/en/download/) directly. Installer will have further instructions to complete install. Once installed, the Node version can be verified through opening a shell instance and executing:
    ```
    node -v
    ```
### Express.js
Execute: ```npm install express```
### pg
Execute: ```npm install pg```
### request
Execute: ```npm install request```

---

## Notes
Feel free to download or fork! If you have requests for additional features, please reach out or create a PR directly.