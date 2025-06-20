#!/bin/bash
set -e

echo "🔍 Checking for nvm..."

# 1. nvm 설치 여부 확인 및 설치
if ! command -v nvm &> /dev/null && [ ! -s "$NVM_DIR/nvm.sh" ]; then
  echo "❌ nvm not found. Trying to install..."

  if command -v brew &> /dev/null; then
    echo "🍺 Homebrew detected. Installing nvm via brew..."
    brew install nvm

    export NVM_DIR="${XDG_CONFIG_HOME:-$HOME/.config}/nvm"
    mkdir -p "$NVM_DIR"

    [ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"
    [ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"

    echo "📢 Tip: add these lines to your shell profile (~/.zshrc or ~/.bashrc):"
    echo "  export NVM_DIR=\"$NVM_DIR\""
    echo "  [ -s \"/opt/homebrew/opt/nvm/nvm.sh\" ] && \. \"/opt/homebrew/opt/nvm/nvm.sh\""
    echo "  [ -s \"/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm\" ] && \. \"/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm\""
  else
    echo "🌐 Homebrew not found. Installing nvm via curl script..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
  fi
else
  echo "✅ nvm is already installed."
fi
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# 2. .nvmrc에 정의된 Node 버전 사용
echo "📦 Using Node version from .nvmrc..."
nvm install
nvm use

# 3. corepack enable
echo "🚀 Enabling corepack..."
corepack enable

# 4. package.json에서 packageManager 파싱
PM=$(node -p "require('./package.json').packageManager" | tr -d '"')
PM_VER=$(echo "$PM" | cut -d@ -f2)

echo "📦 Preparing pnpm@$PM_VER via corepack..."
corepack prepare "pnpm@$PM_VER" --activate

# 5. pnpm install
echo "⚡ Running pnpm install..."
pnpm install

echo "✅ Environment setup complete!"

set +e