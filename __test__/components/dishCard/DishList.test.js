import React from "react";
import { render, screen } from "@testing-library/react";
import DishList from "@/components/dishCard/DishList";

const mockItems = [
  {
    id: 1,
    name: "Test Dish 1",
    description: "Test description 1",
    price: 10,
    availability: true,
  },
  {
    id: 2,
    name: "Test Dish 2",
    description: "Test description 2",
    price: 20,
    availability: false,
  },
];

const addToCart = jest.fn();

describe("DishList Component Tests", () => {
  it("renders all dish items correctly", () => {
    render(
      <DishList items={mockItems} addToCart={addToCart} showAddToCart={true} />
    );

    expect(screen.getAllByRole("listitem")).toHaveLength(mockItems.length);

    mockItems.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(item.description)).toBeInTheDocument();
      expect(screen.getByText(`${item.price} zł`)).toBeInTheDocument();
    });
  });

  it("passes correct props to DishItem component", () => {
    render(
      <DishList items={mockItems} addToCart={addToCart} showAddToCart={true} />
    );

    const dishItems = screen.getAllByRole("listitem");

    dishItems.forEach((dishItem, index) => {
      const expectedItemAttribute = JSON.stringify(mockItems[index]);
      expect(dishItem.getAttribute("item")).toBe(expectedItemAttribute);
    });
  });

  it("displays 'Currently Unavailable' for dish items with unavailable availability", () => {
    render(
      <DishList items={mockItems} addToCart={() => {}} showAddToCart={true} />
    );

    mockItems.forEach((item) => {
      if (!item.availability) {
        expect(screen.getByText("Currently Unavailable")).toBeInTheDocument();
      }
    });
  });
});
