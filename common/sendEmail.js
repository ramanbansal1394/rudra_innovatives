const sgMail = require('@sendgrid/mail');
require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * @method _sendEmail: This method used to send email
 * @param {Object} data user email and email related data
 */
const _sendEmail = async (data) => {
    try {
        const { to, subject, html } = data;
        const msg = {
            to,
            from: 'rbansal1394@gmail.com',
            subject,
            html,
        };
        const isSent = await sgMail.send(msg);
        if (isSent) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log("_sendEmail-err", err);
        return false;
    }
}

module.exports.sendEmail = _sendEmail;