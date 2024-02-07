import "@/styles/globals.css";
import App from 'next/app';
import UserAgentContext from "@/context/userAgentContext";

export default function MyApp({ Component, pageProps, userAgent }) {
  return (
    <UserAgentContext.Provider value={userAgent}>
      <Component {...pageProps} />
    </UserAgentContext.Provider>
  );
}

MyApp.getInitialProps = async (context) => {
  const appProps = await App.getInitialProps(context);
  const userAgent = context.ctx.req ? context.ctx.req.headers['user-agent'] : navigator.userAgent;
  return { ...appProps, userAgent };
}
