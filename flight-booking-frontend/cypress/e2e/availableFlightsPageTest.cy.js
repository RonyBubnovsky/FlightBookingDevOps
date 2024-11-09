describe('Flight Booking Page', () => {
    beforeEach(() => {
      // Visit the flights page
      cy.visit('http://localhost:3000/flights');
    });
  
    it('should book a flight successfully', () => {
      // Click the "Book Flight" button for the first flight
      cy.get("[data-cy='bookflight_button']").first().click();
  
      // Assert that the success SweetAlert message appears
      cy.get('.swal2-title').should('have.text', 'Success!');
      cy.get('.swal2-confirm').click();
  
    });
  });