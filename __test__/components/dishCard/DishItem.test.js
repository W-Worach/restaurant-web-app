import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DishItem from "@/components/dishCard/DishItem";

const mockItem = {
  id: 1,
  name: "Test Dish",
  description: "Test description",
  price: 10,
  availability: true,
};

const addToCart = jest.fn();

describe("DishItem Component Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders dish item correctly with add to cart button", () => {
    render(
      <DishItem item={mockItem} addToCart={addToCart} showAddToCart={true} />
    );

    expect(screen.getByAltText(mockItem.name)).toBeInTheDocument();
    expect(screen.getByText(mockItem.name)).toBeInTheDocument();
    expect(screen.getByText(mockItem.description)).toBeInTheDocument();
    expect(screen.getByText(`${mockItem.price} zł`)).toBeInTheDocument();
    expect(screen.queryByText("Currently Unavailable")).toBeNull();
    const addToCartButton = screen.getByRole("button", { name: "Add to Cart" });
    expect(addToCartButton).toBeInTheDocument();
  });

  it("does not render add to cart button when showAddToCart is false", () => {
    render(
      <DishItem item={mockItem} addToCart={addToCart} showAddToCart={false} />
    );

    const addToCartButton = screen.queryByRole("button", {
      name: "Add to Cart",
    });
    expect(addToCartButton).toBeNull();
  });

  it("calls addToCart when add to cart button is clicked", () => {
    render(
      <DishItem item={mockItem} addToCart={addToCart} showAddToCart={true} />
    );

    const addToCartButton = screen.getByRole("button", { name: "Add to Cart" });
    fireEvent.click(addToCartButton);
    expect(addToCart).toHaveBeenCalledWith(mockItem);
  });

  it("renders 'Currently Unavailable' message when item availability is false", () => {
    const unavailableItem = { ...mockItem, availability: false };
    render(
      <DishItem
        item={unavailableItem}
        addToCart={addToCart}
        showAddToCart={true}
      />
    );

    expect(screen.getByText("Currently Unavailable")).toBeInTheDocument();
  });
});
