import { describe, it, expect, beforeEach } from "vitest";
import { addTask, deleteTask, toggleTask, loadTasks } from "./app.js";

beforeEach(() => {
  localStorage.clear();
});

describe("Task System", () => {
  it("adds task", () => {
    addTask("Task 1");
    expect(loadTasks().length).toBe(1);
  });

  it("deletes task", () => {
    addTask("Task 1");
    const id = loadTasks()[0].id;
    deleteTask(id);
    expect(loadTasks().length).toBe(0);
  });

  it("toggles task", () => {
    addTask("Task 1");
    const id = loadTasks()[0].id;
    toggleTask(id);
    expect(loadTasks()[0].completed).toBe(true);
  });
});