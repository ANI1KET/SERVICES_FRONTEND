export const decodeURLPlaceQuery = (query: string): string | null => {
  try {
    return atob(query);
  } catch (error) {
    console.error('Error decoding query parameter:', error);
    return null;
  }
};
