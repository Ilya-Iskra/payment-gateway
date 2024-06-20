import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import Theme from "./theme.json";

const chains = [mainnet];
const transports = {
  // RPC URL for each chain
  [mainnet.id]: http(import.meta.env.VITE_MAINNET_RPC_URL),
};

if (import.meta.env.VITE_SEPOLIA_RPC_URL) {
  chains.push(sepolia);
  transports[sepolia.id] = http(import.meta.env.VITE_SEPOLIA_RPC_URL);
}

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains,
    transports,

    // Required API Keys
    walletConnectProjectId: import.meta.env
      .VITE_PUBLIC_WALLETCONNECT_PROJECT_ID,

    // Required App Info
    appName: "Payment Gateway",

    // Optional App Info
    // appDescription: "Your App Description",
    // appUrl: "https://family.co", // your app's url
    // appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
);

const queryClient = new QueryClient();

const Web3Provider = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider
          customTheme={Theme}
          options={{
            embedGoogleFonts: true,
          }}
        >
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Web3Provider;
