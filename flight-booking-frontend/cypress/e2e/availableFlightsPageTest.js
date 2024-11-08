describe('Flight Booking Page', () => {
    beforeEach(() => {
      // Visit the flights page
      cy.visit('http://localhost:3000/flights');
    });
  
    it('should book a flight successfully', () => {
      // Wait for the headline to appear, indicating the flights have loaded
      cy.contains('✈️ Available Flights ✈️').should('exist');
  
      // Check if the first flight is present
      cy.contains('Flight A').should('exist');
  
      // Click the "Book Flight" button for the first flight
      cy.get('.bg-green-500').first().click();
  
      // Assert that the success SweetAlert message appears
      cy.get('.swal2-title').should('have.text', 'Success!');
      cy.get('.swal2-confirm').click();
  
      // Check if the flight was removed from the list after booking
      cy.contains('Flight A').should('not.exist');
    });
  });