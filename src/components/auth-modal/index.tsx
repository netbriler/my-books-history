import {Button, Card, Divider, Modal, Text} from "@nextui-org/react";
import React from "react";

interface AuthModalProps {
    visible: boolean;
}

export const submitHandler = () => {
    window.location.href = process.env.BASE_URL + '/oauth/google';
};

const AuthModal: React.FC<AuthModalProps> = ({visible}) => {
    return (
        <div>
            <Modal
                closeButton={false}
                preventClose
                blur
                aria-labelledby="modal-title"
                open={visible}
            >
                <Modal.Header>
                    <Text h1 id="modal-title" size={18}>
                        Connect to your account
                    </Text>
                </Modal.Header>
                <Divider/>
                <Modal.Body>
                    <Card css={{backgroundColor: '#7928ca'}}>
                        <Card.Body>
                            <Text
                                css={{fontWeight: '$bold', color: '$white'}}
                                transform="capitalize"
                            >
                                Notice
                            </Text>
                            <Text css={{fontWeight: '$bold', color: '$white'}} span>
                                In order to use the apps you have to give permission to manage your google books
                            </Text>
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Divider/>
                <Modal.Footer>
                    <Button auto onClick={submitHandler}>
                        Sign in
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AuthModal;