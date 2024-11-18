describe('My Bookings Page', () => {
    beforeEach(() => {
      // Visit the my bookings page
      cy.visit('http://localhost:3000/my-bookings');
    });
  
    it('should cancel a flight booking successfully', () => {
      // Click the "Cancel Booking" button for the first booking
      cy.get("[data-cy='cancelflight_button']").first().click();
  
      // Confirm that the success SweetAlert message appears
      cy.get('.swal2-title').should('have.text', 'Booking Canceled');
      cy.get('.swal2-confirm').click();

    });
  });
  