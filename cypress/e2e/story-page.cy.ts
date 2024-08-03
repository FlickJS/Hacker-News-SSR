describe("Story Comments Tests", () => {
  it("should click the first story and verify comments", () => {
    cy.visit("/");

    cy.get('[data-test-id="story"]').first().click();

    cy.get("p.my-4.text-gray-700.text-lg.font-semibold")
      .invoke("text")
      .then((text) => {
        const commentMatch = text.match(/Comments:\s*(\d+)/);
        const commentCount = commentMatch ? parseInt(commentMatch[1], 10) : 0;

        if (commentCount === 0) {
          cy.contains("No comments available.").should("be.visible");
        } else {
          const minExpectedComments = Math.ceil(commentCount * 0.9);

          cy.get("li.comment", { timeout: 10000 }).should(($comments) => {
            expect($comments.length).to.be.at.least(minExpectedComments);
          });
        }
      });
  });
});
