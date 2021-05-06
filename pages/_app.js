import '../styles/globals.css'
import Layout from '../components/Layout';
import 'semantic-ui-css/semantic.min.css';
import Link from 'next/link';

function MyApp({ Component, pageProps }) {
  return <Layout>
    <Component {...pageProps} />
  </Layout>
}

export default MyApp
