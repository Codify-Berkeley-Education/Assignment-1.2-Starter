import { describe, expect, it } from "vitest";
const { execSync } = require("child_process");

describe("Git Tests", () => {
  it("file1.txt has correct contents", () => {
    // Execute the command
    let output = execSync("cat file1.txt").toString();
    const expected = "You are student number 3";

    expect(output.includes(expected)).toBeTruthy();
  });

  it("Pull Requests 1 and 2 are closed", () => {
    // Check if PR 1 is closed
    let output = execSync("gh pr view 1 --json closed").toString();
    const expected = { closed: true };
    expect(output.includes(expected)).toBeTruthy();

    // Check if PR 2 is closed
    output = execSync("gh pr view 2 --json closed").toString();
    expect(output.includes(expected)).toBeTruthy();
  });

  it("Check for commits into main from merged pull requests", () => {
    // Check the git log
    let output = execSync("git log").toString();
    const expected1 = "Merge pull request #1";
    const expected2 = "Merge pull request #2";
    expect(output.includes(expected1)).toBeTruthy();
    expect(output.includes(expected2)).toBeTruthy();
  });

  it("Ensure there is only one active branch", () => {
    // Fetch and Pull All Branches
    execSync("git fetch --all");
    execSync("git pull --all");

    // Check if there is only one active branch
    let output = execSync("git branch").toString();
    const expected = "* main";
    expect(output.includes(expected)).toBeTruthy();
  });
});
