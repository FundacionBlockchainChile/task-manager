const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);



const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'nodo1@nodo.com',
        subject: 'Thanks for joining in!',
        html: `<body style="background-color:black;"><h1>Welcome to the App ${name}!!!. We are happy you join us...</h1><img width=250px src="https://images.unsplash.com/photo-1536560035542-1326fab3a507?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"></body>`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'nodo1@nodo.com',
        subject: 'We are sorry you leave!',
        html: `<body style="background-color:black;"><h1>Your cancellation is ready ${name}. Please let us know why you are leaving...</h1><img width=250px src="https://images.unsplash.com/photo-1423958950820-4f2f1f44e075?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"><p>Please return soon..</p></body>`
    })
}


module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}
