# Go Backend Setup Instructions

## Install Go

### Windows
1. Download Go from https://golang.org/dl/
2. Run the installer (.msi file)
3. Restart your command prompt/PowerShell
4. Verify installation: `go version`

### Alternative: Using Chocolatey (if you have it)
```powershell
choco install golang
```

### Alternative: Using Scoop (if you have it)
```powershell
scoop install go
```

## After Installing Go

1. **Navigate to the go-backend directory:**
   ```bash
   cd go-backend
   ```

2. **Install dependencies:**
   ```bash
   go mod tidy
   ```

3. **Set up environment (copy and edit .env file):**
   ```bash
   copy .env.example .env
   ```

4. **Make sure PostgreSQL is running and create database:**
   ```sql
   CREATE DATABASE ignitia;
   ```

5. **Run the Go backend:**
   ```bash
   go run main.go
   ```

The Go backend will start on port 8080 and provide the same API endpoints as the Node.js version.

## Quick Test

Once running, test the API:
```bash
curl http://localhost:8080/api/health
curl http://localhost:8080/api/sponsors
curl http://localhost:8080/api/teams
```

## Benefits of Go Backend

- **Performance:** 5-10x faster than Node.js
- **Memory efficiency:** Lower memory usage
- **Concurrency:** Better handling of concurrent requests
- **Single binary:** Easy deployment
- **Type safety:** Compile-time error checking
- **No dependencies:** Self-contained executable