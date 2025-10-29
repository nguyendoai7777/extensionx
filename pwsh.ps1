oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH\uew.omp.json" | Invoke-Expression
#  oh-my-posh init pwsh --config "~\uew.omp.json" | Invoke-Expression

# Dracula readline configuration. Requires version 2.0, if you have 1.2 convert to `Set-PSReadlineOption -TokenType`
Set-PSReadlineOption -Color @{
  "Command"   = [ConsoleColor]::Green
  "Parameter" = [ConsoleColor]::Gray
  "Operator"  = [ConsoleColor]::Magenta
  "Variable"  = [ConsoleColor]::White
  "String"    = [ConsoleColor]::Yellow
  "Number"    = [ConsoleColor]::Blue
  "Type"      = [ConsoleColor]::Cyan
  "Comment"   = [ConsoleColor]::DarkCyan
}
# Dracula Prompt Configuration
Import-Module posh-git
$GitPromptSettings.DefaultPromptPrefix.Text = "$([char]0x2192) " # arrow unicode symbol
$GitPromptSettings.DefaultPromptPrefix.ForegroundColor = [ConsoleColor]::Green
$GitPromptSettings.DefaultPromptPath.ForegroundColor = [ConsoleColor]::Cyan
$GitPromptSettings.DefaultPromptSuffix.Text = "$([char]0x203A) " # chevron unicode symbol
$GitPromptSettings.DefaultPromptSuffix.ForegroundColor = [ConsoleColor]::Magenta
# Dracula Git Status Configuration
$GitPromptSettings.BeforeStatus.ForegroundColor = [ConsoleColor]::Blue
$GitPromptSettings.BranchColor.ForegroundColor = [ConsoleColor]::Blue
$GitPromptSettings.AfterStatus.ForegroundColor = [ConsoleColor]::Blue

function prompt {
  $E = [char]27
  "$E[1;32;40m→ $E[1;36;40m$(Get-Location)$E[1;35;40m › $E[1;37;40m"
}

function which($name) {  

  Get-Command $name | Select-Object -ExpandProperty Definition  

}

function pws {
  [CmdletBinding()]
  param(
    [Parameter(Position = 0)]
    [ValidateSet('update')]
    [string]$Action = 'update'

  )

  if ($Action -eq 'update') {
    Write-Host "⏬ Updating PowerShell..." -ForegroundColor Cyan
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12


    try {
      # --- Lấy bản mới nhất từ GitHub ---
      $latest = (Invoke-RestMethod https://api.github.com/repos/PowerShell/PowerShell/releases/latest).tag_name
      $ver = $latest.TrimStart('v')
      $current = $PSVersionTable.PSVersion.ToString()

      if ($current -eq $ver) {
        Write-Host "✅ You already have the latest PowerShell version ($ver). Up-to-date!" -ForegroundColor Green
        return
      }

      $url = "https://github.com/PowerShell/PowerShell/releases/download/$latest/PowerShell-$ver-win-x64.msi"
      $installer = "$env:TEMP\PowerShell-$ver-win-x64.msi"

      Write-Host "⬇️  Downloading $latest ..." -ForegroundColor Cyan
      Invoke-WebRequest -Uri $url -OutFile $installer -UseBasicParsing

      Write-Host "⚙️  Installing PowerShell $ver ..." -ForegroundColor Cyan
      $process = Start-Process msiexec.exe -Verb RunAs -ArgumentList "/i `"$installer`" /quiet /norestart" -PassThru
      Write-Host "⏳ Waiting for installation to complete..." -ForegroundColor Yellow
      $process.WaitForExit()

      if ($process.ExitCode -eq 0) {
        Write-Host "✅ Installation completed successfully." -ForegroundColor Green
        Write-Host "🪄 Restart PowerShell to use version $ver." -ForegroundColor Cyan
      }
      return
  
    }
    catch {
      Write-Host "❌ Update failed: $_" -ForegroundColor Red
    }
  }
}

function update {
  [CmdletBinding()]
  param(
    [Parameter(Position = 0, Mandatory = $true)]
    [ValidateSet('pwsh', 'npm', 'pnpm')]
    [string]$Target
  )

  switch ($Target) {
    'pwsh' {
      if (Get-Command pws -ErrorAction SilentlyContinue) {
        pws update
      }
      else {
        Write-Host "❌ 'pws' function not found. Make sure it is defined in your profile." -ForegroundColor Red
      }
    }

    'npm' {
      Write-Host "📦 Updating npm..." -ForegroundColor Cyan
      try {
        npm install -g npm
        Write-Host "✅ npm updated successfully." -ForegroundColor Green
        npm -v | ForEach-Object { Write-Host "🔹 Current npm version: $_" -ForegroundColor Yellow }
      }
      catch {
        Write-Host "❌ npm update failed: $_" -ForegroundColor Red
      }
    }
    'pnpm' {
      Write-Host "📦 Updating pnpm..." -ForegroundColor Cyan
      try {
        pnpm self-update
      }
      catch {
        Write-Host "❌ pnpm update failed: $_" -ForegroundColor Red
      }
    }


  }
}
############################################# 

#################### BUN #################### 

function bi {  

  bun install  

}  

function ba {  

  param(  

    [switch]$D,  

    [Parameter(ValueFromRemainingArguments)]  

    [string[]]$Remaining  

  )  

  if ($D) {  

    Write-Host "Install to devDependencies" -ForegroundColor Blue   

    bun add -D $Remaining  

  } 

  else {  

    Write-Host "Install to dependencies" -ForegroundColor Green   

    bun add $Remaining  

  }  

}  

function bd {  

  param(  

    [Parameter(ValueFromRemainingArguments)]  

    [string[]]$Remaining  

  )  

  bun remove $Remaining  

} 

function br {  

  param(  

    [string]$cm  

  )  

  bun run $cm  

}  

function bs {  

  bun start  

}  

#############################################  

#################### pnpm ####################  

function pi {  

  pnpm install  

}  

function pa {  

  param(  

    [switch]$D,  

    [Parameter(ValueFromRemainingArguments)]  

    [string[]]$Remaining  

  )  

  if ($D) {  

    Write-Host "Install to devDependencies" -ForegroundColor Blue   

    pnpm add -D $Remaining  

  } 

  else {  

    Write-Host "Install to dependencies" -ForegroundColor Green   

    pnpm add $Remaining  

  }  

}  

function pr {  

  param(  

    [Parameter(ValueFromRemainingArguments)]  

    [string[]]$Remaining  

  )  

  pnpm remove $Remaining  

}  

#############################################  

#############################################  

#################### NPM ####################  

function npi { npm i }   

function ns { npm start }   

function nb {   

  npm run build   

}   

function nr { 

  param([string]$cm)   

  process {   

    npm run $cm  

  } 

}  

function na { 

  param( 

    [switch]$D,  

    [Parameter(ValueFromRemainingArguments)]  

    [string[]]$Remaining  

  ) 

  if ($D) {  

    Write-Host "Install to devDependencies" -ForegroundColor Blue   

    npm add -D $Remaining  

  } 

  else {  

    Write-Host "Install to dependencies" -ForegroundColor Green   

    npm add $Remaining  

  }  

}  

###############################################  

############ --- git aliases --- ##############  

function gaa { git add . }  

function gfa { git fetch -a }  

function gst { git status }   

function glol { git log --oneline }  

function glog { git log }   

function gpl { git pull }   

function gph { git push }   

function gfp { git push -f }   

function gbr { git branch }   

function gbra { git branch --all }   

############### GIT RESET ###############  

function grhc {   

  param([string]$cm)   

  process {   

    git reset --hard $cm   

  }   

} 

function grc {   

  param([string]$cm)   

  process {   

    git reset $cm   

  }   

} 

function grho {   

  param([string]$cm)   

  process {   

    git reset --hard origin/$cm  

  } 

} 

function grhh { git reset --hard head }   

############### GIT STASH ###############  

function gstm { 

  param(   

    [string]$mess   

  ) 

  process {   

    git stash save $mess   

  } 

} 

function gstl {    

  git stash list  

}  

function gstc {    

  git stash clear  

}  

function gstp {  

  param( 

    [string]$order   

  )   

  process {   

    git stash pop "stash@{$mess}"  

  } 

}  

function gsts {    

  param(   

    [string]$order   

  ) 

  process {   

    git stash show "stash@{$mess}"  

  } 

} 

function gsta {    

  param(   

    [string]$order   

  ) 

  process {   

    git stash apply "stash@{$mess}"  

  } 

}  

############### GIT REBASE ###############  

function grbrs {    

  rm -r ".git/rebase-merge"  

}  

function grbi {    

  param(   

    [string]$command  

  )   

  process {   

    git rebase -i $command  

  } 

} 

function grb {    

  param(   

    [string]$branch  

  ) 

  process {   

    git rebase $branch  

  } 

}  

function grbc { 

  git rebase --continue 

}  

function grba {    

  git rebase --abort  

}  

## GIT PULL  

function gplo {    

  param(   

    [string]$brName   

  ) 

  process {   

    git pull origin $brName   

  } 

}  

############### GIT CHECKOUT ###############  

function gnb {    

  param([string]$cm )   

  process {   

    git checkout -b $cm   

  } 

}   

function gco {    

  param(   

    [string]$br   

  )   

  process {   

    git checkout $br   

  } 

} 

function gcl {    

  param(   

    [string]$brName   

  ) 

  process {   

    git clone $brName   

  } 

}  

############### GIT CHERRY-PICK ###############  

function gcp { 

  param(   

    [string]$branch   

  )   

  process {   

    git cherry-pick $branch   

  } 

}   

function gcpc { 

  git cherry-pick --continue 

}  

function gcpa { 

  git cherry-pick --abort   

}   

function gmg {    

  param(   

    [string]$branch   

  )   

  process {   

    git merge $branch   

  } 

}   

function gcmm {    

  param(   

    [string]$cm   

  ) 

  process {   

    git commit -m $cm   

  } 

}   

function lg {    

  lazygit  

}   

# Import the Chocolatey Profile that contains the necessary code to enable  

# tab-completions to function for `choco`.  

# Be aware that if you are missing these lines from your profile, tab completion  

# for `choco` will not function.  

# See https://ch0.co/tab-completion for details.  

$ChocolateyProfile = "$env:ChocolateyInstall\helpers\chocolateyProfile.psm1"  

if (Test-Path($ChocolateyProfile)) {  

  Import-Module "$ChocolateyProfile"  

} 

##################################################### 

#################### Alias of .ps1 ################## 

function Write-Color([String[]]$Text, [ConsoleColor[]]$Color = "White", [int]$StartTab = 0, [int] $LinesBefore = 0, [int] $LinesAfter = 0, [string] $LogFile = "", $TimeFormat = "yyyy-MM-dd HH:mm:ss") { 

  # version 0.2 

  # - added logging to file 

  # version 0.1 

  # - first draft 

  #  

  # Notes: 

  # - TimeFormat https://msdn.microsoft.com/en-us/library/8kb3ddd4.aspx 

  $DefaultColor = $Color[0] 

  if ($LinesBefore -ne 0) { for ($i = 0; $i -lt $LinesBefore; $i++) { Write-Host "`n" -NoNewline } } # Add empty line before 

  if ($StartTab -ne 0) { for ($i = 0; $i -lt $StartTab; $i++) { Write-Host "`t" -NoNewLine } }  # Add TABS before text 

  if ($Color.Count -ge $Text.Count) { 

    for ($i = 0; $i -lt $Text.Length; $i++) { Write-Host $Text[$i] -ForegroundColor $Color[$i] -NoNewLine }  

  } 

  else { 

    for ($i = 0; $i -lt $Color.Length ; $i++) { Write-Host $Text[$i] -ForegroundColor $Color[$i] -NoNewLine } 

    for ($i = $Color.Length; $i -lt $Text.Length; $i++) { Write-Host $Text[$i] -ForegroundColor $DefaultColor -NoNewLine } 

  } 

  Write-Host 

  if ($LinesAfter -ne 0) { for ($i = 0; $i -lt $LinesAfter; $i++) { Write-Host "`n" } }  # Add empty line after 

  if ($LogFile -ne "") { 

    $TextToFile = "" 

    for ($i = 0; $i -lt $Text.Length; $i++) { 

      $TextToFile += $Text[$i] 

    } 

    Write-Output "[$([datetime]::Now.ToString($TimeFormat))]$TextToFile" | Out-File $LogFile -Encoding unicode -Append 

  } 

} 

function get($cmd, $appName) { 

  switch ($cmd) { 

    'app' { 

      Write-Host "All of apps:" -ForegroundColor Green 

      Get-Command -CommandType Application 

    } 

    'name' { 

      Get-Command $appName 

    } 

    'help' { 

      Write-Color -Text "app", " --> get list of all apps" -Color Green, Blue 

      Write-Color -Text "name", " app_name", " -> get current app info" -Color Green, Yellow, Blue 

      Write-Color -Text "     Ex: get name code // get detail info of vscode" -Color Yellow 

    } 

    Default { 

      iex "Get-$cmd" 

    } 

  } 

} 

function open ($app) { 

  start $app 

} 

function touch {
  param([string]$file)
  if (Test-Path $file) {
    # Cập nhật dấu thời gian nếu tệp tồn tại
    Set-ItemProperty -Path $file -Name LastWriteTime -Value (Get-Date)
    Write-Host "$file" -NoNewline   -ForegroundColor Green 
    Write-Host " existed"  -NoNewline
  }
  else {
    # Tạo tệp mới nếu nó không tồn tại
    New-Item -Path $file -ItemType File | Out-Null
    Write-Host "Created " -NoNewline
    Write-Host "$file" -ForegroundColor Green -NoNewline
  }
}
