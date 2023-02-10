/* eslint-disable */
import "@babel/polyfill";
import { login, logout } from "./login";
import { updateSettings } from "./updateSettings";
import { signup } from "./signup";
import { create } from "./create";

// DOM ELEMENTS
const loginForm = document.querySelector(".form--login");
const logOutBtn = document.querySelector(".nav-login--logout");
const UserDataForm = document.querySelector(".form-name");
const UserPasswordForm = document.querySelector(".form-password");
const signupForm = document.querySelector(".form--signup");
const createForm = document.querySelector(".form-newBenefit");

// DELEGATION

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
  });
}

if (logOutBtn) logOutBtn.addEventListener("click", logout);

if (UserDataForm) {
  UserDataForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const firstname = document.getElementById("firstname").value;
    const email = document.getElementById("email").value;
    updateSettings({ name, firstname, email }, "data");
  });
}

if (UserPasswordForm) {
  UserPasswordForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    document.querySelector(".btn--save-password").textContent = "Chargement...";
    const passwordCurrent = document.getElementById("password-current").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("password-confirm").value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      "password"
    );
    document.querySelector(".btn--save-password").textContent = "Valider";
    document.getElementById("password-current").value = "";
    document.getElementById("password").value = "";
    document.getElementById("password-confirm").value = "";
  });
}

if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("new-name").value;
    const firstname = document.getElementById("new-firstname").value;
    const email = document.getElementById("new-email").value;
    const password = document.getElementById("new-password").value;
    const passwordConfirm = document.getElementById(
      "new-passwordConfirm"
    ).value;
    signup(name, firstname, email, password, passwordConfirm);
  });
}

if (createForm) {
  createForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const type = document.getElementById("new-type").value;
    const title = document.getElementById("new-title").value;
    const description = document.getElementById("new-description").value;
    const price = document.getElementById("new-price").value;
    create(type, title, description, price);
  });
}
