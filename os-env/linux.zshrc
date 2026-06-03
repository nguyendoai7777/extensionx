# require package: zsh, ohmyzsh, tilix, git, zsh-autosuggestions, zsh-syntax-highlighting, `apt install fzf`

if [ $TILIX_ID ] || [ $VTE_VERSION ]; then
        source /etc/profile.d/vte.sh
fi

export ZSH="$HOME/.oh-my-zsh"
ZSH_THEME="robbyrussell"

plugins=(
  git
  zsh-autosuggestions
  zsh-syntax-highlighting
)

source $ZSH/oh-my-zsh.sh

# ==============================================================================
# TÀI LIỆU KỸ THUẬT: BỘ BIẾN ĐỔI PHÍM TẮT (ALIASES & FUNCTIONS) CHO ZSH / UBUNTU
# ==============================================================================

ZSH_COLOR_BLUE="\e[34m"
ZSH_COLOR_GREEN="\e[32m"
ZSH_COLOR_RESET="\e[0m"

cls() { command clear; }

# ------------------------------------------------------------------------------
# 🍞 BUN ALIASES & FUNCTIONS
# ------------------------------------------------------------------------------
bi() { bun install; }

ba() {
  if [ "$1" = "-D" ]; then
    echo -e "${ZSH_COLOR_BLUE}Install to devDependencies${ZSH_COLOR_RESET}"
    shift
    bun add -D "$@"
  else
    echo -e "${ZSH_COLOR_GREEN}Install to dependencies${ZSH_COLOR_RESET}"
    bun add "$@"
  fi
}

bd() { bun remove "$@"; }
br() { bun run "$1"; }
bs() { bun start; }

# ------------------------------------------------------------------------------
# 📦 PNPM ALIASES & FUNCTIONS
# ------------------------------------------------------------------------------
pi() { pnpm install; }

pa() {
  if [ "$1" = "-D" ]; then
    echo -e "${ZSH_COLOR_BLUE}Install to devDependencies${ZSH_COLOR_RESET}"
    shift
    pnpm add -D "$@"
  else
    echo -e "${ZSH_COLOR_GREEN}Install to dependencies${ZSH_COLOR_RESET}"
    pnpm add "$@"
  fi
}

pr() { pnpm remove "$@"; }

# ------------------------------------------------------------------------------
# 🟢 NPM ALIASES & FUNCTIONS
# ------------------------------------------------------------------------------
alias ns="npm start"
nb() { npm run build; }
nr() { npm run "$1"; }

na() {
  if [ "$1" = "-D" ]; then
    echo -e "${ZSH_COLOR_BLUE}Install to devDependencies${ZSH_COLOR_RESET}"
    shift
    npm add -D "$@"
  else
    echo -e "${ZSH_COLOR_GREEN}Install to dependencies${ZSH_COLOR_RESET}"
    npm add "$@"
  fi
}

# ------------------------------------------------------------------------------
# 🐙 GIT ALIASES & FUNCTIONS
# ------------------------------------------------------------------------------
grhc() { git reset --hard "$1"; }
grc()  { git reset "$1"; }
grho() { git reset --hard origin/"$1"; }
gmg()  { git merge "$1"; }
lg()   { lazygit; }


PATH=$HOME/.fzf/bin:$PATH
[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh

FNM_PATH="/home/mobio/.local/share/fnm"
if [ -d "$FNM_PATH" ]; then
  export PATH="$FNM_PATH:$PATH"
  eval "$(fnm env --shell zsh)"
fi

fzf_history_widget() {
  local query selected hist
  query=$BUFFER
  hist=$(fc -ln -10 1)   # last 10 history entries, no numbers
  selected=$(printf "%s\n" "$hist" | awk -v q="$query" 'q=="" || index($0,q)==1 {print}' | fzf --height=40% --reverse --prompt='History> ' --query="$query")
  if [[ -n $selected ]]; then
    BUFFER=$selected
    CURSOR=${#BUFFER}
  fi
  zle redisplay
}
zle -N fzf_history_widget
bindkey '^R' fzf_history_widget
