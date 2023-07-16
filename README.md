# Fast-React-Pizza

Fast-React-Pizza is a React-based web app for ordering pizzas. It allows users to easily add items to the cart, remove items, adjust quantities, clear the cart, and prioritize orders. By filling out a simple form, users can customize their pizza orders and place them quickly. It's a user-friendly and efficient way to order delicious pizzas online.

## Installation

1. Make sure you have [Node.js](https://nodejs.org) installed on your system.
2. Clone this repository:

```shell
git clone https://github.com/YagnikAkbari2/fast-react-pizza.git
```

3. Navigate to the project directory:

```shell
cd fast-react-pizza
```

4. Install the dependencies:

```shell
npm install
```

5. Start the development server:

```shell
npm run dev
```

## API Configuration

- API Url :- https://react-fast-pizza-api.onrender.com/api/menu

The following endpoints are available:

- /menu - Retrieves the pizza menu.
- /order/{orderId} - Retrieves information about a specific order. Replace {orderId} with the dynamically generated order ID.

## Usage

- order from the available pizza options.
- Click the "Add to Cart" button to add pizzas to your cart.
- Use the increase and decrease buttons to adjust the quantity of pizzas in the cart.
- To remove a pizza from the cart, click the "Delete" button.
- To clear the entire cart, click the "Clear Cart" button.
- Fill out the order form to order your pizza and proceed to place the order.

  ## Note
- this app doesn't contain login/signup module 
- this application does not utilize a database. Instead, it fetches pizza data from a REST API.

## [Demo](https://fast-react-pizza-two.vercel.app/)
