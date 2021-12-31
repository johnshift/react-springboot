/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

// context("/login", () => {
//   beforeEach(() => {
//     cy.visit("/login");

//     // wait for html hydration
//     cy.wait(500);

//     cy.findByRole("button", { name: /demo/i }).as("demo-btn");
//     cy.findByRole("button", { name: /login/i }).as("login-btn");
//     cy.get('input[name="principal"]').as("principal");
//     cy.get('input[name="password"]').as("password");
//     cy.findByRole("link", { name: /create an account/i }).as("register-link");
//   });

//   it("components visibility", () => {
//     // title
//     cy.get("h1").findByText("veils").should("be.visible");

//     // subtitle
//     cy.get("h2")
//       .findByText("Share your secrets anonymously")
//       .should("be.visible");

//     // demo button
//     cy.get("@demo-btn").should("be.visible");

//     // username/email input
//     cy.get("@principal").should("be.visible");

//     // password input
//     cy.get("@password").should("have.attr", "type", "password");

//     // register link
//     cy.get("@register-link").should("have.attr", "href", "/register");

//     // login button
//     cy.get("@login-btn").should("have.attr", "type", "submit");
//   });

//   it("show info on demo", () => {
//     cy.get("@demo-btn").click();
//     cy.focused().click();

//     cy.contains(/work in progress. stay tuned!/i).should("be.visible");
//   });

//   it("error on empty", () => {
//     // login with empty fields
//     cy.login("", "");

//     // check login loading status
//     cy.loginLoading();

//     // check login errors
//     cy.loginError(/incorrect username\/email or password/i);
//   });

//   it("error on empty principal", () => {
//     // login empty principal
//     cy.login("", "demo123");

//     // check loading status
//     cy.loginLoading();

//     // check login errors
//     cy.loginError(/incorrect username\/email or password/i);
//   });

//   it("error on empty password", () => {
//     // login empty password
//     cy.login("demo", "");

//     // check loading status
//     cy.loginLoading();

//     // check login errors
//     cy.loginError(/incorrect username\/email or password/i);
//   });

//   it("error on short principal", () => {
//     // login short principal
//     cy.login("asd", "demo123");

//     // check loading status
//     cy.loginLoading();

//     // check login errors
//     cy.loginError(/incorrect username\/email or password/i);
//   });

//   it("error on short password", () => {
//     // login short password
//     cy.login("demo", "12345");

//     // check loading status
//     cy.loginLoading();

//     // check login errors
//     cy.loginError(/incorrect username\/email or password/i);
//   });

//   it("error on long principal", () => {
//     // login long principal
//     cy.login(
//       "1234123412341234123412341234123412341234123412341234123412341234x",
//       "demo123"
//     );

//     // check loading status
//     cy.loginLoading();

//     // check login errors
//     cy.loginError(/incorrect username\/email or password/i);
//   });

//   it("error on long password", () => {
//     // login long password
//     cy.login(
//       "demo",
//       "1234123412341234123412341234123412341234123412341234123412341234x"
//     );

//     // check loading status
//     cy.loginLoading();

//     // check login errors
//     cy.loginError(/incorrect username\/email or password/i);
//   });

//   it("error on non-valid username", () => {
//     // login non-valid username
//     cy.login("1!demo", "demo123");

//     // check loading status
//     cy.loginLoading();

//     // check login errors
//     cy.loginError(/incorrect username\/email or password/i);
//   });

//   it("error on non-valid email", () => {
//     // login non-valid email
//     cy.login("asdf@x.c", "demo123");

//     // check loading status
//     cy.loginLoading();

//     // check login errors
//     cy.loginError(/incorrect username\/email or password/i);
//   });

//   it("error on incorrect username", () => {
//     // login incorrect username
//     cy.login("non-existing-username", "demo1234");

//     // check loading status w/ skeleton
//     cy.loginLoading(true);

//     // check login errors
//     cy.loginError(/incorrect username\/email or password/i);
//   });

//   it("error on incorrect email", () => {
//     // login incorrect email
//     cy.login("email@example.com", "demo123");

//     // check loading status w/ skeleton
//     cy.loginLoading(true);

//     // check login errors
//     cy.loginError(/incorrect username\/email or password/i);
//   });

//   it("error on incorrect password", () => {
//     // login incorrect email
//     cy.login("demo", "demo1234");

//     // check loading status w/ skeleton
//     cy.loginLoading(true);

//     // check login errors
//     cy.loginError(/incorrect username\/email or password/i);
//   });

//   it("hide/show password", () => {
//     cy.get("@password").should("have.attr", "type", "password");
//     cy.get('[aria-label="show password"').click();
//     cy.get("@password").should("have.attr", "type", "text");
//   });

//   it("success workflow", () => {
//     // correct login
//     cy.login("demo", "demo123");

//     // check loading status w/ skeleton
//     cy.loginLoading(true);

//     // wait before redirection
//     cy.wait(1000);

//     // check if redirected on successful login
//     cy.url().should("equal", `${Cypress.config("baseUrl")}/`);

//     // check if authorization is added into localsotrage
//     cy.getAuthorization().should("exist");
//   });
// });

// context("auth-redirect '/'", () => {
//   it("redirect '/' to '/login' if not logged in", () => {
//     // delete token if exists
//     cy.removeAuthorization();

//     // visit home page
//     cy.visit("/");

//     // wait before redirection
//     cy.wait(500);

//     // check if redirected for login
//     cy.url().should("equal", `${Cypress.config("baseUrl")}/login`);
//   });

//   it("redirect '/login' to '/' if already logged in", () => {
//     // visit login page
//     cy.visit("/login");

//     // correct login
//     cy.get('input[name="principal"]').type("demo");
//     cy.get('input[name="password"]').type("demo123");
//     cy.findByRole("button", { name: /login/i }).focus().click();

//     // wait before redirection
//     cy.wait(500);

//     // check if redirected on successful login
//     cy.url().should("equal", `${Cypress.config("baseUrl")}/`);

//     // revisit login page
//     cy.visit("/login");

//     // wait buffer
//     cy.wait(500);

//     // check if redirected back to home page
//     cy.url().should("equal", `${Cypress.config("baseUrl")}/`);
//   });
// });
