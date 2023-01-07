import { useRef, useState } from 'react';
import emailjs from "@emailjs/browser";
import { Card, Form, Button, Container, Modal } from "react-bootstrap";

const ContactMe = () => {

    const form = useRef();

    const [show, setShow] = useState(false);

    const { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY } = process.env;

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm(
            SERVICE_ID,
            TEMPLATE_ID,
            form.current,
            PUBLIC_KEY
        )
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        }); 

    }

    return (

        <Container>
            <Card>
                <Card.Header>
                    Contact Me
                </Card.Header>
                <Card.Body>
                    <Form 
                        ref={form}
                        onSubmit={sendEmail}
                    >
                        <Form.Group>
                            <Form.Label>
                                Your Name
                            </Form.Label>
                            <Form.Control 
                                type="string"
                                name='user_name'
                                autoFocus
                                required
                            />
                            <Form.Label>
                                Your Email Address
                            </Form.Label>
                            <Form.Control 
                                type="email"
                                placeholder='Enter Your Email Here'
                                name='from_email'
                                required
                            />
                            <Form.Label>
                                Email Subject
                            </Form.Label>
                            <Form.Control 
                                type="string"
                                name='user_subject'
                                required
                            />
                            <Form.Label>
                                Message
                            </Form.Label>
                            <Form.Control 
                                type="text"
                                as='textarea'
                                rows={5}
                                name='message'
                                required
                            />
                        </Form.Group>
                    </Form>
                    <Button
                        onClick={ () => setShow(true) }
                        variant="success"
                        type='submit'
                    >
                        Send
                    </Button>

                    <Modal
                        size='sm'
                        show={show}
                        onHide={ () => window.location.reload() }
                    >
                        <Modal.Header closeButton>
                            ALERT
                        </Modal.Header>
                        <Modal.Body>
                            Your email has been sent
                        </Modal.Body>
                    </Modal>

                </Card.Body>
            </Card>
        </Container>
    )
}

export default ContactMe;