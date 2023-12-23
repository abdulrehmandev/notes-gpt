/**
 * Gets the initials from a given full name.
 * @param fullName - The full name from which to extract initials.
 * @returns The initials, formed by taking the first character from each part of the name.
 */
export function getInitials(fullName: string): string {
  const nameParts = fullName.split(" ");

  const initials = nameParts
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  return initials;
}
