describe('Flight Booking Page', () => {
  beforeEach(() => {
    // Visit the flights page
    cy.visit('http://localhost:3000/flights');
  });

  it('should open the flights page successfully', () => {
    // Assert that the page contains the title or other specific text
    cy.url().should('include', '/flights'); // Ensure the URL is correct
  });
});
