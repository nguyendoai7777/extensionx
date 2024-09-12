## vscode
## 	"terminal.external.windowsExec": "\"C:\\Program Files\\PowerShell\\7\\pwsh.exe\" -WorkingDirectory ~",
function which($name) { 
  Get-Command $name | Select-Object -ExpandProperty Definition 
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

function grc([string]$cm) {
  git reset $cm
}

function grhc {  
  param([string]$cm)  
  process {  
    git reset --hard $cm  
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
