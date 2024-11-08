describe('My Bookings Page', () => {
    beforeEach(() => {
      // Visit the my bookings page
      cy.visit('http://localhost:3000/my-bookings');
    });
  
    it('should cancel a flight booking successfully', () => {
      // Wait for the headline to appear, indicating the page has loaded
      cy.contains('My Flights').should('exist');
  
      // Ensure that Flight A is present in the bookings list
      cy.contains('Flight A').should('exist');
  
      // Click the "Cancel Booking" button for the first booking
      cy.get("[data-cy='cancelflight_button']").first().click();
  
      // Assert that the success SweetAlert message appears
      cy.get('.swal2-title').should('have.text', 'Booking Canceled');
      cy.get('.swal2-confirm').click();
  
      // Verify that Flight A has been removed from the bookings list
      cy.contains('Flight A').should('not.exist');
    });
  });
  