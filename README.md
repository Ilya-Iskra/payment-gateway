<div align="center">
  <h1 align="center">payment-gateway</h1>
  <br />
  <p align="center">
    a payment gateway for <a href="https://github.com/tensved/snet-matrix-framework">snet-matrix-framework</a>
  </p>
  <a href="https://ilya-iskra.github.io/payment-gateway/?id=1">View Demo</a>
  <br />
</div>

## Getting Started

### Installation

0. Install [Node.js](https://nodejs.org/en/download/package-manager) and [pnpm](https://pnpm.io/installation)
1. Clone the repo
   ```sh
   git clone https://github.com/ilya-iskra/payment-gateway.git
   cd payment-gateway
   ```
2. Install dependencies
   ```sh
   pnpm install
   ```
3. Create an `.env.local` file based on `example.env` (explained below) and add data to it
4. Build and enable hot-reloading for development
   ```sh
   pnpm dev
   ```
   Or build for production and preview the result
   ```sh
   pnpm build
   pnpm preview
   ```

### Explanation of variables in .env.local

#### App

- `VITE_URL_PATH_PREFIX` — specific path to host, e.g. for https://your.domain.com/path/to/gateway `VITE_URL_PATH_PREFIX` will be `/path/to/gateway`. If not specified, `/` will be used as the default value

#### Backend

- `VITE_BACKEND_URL` — URL of the framework. If not specified, Mock Service Worker will be used as the mocked backend (for tests only)

#### Wallet Connect

- `VITE_PUBLIC_WALLETCONNECT_PROJECT_ID` — a Project ID from [walletconnect.com](https://walletconnect.com)
- `VITE_MAINNET_RPC_URL` — URL of a Mainnet RPC
- `VITE_SEPOLIA_RPC_URL` — URL of a Sepolia RPC. It's a testnet, so it's used for testing only. If not specified, Sepolia will not be supported
