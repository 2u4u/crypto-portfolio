# Project Documentation

## Technical Overview

This project follows a **[feature-sliced approach](https://feature-sliced.design/)** for code organization and architecture. It utilizes the following technologies:

- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Form Handling:** [Formik](https://formik.org/)
- **UI Library:** [Material-UI (MUI)](https://mui.com/)
- **CSS Framework:** [Tailwind CSS](https://tailwindcss.com/)

### API Handling

The project includes a **mock API** implemented in `shared/api/mock.service.ts`. This service simulates API interactions using **local storage**. For demonstration purposes, it introduces a **1-second delay** before returning responses.

## Logical Overview

### Portfolio Tracking

Instead of tracking cryptocurrency assets directly, the application **tracks all transactions** (buy/sell) to provide a more detailed portfolio history. Users can:

- **Add, edit, and remove transactions.**
- **Select a cryptocurrency** from a list fetched via the **CoinGecko API**.
- **Specify the quantity of coins** bought or sold.
- The **current price auto-updates** after selecting a coin but can be manually adjusted.
- Transactions are recorded in a transaction list and update the portfolio overview accordingly.

### Transactions List

- Displays all transactions.
- Can be **filtered** by transaction type (buy/sell) and coin.
- Supports **sorting** by price and total assets.
- Prices are **compared against USD**.

### Assets List

- Summarizes all transactions by direction.
- Displays the **total quantity** of assets and their **current price**.
- Allows viewing **detailed asset information** and **historical data**.
- All currency data is fetched dynamically from **CoinGecko**.

## Design Decisions & Considerations

### UX/UI

- Considered using a **list-style layout** for tables on mobile but ultimately made them **horizontally scrollable** based on **common UX best practices**.

### Performance Optimizations

- **Virtualized lists and tables** are used to enhance performance.
- Some **code duplication** exists but has been minimized by extracting **reusable components**.

## Running the Project

To start the project locally:

1. Rename `.env.example` to `.env` and insert your **CoinGecko API key**.
2. Install dependencies and start the development server:

```sh
# Install dependencies
yarn install

# Start development server
yarn dev

# Open the application in the browser
# Navigate to:
http://localhost:5173/
```

### Running with Docker

The project also includes **Docker Compose**. To run it:

1. Edit the `VITE_CRYPTO_API_KEY` value in `docker-compose.yaml`.
2. Start the container with:

```sh
docker compose up
```

3. Once the Docker container is running, navigate to:

```
http://localhost:3000/
```
