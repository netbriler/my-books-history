import {Button, Card, Divider, Modal, Text} from "@nextui-org/react";
import React, {useContext} from "react";
import {Context} from "../../pages/_app";

interface AuthModalProps {
    visible: boolean;
}

const AuthModal: React.FC<AuthModalProps> = ({visible}) => {
    const {store} = useContext(Context);

    const submitHandler = () => {
        store.login()
    };
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
                    <Card color={'secondary'}>
                        <Text
                            css={{fontWeight: "$bold", color: "$white"}}
                            transform="capitalize"
                        >
                            Notice
                        </Text>
                        <Text css={{fontWeight: "$bold", color: "$white"}} span>
                            In order to use the apps you have to give permission to manage your google books
                        </Text>
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