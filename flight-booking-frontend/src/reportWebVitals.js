// Measuring performance
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Dynamically import the 'web-vitals' library to measure performance
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Call the performance functions and pass the provided callback to handle the results
      getCLS(onPerfEntry);  // How stable the page layout is
      getFID(onPerfEntry);  // How quickly the page responds to user input
      getFCP(onPerfEntry);  // How fast the first content appears
      getLCP(onPerfEntry);  // Time it takes for the biggest element to appear
      getTTFB(onPerfEntry); // How fast the server responds
    });
  }
};
export default reportWebVitals;

