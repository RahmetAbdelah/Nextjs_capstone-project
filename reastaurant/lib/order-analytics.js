import { dishes } from "./dishes.js";

// The demo checkout stores dish names and quantities, not a separate receipt.
// Calculate the menu-price total on the server from dish names we recognize.
export function getOrderRevenue(orderDetails = "") {
  return orderDetails.split(",").reduce((total, part) => {
    const match = part.trim().match(/^(.+?)\s*[×x]\s*(\d+)$/i);
    if (!match) return total;

    const dish = dishes.find((item) => item.name.toLowerCase() === match[1].trim().toLowerCase());
    return dish ? total + dish.price * Number(match[2]) : total;
  }, 0);
}