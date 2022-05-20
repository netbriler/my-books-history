import {CssBaseline} from "@nextui-org/react";
import Document, {Head, Html, Main, NextScript} from "next/document";

// @ts-ignore
class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return {
            ...initialProps,
            styles: <>{initialProps.styles}</>
        };
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="icon" href="/logo-small.svg" type="image/svg+xml"/>
                    {CssBaseline.flush()}
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        );
    }
}

export default MyDocument;
