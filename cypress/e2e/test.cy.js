/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe("과제 체점", () => {
  // Cypress starts out with a blank slate for each test
  // so we must tell it to visit our website with the `cy.visit()` command.
  // Since we want to visit the same URL at the start of all our tests,
  // we include it in our beforeEach function so that it runs before each test
  beforeEach(() => {
    cy.visit("http://localhost:5500");
  });

  context("level 1 검색후 실행", () => {
    it("사자 검색", () => {
      cy.get('[data-cy="input"]').type("lion");
      cy.get('[data-cy="icon"]').click();
      cy.get('[data-cy="nfts"]').children().should("have.length", 6);
    });
    it("강아지 검색", () => {
      cy.get('[data-cy="input"]').type("dog");
      cy.get('[data-cy="icon"]').click();
      cy.get('[data-cy="nfts"]').children().should("have.length", 4);
    });
    it("고양이 검색", () => {
      cy.get('[data-cy="input"]').type("cat");
      cy.get('[data-cy="icon"]').click();
      cy.get('[data-cy="nfts"]').children().should("have.length", 4);
    });
  });

  context("level 2 정렬", () => {
    it("사자 검색 후 정렬", () => {
      cy.get('[data-cy="input"]').type("lion");
      cy.get('[data-cy="icon"]').click();

      cy.get('[data-cy="price"]').click();
      cy.get('[data-cy="nfts"]').children().first().contains("0.816");

      cy.get('[data-cy="name"]').click();
      cy.get('[data-cy="nfts"]').children().first().contains("Lion 13");
    });
    it("강아지 검색 후 정렬", () => {
      cy.get('[data-cy="input"]').type("dog");
      cy.get('[data-cy="icon"]').click();

      cy.get('[data-cy="price"]').click();
      cy.get('[data-cy="nfts"]').children().first().contains("0.900");

      cy.get('[data-cy="name"]').click();
      cy.get('[data-cy="nfts"]').children().first().contains("Dog 13");
    });

    it("고양이 검색 후 정렬", () => {
      cy.get('[data-cy="input"]').type("cat");
      cy.get('[data-cy="icon"]').click();

      cy.get('[data-cy="price"]').click();
      cy.get('[data-cy="nfts"]').children().first().contains("0.566");

      cy.get('[data-cy="name"]').click();
      cy.get('[data-cy="nfts"]').children().first().contains("Cat 12");
    });
  });

  context("level 3 자동완성 창", () => {
    it("사자 자동완성 입력후 클릭", () => {
      cy.get('[data-cy="input"]').type("lio");

      cy.get('[data-cy="autocompletes"]').children().should("have.length", 6);
      cy.get('[data-cy="autocompletes"]').children().first().click();

      cy.get('[data-cy="nfts').children().should("have.length", 1);
    });

    it("강아지 자동완성 입력후 클릭", () => {
      cy.get('[data-cy="input"]').type("dog");

      cy.get('[data-cy="autocompletes"]').children().should("have.length", 4);
      cy.get('[data-cy="autocompletes"]').children().first().click();
      cy.get('[data-cy="nfts').children().should("have.length", 1);
    });

    it("고양이 자동완성 입력후 클릭", () => {
      cy.get('[data-cy="input"]').type("cat");

      cy.get('[data-cy="autocompletes"]').children().should("have.length", 4);
      cy.get('[data-cy="autocompletes"]').children().first().click();
      cy.get('[data-cy="nfts').children().should("have.length", 1);
    });
  });
});
