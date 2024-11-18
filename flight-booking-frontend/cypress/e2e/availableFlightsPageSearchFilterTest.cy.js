describe('Search Flights', () => {

  // Test Case 1: Search flights by name
  it('should show a flight when searched by name', () => {
    // Step 1: Visit the flights page
    cy.visit('http://localhost:3000/flights');
    
    // Step 2: Type a specific flight name into the search input (in our case 'American Airlines AA100')
    cy.get('input[name="name"]').type('American Airlines AA100');
    
    // Step 3: Submit the search form
    cy.get('form').submit();
    
    // Step 4: Verify that the flight with the name 'American Airlines AA100' is displayed
    cy.contains('American Airlines AA100').should('exist');
  });

  // Test Case 2: Search flights by departure city
  it('should show flights when searched by departure city', () => {
    // Step 1: Visit the flights page
    cy.visit('http://localhost:3000/flights');
    
    // Step 2: Type a specific departure city (in our case 'New York') into the departure city input
    cy.get('input[name="departure"]').type('New York');
    
    // Step 3: Submit the search form
    cy.get('form').submit();
    
    // Step 4: Verify that all displayed flights have 'New York' as the departure city
    // The 'departure_destination' data-cy attribute helps target the departure city
    cy.get('[data-cy="departure_destination"]').each(($el) => {
      expect($el.text()).to.include('New York to');
    });
  });

  // Test Case 3: Search flights by destination city (Updated to London)
  it('should show flights when searched by destination city', () => {
    // Step 1: Visit the flights page
    cy.visit('http://localhost:3000/flights');
    
    // Step 2: Type a specific destination city (in our case 'London') into the destination city input
    cy.get('input[name="destination"]').type('London'); // Changed destination city to London
    
    // Step 3: Submit the search form
    cy.get('form').submit();
    
    // Step 4: Verify that all displayed flights have 'London' as the destination city
    // The 'departure_destination' data-cy attribute helps target the destination city
    cy.get('[data-cy="departure_destination"]').each(($el) => {
      expect($el.text()).to.include('to London'); // Verify the destination city is London
    });
  });

  // Test Case 4: Search flights within a specified price range
  it('should show flights within the specified price range', () => {
    // Step 1: Visit the flights page
    cy.visit('http://localhost:3000/flights');

    // Step 2: Set the minimum and maximum price filters
    const minPrice = 100;
    const maxPrice = 500;
    cy.get('input[name="minPrice"]').type(minPrice);
    cy.get('input[name="maxPrice"]').type(maxPrice);

    // Step 3: Submit the search form
    cy.get('form').submit();

    // Step 4: Verify that all displayed flights are within the specified price range
    // Using the 'flight_price' data-cy attribute to target price elements
    cy.get('[data-cy="flight_price"]').each(($el) => {
      const priceText = $el.text().replace('$', ''); // Remove the '$' sign
      const price = parseFloat(priceText);

      // Ensure the price is between the specified min and max price
      expect(price).to.be.within(minPrice, maxPrice);
    });
  });

});
