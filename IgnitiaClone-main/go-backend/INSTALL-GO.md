# Install Go on Windows

## Option 1: Download from Official Website (Recommended)

1. **Visit**: https://golang.org/dl/
2. **Download**: `go1.21.x.windows-amd64.msi` (latest version)
3. **Run the installer** and follow the setup wizard
4. **Restart** your command prompt/PowerShell
5. **Verify installation**: `go version`

## Option 2: Using Package Managers

### Using Chocolatey (if you have it)
```powershell
choco install golang
```

### Using Scoop (if you have it)
```powershell
scoop install go
```

### Using Winget (Windows 10/11)
```powershell
winget install GoLang.Go
```

## After Installation

1. **Restart your terminal/PowerShell**
2. **Verify installation**:
   ```powershell
   go version
   ```
3. **Navigate to go-backend directory**:
   ```powershell
   cd go-backend
   ```
4. **Install dependencies**:
   ```powershell
   go mod tidy
   ```
5. **Test compilation**:
   ```powershell
   go build main.go
   ```
6. **Run the server**:
   ```powershell
   go run main.go
   ```

## Environment Setup

Go should automatically set up:
- `GOROOT`: Go installation directory
- `GOPATH`: Go workspace (usually `%USERPROFILE%\go`)
- `PATH`: Updated to include Go binaries

## Quick Test Commands

After installing Go, run these commands in the `go-backend` directory:

```powershell
# Check Go version
go version

# Download dependencies
go mod tidy

# Test compilation
go build main.go

# Run the server
go run main.go
```

## Troubleshooting

If `go` command is not recognized after installation:
1. **Restart your terminal completely**
2. **Check PATH environment variable** includes Go bin directory
3. **Manually add to PATH** if needed: `C:\Program Files\Go\bin`

Once Go is installed, you can run all the authentication tests and start the server!