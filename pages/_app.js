import '../styles/globals.css';
import { TinderProvider } from '../context/TinderContext';
import { MoralisProvider } from "react-moralis";



function MyApp({ Component, pageProps }) {

  return (
    <MoralisProvider appId="YfwTKbs7Bx0FQYEiAwcoUorRNnyHSnnTDrvZ5XkN" serverUrl="https://6122g6f4jgmb.usemoralis.com:2053/server">
      <TinderProvider>
        <Component {...pageProps} />
      </TinderProvider>
    </MoralisProvider>
  )
}

export default MyApp
