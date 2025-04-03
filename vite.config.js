// Import necessary modules
import { defineConfig } from 'vite'; 
import react from '@vitejs/plugin-react'; // Import React plugin
import tailwindcss from '@tailwindcss/vite'; // Import Tailwind CSS plugin

// Vite configuration
export default defineConfig({
  plugins: [
    react(), // React plugin
    tailwindcss(), // Tailwind CSS plugin
  ],
});
