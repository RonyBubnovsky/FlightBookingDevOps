describe('Search Flights', () => {
    it('should show a flight when searched by name', () => {
      // Visit the flights page
      cy.visit('http://localhost:3000/flights');
  
      // Find the search input and search for a flight name (e.g., 'American Airlines AA100')
      cy.get('input[name="name"]').type('American Airlines AA100');
  
      // Submit the search form
      cy.get('form').submit();
  
      // Verify that the flight with the name 'American Airlines AA100' is displayed
      cy.contains('American Airlines AA100').should('exist');
    });
  });
  