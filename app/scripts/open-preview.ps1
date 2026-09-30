$ErrorActionPreference = 'Stop'
$projectRoot = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$previewUrl = 'http://127.0.0.1:4173/Dashboard'
function Test-Preview {
    try {
        $response = Invoke-WebRequest -Uri $previewUrl -UseBasicParsing -TimeoutSec 2
        return $response.StatusCode -eq 200 -and $response.Content.Contains('/src/main.jsx')
    } catch { return $false }
}
try {
    if (-not (Test-Preview)) {
        $vitePath = Join-Path $projectRoot 'node_modules/vite/bin/vite.js'
        if (-not (Test-Path -LiteralPath $vitePath)) {
            throw 'Dependensi belum terpasang. Jalankan npm install di folder app terlebih dahulu.'
        }
        $nodePath = (Get-Command node.exe).Source
        $previewProcess = Start-Process -FilePath $nodePath -ArgumentList @('node_modules/vite/bin/vite.js', '--host', '127.0.0.1', '--port', '4173', '--strictPort') -WorkingDirectory $projectRoot -WindowStyle Hidden -PassThru -RedirectStandardOutput (Join-Path $projectRoot 'preview.log') -RedirectStandardError (Join-Path $projectRoot 'preview-error.log')
        $ready = $false
        for ($attempt = 0; $attempt -lt 30; $attempt++) {
            if (Test-Preview) { $ready = $true; break }
            if ($previewProcess.HasExited) { throw 'Preview gagal dimulai. Periksa app/preview-error.log.' }
            Start-Sleep -Milliseconds 500
        }
        if (-not $ready) { throw 'Preview belum merespons. Periksa app/preview-error.log.' }
    }
    Start-Process $previewUrl
    Write-Host "LMSKU dibuka di $previewUrl"
} catch {
    Write-Host $_.Exception.Message -ForegroundColor Red
    exit 1
}
