// utils/calculations.ts

/**
 * Calculate the percentage obtained.
 * @param totalObtained - The total marks obtained by the learner.
 * @param overRollMark - The total possible marks.
 * @returns The percentage as a string with two decimal places.
 */
export function calculatePercentage(totalObtained: number, overRollMark: number): string {
    if (overRollMark === 0) return "0.00"; // Avoid division by zero
    const percentage = (totalObtained / overRollMark) * 100;
    return percentage.toFixed(2); // Returns a string with two decimal places
  }
  
  /**
   * Determine the status based on the percentage.
   * @param percentage - The percentage obtained by the learner.
   * @returns The status as "Pass" or "Fail".
   */
  export function calculateStatus(percentage: number): string {
    const passMark = 50; // Define the pass threshold (e.g., 50%)
    return percentage >= passMark ? "Pass" : "Fail";
  }
  