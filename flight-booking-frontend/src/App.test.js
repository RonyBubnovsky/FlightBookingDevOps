import { render, screen } from '@testing-library/react';
import App from './App';

// A test to check if the "learn react" link is displayed in the App component
test('renders learn react link', () => {
  // Render the App component for testing
  render(<App />);
  // Search for an element that contains the text "learn react" (case-insensitive)
  const linkElement = screen.getByText(/learn react/i);
  // Check that the element exists
  expect(linkElement).toBeInTheDocument();
});
