import {Col, Container, Row} from "@nextui-org/react"
import {darkTheme} from "../theme/shared";
import {appears} from "../../utils/animations";
import {StyledImg} from "../components/primitives";
import Head from "next/head";

interface DefaultLayoutProps {
    title?: string;
}

const DefaultLayout: React.FC<React.PropsWithChildren<DefaultLayoutProps>> = ({children, title}) => {
    return (
        <>
            <Head>
                <title>{title || 'My Books History'}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>

            <Container>
                <Row>
                    <Col
                        css={{
                            zIndex: '$10',
                            maxWidth: '100%',
                        }}
                    >
                        {children}
                    </Col>
                    <StyledImg
                        className="docs__gradient-blue"
                        src="/gradient-left-dark.svg"
                        alt="gradient blue background"
                        css={{
                            display: 'none',
                            opacity: 0,
                            position: 'fixed',
                            zIndex: '$1',
                            bottom: '-50%',
                            left: '-10%',
                            right: '-50%',
                            animation: `${appears} 200ms 100ms ease forwards`,
                            [`.${darkTheme} &`]: {
                                display: 'block'
                            }
                        }}
                    />
                    <StyledImg
                        className="docs__gradient-violet"
                        src="/gradient-right-dark.svg"
                        alt="gradient violet background"
                        css={{
                            display: 'none',
                            top: 0,
                            opacity: 0,
                            position: 'fixed',
                            animation: `${appears} 200ms 100ms ease forwards`,
                            '@lg': {
                                top: '-50%',
                                right: '-50%'
                            },
                            '@mdMax': {
                                top: '-35%',
                                right: '-45%'
                            },
                            [`.${darkTheme} &`]: {
                                display: 'block'
                            }
                        }}
                    />
                </Row>
            </Container>
        </>
    );
};

export default DefaultLayout;