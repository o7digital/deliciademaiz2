# Canvas car demo

The repository already includes the Canvas car demo inside `Canvas 7 Files`.
Use either approach below to see it running locally.

## Option 1: quick local server (no install)
- Run `bash serve-car-demo.sh`.
- Open `http://localhost:8000/demo-car.html` (the script prints the URL).

## Option 2: BrowserSync with live reload
- `cd "Canvas 7 Files"`
- `npm install`
- `npm run start:car` (opens `demo-car.html` with auto reloads)

Notes: everything serves directly from the template files; stop the server with `Ctrl+C`.
