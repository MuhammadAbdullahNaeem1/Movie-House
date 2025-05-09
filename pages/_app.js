import "@/styles/globals.css";
import { ThemeContextProvider } from '../components/ThemeContext';
import ToggleButton from '../components/ToggleButton';

export default function App({ Component, pageProps }) {
  return (
    <ThemeContextProvider>
      <Component {...pageProps} />
      <ToggleButton />
    </ThemeContextProvider>
  );
}
