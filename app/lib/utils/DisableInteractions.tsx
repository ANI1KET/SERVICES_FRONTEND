// "use client";

// import { useEffect } from "react";

// const PreventInteractions = () => {
//   useEffect(() => {
//     const disableContextMenu = (e: MouseEvent) => e.preventDefault();

//     const handleKeyDown = (e: KeyboardEvent) => {
//       // Prevent F12
//       if (e.key === "F12") e.preventDefault();

//       // Prevent Ctrl+Shift+I, Ctrl+Shift+J, and Ctrl+U
//       if (
//         (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) ||
//         (e.ctrlKey && e.key === "U")
//       ) {
//         e.preventDefault();
//       }
//     };

//     const detectDevTools = () => {
//       const threshold = 100; // Milliseconds
//       const start = performance.now();
//       debugger; // Pauses execution if DevTools is open
//       const duration = performance.now() - start;

//       if (duration > threshold) {
//         alert("Developer tools are open!");
//       }
//     };

//     // Set up event listeners
//     window.addEventListener("contextmenu", disableContextMenu);
//     window.addEventListener("keydown", handleKeyDown);

//     const interval = setInterval(detectDevTools, 1000);

//     // Cleanup on unmount
//     return () => {
//       window.removeEventListener("contextmenu", disableContextMenu);
//       window.removeEventListener("keydown", handleKeyDown);
//       clearInterval(interval);
//     };
//   }, []);

//   return null; // No UI rendering
// };

// export default PreventInteractions;

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const DetectDevToolsAndRedirect = () => {
  const router = useRouter(); // Use the router for programmatic navigation

  useEffect(() => {
    let devToolsOpen = false;

    // Function to handle redirection to the warning page
    const redirectToWarning = () => {
      if (window.location.pathname !== "/warning") {
        // Ensure we're not already on the warning page
        router.push("/warning"); // Redirect to warning page
      }
    };

    // Check if developer tools are open by monitoring window size
    const detectDevTools = () => {
      // Check window dimensions to detect dev tools (more common method)
      const threshold = 160; // A threshold for the window height (can be adjusted)
      const width =
        window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold;

      if (width) {
        if (!devToolsOpen) {
          devToolsOpen = true; // Mark that developer tools are detected
          redirectToWarning(); // Redirect to the warning page
        }
      } else {
        devToolsOpen = false; // Reset if dev tools are closed
      }
    };

    // Function to handle blocking right-click
    const handleRightClick = (e: MouseEvent) => {
      e.preventDefault(); // Prevent the context menu from appearing
      // redirectToWarning(); // Redirect to the warning page
    };

    // Function to block developer tool shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Block F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
      if (
        e.key === "F12" ||
        (e.ctrlKey &&
          e.shiftKey &&
          (e.key === "I" || e.key === "J" || e.key === "C")) ||
        (e.ctrlKey && e.key === "U")
      ) {
        e.preventDefault();
        // redirectToWarning(); // Redirect to the warning page
      }
    };

    // Set up event listeners only if we're not on the warning page
    if (window.location.pathname !== "/warning") {
      window.addEventListener("contextmenu", handleRightClick);
      window.addEventListener("keydown", handleKeyDown);

      // Periodically check for developer tools opening
      const intervalId = setInterval(detectDevTools, 1000);

      // Cleanup the interval and event listeners when the component unmounts
      return () => {
        window.removeEventListener("contextmenu", handleRightClick);
        window.removeEventListener("keydown", handleKeyDown);
        clearInterval(intervalId);
      };
    }

    return undefined; // If on the warning page, don't run any detection
  }, [router]);

  return null; // No UI rendering, only side effects for blocking actions
};

export default DetectDevToolsAndRedirect;
