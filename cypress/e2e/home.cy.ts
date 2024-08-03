describe("Pagination Tests", () => {
  it("should load the homepage and check for 15 stories", () => {
    cy.visit("/");
    cy.get('[data-test-id="story"]').should("have.length", 15);
  });

  it("should navigate through pagination and check story count", () => {
    cy.visit("/");
    cy.scrollTo("bottom");
    cy.get('nav[role="navigation"][aria-label="Pagination Navigation"]')
      .find('a[aria-label="Page 2"]')
      .click();
    cy.url().should("include", "?page=2");
    cy.get('[data-test-id="story"]').should("have.length", 15);
    cy.get('a[aria-label="Next Page"]').click();
    cy.url().should("include", "?page=3");
    cy.get('[data-test-id="story"]').should("have.length", 15);
    cy.get('a[aria-label="Previous Page"]').click();
    cy.url().should("include", "?page=2");
    cy.get('[data-test-id="story"]').should("have.length", 15);
  });
});
