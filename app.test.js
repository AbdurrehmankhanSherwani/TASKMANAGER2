import { describe, it, expect, beforeEach } from "vitest";
import { addTask, deleteTask, toggleTask, loadTasks } from "./app.js";

beforeEach(() => {
  localStorage.clear();
});

describe("Task System", () => {
  it("adds task", () => {
    addTask("Hello");
    expect(loadTasks().length).toBe(1);
  });

  it("deletes task", () => {
    addTask("Hello");
    const id = loadTasks()[0].id;
    deleteTask(id);
    expect(loadTasks().length).toBe(0);
  });

  it("toggles task", () => {
    addTask("Hello");
    const id = loadTasks()[0].id;
    toggleTask(id);
    expect(loadTasks()[0].completed).toBe(true);
  });
});