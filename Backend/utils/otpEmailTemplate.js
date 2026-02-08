const otpEmailTemplate = (name, otp, purpose = "verification") => {
  return `
  <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">
    <div style="max-width: 500px; margin: auto; background: #ffffff; padding: 20px; border-radius: 6px;">
      
      <h2 style="color: #333;">Campus Portal</h2>

      <p>Hi <strong>${name}</strong>,</p>

      <p>
        Your One-Time Password (OTP) for 
        <strong>${purpose}</strong> is:
      </p>

      <div style="
        font-size: 24px;
        font-weight: bold;
        letter-spacing: 4px;
        background: #f0f0f0;
        padding: 10px;
        text-align: center;
        border-radius: 4px;
        margin: 20px 0;
      ">
        ${otp}
      </div>

      <p>
        This OTP is valid for <strong>5 minutes</strong>.
        Please do not share this code with anyone.
      </p>

      <p style="color: #666; font-size: 14px;">
        If you did not request this, please ignore this email.
      </p>

      <hr />

      <p style="font-size: 12px; color: #999;">
        © ${new Date().getFullYear()} Campus Portal. All rights reserved.
      </p>
    </div>
  </div>
  `;
};

module.exports = otpEmailTemplate;
