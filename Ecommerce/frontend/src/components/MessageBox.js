import Alert from 'react-bootstrap/Alert'
export default function MessageBox(props)
{
    return (
        <Alert variant={PaymentResponse.variant || 'info'} >{props.children}</Alert>
    );

}